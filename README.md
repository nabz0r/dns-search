# DNS Search Tool

Un outil simple de recherche DNS avec stockage dans un fichier texte.

## Features
- Interface de recherche style Google
- Stockage des requêtes dans un fichier texte
- Pas d'authentification requise

## Structure
```
dig_requests.txt (format)
timestamp|domain|ip|dns_type|response|query_time
```

## Installation
```bash
npm install
npm start
```