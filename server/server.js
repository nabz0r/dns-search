require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createLogger, format, transports } = require('winston');
const dns = require('dns').promises;
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3001;

// Configuration du logger
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

// Validation du domaine
const isValidDomain = (domain) => {
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return pattern.test(domain);
};

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes depuis cette IP'
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use('/api/', limiter);
app.use(express.json());

// Connexion MongoDB avec retry
const connectDB = async (retries = 5) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Connecté à MongoDB');
  } catch (err) {
    if (retries > 0) {
      logger.warn(`Reconnexion à MongoDB (${retries} tentatives restantes)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      logger.error('Erreur MongoDB:', err);
      process.exit(1);
    }
  }
};

connectDB();

// Modèle de données avec validation
const searchSchema = new mongoose.Schema({
  timestamp: { 
    type: Date, 
    default: Date.now,
    required: true
  },
  domain: { 
    type: String, 
    required: true,
    maxLength: 255,
    validate: {
      validator: isValidDomain,
      message: 'Format de domaine invalide'
    }
  },
  ip: { 
    type: String,
    required: true
  },
  type: { 
    type: String,
    enum: ['A', 'AAAA', 'MX', 'TXT', 'NS'],
    default: 'A'
  },
  response: { 
    type: String,
    required: true
  },
  queryTime: { 
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'error'],
    default: 'success'
  },
  errorMessage: String
});

searchSchema.index({ domain: 1 });
searchSchema.index({ timestamp: -1 });

const Search = mongoose.model('Search', searchSchema);

// Cache avec gestion du timeout
const cache = new Map();
const TTL = 3600; // 1 heure

const getCachedResult = (domain) => {
  if (cache.has(domain)) {
    const {result, timestamp} = cache.get(domain);
    if (Date.now() - timestamp < TTL * 1000) {
      return result;
    }
    cache.delete(domain);
  }
  return null;
};

// Route pour la recherche DNS
app.post('/api/search', async (req, res) => {
  const startTime = process.hrtime();
  const { domain } = req.body;

  if (!domain || !isValidDomain(domain)) {
    return res.status(400).json({ error: 'Domaine invalide' });
  }

  try {
    let addresses;
    const cached = getCachedResult(domain);
    
    if (cached) {
      addresses = cached;
      logger.info(`Résultat caché utilisé pour ${domain}`);
    } else {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout DNS')), 10000);
      });
      addresses = await Promise.race([
        dns.resolve4(domain),
        timeoutPromise
      ]);
      cache.set(domain, { result: addresses, timestamp: Date.now() });
    }

    const endTime = process.hrtime(startTime);
    const queryTime = (endTime[0] * 1e9 + endTime[1]) / 1e9;

    const searchData = new Search({
      domain,
      ip: addresses[0],
      type: 'A',
      response: JSON.stringify(addresses),
      queryTime,
      status: 'success'
    });

    await searchData.save();
    res.json(searchData);
  } catch (error) {
    logger.error(`Erreur DNS pour ${domain}:`, error);
    
    const errorData = new Search({
      domain,
      ip: 'N/A',
      type: 'A',
      response: 'Error',
      queryTime: 0,
      status: 'error',
      errorMessage: error.message
    });

    await errorData.save();
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les recherches récentes
app.get('/api/recent', async (req, res) => {
  try {
    const searches = await Search.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('-response'); // Exclusion des données volumineuses

    res.json(searches);
  } catch (error) {
    logger.error('Erreur récupération historique:', error);
    res.status(500).json({ error: error.message });
  }
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  logger.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// Démarrage du serveur
const server = app.listen(port, () => {
  logger.info(`Serveur démarré sur le port ${port}`);
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  logger.info('SIGTERM reçu. Arrêt gracieux...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      logger.info('Serveur arrêté');
      process.exit(0);
    });
  });
});
