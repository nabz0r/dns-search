# DNS Search Tool

## Installation Rapide en Un Clic

```bash
curl -sSL https://raw.githubusercontent.com/nabz0r/dns-search/main/scripts/install.sh | bash
```

Ou si vous avez déjà cloné le repo :

```bash
./scripts/install.sh
```

## Prérequis Minimaux

- 512 MB RAM minimum
- 1 GB espace disque
- Ports 3000 et 3001 disponibles
- Droits d'administrateur pour l'installation de MongoDB

## Vérification de l'Environnement

Pour vérifier que votre système est prêt :

```bash
./scripts/check-environment.sh
```

## Structure du Projet

```
dns-search/
├── src/              # Code source frontend React
├── server/           # Serveur backend Node.js
├── scripts/          # Scripts d'installation et utilitaires
└── docs/             # Documentation détaillée
```

## Fonctionnalités

- Interface utilisateur intuitive style Google
- Recherche DNS rapide et mise en cache
- Historique des recherches
- Monitoring et logging

## Documentation Détaillée

- [Guide de Déploiement](docs/DEPLOYMENT.md)
- [Architecture de la BDD](docs/DATABASE.md)
- [Guide Développeur](docs/DEVELOPMENT.md)
- [API Reference](docs/API.md)

## Dépannage Rapide

Si l'installation échoue :

1. Vérifiez les logs dans `install.log`
2. Exécutez `./scripts/check-environment.sh`
3. Consultez la section troubleshooting dans [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Support

Si vous rencontrez des problèmes :

1. Vérifiez la [FAQ](docs/FAQ.md)
2. Consultez les [Issues GitHub](https://github.com/nabz0r/dns-search/issues)
3. Ouvrez une nouvelle issue avec les logs et détails

## Maintenance

Pour les mises à jour :

```bash
./scripts/update.sh
```

Pour nettoyer l'installation :

```bash
./scripts/cleanup.sh
```

## Licence

MIT