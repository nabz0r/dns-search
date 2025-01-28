require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createLogger, format, transports } = require('winston');
const dns = require('dns').promises;
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3001;

// Validation du domaine
const isValidDomain = (domain) => {
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return pattern.test(domain);
};

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