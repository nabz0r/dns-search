# Guide de Déploiement DNS Search

Ce guide détaille les étapes pour déployer l'application DNS Search en production.

## Architecture

L'application se compose de trois parties principales :

1. Frontend React (interface utilisateur)
2. Backend Node.js/Express (API et logique métier)
3. Base de données MongoDB (stockage des recherches)

## Étapes de Déploiement

### 1. Base de Données

Créez une base de données MongoDB :

1. Créez un compte gratuit sur MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster
3. Obtenez l'URI de connexion
4. Notez les identifiants pour la configuration

### 2. Backend

Pour déployer sur Heroku :

1. Installez Heroku CLI
2. Initialisez un repo Git dans le dossier 'server' :
```bash
cd server
git init
heroku create dns-search-api
```

3. Configurez les variables d'environnement :
```bash
heroku config:set MONGODB_URI=votre_uri_mongodb
heroku config:set PORT=3001
heroku config:set NODE_ENV=production
```

4. Déployez :
```bash
git push heroku main
```

### 3. Frontend

Pour déployer sur Vercel :

1. Créez un compte sur Vercel
2. Installez Vercel CLI
3. Configurez les variables d'environnement :
   - REACT_APP_API_URL=https://votre-api-heroku.herokuapp.com

4. Déployez :
```bash
vercel deploy
```

## Vérification Post-Déploiement

1. Testez les points d'entrée de l'API :
   - POST /api/search
   - GET /api/recent

2. Vérifiez les logs dans Heroku :
```bash
heroku logs --tail
```

3. Surveillez MongoDB Atlas pour les métriques de base de données

## Sécurité

Le code inclut déjà :
- Protection CORS
- Validation des entrées
- Logging sécurisé

Mesures supplémentaires recommandées :

1. Ajoutez un rate limiting :
```javascript
const rateLimit = require('express-rate-limit');

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite par IP
}));
```

2. Configurez un pare-feu applicatif (WAF)
3. Activez HTTPS uniquement

## Monitoring

Le code inclut Winston pour les logs. Configuration additionnelle recommandée :

1. Sentry pour le suivi des erreurs :
```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'votre-dsn' });
```

2. Configurer des alertes dans MongoDB Atlas
3. Mettre en place NewRelic ou Datadog

## Mise à l'échelle

Pour gérer la croissance :

1. Activez la mise en cache DNS :
```javascript
const cache = new Map();
const TTL = 3600; // 1 heure

async function dnsLookup(domain) {
  if (cache.has(domain)) {
    const {result, timestamp} = cache.get(domain);
    if (Date.now() - timestamp < TTL * 1000) {
      return result;
    }
  }
  const result = await dns.resolve4(domain);
  cache.set(domain, {result, timestamp: Date.now()});
  return result;
}
```

2. Configurez l'auto-scaling sur Heroku
3. Utilisez MongoDB Atlas évolutif
4. Implémentez un CDN pour le frontend

## Support

En cas de problèmes :

1. Consultez les logs Heroku et MongoDB Atlas
2. Vérifiez le statut des services : https://status.heroku.com
3. Contactez le support technique si nécessaire