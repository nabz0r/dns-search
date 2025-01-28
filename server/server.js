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
