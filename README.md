# paletiste-API

![Static Badge](https://img.shields.io/badge/Node%20JS-6DA55F?style=flat&logo=nodedotjs&logoColor=white)
![Static Badge](https://img.shields.io/badge/Express-404D59?logo=express&logoColor=%2361DAFB)
![Static Badge](https://img.shields.io/badge/Postgres-316192?logo=postgresql&logoColor=white)
![Static Badge](https://img.shields.io/badge/License-custom-yellow)

## 📋Présentation du projet

Palétiste est une plateforme communautaire dédiée aux passionnés de palet. fini de devoir faire défiler des pages Facebook pendant de longues minutes pour être informé des concours du coin. En quelques clics, filtrez votre recherche pour trouver l’événement qui vous tente ce week-end, et publiez le vôtre pour rassembler un maximum de joueurs.

Un site simple, intuitif, accessible, pour ne plus manquer aucun concours de palet — pour tous les fans, de 7 à 87 ans !

## 🚀 Mettre en place l'environnement de travail

### Installer les dépendances

```bash
# Installer les dépendances
npm install
```

### Mettre en place les variables d'environnement

```bash
cp .env.example .env
```

### Mettre en place la base de données

```bash
# Créer la base de données
npm run db:create

# Charger les données présentes dans le fichier de seed
npm run db:seed
```

## 🧾 Documentation de l'API

Une documentation Swagger est consultable sur l'URL `/docs`

### En serveur local

1. Démarrer l'API à l'aide de la commande `npm run dev`.

2. Dans votre navigateur, rendez-vous sur l'adresse `http://localhost:3000/docs`

### En ligne depuis ???

Sinon, la documentation Swagger est disponible [ici]()

## 📄 Licence

Ce projet est sous [licence personnalisés](./LICENSE)

## 👥 Auteurs

- [Mickaël Bourdet](https://github.com/Mickael-Bourdet)
