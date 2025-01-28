# DNS Search Tool

Outil de recherche DNS avec stockage des résultats dans MongoDB et interface moderne.

## Installation One-Click

```bash
./install.sh
```

Ou manuellement :

1. Prérequis :
   ```bash
   # Vérifiez que vous avez node >= 16 et npm >= 8
   node -v
   npm -v
   ```

2. Installation :
   ```bash
   git clone https://github.com/nabz0r/dns-search.git
   cd dns-search
   npm install
   cd server && npm install && cd ..
   ```

3. Configuration :
   ```bash
   cp .env.example .env
   cd server && cp .env.example .env && cd ..
   ```

4. Démarrage :
   ```bash
   npm run dev
   ```

L'application est disponible sur http://localhost:3000

## Architecture

```
dns-search/
├── frontend/          # React avec Tailwind
├── server/           # Express + MongoDB
├── docs/             # Documentation
└── scripts/          # Scripts d'automation
```

## Documentation

- [Guide de Déploiement](docs/DEPLOYMENT.md)
- [Guide de Développement](docs/DEVELOPMENT.md)
- [Architecture de la BDD](docs/DATABASE.md)
- [API Reference](docs/API.md)

## Roadmap

- [ ] Cache DNS intelligent
- [ ] Interface d'administration
- [ ] Support multi-utilisateurs
- [ ] Export des données
- [ ] Statistiques avancées