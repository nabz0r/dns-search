#!/bin/bash

# Vérification des prérequis
command -v node >/dev/null 2>&1 || { echo "Node.js est requis" >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm est requis" >&2; exit 1; }

# Vérification des versions
NODE_VERSION=$(node -v | cut -d'v' -f2)
if (( $(echo "$NODE_VERSION < 16" | bc -l) )); then
  echo "Node.js 16+ est requis" >&2
  exit 1
fi

# Installation des dépendances
echo "Installation des dépendances frontend..."
npm install

echo "Installation des dépendances backend..."
cd server && npm install && cd ..

# Configuration
echo "Configuration de l'environnement..."
if [ ! -f .env ]; then
  cp .env.example .env
fi

if [ ! -f server/.env ]; then
  cd server && cp .env.example .env && cd ..
fi

# Démarrage
echo "Démarrage de l'application..."
npm run dev
