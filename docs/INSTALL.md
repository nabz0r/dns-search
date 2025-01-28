# Guide d'Installation et de Dépannage

## Prérequis
Pour utiliser cette application, vous devez avoir installé :
- Node.js (version 16 ou supérieure)
- npm (généralement installé avec Node.js)
- Un éditeur de texte (VS Code recommandé)

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/nabz0r/dns-search.git
cd dns-search
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
npm start
```

L'application devrait maintenant être accessible sur http://localhost:3000

## Guide de Dépannage

### Problème : L'application ne démarre pas
Solutions possibles :
- Vérifiez que le port 3000 n'est pas déjà utilisé
- Supprimez node_modules et package-lock.json puis relancez npm install
- Vérifiez la version de Node.js avec `node -v`

### Problème : Les styles ne s'appliquent pas
Solutions possibles :
- Vérifiez que tailwind.config.js est bien présent
- Lancez `npm rebuild`
- Vérifiez les imports CSS dans index.js

### Problème : Erreurs d'écriture fichier
Solutions possibles :
- Vérifiez les permissions du dossier
- Créez manuellement dig_requests.txt s'il n'existe pas
- Vérifiez l'espace disque disponible

### Problème : Interface blanche
Solutions possibles :
- Vérifiez la console développeur du navigateur
- Vérifiez que tous les fichiers .jsx sont bien présents
- Réinitialisez le cache du navigateur

## Logs et Débogage

Les logs sont écrits dans :
- La console du navigateur pour les erreurs frontend
- dig_requests.txt pour l'historique des recherches

Pour activer les logs détaillés, ajoutez dans le fichier .env :
```
REACT_APP_DEBUG=true
```

## Support

Si vous rencontrez d'autres problèmes :
1. Vérifiez les Issues GitHub existantes
2. Consultez les logs d'erreur
3. Créez une nouvelle Issue avec :
   - Description détaillée du problème
   - Logs d'erreur
   - Étapes de reproduction
   - Environnement (OS, versions)