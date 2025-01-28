# Guide Complet DNS Search Tool

## Introduction

Le DNS Search Tool est une application web permettant d'effectuer des recherches DNS et de stocker les résultats. Ce guide couvre l'installation, la configuration, l'utilisation et le dépannage de l'application.

## Installation Rapide

Pour démarrer immédiatement, exécutez la commande suivante :

```bash
curl -sSL https://raw.githubusercontent.com/nabz0r/dns-search/main/scripts/install.sh | bash
```

L'installation effectue automatiquement toutes les vérifications nécessaires et configure votre environnement. Une fois terminée, l'application est accessible sur http://localhost:3000.

## Prérequis Système

Votre système doit disposer de :
- 512 MB RAM minimum
- 1 GB espace disque
- Ports 3000 et 3001 disponibles
- Node.js 16 ou supérieur
- Accès administrateur pour MongoDB

## Architecture

L'application utilise une architecture en trois couches :

1. Frontend (React)
   - Interface utilisateur moderne
   - Gestion d'état avec React Hooks
   - Design responsive avec Tailwind CSS

2. Backend (Node.js/Express)
   - API REST sécurisée
   - Mise en cache des requêtes DNS
   - Logging détaillé

3. Base de données (MongoDB)
   - Stockage persistant
   - Index optimisés
   - Sauvegarde automatique

## Configuration

### Variables d'Environnement

Frontend (.env) :
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENABLE_CACHE=true
REACT_APP_CACHE_DURATION=3600
```

Backend (server/.env) :
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/dns-search
NODE_ENV=development
LOG_LEVEL=info
```

## Utilisation

### Démarrage

1. Démarrez l'application :
   ```bash
   npm run dev
   ```

2. Accédez à l'interface : http://localhost:3000

### Fonctionnalités Principales

1. Recherche DNS
   - Entrez un nom de domaine
   - Sélectionnez le type de requête
   - Consultez les résultats en temps réel

2. Historique
   - Accédez aux recherches précédentes
   - Filtrez par date ou domaine
   - Exportez les données

## Dépannage

### Problèmes Courants et Solutions

1. L'application ne démarre pas

Symptômes :
- Page blanche
- Erreur de connexion
- Message "Cannot connect to server"

Solutions :
1. Vérifiez les ports :
   ```bash
   sudo lsof -i :3000
   sudo lsof -i :3001
   ```

2. Vérifiez MongoDB :
   ```bash
   mongosh --eval "db.runCommand({ping:1})"
   ```

3. Vérifiez les logs :
   ```bash
   tail -f server/logs/error.log
   ```

2. Erreurs DNS

Symptômes :
- Timeout des requêtes
- Résultats incomplets

Solutions :
1. Vérifiez la connexion réseau :
   ```bash
   ping 8.8.8.8
   ```

2. Testez la résolution DNS :
   ```bash
   dig example.com
   ```

3. Problèmes de Base de Données

Symptômes :
- Erreurs de connexion MongoDB
- Lenteur des requêtes

Solutions :
1. Vérifiez l'espace disque :
   ```bash
   df -h
   ```

2. Réparez la base :
   ```bash
   mongosh "mongodb://localhost:27017/dns-search" --eval "db.repairDatabase()"
   ```

## Maintenance

### Tâches Quotidiennes

1. Vérification des logs :
   ```bash
   ./scripts/check-logs.sh
   ```

2. Sauvegarde des données :
   ```bash
   ./scripts/backup.sh
   ```

### Mises à Jour

1. Mise à jour de l'application :
   ```bash
   ./scripts/update.sh
   ```

2. Vérification des dépendances :
   ```bash
   npm audit
   ```

## Sécurité

### Bonnes Pratiques

1. Surveillez les logs d'erreurs
2. Mettez à jour régulièrement les dépendances
3. Effectuez des sauvegardes quotidiennes
4. Vérifiez les permissions des fichiers

### Audit de Sécurité

1. Vérifiez les dépendances :
   ```bash
   npm audit
   ```

2. Scannez les vulnérabilités :
   ```bash
   ./scripts/security-check.sh
   ```

## Support

Si vous rencontrez des difficultés :

1. Consultez les logs d'erreur
2. Vérifiez les issues GitHub
3. Ouvrez un ticket avec :
   - Description du problème
   - Logs pertinents
   - Étapes de reproduction
   - Environnement technique

## Ressources

- Code source : https://github.com/nabz0r/dns-search
- Documentation API : http://localhost:3001/api/docs
- Rapports de bugs : https://github.com/nabz0r/dns-search/issues

## Versions

- Version actuelle : 1.1.0
- Dernière mise à jour : 2025-01-28
- Changelog : [CHANGELOG.md](CHANGELOG.md)
