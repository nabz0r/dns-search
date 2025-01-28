const mongoose = require('mongoose');

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
      validator: (domain) => {
        const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
        return pattern.test(domain);
      },
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

module.exports = mongoose.model('Search', searchSchema);