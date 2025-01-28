require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createLogger, format, transports } = require('winston');
const dns = require('dns').promises;

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

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connecté à MongoDB'))
  .catch(err => logger.error('Erreur MongoDB:', err));

// Modèle de données
const Search = mongoose.model('Search', {
  timestamp: { type: Date, default: Date.now },
  domain: String,
  ip: String,
  type: String,
  response: String,
  queryTime: Number
});

// Route pour la recherche DNS
app.post('/api/search', async (req, res) => {
  const startTime = process.hrtime();
  const { domain } = req.body;

  try {
    const addresses = await dns.resolve4(domain);
    const endTime = process.hrtime(startTime);
    const queryTime = (endTime[0] * 1e9 + endTime[1]) / 1e9;

    const searchData = new Search({
      domain,
      ip: addresses[0],
      type: 'A',
      response: JSON.stringify(addresses),
      queryTime
    });

    await searchData.save();
    res.json(searchData);
  } catch (error) {
    logger.error(`Erreur DNS pour ${domain}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer les recherches récentes
app.get('/api/recent', async (req, res) => {
  try {
    const searches = await Search.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(searches);
  } catch (error) {
    logger.error('Erreur récupération historique:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  logger.info(`Serveur démarré sur le port ${port}`);
});