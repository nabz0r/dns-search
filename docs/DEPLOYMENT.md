# Guide de Déploiement

## Limitations Actuelles

L'application dans son état actuel utilise `window.fs` pour stocker les données localement, ce qui ne fonctionnera pas en production. Pour un déploiement en ligne, plusieurs modifications sont nécessaires.

## Solutions Recommandées

### 1. Stockage des Données
Remplacer le stockage fichier local par une base de données :
```javascript
// Exemple avec MongoDB
const saveSearch = async (searchData) => {
  await db.collection('searches').insertOne({
    timestamp: new Date(),
    domain: searchData.domain,
    ip: searchData.ip,
    type: searchData.type,
    response: searchData.response,
    queryTime: searchData.queryTime
  });
};
```

### 2. Architecture Serveur
Ajouter un backend Node.js :
```javascript
// server.js
const express = require('express');
const app = express();

app.post('/api/search', async (req, res) => {
  // Effectuer la recherche DNS
  // Sauvegarder dans la base de données
  // Renvoyer le résultat
});

app.get('/api/recent', async (req, res) => {
  // Récupérer les recherches récentes
});
```

### 3. Hébergement

1. Frontend : Déployez sur Vercel ou Netlify
2. Backend : Hébergez sur:
   - Heroku
   - DigitalOcean
   - AWS
3. Base de données : Utilisez:
   - MongoDB Atlas
   - PostgreSQL sur Heroku

## Modifications Nécessaires

1. Créez un fichier `.env` pour les variables d'environnement:
```
REACT_APP_API_URL=https://votre-api.com
MONGODB_URI=mongodb://...
```

2. Modifiez le composant DNSSearch pour utiliser l'API:
```javascript
const handleSearch = async () => {
  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({ domain: query })
  });
  const data = await response.json();
  setResults(data);
};
```

## Sécurité

1. Limitez le nombre de requêtes par IP
2. Ajoutez une protection CORS
3. Validez les entrées utilisateur
4. Surveillez l'utilisation des ressources

## Monitoring

1. Mettez en place des logs avec Winston ou Morgan
2. Utilisez Sentry pour le suivi des erreurs
3. Configurez des alertes pour:
   - Temps de réponse élevé
   - Erreurs fréquentes
   - Utilisation excessive

## Mise à l'échelle

Pour gérer un grand nombre d'utilisateurs:

1. Mettez en cache les résultats DNS fréquents
2. Utilisez un CDN pour le frontend
3. Configurez l'auto-scaling sur votre hébergeur
4. Optimisez les requêtes base de données