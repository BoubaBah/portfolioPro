# Build & Launch — site vitrine

Site du studio **Build & Launch** : applications IA, automatisation et produits web.
Il présente uniquement l'offre : services, réalisations, méthode, garanties, FAQ et contact
(aucun nom ni parcours personnel).

Le style suit **[DESIGN.md](DESIGN.md)** (« Mercury — alpine banking at blue hour ») :
canevas onyx `#171721`, cartes graphite `#1e1e2a` plates (sans ombre), texte ivoire,
une seule couleur d'action — le cobalt `#5266eb` — réservée à « Démarrer un projet »,
titres en graisse 480 avec interlettrage positif, contrôles en pilules, hero photographique
pleine page.

## Structure
```
index.html            page unique (FR par défaut, bouton FR/EN)
merci.html            confirmation après envoi du formulaire
src/input.css         SOURCE des styles : Tailwind v4 + @theme (tokens du DESIGN.md)
assets/styles.css     CSS compilé (généré — ne pas modifier à la main)
assets/main.js        interactions + traductions anglaises (objet EN)
assets/fonts/         Inter (substitut d'« arcadia ») + Archivo étendu figé en 480 / 112 %
                      (substitut d'« arcadiaDisplay »), auto-hébergées
assets/img/           paysages « heure bleue » : WebP 960 / 1600 / 2400 px + JPG 1600 de repli,
                      miniatures *-thumb.webp pour les maquettes
assets/logo-mark-96.png, favicon-64.png, apple-touch-icon.png, og-image.jpg
brand/                logos haute définition (non chargés par le site)
netlify.toml          cache des polices / images et en-têtes de sécurité
DESIGN.md             référence de style
```

## Développement
```bash
npm install        # Tailwind v4 (CLI)
npm run dev        # recompile assets/styles.css à chaque modification
npm run build      # compilation minifiée avant de committer
npx serve .        # aperçu sur http://localhost:3000
```
Le CSS compilé est versionné : l'hébergement n'a besoin d'aucune étape de build.

### Tokens
Les tokens du thème (`src/input.css`, bloc `@theme`) génèrent les classes Tailwind :
`bg-onyx-canvas`, `bg-graphite-card`, `text-ivory-text`, `text-ash-text`, `bg-cobalt`,
`text-display`, `text-heading-lg`, `font-w480`, `rounded-3xl` (32 px), `rounded-3xl-2` (40 px)…
Attention : l'échelle d'espacement est en pixels (`p-32` = 32 px, `py-112` = 112 px).

Si vous obtenez les polices d'origine (arcadia / arcadiaDisplay), déclarez-les avec
`@font-face` sous ces noms : elles prendront automatiquement le pas sur les substituts.

## Mise en ligne (Netlify, recommandé)
1. *Add new site → Import an existing project* → choisir ce dépôt.
2. Build command : vide — Publish directory : `/` (racine).
3. Le formulaire fonctionne avec **Netlify Forms** (`data-netlify="true"`) : les demandes
   arrivent dans *Site → Forms* ; activer les notifications e-mail dans
   *Forms → Form notifications*.

Sur un autre hébergeur, relier le formulaire à un service comme Formspree
(attribut `action` du `<form name="contact">`).

## Performance (mesurée avec Lighthouse)
Mobile et ordinateur : 99–100 en performance, accessibilité, bonnes pratiques et SEO.
Page d'accueil ≈ 120 Ko au premier chargement sur mobile, aucun décalage de mise en page,
défilement à 60 images/s. Pour garder ces résultats :
- **Remplacer une image de fond** : fournir les mêmes variantes (`nom-960.webp`,
  `nom-1600.webp`, `nom-2400.webp`, `nom-1600.jpg`), par exemple avec squoosh.app.
- **Police des titres** : figée en graisse 480 / largeur 112 % pour peser 14 Ko. Pour d'autres
  graisses, reprendre la version variable d'Archivo (Google Fonts).

## Avant la mise en ligne
- Remplacer `content="assets/og-image.jpg"` (balise `og:image` dans `index.html`) par l'URL
  **absolue** du site (ex. `https://votre-domaine.fr/assets/og-image.jpg`) : LinkedIn, WhatsApp
  ou Facebook n'affichent pas l'aperçu avec un chemin relatif.

## Modifier le contenu
- Textes français : directement dans `index.html`.
- Textes anglais : objet `EN` dans `assets/main.js` (même clé `data-i18n`).
- Ajouter un projet : dupliquer un `<article class="proj …">` dans `#realisations` ;
  `data-cat` accepte `ai`, `app`, `site` (plusieurs séparés par un espace).
- Après tout ajout de classes Tailwind : `npm run build`.
