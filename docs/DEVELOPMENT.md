# Guide de Développement

## Environnement

### Installation des Outils

1. Node.js (v16+)
2. MongoDB
3. IDE recommandé : VS Code

### Extensions VS Code Recommandées

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

## Standards de Code

### Frontend

- React Hooks uniquement
- Tailwind pour le style
- TypeScript recommandé

### Backend

- Express avec async/await
- Validation avec Joi
- Winston pour les logs

## Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## CI/CD

### GitHub Actions

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm test
```

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing`)
3. Commit les changements (`git commit -m 'Add feature'`)
4. Push la branche (`git push origin feature/amazing`)
5. Ouvrir une Pull Request