require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createLogger, format, transports } = require('winston');
const rateLimit = require('express-rate-limit');

const Search = require('./models/search');
const dnsService = require('./services/dns');

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

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connecté à MongoDB'))
  .catch((err) => {
    logger.error('Erreur MongoDB:', err);
    process.exit(1);
  });

// Routes
app.post('/api/search', async (req, res) => {
  const startTime = process.hrtime();
  const { domain } = req.body;

  try {
    const addresses = await dnsService.resolve(domain);
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

app.get('/api/recent', async (req, res) => {
  try {
    const searches = await Search.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('-response');

    res.json(searches);
  } catch (error) {
    logger.error('Erreur récupération historique:', error);
    res.status(500).json({ error: error.message });
  }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  logger.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// Démarrage
const server = app.listen(port, () => {
  logger.info(`Serveur démarré sur le port ${port}`);
});

// Arrêt gracieux
process.on('SIGTERM', () => {
  logger.info('SIGTERM reçu. Arrêt gracieux...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      logger.info('Serveur arrêté');
      process.exit(0);
    });
  });
});