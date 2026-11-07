# Rider Backend (Cloudflare Worker)

API REST pour l'application rider.

## Endpoints

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Santé du service |
| GET | `/riders` | Liste des livreurs |
| GET | `/riders/:id` | Détail d'un livreur |
| GET | `/orders` | Liste des commandes |
| POST | `/orders/:id/assign` | Assigner un livreur (`{ "riderId": "r1" }`) |

## Déploiement

```bash
cd backend/worker
npx wrangler deploy
```

URL en production : https://food-delivery-rider-api.hounmetinjeremy.workers.dev
