#!/bin/bash

# Couleurs pour la lisibilité
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction de logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

error() {
    echo -e "${RED}[ERREUR]${NC} $1"
    exit 1
}

# Vérification des prérequis
checkPrerequisites() {
    log "Vérification des prérequis..."
    
    # Vérification de Node.js
    if ! command -v node >/dev/null 2>&1; then
        error "Node.js n'est pas installé. Veuillez l'installer d'abord."
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    if (( $(echo "$NODE_VERSION < 16" | bc -l) )); then
        error "Node.js 16+ est requis. Version actuelle: $NODE_VERSION"
    fi
    
    # Vérification de npm
    if ! command -v npm >/dev/null 2>&1; then
        error "npm n'est pas installé"
    fi
    
    # Vérification de MongoDB
    if ! command -v mongod >/dev/null 2>&1; then
        warning "MongoDB n'est pas installé localement. Installation en cours..."
        installMongoDB
    fi
    
    log "Tous les prérequis sont satisfaits"
}

# Installation de MongoDB si nécessaire
installMongoDB() {
    log "Installation de MongoDB..."
    
    if [[ "$(uname)" == "Darwin" ]]; then
        # macOS
        if ! command -v brew >/dev/null 2>&1; then
            error "Homebrew est requis pour installer MongoDB sur macOS"
        fi
        brew tap mongodb/brew
        brew install mongodb-community
        brew services start mongodb-community
    elif [[ "$(uname)" == "Linux" ]]; then
        # Ubuntu/Debian
        wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
        sudo apt-get update
        sudo apt-get install -y mongodb-org
        sudo systemctl start mongod
    else
        error "Système d'exploitation non supporté"
    fi
    
    log "MongoDB installé et démarré"
}

# Configuration de l'environnement
configureEnvironment() {
    log "Configuration de l'environnement..."
    
    # Génération des fichiers .env
    if [ ! -f .env ]; then
        cat > .env << EOL
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENABLE_CACHE=true
REACT_APP_CACHE_DURATION=3600
EOL
    fi
    
    if [ ! -f server/.env ]; then
        cat > server/.env << EOL
PORT=3001
MONGODB_URI=mongodb://localhost:27017/dns-search
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=info
LOG_FILE=server.log
EOL
    fi
    
    log "Fichiers de configuration créés"
}

# Installation des dépendances
installDependencies() {
    log "Installation des dépendances frontend..."
    npm install || error "Erreur lors de l'installation des dépendances frontend"
    
    log "Installation des dépendances backend..."
    cd server && npm install && cd .. || error "Erreur lors de l'installation des dépendances backend"
}

# Configuration de la base de données
setupDatabase() {
    log "Configuration de la base de données..."
    
    # Création des index MongoDB
    mongosh "mongodb://localhost:27017/dns-search" --eval '
        db.searches.createIndex({ domain: 1 });
        db.searches.createIndex({ timestamp: -1 });
        db.searches.createIndex({ status: 1 });
    ' || warning "Impossible de créer les index MongoDB"
}

# Validation de l'installation
validateInstallation() {
    log "Validation de l'installation..."
    
    # Vérification du serveur MongoDB
    mongosh --eval "db.runCommand({ping: 1})" || error "MongoDB n'est pas accessible"
    
    # Vérification de l'accès à la base de données
    mongosh "mongodb://localhost:27017/dns-search" --eval "db.searches.stats()" || error "Impossible d'accéder à la base de données"
    
    # Test du build frontend
    npm run build || error "Erreur lors du build frontend"
    
    log "Installation validée avec succès"
}

# Fonction principale
main() {
    log "Démarrage de l'installation..."
    
    checkPrerequisites
    configureEnvironment
    installDependencies
    setupDatabase
    validateInstallation
    
    log "Installation terminée avec succès !"
    log "Pour démarrer l'application :"
    log "1. npm run dev"
    log "2. Ouvrez http://localhost:3000 dans votre navigateur"
}

# Exécution du script
main
