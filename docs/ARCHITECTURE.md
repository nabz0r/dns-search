# Architecture DNS Search Tool

## Vue d'Ensemble

L'application suit une architecture modulaire avec séparation claire des responsabilités.

### Structure du Projet

```
dns-search/
├── src/                    # Code source frontend
│   ├── components/         # Composants React
│   │   ├── ui/              # Composants UI réutilisables
│   │   ├── DNSSearch.jsx     # Composant principal
│   │   └── SearchHistory.jsx  # Table d'historique
│   ├── services/           # Services frontend
│   ├── constants.js        # Constantes globales
│   └── index.jsx           # Point d'entrée
├── server/                 # Code source backend
│   ├── models/             # Modèles MongoDB
│   ├── services/           # Services métier
│   └── server.js           # Point d'entrée API
├── scripts/                # Scripts utilitaires
└── docs/                   # Documentation
```

## Frontend

### Composants React

1. Composants UI Réutilisables
   - SearchInput : Barre de recherche avec gestion du chargement
   - ResultCard : Carte pour afficher les résultats
   - LoadingSpinner : Indicateur de chargement
   - ErrorMessage : Affichage des erreurs

2. Composants Métier
   - DNSSearch : Composant principal de l'application
   - SearchHistory : Affichage de l'historique des recherches

### Services

1. API Service (api.js)
   - Gestion des requêtes HTTP
   - Timeouts et annulation
   - Traitement des erreurs

### Configuration

1. Constants (constants.js)
   - URLs de l'API
   - Messages d'erreur
   - Timeouts et limites

## Backend

### Modèles

1. Search (models/search.js)
   - Schéma MongoDB
   - Validation des données
   - Index optimisés

### Services

1. DNS Service (services/dns.js)
   - Résolution DNS
   - Gestion du cache
   - Timeouts

### Configuration

1. Logger
   - Logs structurés
   - Rotation des fichiers
   - Niveaux de log configurable

2. Sécurité
   - Validation des entrées
   - Rate limiting
   - CORS configurable

## Base de Données

### Collections

1. searches
   - timestamp : Date de la recherche
   - domain : Domaine recherché
   - ip : Résultat IP
   - type : Type de requête DNS
   - response : Réponse complète
   - queryTime : Temps d'exécution
   - status : État de la requête

### Index

1. Optimisation des performances
   - { domain: 1 } : Recherches par domaine
   - { timestamp: -1 } : Historique récent

## Flux de Données

1. Requête Utilisateur
   - Validation frontend
   - Envoi à l'API
   - Timeout de 10 secondes

2. Traitement Backend
   - Vérification du cache
   - Résolution DNS si nécessaire
   - Sauvegarde en base

3. Réponse
   - Résultat au format JSON
   - Mise à jour de l'interface
   - Rafraîchissement de l'historique

## Performance

1. Optimisations
   - Cache DNS avec TTL
   - Index MongoDB
   - Limitation des données transférées

2. Monitoring
   - Logs d'erreurs
   - Temps de réponse
   - Taux de succès