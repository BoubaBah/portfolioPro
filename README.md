# Build & Launch — site vitrine

Site du studio **Build & Launch** : applications IA, automatisation et produits web.
Il présente uniquement l'offre : services, réalisations, méthode, garanties, FAQ et contact
(aucun nom ni parcours personnel).

Le style suit **[DESIGN.md](DESIGN.md)** (« Mercury — alpine banking at blue hour ») :
canevas onyx `#171721`, cartes graphite `#1e1e2a` plates (sans ombre), texte ivoire,
une seule couleur d'action — le cobalt `#5266eb` — réservée à « Démarrer un projet »,
titres en graisse 480 avec interlettrage positif, contrôles en pilules, hero photographique
pleine page qui zoome au défilement.

## Structure
```
index.html              page unique (FR par défaut, bouton FR/EN)
merci.html              confirmation après envoi du formulaire
src/projects.mjs        SOURCE des projets : textes FR/EN, couleur, animation, captures
src/projects/<id>/      captures d'origine de chaque projet (PNG, JPG ou WebP)
scripts/build-projects.mjs  génère images, cartes, scène du hero et défilé d'écrans
src/input.css           SOURCE des styles : Tailwind v4 + @theme (tokens du DESIGN.md)
assets/styles.css       CSS compilé (généré — ne pas modifier à la main)
assets/projects/        captures optimisées (générées : WebP en plusieurs largeurs)
assets/projects-data.js fiches projets + traductions EN des cartes (généré)
assets/main.js          navigation, formulaires, filtres, vidéo, traductions (objet EN)
assets/projects.js      cartes et fiches projets (galerie, ouverture animée, lien direct)
assets/fx.js            effets : défilement doux, zoom du hero, titres révélés, compteurs…
assets/vendor/lenis.min.js  défilement doux (Lenis 1.3.26)
assets/fonts/           Inter + Archivo étendu figé en 480 / 112 %, auto-hébergées
assets/img/             paysages « heure bleue » : WebP 960 / 1600 / 2400 px + JPG de repli
assets/video/           vidéo de présentation 45 s (FR / EN) en MP4 + WebM, images d'aperçu
brand/                  logos haute définition (non chargés par le site)
netlify.toml            cache des polices / images et en-têtes de sécurité
DESIGN.md               référence de style
```

## Développement
```bash
npm install        # Tailwind v4 (CLI), sharp (images), Lenis
npm run dev        # recompile assets/styles.css à chaque modification
npm run projects   # régénère images, cartes et données des projets
npm run build      # projets + CSS minifié, avant de committer
npx serve .        # aperçu sur http://localhost:3000
```
Tout ce qui est généré est versionné : l'hébergement n'a besoin d'aucune étape de build.

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

## Animations
Ordre de la page : **besoins** (dans le hero) → **expertise** (studio, chiffres, services,
outils, ce que nous apportons) → **réalisations** → démonstration, vidéo, méthode, FAQ, contact.
- **Hero / besoins** : le décor apparaît en zoom arrière, le titre sort ligne par ligne ; au
  défilement, la section reste à l'écran, le décor zoome et s'assombrit, le texte s'efface et
  les quatre besoins arrivent un à un en zigzag (1 en haut à gauche, 2 à droite…), en 3D, reliés
  par une ligne bleue qui se dessine. Chaque besoin joue sa petite animation et propose un
  exemple qui ouvre la fiche du projet. Sur mobile, les cartes s'empilent et la scène les suit.
  Textes des besoins : directement dans `index.html` (section `#top`, clés `need.*`).
- **Réalisations** : même principe — la fenêtre du projet vedette monte en se redressant,
  rejointe par deux téléphones ; chaque projet affiche sa notification et ouvre sa fiche au clic.
- **« Build & Launch »** : le bleu du logo monte dans le nom en descendant la page et redescend
  en remontant ; le grand logotype du pied de page se remplit à son arrivée.
- **Page** : défilement doux à la souris (Lenis), titres révélés mot à mot, texte du studio qui
  s'allume au défilement, compteurs, défilé des outils, défilé d'écrans qui accélère avec le
  défilement, carte vidéo qui s'ouvre, parallaxe du décor de contact, ligne de progression
  de la méthode, FAQ animée, cartes inclinables et boutons magnétiques (souris uniquement),
  menu mobile plein écran, grand logotype en pied de page.
- **Projets** : chaque carte a sa signature d'apparition (`rise`, `develop`, `zoom`, `spring`,
  `match`, `iris`, `curtain`, `scratch`, `door`), reprise à l'ouverture de sa fiche. Au survol, la page complète
  défile dans la fenêtre ; sur mobile, l'aperçu se joue tout seul quand la carte est à l'écran.
- Si l'utilisateur demande à réduire les animations (réglage du système), tout est désactivé
  et la page reste complète et lisible.

## Performance (mesurée avec Lighthouse, fichiers compressés comme sur Netlify)
Mobile 99, ordinateur 100 ; accessibilité, bonnes pratiques et SEO à 100.
≈ 225 Ko au premier chargement sur mobile, aucun décalage de mise en page, défilement à
60 images/s sur mobile (processeur ralenti ×4). Les captures des projets ne se chargent
qu'à l'approche, l'aperçu défilant uniquement au survol ou quand la carte est visible.
- **Remplacer une image de fond** : fournir les mêmes variantes (`nom-960.webp`,
  `nom-1600.webp`, `nom-2400.webp`, `nom-1600.jpg`), par exemple avec squoosh.app.
- **Police des titres** : figée en graisse 480 / largeur 112 % pour peser 14 Ko.

## Vidéo de présentation
Section « Le studio en 45 secondes » + lien « Voir la vidéo » dans le haut de page.
Version française ou anglaise selon la langue affichée ; rien n'est téléchargé avant le
clic sur lecture. Édition Build & Launch : aucun nom ni parcours, uniquement le studio.
Sources de l'animation : dépôt NewPortfolio, dossier `video/source-buildlaunch/`.

## Avant la mise en ligne
- Remplacer `content="assets/og-image.jpg"` (balise `og:image` dans `index.html`) par l'URL
  **absolue** du site (ex. `https://votre-domaine.fr/assets/og-image.jpg`) : LinkedIn, WhatsApp
  ou Facebook n'affichent pas l'aperçu avec un chemin relatif.

## Modifier le contenu
- Textes français : directement dans `index.html`.
- Textes anglais : objet `EN` dans `assets/main.js` (même clé `data-i18n`).
- **Projets** : tout se passe dans `src/projects.mjs` (l'ordre du fichier = l'ordre affiché).
  Liens directs partageables : `/#projet-<id>` (ex. `#projet-crm`).
- **Ajouter un projet** :
  1. créer `src/projects/<id>/` et y déposer les captures : ordinateur en 1440 px de large
     (idéalement ×2, format 16:10), mobile en 390 px de large avec un nom finissant par `-m`,
     et si possible une capture pleine page finissant par `-full` pour l'aperçu défilant ;
  2. ajouter une entrée dans `src/projects.mjs` (copier un projet existant : textes FR/EN,
     couleur `acc`, monogramme, animation, catégories `filter` parmi `ai`, `app`, `site`) ;
  3. `npm run build`, puis committer.
- **Retirer un projet** : supprimer son entrée dans `src/projects.mjs` et son dossier dans
  `src/projects/`, puis `npm run build` (les images devenues inutiles sont supprimées).
- **Projet vedette / hero** : `featured: true` (grande carte + fenêtre du hero),
  `heroPhone: true` sur deux projets pour les téléphones du hero. Les trois projets du hero
  ouvrent leur fiche au clic ; le champ `hero` (FR/EN) donne la notification affichée à côté
  de chacun quand il apparaît.
- **Lien « Voir en ligne »** : champ `url`, facultatif. Sans adresse, la carte et la fiche
  n'affichent pas de lien (c'est le cas de Gratifia et d'Expulse Express pour l'instant).
- Les captures montrent les produits avec des données de démonstration : n'y mettez jamais
  de code, d'architecture, d'identifiants, de vraies données clients ni de détails
  d'hébergement (évitez par exemple les pages de connexion ou de contact).
- Après tout ajout de classes Tailwind : `npm run build`.
