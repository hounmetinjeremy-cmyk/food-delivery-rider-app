# MeGo Rider — Tableau de bord

Interface statique (Cloudflare Pages) branchee directement sur Supabase via l'API REST.

## Configuration

Dans `config.js` :

- `SUPABASE_URL` : URL du projet Supabase
- `SUPABASE_KEY` : cle **publishable / anon** (publique, protegee par les policies RLS)

## Deploiement

Cloudflare Pages, dossier de sortie `rider-dashboard`, aucune commande de build.
