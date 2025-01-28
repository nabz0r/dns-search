# API Reference

## Endpoints

### Recherche DNS

`POST /api/search`

Requête :
```json
{
  "domain": "example.com",
  "type": "A"
}
```

Réponse :
```json
{
  "domain": "example.com",
  "ip": "93.184.216.34",
  "type": "A",
  "response": "[\"93.184.216.34\"]",
  "queryTime": 0.123
}
```

### Historique Récent

`GET /api/recent`

Réponse :
```json
{
  "searches": [
    {
      "domain": "example.com",
      "ip": "93.184.216.34",
      "timestamp": "2025-01-28T14:30:22Z",
      "queryTime": 0.123
    }
  ]
}
```

## Limites

- 100 requêtes par IP par 15 minutes
- Taille maximale du domaine : 255 caractères
- Timeout : 10 secondes

## Codes d'Erreur

- 400: Requête invalide
- 429: Trop de requêtes
- 500: Erreur serveur

## Authentification

Pas d'authentification requise pour le moment.

## Exemples

### cURL
```bash
curl -X POST \
  http://localhost:3001/api/search \
  -H 'Content-Type: application/json' \
  -d '{"domain":"example.com"}'
```

### JavaScript
```javascript
fetch('http://localhost:3001/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ domain: 'example.com' })
}).then(res => res.json())
```