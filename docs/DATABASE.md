# Architecture de la Base de Données

## Modèle de Données

### Collection: searches

```javascript
{
  _id: ObjectId,           // ID unique MongoDB
  timestamp: Date,         // Date et heure de la recherche
  domain: String,          // Domaine recherché
  ip: String,              // Résultat IP
  type: String,            // Type de recherche DNS (A, AAAA, MX, etc)
  response: String,        // Réponse DNS complète
  queryTime: Number,       // Temps de réponse en secondes
  status: String,          // 'success' ou 'error'
  errorMessage: String     // Message d'erreur si échec
}
```

### Index Recommandés

```javascript
// Performance des recherches
db.searches.createIndex({ domain: 1 });
db.searches.createIndex({ timestamp: -1 });

// Analyse des erreurs
db.searches.createIndex({ status: 1 });

// Requêtes fréquentes
db.searches.createIndex({ domain: 1, timestamp: -1 });
```

## Maintenance

### Retention des Données

Par défaut, les données sont conservées 30 jours. Script de nettoyage :

```javascript
db.searches.deleteMany({
  timestamp: { 
    $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
});
```

### Backups

Configuration mongodump recommandée :

```bash
mongodump \
  --uri="${MONGODB_URI}" \
  --gzip \
  --archive=/backups/dns-search-$(date +%Y%m%d).gz
```

## Monitoring

Métriques importantes à surveiller :

1. Taille de la collection
2. Temps de réponse moyen
3. Taux d'erreur
4. Utilisation des index