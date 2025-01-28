export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const REQUEST_TIMEOUT = 10000; // 10 secondes

export const ROUTES = {
  SEARCH: '/api/search',
  RECENT: '/api/recent'
};

export const ERROR_MESSAGES = {
  TIMEOUT: 'La requête a pris trop de temps',
  NETWORK: 'Erreur de connexion au serveur',
  DEFAULT: 'Une erreur est survenue'
};