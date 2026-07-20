# Sneaker Manager for Mettasneakers — Frontend 👟

Interface Angular pour la gestion d'une boutique de sneakers.

## Stack technique

- Angular 17+
- TypeScript
- JWT Authentication
- HttpClient

## Pages

| Page | Accès | Description |
|------|-------|-------------|
| Login | Public | Connexion avec JWT |
| Produits | Authentifié | Liste, ajout, modification, suppression |
| Ventes | Authentifié | Enregistrer et historique des ventes |
| Planning | Authentifié | Emploi du temps des employés |
| Dashboard | Admin | Stats trésorerie et ventes |
| Dépenses | Admin | Gestion des charges |

## Installation

```bash
npm install
ng serve
```

L'app tourne sur `http://localhost:4200`

## Backend

API Spring Boot disponible sur [sneaker-api](https://github.com/Fran6-Dev/sneaker-api)

## Fonctionnalités

- Auth JWT avec guard sur toutes les routes
- Rôles ADMIN/USER — liens admin masqués pour les utilisateurs simples
- CRUD produits avec filtre par catégorie (SNEAKER, VETEMENT, ACCESSOIRE)
- Gestion des ventes avec décrémentation automatique du stock
- Dashboard trésorerie (chiffre d'affaires, dépenses, bénéfice)
- Emploi du temps hebdomadaire