# DNS Search Tool

Application de recherche DNS avec stockage des résultats.

## Installation Rapide

1. Clonez le repository :
```bash
git clone https://github.com/nabz0r/dns-search.git
cd dns-search
```

2. Installez les dépendances du frontend :
```bash
npm install
```

3. Installez les dépendances du backend :
```bash
cd server
npm install
cd ..
```

4. Créez les fichiers de configuration :
```bash
cp .env.example .env
cd server
cp .env.example .env
cd ..
```

5. Démarrez l'application en mode développement :
```bash
npm run dev
```

L'application sera disponible sur http://localhost:3000
L'API sera disponible sur http://localhost:3001

Consultez le dossier docs/ pour plus d'informations sur le déploiement et la configuration.