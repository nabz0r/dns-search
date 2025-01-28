# Guide de Déploiement

## Préparation Locale

1. Configuration du Backend :
   ```bash
   cd server
   cp .env.example .env
   # Éditez .env avec vos configurations
   ```

   Variables d'environnement requises :
   ```env
   MONGODB_URI=votre_uri_mongodb
   PORT=3001
   CORS_ORIGIN=http://localhost:3000
   NODE_ENV=production
   ```

2. Configuration du Frontend :
   ```bash
   cp .env.example .env
   # Éditez .env avec vos configurations
   ```

   Variables requises :
   ```env
   REACT_APP_API_URL=https://votre-api.domain.com
   ```

## Déploiement du Backend

### Sur DigitalOcean App Platform

1. Créez une nouvelle application
2. Sélectionnez le répertoire 'server'
3. Configurez les variables d'environnement
4. Déployez

### Sur Heroku

1. Créez une nouvelle application :
   ```bash
   heroku create dns-search-api
   ```

2. Configurez les variables d'environnement :
   ```bash
   heroku config:set MONGODB_URI=votre_uri_mongodb
   heroku config:set NODE_ENV=production
   ```

3. Déployez :
   ```bash
   git subtree push --prefix server heroku main
   ```

## Déploiement du Frontend

### Sur Vercel

1. Importez le projet depuis GitHub
2. Configurez les variables d'environnement
3. Déployez

### Sur Netlify

1. Connectez votre repo GitHub
2. Configuration du build :
   - Build command: `npm run build`
   - Publish directory: `build`
3. Ajoutez les variables d'environnement

## Base de Données

### MongoDB Atlas

1. Créez un cluster (gratuit)
2. Configurez l'accès réseau
3. Créez un utilisateur de base de données
4. Récupérez l'URI de connexion

### Sécurité

Vérifiez les points suivants :

1. Backend :
   - Rate limiting actif
   - CORS configuré
   - Validation des entrées
   - Logs en place

2. Base de données :
   - Accès limité par IP
   - Authentification forte
   - Backups actifs

3. Frontend :
   - HTTPS actif
   - Variables d'environnement sécurisées

## Monitoring

1. Configurer les alertes dans MongoDB Atlas
2. Activer les métriques sur votre plateforme d'hébergement
3. Vérifier les logs régulièrement

## Maintenance

Routines recommandées :

1. Quotidienne :
   - Vérification des logs d'erreur
   - Surveillance des métriques

2. Hebdomadaire :
   - Analyse des performances
   - Vérification des sauvegardes

3. Mensuelle :
   - Mise à jour des dépendances
   - Revue des accès
