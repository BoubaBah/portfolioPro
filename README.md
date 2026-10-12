# Build & Launch — site vitrine

Site du studio **Build & Launch** : applications IA, automatisation et produits web.
Il présente uniquement l'offre : services, réalisations, méthode, garanties, FAQ et contact
(aucun nom ni parcours personnel).

## Structure
```
index.html          page unique (FR par défaut, bouton FR/EN)
merci.html          page de confirmation après envoi du formulaire
assets/styles.css   styles (palette issue du logo)
assets/main.js      interactions + traductions anglaises (objet EN)
assets/fonts/       polices auto-hébergées (Plus Jakarta Sans, JetBrains Mono)
assets/logo*.png    logo détouré, symbole BL, favicon, image de partage
```

Aucune dépendance, aucun build : c'est du HTML/CSS/JS statique.

## Mise en ligne (Netlify, recommandé)
1. Sur Netlify : *Add new site → Import an existing project* → choisir ce dépôt.
2. Build command : vide — Publish directory : `/` (racine).
3. Le formulaire de contact fonctionne automatiquement grâce à **Netlify Forms**
   (`data-netlify="true"`) : les demandes arrivent dans *Site → Forms*. Activer les
   notifications e-mail dans *Forms → Form notifications* pour les recevoir par e-mail.

Sur un autre hébergeur (GitHub Pages, Vercel…), le formulaire doit être relié à un
service comme Formspree : remplacer l'attribut `action` du `<form>`.

## Modifier le contenu
- Textes français : directement dans `index.html`.
- Textes anglais : objet `EN` dans `assets/main.js` (même clé `data-i18n`).
- Ajouter un projet : dupliquer un bloc `<article class="proj">` dans la section
  `#realisations` ; `data-cat` accepte `ai`, `app`, `site` (plusieurs séparés par un espace).

## Aperçu local
```bash
npx serve .   # puis http://localhost:3000
```
