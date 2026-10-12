/* ==========================================================
   Build & Launch — LES PROJETS (source unique)
   ----------------------------------------------------------
   Ajouter un projet :
     1. déposer ses captures dans src/projects/<id>/ (PNG, JPG ou WebP)
        - captures ordinateur en 1440 px de large (idéalement ×2)
        - captures mobile en 390 px de large (nom terminé par « -m »)
        - optionnel : une capture pleine page (nom terminé par « -full »)
          pour l'aperçu défilant au survol
     2. ajouter une entrée ci-dessous (l'ordre = l'ordre d'affichage)
     3. npm run build
   Champs utiles : featured (grande carte + fenêtre de la scène des projets),
   heroPhone (1 = téléphone de gauche, 2 = téléphone de droite), hero
   (notification FR/EN affichée à côté du projet dans la scène), points (3 atouts
   de la grande carte), url (facultatif : avec une adresse, le projet est « En
   ligne » avec un lien ; sans, il est « Démo sur demande »), anim (signature
   d'animation : rise, develop, zoom, spring, match, iris, curtain, scratch,
   door), acc (couleur d'accent), filter (ai, app, site).
   Retirer un projet : supprimer son entrée (et son dossier d'images).

   Ne jamais y mettre de code, d'identifiants, d'architecture ni de
   détails d'hébergement : uniquement ce qui sert à présenter le projet.
   ========================================================== */

export default [
  {
    id: 'club', name: 'Energy Connect', mono: 'EC.', acc: '#5FE33E', anim: 'iris', featured: true,
    filter: 'app', contactType: 'Web app',
    url: 'https://projet-energy-teams.netlify.app/', host: 'energyconnect.app',
    hero: { fr: 'Nouveau partenaire vérifié dans votre zone', en: 'New verified partner in your area' },
    images: {
      cover: 'home', mobile: 'home-m',
      gallery: [['home', 'Accueil', 'Home'], ['sec3', 'La plateforme', 'The platform'], ['sec9', 'Le manifeste', 'The manifesto'], ['home-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'SaaS · Mise en relation', chip: 'Rejoindre la plateforme',
      desc: 'La plateforme où apporteurs d’affaires, courtiers et entreprises de l’énergie se trouvent par zone et par métier, échangent en direct et signent leurs partenariats.',
      points: ['Recherche de partenaires par zone et par métier', 'Profils vérifiés et messagerie intégrée', 'Proposition de partenariat en une minute'],
      tagline: 'L’énergie se signe à deux.',
      challenge: 'Dans l’énergie, les bons partenariats naissent souvent par hasard : les apporteurs d’affaires et les entreprises peinent à se trouver, à se faire confiance et à formaliser leurs accords.',
      solution: 'Une plateforme qui réunit des profils vérifiés, les met en relation par zone et par métier, et permet de proposer un partenariat en une minute, d’échanger sans la quitter et de suivre chaque accord.',
      features: [['Recherche par zone et métier', 'Les bons partenaires, au bon endroit.'], ['Profils vérifiés', 'Des entreprises contrôlées pour travailler en confiance.'], ['Proposition en une minute', 'Commission, durée, conditions : tout est clair.'], ['Messagerie et Community', 'Échanger et suivre le fil d’affaires des pros.']],
      journey: ['Créer son compte gratuitement', 'Trouver des partenaires par zone', 'Proposer un partenariat', 'Échanger et signer'],
      goals: ['Des partenariats plus rapides', 'Une relation de confiance', 'Un réseau monétisé'],
      built: ['Conception UX/UI', 'Plateforme SaaS', 'Messagerie', 'Espace membres']
    },
    en: {
      cat: 'SaaS · Matchmaking', chip: 'Join the platform',
      desc: 'The platform where energy business introducers, brokers and companies find each other by area and trade, talk directly and sign partnerships.',
      points: ['Find partners by area and trade', 'Verified profiles and built-in messaging', 'Partnership proposal in one minute'],
      tagline: 'Energy deals are signed together.',
      challenge: 'In energy, good partnerships often happen by chance: introducers and companies struggle to find each other, build trust and formalize agreements.',
      solution: 'A platform that brings verified profiles together, matches them by area and trade, and lets you propose a partnership in a minute, talk without leaving it and track every agreement.',
      features: [['Search by area and trade', 'The right partners, in the right place.'], ['Verified profiles', 'Checked companies to work with confidence.'], ['Proposal in one minute', 'Commission, duration, terms: everything is clear.'], ['Messaging and Community', 'Talk and follow the pros’ business feed.']],
      journey: ['Create a free account', 'Find partners by area', 'Propose a partnership', 'Talk and sign'],
      goals: ['Faster partnerships', 'A relationship built on trust', 'A monetized network'],
      built: ['UX/UI design', 'SaaS platform', 'Messaging', 'Member area']
    }
  },

  {
    id: 'fit', name: 'FitTrack Pro', mono: 'Fit.', acc: '#14B8A6', anim: 'spring', heroPhone: 2,
    filter: 'app ai', contactType: 'Web app',
    url: 'https://fit-trackp.netlify.app/', host: 'fittrack.pro',
    hero: { fr: 'Objectif du jour atteint à 72 %', en: 'Daily goal 72% reached' },
    images: {
      cover: 'home', scroll: 'home-full', mobile: 'home-m',
      gallery: [['home', 'Accueil', 'Home'], ['sec1', 'Fonctionnalités', 'Features'], ['home-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'Sport · Nutrition · IA', chip: 'Démarrer la séance',
      desc: 'Le coach sport et nutrition qui s’adapte à chacun : séances sur mesure, journal alimentaire en un clic, santé connectée, coach IA et défis entre amis.',
      tagline: 'Bouge mieux, mange mieux, à ton rythme.',
      challenge: 'Entre l’application d’entraînement, le carnet de nutrition et le suivi du sommeil, tout est éparpillé — et la motivation s’essouffle.',
      solution: 'FitTrack Pro réunit séances adaptées, journal alimentaire, pas et sommeil synchronisés, et un coach IA qui accompagne chaque semaine, avec des défis entre amis pour rester motivé.',
      features: [['Séances sur mesure', 'Des programmes adaptés au niveau, au matériel et aux objectifs.'], ['Nutrition simple', 'Scanner, photo ou recherche : un repas noté en un clic.'], ['Coach IA', 'Un coach qui connaît la fiche et répond aux questions.'], ['Défis entre amis', 'Classements et objectifs partagés pour garder le rythme.']],
      journey: ['Remplir sa fiche en 3 minutes', 'Suivre sa séance du jour', 'Noter ses repas et son sommeil', 'Progresser avec le coach et ses amis'],
      goals: ['Tout le suivi dans une seule application', 'Une motivation entretenue par le jeu', 'Des progrès visibles'],
      built: ['Conception produit', 'Conception UX/UI', 'Application web & mobile', 'Coach IA']
    },
    en: {
      cat: 'Fitness · Nutrition · AI', chip: 'Start workout',
      desc: 'The fitness and nutrition coach that adapts to everyone: tailored workouts, one-tap food diary, connected health, AI coach and challenges with friends.',
      tagline: 'Move better, eat better, at your own pace.',
      challenge: 'Between the workout app, the food diary and sleep tracking, everything is scattered — and motivation fades.',
      solution: 'FitTrack Pro brings together tailored workouts, food diary, synced steps and sleep, and an AI coach that guides you every week, with challenges between friends to stay motivated.',
      features: [['Tailored workouts', 'Programs adapted to level, equipment and goals.'], ['Simple nutrition', 'Scan, photo or search: a meal logged in one tap.'], ['AI coach', 'A coach that knows your profile and answers questions.'], ['Challenges with friends', 'Leaderboards and shared goals to keep the pace.']],
      journey: ['Fill in your profile in 3 minutes', 'Follow today’s workout', 'Log meals and sleep', 'Progress with the coach and friends'],
      goals: ['All tracking in one app', 'Motivation through play', 'Visible progress'],
      built: ['Product design', 'UX/UI design', 'Web & mobile app', 'AI coach']
    }
  },

  {
    id: 'site', name: 'Vicken Mian', mono: 'VM.', acc: '#D6C7A1', anim: 'curtain', heroPhone: 1,
    filter: 'site', contactType: 'Site',
    url: 'https://portfoliovicken.netlify.app/en', host: 'vickenmian.com',
    hero: { fr: 'Nouvelle galerie en ligne : Paysage', en: 'New gallery online: Landscape' },
    images: {
      cover: 'home', scroll: 'work-full', mobile: 'home-m',
      gallery: [['home', 'Accueil', 'Home'], ['work', 'Travaux', 'Work'], ['gallery', 'Galerie', 'Gallery'], ['about', 'À propos', 'About'], ['work-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'Site vitrine · Photographe', chip: 'Visiter le site',
      desc: 'Le portfolio d’un photographe et réalisateur documentaire : chaque projet raconté comme un récit d’images et de texte, en français et en anglais.',
      tagline: 'Chaque projet est un récit fait d’images et de texte.',
      challenge: 'Présenter un travail de photographe et de réalisateur sans le réduire à une galerie d’images posées les unes à côté des autres, pour un public francophone comme anglophone.',
      solution: 'Un site vitrine sur-mesure au design éditorial : des récits immersifs pour chaque projet, des galeries par thème, une navigation fluide et un site bilingue rapide sur mobile comme sur ordinateur.',
      features: [['Récits immersifs', 'Chaque projet se lit comme une histoire.'], ['Galeries thématiques', 'Paysage, faune, culture : tout est classé.'], ['Bilingue FR / EN', 'Changement de langue instantané.'], ['Défilement fluide', 'Une navigation douce, pensée pour l’image.']],
      journey: ['Découvrir l’univers', 'Explorer les travaux', 'Parcourir les galeries', 'Prendre contact'],
      goals: ['Une image professionnelle', 'Une audience internationale', 'Mettre l’image au premier plan'],
      built: ['Direction artistique', 'Conception UX/UI', 'Site vitrine', 'Multilingue']
    },
    en: {
      cat: 'Website · Photographer', chip: 'Visit the site',
      desc: 'The portfolio of a documentary photographer and filmmaker: every project told as a story of images and text, in French and English.',
      tagline: 'Every project is a story told in images and words.',
      challenge: 'Showcasing a photographer’s and filmmaker’s work without reducing it to a grid of images, for both French- and English-speaking audiences.',
      solution: 'A custom editorial website: immersive stories for each project, themed galleries, smooth navigation and a fast bilingual site on mobile and desktop.',
      features: [['Immersive stories', 'Each project reads like a story.'], ['Themed galleries', 'Landscape, wildlife, culture: all organized.'], ['Bilingual FR / EN', 'Instant language switch.'], ['Smooth scrolling', 'Gentle navigation, designed for images.']],
      journey: ['Discover the universe', 'Explore the work', 'Browse the galleries', 'Get in touch'],
      goals: ['A professional image', 'An international audience', 'Putting images first'],
      built: ['Art direction', 'UX/UI design', 'Website', 'Multilingual']
    }
  },

  {
    id: 'edu', name: 'Oumma Learn', mono: 'OL.', acc: '#D9A03A', anim: 'zoom',
    filter: 'app', contactType: 'Web app',
    url: 'https://oumahh.netlify.app/', host: 'oummalearn.app',
    images: {
      cover: 'home', scroll: 'home-full', mobile: 'alphabet-m',
      gallery: [['home', 'Accueil', 'Home'], ['alphabet', 'L’alphabet', 'The alphabet'], ['progression', 'Progression', 'Progress'], ['jeux', 'Jeux', 'Games'], ['home-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'EdTech · PWA', chip: 'Commencer la leçon',
      desc: 'Une application pour apprendre à lire l’arabe et le Coran pas à pas : leçons avec audio, quiz interactifs, jeux de mémorisation et suivi de progression.',
      tagline: 'Apprendre à lire le Coran, pas à pas, partout.',
      challenge: 'Les débutants francophones manquent de ressources claires et progressives pour apprendre l’alphabet arabe : les contenus sont souvent denses, et on décroche vite.',
      solution: 'Une application installable sur téléphone, au parcours découpé en leçons courtes avec audio, des quiz et des jeux pour mémoriser, et une progression visible qui donne envie de revenir chaque jour.',
      features: [['Leçons progressives', 'De l’alphabet aux règles de lecture, une étape à la fois.'], ['Audio et prononciation', 'Chaque lettre s’écoute, et on peut s’entraîner à la prononcer.'], ['Quiz et jeux', 'Flashcards, quiz du jour et jeux de mémoire.'], ['Progression et séries', 'Objectifs quotidiens, badges et suivi des cours terminés.']],
      journey: ['Installer l’app depuis le navigateur', 'Suivre les leçons une à une', 'Mémoriser avec les quiz et les jeux', 'Revenir chaque jour pour sa série'],
      goals: ['Un apprentissage régulier', 'Une expérience fluide sur mobile', 'Aucune installation via un store'],
      built: ['Conception UX/UI', 'Application installable (PWA)', 'Gamification', 'Contenu pédagogique structuré']
    },
    en: {
      cat: 'EdTech · PWA', chip: 'Start the lesson',
      desc: 'An app to learn to read Arabic and the Quran step by step: lessons with audio, interactive quizzes, memory games and progress tracking.',
      tagline: 'Learn to read the Quran, step by step, anywhere.',
      challenge: 'French-speaking beginners lack clear, progressive resources to learn the Arabic alphabet: content is often dense, and people drop off fast.',
      solution: 'An app you can install on your phone, with a path split into short lessons with audio, quizzes and games to memorize, and visible progress that makes you want to come back every day.',
      features: [['Progressive lessons', 'From the alphabet to reading rules, one step at a time.'], ['Audio and pronunciation', 'Listen to every letter and practise pronouncing it.'], ['Quizzes and games', 'Flashcards, daily quiz and memory games.'], ['Progress and streaks', 'Daily goals, badges and completed courses.']],
      journey: ['Install the app from the browser', 'Follow the lessons one by one', 'Memorize with quizzes and games', 'Come back daily to keep the streak'],
      goals: ['Regular learning', 'A smooth mobile experience', 'No app store needed'],
      built: ['UX/UI design', 'Installable app (PWA)', 'Gamification', 'Structured learning content']
    }
  },

  {
    id: 'crm', name: 'Nexus CRM', mono: 'NX.', acc: '#A78BFA', anim: 'rise',
    filter: 'app ai', contactType: 'Web app',
    host: 'nexus-crm.app',
    images: {
      cover: 'pipeline', mobile: 'dashboard-m',
      gallery: [
        ['pipeline', 'Pipeline', 'Pipeline'],
        ['analytics', 'Analyses', 'Analytics'],
        ['energy', 'Marchés de l’énergie', 'Energy markets'],
        ['sec2', 'Fonctionnalités', 'Features'],
        ['dashboard-m', 'Mobile', 'Mobile']
      ]
    },
    fr: {
      cat: 'CRM · Énergie · IA', chip: 'Ouvrir le CRM',
      desc: 'Le CRM des courtiers en énergie : pipeline visuel, relances intelligentes, analyses, marchés de l’énergie en temps réel et un agent IA vocal qui dicte la prochaine action.',
      tagline: 'Le CRM énergie qui pense à votre place.',
      challenge: 'Les courtiers en énergie jonglent entre tableurs, e-mails et rappels pour suivre des centaines de prospects. Les relances s’oublient, les échéances passent et personne n’a de vue d’ensemble sur le pipeline.',
      solution: 'Un CRM pensé pour leur métier : un pipeline visuel noté en continu, des relances détectées automatiquement, des analyses claires, les cours de l’énergie en direct et un agent IA qu’on pilote à la voix pour savoir quoi faire ensuite.',
      features: [['Pipeline Kanban', 'Chaque affaire avance par glisser-déposer, avec un score de santé du pipeline.'], ['Agent IA vocal', 'On lui parle, il répond et propose la meilleure action suivante.'], ['Relances intelligentes', 'Les prospects inactifs et les leads chauds sont signalés automatiquement.'], ['Marchés & analyses', 'Électricité, gaz et indicateurs commerciaux en un coup d’œil.']],
      journey: ['Le brief du jour résume les priorités', 'Le pipeline montre les affaires à relancer', 'L’agent IA propose l’action suivante', 'Les analyses mesurent les résultats'],
      goals: ['Ne plus oublier aucune relance', 'Donner une vue claire du pipeline à toute l’équipe', 'Moins de saisie, plus de temps pour vendre'],
      built: ['Conception UX/UI', 'Application web', 'IA vocale', 'Tableaux de bord']
    },
    en: {
      cat: 'CRM · Energy · AI', chip: 'Open the CRM',
      desc: 'The CRM for energy brokers: visual pipeline, smart follow-ups, analytics, real-time energy markets and a voice AI agent that tells you the next best action.',
      tagline: 'The energy CRM that thinks for you.',
      challenge: 'Energy brokers juggle spreadsheets, emails and reminders to track hundreds of leads. Follow-ups get forgotten, deadlines slip and nobody has a clear view of the pipeline.',
      solution: 'A CRM built for their job: a continuously scored visual pipeline, automatically detected follow-ups, clear analytics, live energy prices and a voice-driven AI agent that tells you what to do next.',
      features: [['Kanban pipeline', 'Every deal moves by drag and drop, with a pipeline health score.'], ['Voice AI agent', 'Talk to it: it answers and suggests the next best action.'], ['Smart follow-ups', 'Inactive prospects and hot leads are flagged automatically.'], ['Markets & analytics', 'Electricity, gas and sales metrics at a glance.']],
      journey: ['The daily brief sums up priorities', 'The pipeline shows deals to follow up', 'The AI agent suggests the next action', 'Analytics measure the results'],
      goals: ['Never miss a follow-up again', 'Give the whole team a clear view of the pipeline', 'Less data entry, more time to sell'],
      built: ['UX/UI design', 'Web application', 'Voice AI', 'Dashboards']
    }
  },

  {
    id: 'ai', name: 'IA Hub', mono: 'IA.', acc: '#E4E4E7', anim: 'develop',
    filter: 'ai', contactType: 'IA',
    host: 'iahub.app',
    images: {
      cover: 'home', scroll: 'home-full', mobile: 'home-m',
      gallery: [['home', 'Accueil', 'Home'], ['sec2', 'Fonctionnalités', 'Features'], ['b2b', 'Espace développeur', 'Developer space'], ['home-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'Agent IA', chip: 'Lancer l’agent',
      desc: 'Un assistant IA tout-en-un pour le marketing, l’automatisation et la productivité : conversations, recherche, génération d’images et un espace pour connecter ses propres agents.',
      tagline: 'Des conversations intelligentes, propulsées par un assistant IA avancé.',
      challenge: 'Chat, recherche, rédaction, création de visuels : autant d’outils IA séparés et d’onglets ouverts. On perd du temps à passer de l’un à l’autre, sans vue d’ensemble.',
      solution: 'IA Hub réunit ces usages autour d’un assistant unique : on lui confie une tâche marketing, une recherche ou un visuel, et il la transforme en action concrète. Un espace dédié permet aux profils techniques de brancher leurs propres agents.',
      features: [['Assistant polyvalent', 'Marketing, automatisation, analyse, création, recherche : un seul point d’entrée.'], ['Orienté action', 'Les conversations deviennent des contenus et des tâches prêts à l’emploi.'], ['Génération d’images', 'Des visuels professionnels à partir d’une simple description.'], ['Espace développeur', 'Connecter ses propres agents, avec contrôle et visibilité.']],
      journey: ['Choisir un domaine', 'Décrire sa demande', 'L’assistant travaille', 'Récupérer un résultat prêt à l’emploi'],
      goals: ['Un seul outil au lieu de plusieurs', 'Une prise en main immédiate', 'Des résultats exploitables tout de suite'],
      built: ['Conception UX/UI', 'IA générative', 'Application web', 'Agent multi-fonctions']
    },
    en: {
      cat: 'AI agent', chip: 'Launch the agent',
      desc: 'An all-in-one AI assistant for marketing, automation and productivity: conversations, research, image generation and a space to connect your own agents.',
      tagline: 'Smart conversations, powered by an advanced AI assistant.',
      challenge: 'Chat, research, writing, visuals: so many separate AI tools and open tabs. Switching between them wastes time, with no overall view.',
      solution: 'IA Hub brings these uses together around a single assistant: give it a marketing task, research or a visual, and it turns it into concrete action. A dedicated space lets technical users plug in their own agents.',
      features: [['Versatile assistant', 'Marketing, automation, analysis, creation, research: one entry point.'], ['Action-oriented', 'Conversations become ready-to-use content and tasks.'], ['Image generation', 'Professional visuals from a simple description.'], ['Developer space', 'Connect your own agents, with control and visibility.']],
      journey: ['Pick a domain', 'Describe the request', 'The assistant gets to work', 'Get a ready-to-use result'],
      goals: ['One tool instead of many', 'Instant onboarding', 'Results you can use right away'],
      built: ['UX/UI design', 'Generative AI', 'Web application', 'Multi-purpose agent']
    }
  },

  {
    id: 'gift', name: 'Gratifia', mono: 'Gr.', acc: '#818CF8', anim: 'scratch',
    filter: 'app', contactType: 'Web app',
    host: 'gratifia.fr',
    images: {
      cover: 'home', scroll: 'home-full', mobile: 'gift-m',
      gallery: [['home', 'Accueil', 'Home'], ['dashboard', 'Tableau de bord', 'Dashboard'], ['wizard', 'Nouvelle campagne', 'New campaign'], ['gift', 'Cadeau gratté', 'Scratched gift'], ['demo', 'Mode présentation', 'Presentation mode'], ['gift-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'SaaS · Prospection', chip: 'Gratter la carte',
      desc: 'La machine à clients des indépendants et des TPE : des campagnes de prospection qui envoient un cadeau à gratter personnalisé et transforment les curieux en rendez-vous qualifiés.',
      tagline: 'Votre prochain client est à un grattage de vous.',
      challenge: 'Pour un artisan, un courtier ou une petite entreprise, trouver des clients prend un temps fou. L’e-mail de prospection classique finit à la corbeille, avec à peine 2 % de réponses.',
      solution: 'On décrit ce qu’on vend et qui on veut toucher : Gratifia trouve les entreprises du secteur, leur envoie un e-mail avec un vrai cadeau à gratter à leur nom, et le prospect décrit son besoin en réservant son cadeau. Le premier rendez-vous commence déjà qualifié.',
      features: [['Campagne en 3 étapes', 'Activité, cadeau, aperçu : la campagne est prête en quelques minutes.'], ['Carte à gratter', 'Une page cadeau personnalisée, à gratter du doigt ou à la souris.'], ['Prospects qualifiés', 'Pour réserver son cadeau, le prospect décrit son besoin.'], ['Suivi en direct', 'Envois, ouvertures, cartes grattées, rendez-vous : tout se suit en temps réel.']],
      journey: ['Décrire son activité et sa cible', 'Choisir le cadeau offert', 'Les prospects grattent et réservent', 'Les rendez-vous arrivent qualifiés'],
      goals: ['Remplir l’agenda sans démarcher', 'Se démarquer des e-mails de prospection', 'Mesurer le retour de chaque campagne'],
      built: ['Conception produit', 'Conception UX/UI', 'Application SaaS', 'Mode démonstration']
    },
    en: {
      cat: 'SaaS · Prospecting', chip: 'Scratch the card',
      desc: 'The client machine for freelancers and small businesses: prospecting campaigns that send a personalized scratch-off gift and turn curious prospects into qualified meetings.',
      tagline: 'Your next client is one scratch away.',
      challenge: 'For a tradesperson, a broker or a small business, finding clients takes forever. Classic cold emails end up in the bin, with barely 2% replies.',
      solution: 'Describe what you sell and who you want to reach: Gratifia finds businesses in the sector, sends them an email with a real scratch-off gift in their name, and prospects describe their needs when claiming it. The first meeting starts already qualified.',
      features: [['3-step campaign', 'Business, gift, preview: the campaign is ready in minutes.'], ['Scratch card', 'A personalized gift page to scratch with a finger or a mouse.'], ['Qualified prospects', 'To claim the gift, prospects describe their needs.'], ['Live tracking', 'Sends, opens, scratched cards, meetings: all tracked in real time.']],
      journey: ['Describe your business and target', 'Choose the gift', 'Prospects scratch and claim', 'Meetings arrive qualified'],
      goals: ['Fill the calendar without cold calling', 'Stand out from prospecting emails', 'Measure the return of every campaign'],
      built: ['Product design', 'UX/UI design', 'SaaS application', 'Demo mode']
    }
  },

  {
    id: 'match', name: 'EnergyMatch', mono: 'EM.', acc: '#F59E0B', anim: 'match',
    filter: 'ai app', contactType: 'IA',
    host: 'energymatch.app',
    images: {
      cover: 'home', scroll: 'home-full', mobile: 'wizard-m',
      gallery: [['home', 'Accueil', 'Home'], ['wizard', 'Qualification', 'Qualification'], ['dashboard', 'Espace courtier', 'Broker space'], ['sec4', 'Experts', 'Experts'], ['dashboard-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'Marketplace · IA', chip: 'Trouver un expert',
      desc: 'La marketplace qui met en relation clients et experts de l’énergie : brief en 3 minutes, analyse et mise en relation par IA, tableau de bord expert en temps réel.',
      tagline: 'Trouvez l’expert énergie qu’il vous faut.',
      challenge: 'Pour un professionnel, trouver le bon expert énergie prend du temps ; pour un courtier, les demandes arrivent incomplètes et difficiles à qualifier.',
      solution: 'Un parcours de qualification guidé côté client, une analyse par IA qui sélectionne les trois meilleurs experts, et un tableau de bord où chaque expert reçoit ses briefs en temps réel.',
      features: [['Brief guidé', 'Le besoin est décrit en quelques étapes simples.'], ['Mise en relation par IA', 'Les experts les plus pertinents sont sélectionnés et notés.'], ['Experts vérifiés', 'Certifications et historique contrôlés.'], ['Tableau de bord', 'Les nouveaux briefs arrivent en temps réel.']],
      journey: ['Le client décrit son projet', 'L’IA analyse et sélectionne', 'Les meilleurs experts sont proposés', 'L’expert reprend le brief'],
      goals: ['Des demandes complètes dès le départ', 'Moins d’allers-retours', 'Une mise en relation plus rapide'],
      built: ['Conception UX/UI', 'Marketplace', 'IA appliquée', 'Tableau de bord temps réel']
    },
    en: {
      cat: 'Marketplace · AI', chip: 'Find an expert',
      desc: 'The marketplace connecting clients with energy experts: a brief in 3 minutes, AI analysis and matching, and a real-time expert dashboard.',
      tagline: 'Find the energy expert you need.',
      challenge: 'For a business, finding the right energy expert takes time; for a broker, requests arrive incomplete and hard to qualify.',
      solution: 'A guided qualification flow for clients, an AI analysis that picks the three best experts, and a dashboard where each expert receives briefs in real time.',
      features: [['Guided brief', 'The need is described in a few simple steps.'], ['AI matching', 'The most relevant experts are selected and scored.'], ['Verified experts', 'Certifications and track record checked.'], ['Dashboard', 'New briefs arrive in real time.']],
      journey: ['The client describes the project', 'AI analyzes and selects', 'The best experts are suggested', 'The expert picks up the brief'],
      goals: ['Complete requests from the start', 'Fewer back-and-forths', 'Faster matching'],
      built: ['UX/UI design', 'Marketplace', 'Applied AI', 'Real-time dashboard']
    }
  },

  {
    id: 'expulse', name: 'Expulse Express', mono: 'EE.', acc: '#EE6A1F', anim: 'door',
    filter: 'site', contactType: 'Site',
    host: 'expulse-express.fr',
    images: {
      cover: 'home', scroll: 'home-full', mobile: 'home-m',
      gallery: [['home', 'Accueil', 'Home'], ['solutions', 'Solutions', 'Solutions'], ['services', 'Services', 'Services'], ['diagnostic', 'Diagnostic gratuit', 'Free assessment'], ['methode', 'Méthode', 'Method'], ['diagnostic-m', 'Mobile', 'Mobile']]
    },
    fr: {
      cat: 'Site vitrine · Immobilier', chip: 'Ouvrir la porte',
      desc: 'Le site d’une société qui accompagne les propriétaires face aux loyers impayés et aux squats : solutions expliquées pas à pas, diagnostic gratuit en quatre étapes et guides pratiques.',
      tagline: 'Reprenez possession de votre logement, rapidement et légalement.',
      challenge: 'Un propriétaire face à un loyer impayé ou à un squat est souvent perdu et pressé. Il doit comprendre sa situation, faire confiance et prendre contact rapidement.',
      solution: 'Un site éditorial sobre et rassurant : chaque situation a sa page avec les étapes, les délais et les erreurs à éviter, un diagnostic gratuit guide le visiteur en quatre étapes, et des illustrations sur mesure racontent chaque situation.',
      features: [['Solutions par situation', 'Loyers impayés, squat, occupant sans droit, procédure bloquée.'], ['Diagnostic en 4 étapes', 'Un formulaire guidé, clair et rassurant, pensé pour le mobile.'], ['Guides et FAQ', 'Des ressources pratiques et une FAQ avec recherche.'], ['Rapide et accessible', 'Site statique, sans cookie ni traceur, très bien noté par Lighthouse.']],
      journey: ['Trouver sa situation', 'Comprendre la procédure', 'Faire son diagnostic gratuit', 'Être rappelé sous 24 heures'],
      goals: ['Inspirer confiance dès la première visite', 'Transformer les visites en demandes', 'Être bien référencé sur chaque situation'],
      built: ['Direction artistique', 'Conception UX/UI', 'Site vitrine', 'Illustrations sur mesure']
    },
    en: {
      cat: 'Website · Real estate', chip: 'Open the door',
      desc: 'The website of a company helping landlords with unpaid rent and squatters: solutions explained step by step, a free 4-step assessment and practical guides.',
      tagline: 'Get your property back, quickly and legally.',
      challenge: 'A landlord facing unpaid rent or squatters is often lost and in a hurry. They need to understand their situation, trust the company and get in touch quickly.',
      solution: 'A calm, reassuring editorial website: each situation has its own page with steps, timelines and mistakes to avoid, a free assessment guides visitors in four steps, and custom illustrations tell each story.',
      features: [['Solutions by situation', 'Unpaid rent, squatters, occupants without rights, blocked procedures.'], ['4-step assessment', 'A clear, reassuring guided form, designed for mobile.'], ['Guides and FAQ', 'Practical resources and a searchable FAQ.'], ['Fast and accessible', 'Static site, no cookies or trackers, top Lighthouse scores.']],
      journey: ['Find your situation', 'Understand the procedure', 'Take the free assessment', 'Get a call back within 24 hours'],
      goals: ['Build trust from the first visit', 'Turn visits into requests', 'Rank well for each situation'],
      built: ['Art direction', 'UX/UI design', 'Website', 'Custom illustrations']
    }
  }
];
