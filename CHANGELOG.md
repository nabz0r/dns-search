# Journal des Modifications

## [1.1.0] - 2025-01-28

### Refactoring et Amélioration de l'Architecture

Une restructuration majeure du code pour améliorer la maintenabilité et la robustesse.

#### Frontend
- Séparation des composants en modules réutilisables (SearchInput, ResultCard, LoadingSpinner, ErrorMessage)
- Implémentation d'une gestion des services API centralisée dans src/services/api.js
- Création de constantes globales pour les URLs, timeouts et messages d'erreur
- Amélioration de la gestion des erreurs avec système de timeout à 10 secondes
- Ajout du composant SearchHistory pour l'affichage des recherches récentes

#### Backend
- Réorganisation en modules distincts (services/dns.js, models/search.js)
- Implémentation d'une validation robuste des domaines avec regex
- Amélioration du cache DNS avec gestion du TTL
- Optimisation de la gestion des erreurs et des timeouts
- Configuration améliorée du logger Winston

## [1.0.1] - 2025-01-28

### Améliorations de Sécurité et Performance

#### Backend
- Ajout de la validation robuste des domaines avec expression régulière
- Implémentation d'une gestion de timeout DNS (10 secondes)
- Amélioration de la validation des schémas MongoDB
- Optimisation de la gestion du cache DNS

#### Frontend
- Amélioration de la gestion des timeouts des requêtes
- Ajout d'un AbortController pour les requêtes longues
- Meilleure gestion des états d'erreur

#### Sécurité
- Renforcement de la validation des entrées
- Amélioration de la gestion des erreurs DNS
- Protection contre les requêtes malformées

## [1.0.0] - 2025-01-28

### Architecture Initiale et Mise en Place

Cette version marque le lancement initial de DNS Search Tool avec une interface moderne de recherche DNS.

#### Frontend
- Interface utilisateur React avec design moderne
- Barre de recherche style Google pour les requêtes DNS
- Affichage en temps réel des résultats
- Intégration complète avec Tailwind CSS
- Section historique des recherches récentes

#### Backend
- Mise en place du serveur Express.js
- API RESTful pour les recherches DNS
- Intégration MongoDB pour le stockage
- Système de logging avec Winston
- Gestion basique des erreurs

#### Base de Données
- Configuration initiale MongoDB
- Schémas Mongoose de base
- Index pour les performances
- Gestion des recherches récentes

#### Documentation
- Guide d'installation et de configuration
- Documentation API de base
- Guides de dépannage initiaux

#### Scripts d'Automatisation
- Script d'installation basique
- Vérification de l'environnement
- Script de sauvegarde initial

## [0.2.0] - 2025-01-28

### Consolidation de la Documentation

- Création du guide unifié GUIDE.md
- Amélioration du README avec design moderne
- Ajout d'illustrations SVG pour la prévisualisation
- Documentation détaillée du dépannage

## [0.1.0] - 2025-01-28

### Première Version de Développement

- Structure de base du projet React
- Configuration initiale du serveur Express
- Intégration basique de MongoDB
- Scripts d'installation préliminaires

[1.1.0]: https://github.com/nabz0r/dns-search/releases/tag/v1.1.0
[1.0.1]: https://github.com/nabz0r/dns-search/releases/tag/v1.0.1
[1.0.0]: https://github.com/nabz0r/dns-search/releases/tag/v1.0.0
[0.2.0]: https://github.com/nabz0r/dns-search/releases/tag/v0.2.0
[0.1.0]: https://github.com/nabz0r/dns-search/releases/tag/v0.1.0