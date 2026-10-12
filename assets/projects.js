/* Build & Launch — fiches projets
   Chaque projet a sa propre identité : couleur, monogramme, étiquette de clic,
   animation d'ouverture et trois écrans d'aperçu.
   Les aperçus sont des illustrations (données fictives) : aucun code, aucune
   architecture ni aucun détail de mise en production n'est exposé ici. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;
  function L() { return html.lang === 'en' ? 'en' : 'fr'; }

  /* ---------- libellés de l'interface ---------- */
  var UI = {
    fr: {
      preview: 'Aperçu du projet', note: 'Aperçus d’interface illustratifs, avec des données fictives.',
      challenge: 'Le défi', solution: 'La solution', features: 'Fonctionnalités clés', journey: 'Parcours utilisateur',
      goals: 'Pensé pour', built: 'Ce que nous avons conçu', live: 'Voir en ligne', demo: 'Voir la démo',
      similar: 'Un projet similaire ? Parlons-en', close: 'Fermer', prev: 'Projet précédent', next: 'Projet suivant',
      statusLive: 'En ligne', statusDev: 'En développement',
      prefill: 'Bonjour, je souhaiterais un projet similaire à {name}. '
    },
    en: {
      preview: 'Project preview', note: 'Illustrative interface previews with sample data.',
      challenge: 'The challenge', solution: 'The solution', features: 'Key features', journey: 'User journey',
      goals: 'Designed for', built: 'What we built', live: 'View live', demo: 'View demo',
      similar: 'Want something similar? Let’s talk', close: 'Close', prev: 'Previous project', next: 'Next project',
      statusLive: 'Live', statusDev: 'In development',
      prefill: 'Hello, I’d like a project similar to {name}. '
    }
  };

  /* ---------- briques d'interface des aperçus ---------- */
  function lines(ws) { return ws.map(function (w) { return '<i style="width:' + w + '%"></i>'; }).join(''); }
  var SB = '<div class="sb"><i class="a"></i><i></i><i></i><i></i><i></i></div>';

  /* ---------- projets ---------- */
  var P = {
    crm: {
      name: 'CRM Power', mono: 'CRM.', acc: '#F5B83D', anim: 'rise', live: true, type: 'Web app',
      url: 'https://crmpower.netlify.app/', host: 'crmpower.app',
      screens: [
        { fr: 'Tableau de bord', en: 'Dashboard', html:
          '<div class="ui">' + SB + '<div class="col"><div class="row"><div class="kc"><s>Prospects</s><b>1 284</b></div><div class="kc"><s>Contrats actifs</s><b>342</b></div><div class="kc"><s>Relances auto</s><b class="acc">96%</b></div><div class="kc"><s>Échéances 30 j</s><b>18</b></div></div>' +
          '<div class="row grow"><div class="panel"><s>Pipeline</s><div class="bars"><i style="height:40%"></i><i style="height:62%"></i><i style="height:48%"></i><i style="height:80%"></i><i style="height:66%"></i><i class="a" style="height:92%"></i><i style="height:74%"></i><i style="height:58%"></i></div></div>' +
          '<div class="panel list" style="flex:.8"><s>Activité récente</s><p><u></u><i></i><em class="a">Signé</em></p><p><u></u><i></i><em>Relancé</em></p><p><u></u><i></i><em>Nouveau</em></p><p><u></u><i></i><em class="a">Signé</em></p><p><u></u><i></i><em>Relancé</em></p></div></div></div></div>' },
        { fr: 'Prospects', en: 'Leads', html:
          '<div class="ui">' + SB + '<div class="col"><div class="row"><div class="fld" style="flex:1">Rechercher un prospect…</div><em class="a">Tous</em><em>Chauds</em><em>À relancer</em></div>' +
          '<div class="panel tbl" style="--cols:2.2fr 1.4fr 1fr 1fr"><p class="h"><span>Société</span><span>Contact</span><span>Statut</span><span>Échéance</span></p>' +
          '<p><span>Boulangerie Martin</span><span>C. Martin</span><span><em class="a">Signé</em></span><span>12/09</span></p>' +
          '<p><span>Hôtel du Lac</span><span>S. Bernard</span><span><em>Relancé</em></span><span>03/10</span></p>' +
          '<p><span>Garage Dupuis</span><span>M. Dupuis</span><span><em>Nouveau</em></span><span>—</span></p>' +
          '<p><span>Pharmacie Centrale</span><span>A. Roux</span><span><em class="a">Signé</em></span><span>21/11</span></p>' +
          '<p><span>Imprimerie Lambert</span><span>J. Lambert</span><span><em>Relancé</em></span><span>08/12</span></p>' +
          '<p><span>Ferme des Collines</span><span>P. Morel</span><span><em>Nouveau</em></span><span>—</span></p></div></div></div>' },
        { fr: 'Relances', en: 'Follow-ups', html:
          '<div class="ui">' + SB + '<div class="col"><div class="row grow"><div class="panel tl"><s>Scénario de relance</s>' +
          '<p><b>J0</b><span>E-mail de bienvenue personnalisé</span><i class="tog"></i></p>' +
          '<p><b>J+3</b><span>Relance avec proposition</span><i class="tog"></i></p>' +
          '<p><b>J+7</b><span>Rappel téléphonique planifié</span><i class="tog"></i></p>' +
          '<p><b>J−30</b><span>Alerte avant échéance du contrat</span><i class="tog"></i></p>' +
          '<p><b>J−7</b><span>Proposition de renouvellement</span><i class="tog off"></i></p></div>' +
          '<div class="col" style="flex:.6"><div class="kc"><s>Relances envoyées</s><b>128</b></div><div class="kc"><s>Réponses</s><b class="acc">34 %</b></div><div class="kc"><s>Rendez-vous</s><b>21</b></div></div></div></div></div>' }
      ],
      fr: {
        cat: 'CRM · Énergie', chip: 'Ouvrir le CRM',
        tagline: 'Le CRM qui fait gagner du temps aux courtiers en énergie.',
        challenge: 'Les courtiers en énergie jonglent entre tableurs, e-mails et rappels pour suivre des centaines de prospects et de contrats. Les relances s’oublient, les échéances passent, et personne n’a de vue d’ensemble.',
        solution: 'Un CRM pensé pour leur métier : prospects et contrats réunis au même endroit, des relances qui partent automatiquement au bon moment, et un tableau de bord qui montre en un coup d’œil où en est l’équipe.',
        features: [['Pipeline visuel', 'Chaque prospect avance d’étape en étape, de « Nouveau » à « Signé ».'], ['Relances automatisées', 'E-mails et rappels programmés selon le statut de chaque prospect.'], ['Suivi des contrats', 'Échéances et renouvellements centralisés, avec alertes.'], ['Tableau de bord', 'Les indicateurs clés de l’équipe commerciale, en temps réel.']],
        journey: ['Un prospect est ajouté', 'Il est qualifié et suivi dans le pipeline', 'Les relances partent automatiquement', 'Le contrat est suivi jusqu’à son échéance'],
        goals: ['Ne plus oublier aucune relance', 'Donner une vue claire du pipeline à toute l’équipe', 'Moins de saisie, plus de temps pour vendre'],
        built: ['Conception UX/UI', 'Application web', 'Automatisations', 'Tableau de bord analytique']
      },
      en: {
        cat: 'CRM · Energy', chip: 'Open the CRM',
        tagline: 'The CRM that saves energy brokers time.',
        challenge: 'Energy brokers juggle spreadsheets, emails and reminders to track hundreds of leads and contracts. Follow-ups get forgotten, deadlines slip, and nobody has the full picture.',
        solution: 'A CRM built for their job: leads and contracts in one place, follow-ups sent automatically at the right time, and a dashboard that shows where the team stands at a glance.',
        features: [['Visual pipeline', 'Every lead moves step by step, from “New” to “Signed”.'], ['Automated follow-ups', 'Emails and reminders scheduled according to each lead’s status.'], ['Contract tracking', 'Deadlines and renewals in one place, with alerts.'], ['Dashboard', 'The sales team’s key metrics, in real time.']],
        journey: ['A lead is added', 'It is qualified and tracked in the pipeline', 'Follow-ups go out automatically', 'The contract is tracked until renewal'],
        goals: ['Never miss a follow-up again', 'Give the whole team a clear view of the pipeline', 'Less data entry, more time to sell'],
        built: ['UX/UI design', 'Web application', 'Automations', 'Analytics dashboard']
      }
    },

    ai: {
      name: 'IA Hub', mono: 'IA.', acc: '#A78BFA', anim: 'develop', live: false, type: 'IA',
      url: 'https://iahubprojet.netlify.app/', host: 'iahub.app',
      screens: [
        { fr: 'Chat', en: 'Chat', html:
          '<div class="ui"><div class="sb"><i class="a"></i><i style="width:80%"></i><i style="width:65%"></i><i style="width:75%"></i><i style="width:55%"></i></div><div class="col conv">' +
          '<div class="m u">Fais-moi une synthèse des tendances du marché des énergies renouvelables.</div>' +
          '<div class="m a"><s class="acc">Recherche approfondie · 12 sources</s><div class="t">' + lines([96, 88, 92, 70]) + '</div><div class="pills"><em class="a">Source 1</em><em>Source 2</em><em>Source 3</em></div></div>' +
          '<div class="grow"></div><div class="row"><div class="fld" style="flex:1">Posez votre question…</div><span class="btnm">Envoyer</span></div>' +
          '<div class="pills"><em>Chat</em><em class="a">Recherche</em><em>Image</em><em>Document</em></div></div></div>' },
        { fr: 'Images', en: 'Images', html:
          '<div class="ui"><div class="col"><div class="row"><div class="fld" style="flex:1">Montagnes dans la brume à l’heure bleue, style cinématographique</div><span class="btnm">Générer</span></div>' +
          '<div class="gal"><i class="g1 sel"></i><i class="g2"></i><i class="g3"></i><i class="g4"></i></div>' +
          '<div class="row"><em class="a">16:9</em><em>Cinématographique</em><em>Haute définition</em><span class="grow"></span><em>Télécharger</em></div></div></div>' },
        { fr: 'Documents', en: 'Documents', html:
          '<div class="ui"><div class="doc"><s>contrat_fournisseur.pdf</s><div class="t">' + lines([70, 95, 90, 96, 60, 92, 88, 94, 50, 90, 85]) + '</div></div>' +
          '<div class="col"><div class="panel tbl" style="--cols:1fr 1.3fr"><s class="acc">Informations extraites</s>' +
          '<p><span>Type</span><span>Contrat de fourniture</span></p><p><span>Durée</span><span>36 mois</span></p><p><span>Préavis</span><span>3 mois</span></p><p><span>Révision</span><span>Chaque 1er janvier</span></p><p><span>Échéance</span><span class="acc">15 mars</span></p></div>' +
          '<div class="row"><span class="btnm">Exporter</span><em>Copier</em><em>Résumer</em></div></div></div>' }
      ],
      fr: {
        cat: 'Agent IA', chip: 'Lancer l’agent',
        tagline: 'Un seul assistant pour discuter, chercher, créer et analyser.',
        challenge: 'Chat, recherche, génération d’images, lecture de documents : autant d’outils IA séparés, d’onglets ouverts et d’abonnements. On perd du temps à passer de l’un à l’autre.',
        solution: 'IA Hub réunit ces usages dans une interface unique et claire : on pose une question, on lance une recherche approfondie, on génère une image ou on extrait l’essentiel d’un document — au même endroit.',
        features: [['Chat conversationnel', 'Des réponses contextualisées et un historique des échanges.'], ['Recherche approfondie', 'Une synthèse structurée de plusieurs sources, avec références.'], ['Génération d’images', 'Des visuels à partir d’une simple description.'], ['Extraction de documents', 'Les informations clés d’un document, prêtes à l’emploi.']],
        journey: ['Choisir un mode', 'Décrire sa demande', 'L’agent travaille', 'Copier, télécharger ou partager le résultat'],
        goals: ['Un seul outil au lieu de quatre', 'Une prise en main immédiate', 'Des résultats exploitables tout de suite'],
        built: ['Conception UX/UI', 'IA générative', 'Application web', 'Agent multi-fonctions']
      },
      en: {
        cat: 'AI agent', chip: 'Launch the agent',
        tagline: 'One assistant to chat, research, create and analyze.',
        challenge: 'Chat, research, image generation, document reading: so many separate AI tools, open tabs and subscriptions. Switching between them wastes time.',
        solution: 'IA Hub brings these uses together in one clear interface: ask a question, run deep research, generate an image or extract the essentials from a document — all in one place.',
        features: [['Conversational chat', 'Contextual answers and a conversation history.'], ['Deep research', 'A structured summary of several sources, with references.'], ['Image generation', 'Visuals from a simple description.'], ['Document extraction', 'A document’s key information, ready to use.']],
        journey: ['Pick a mode', 'Describe the request', 'The agent gets to work', 'Copy, download or share the result'],
        goals: ['One tool instead of four', 'Instant onboarding', 'Results you can use right away'],
        built: ['UX/UI design', 'Generative AI', 'Web application', 'Multi-purpose agent']
      }
    },

    edu: {
      name: 'Oumahh', mono: 'Oum.', acc: '#34D399', anim: 'zoom', live: true, type: 'Web app',
      url: 'https://oumahh.netlify.app/', host: 'oumahh.app',
      screens: [
        { fr: 'Parcours', en: 'Path', html:
          '<div class="ui center"><div class="ph"><s>Module 2 · Les bases</s><div class="path"><b class="d">✓</b><b class="d">✓</b><b class="d">✓</b><b class="c">4</b><b>5</b><b>6</b></div></div>' +
          '<div class="col" style="flex:none;width:34cqw"><div class="kc"><s>Progression</s><b class="acc">33 %</b><div class="prog"><i style="width:33%"></i></div></div><div class="kc"><s>Série en cours</s><b>5 jours</b></div><div class="kc"><s>Prochaine leçon</s><b>Leçon 4</b></div></div></div>' },
        { fr: 'Leçon', en: 'Lesson', html:
          '<div class="ui center"><div class="ph"><s>Leçon 4 / 12</s><b>Les bases</b><div class="prog"><i style="width:60%"></i></div><div class="t">' + lines([95, 88, 70]) + '</div>' +
          '<p class="q">Quelle est la bonne réponse ?</p><p class="opt">Réponse A</p><p class="opt sel">Réponse B</p><p class="opt">Réponse C</p><span class="btnm">Valider</span></div>' +
          '<div class="col" style="flex:none;width:34cqw"><div class="panel"><s>Dans cette leçon</s><div class="t">' + lines([90, 75, 85, 60]) + '</div></div><div class="kc"><s>Durée</s><b>5 min</b></div></div></div>' },
        { fr: 'Notifications', en: 'Notifications', html:
          '<div class="ui center"><div class="ph lock"><b class="clock">08:30</b><s>Mardi</s>' +
          '<p class="nt"><u></u><span><b>Oumahh</b>Nouvelle leçon disponible</span></p>' +
          '<p class="nt"><u></u><span><b>Oumahh</b>Plus que 2 leçons pour finir le module</span></p>' +
          '<p class="nt"><u></u><span><b>Oumahh</b>Bravo, module terminé !</span></p></div>' +
          '<div class="col" style="flex:none;width:34cqw"><div class="panel"><s>Application</s><div class="t">' + lines([90, 70]) + '</div><span class="btnm">Ajouter à l’écran d’accueil</span></div><div class="kc"><s>Mode</s><b class="acc">Hors ligne</b></div></div></div>' }
      ],
      fr: {
        cat: 'EdTech · PWA', chip: 'Commencer la leçon',
        tagline: 'Apprendre pas à pas, partout, même hors ligne.',
        challenge: 'Les contenus pédagogiques en ligne sont souvent denses et peu engageants : on décroche vite, surtout sur mobile.',
        solution: 'Une application d’apprentissage installable sur téléphone, au parcours découpé en leçons courtes, avec une progression visible et des notifications qui donnent envie de revenir.',
        features: [['Parcours structuré', 'Des leçons courtes, dans un ordre clair.'], ['Progression visible', 'On sait toujours où on en est.'], ['Notifications push', 'Un rappel au bon moment pour garder le rythme.'], ['Installable et hors ligne', 'S’utilise comme une application, même sans connexion.']],
        journey: ['Installer l’app depuis le navigateur', 'Suivre le parcours leçon par leçon', 'Valider ses acquis', 'Recevoir un rappel pour continuer'],
        goals: ['Une expérience fluide sur mobile', 'Un apprentissage régulier', 'Aucune installation via un store'],
        built: ['Conception UX/UI', 'Application installable (PWA)', 'Notifications push', 'Contenu pédagogique structuré']
      },
      en: {
        cat: 'EdTech · PWA', chip: 'Start the lesson',
        tagline: 'Learn step by step, anywhere, even offline.',
        challenge: 'Online learning content is often dense and unengaging: people drop off fast, especially on mobile.',
        solution: 'A learning app you can install on your phone, with a path split into short lessons, visible progress and notifications that make you want to come back.',
        features: [['Structured path', 'Short lessons, in a clear order.'], ['Visible progress', 'You always know where you are.'], ['Push notifications', 'A reminder at the right time to keep the pace.'], ['Installable and offline', 'Works like an app, even without a connection.']],
        journey: ['Install the app from the browser', 'Follow the path lesson by lesson', 'Check what you learned', 'Get a reminder to keep going'],
        goals: ['A smooth mobile experience', 'Regular learning', 'No app store needed'],
        built: ['UX/UI design', 'Installable app (PWA)', 'Push notifications', 'Structured learning content']
      }
    },

    fit: {
      name: 'FitTrack Pro', mono: 'Fit.', acc: '#FB7185', anim: 'spring', live: false, type: 'Web app',
      url: 'https://fit-trackp.netlify.app/', host: 'fittrack.pro',
      screens: [
        { fr: 'Aujourd’hui', en: 'Today', html:
          '<div class="ui" style="align-items:center"><div class="rg big"><b>72%</b><s>Objectif du jour</s></div><div class="col" style="height:100%"><div class="row"><div class="kc"><s>Calories</s><b>1 840</b></div><div class="kc"><s>Jeûne</s><b class="acc">14:32</b></div><div class="kc"><s>Séance</s><b>45 min</b></div></div>' +
          '<div class="panel grow"><s>Développé couché · record</s><svg viewBox="0 0 300 80" preserveAspectRatio="none"><polyline points="0,70 40,62 80,64 120,48 160,44 200,32 240,26 300,8" fill="none" stroke="var(--acc)" stroke-width="2.5"/></svg></div></div></div>' },
        { fr: 'Programme', en: 'Program', html:
          '<div class="ui"><div class="col"><div class="week"><p><s>Lun</s>Haut du corps</p><p><s>Mar</s>Cardio</p><p class="a"><s>Mer</s>Jambes</p><p><s>Jeu</s>Repos</p><p><s>Ven</s>Full body</p><p><s>Sam</s>Course</p><p><s>Dim</s>Repos</p></div>' +
          '<div class="panel tbl grow" style="--cols:2fr 1fr 1fr"><s class="acc">Séance du jour · Jambes</s><p><span>Squat</span><span>4 × 10</span><span>60 kg</span></p><p><span>Fentes</span><span>3 × 12</span><span>—</span></p><p><span>Soulevé de terre</span><span>4 × 8</span><span>70 kg</span></p><p><span>Gainage</span><span>3 × 1 min</span><span>—</span></p></div></div></div>' },
        { fr: 'Défis', en: 'Challenges', html:
          '<div class="ui"><div class="panel list grow"><s>Défi du mois · course</s><p><u></u>Alex<em>42 km</em></p><p class="me"><u></u>Vous<em class="a">38 km</em></p><p><u></u>Sam<em>31 km</em></p><p><u></u>Léa<em>27 km</em></p><p><u></u>Noah<em>19 km</em></p></div>' +
          '<div class="col" style="flex:.8"><div class="panel tbl" style="--cols:1.6fr 1fr"><s>Records personnels</s><p><span>Squat</span><span class="acc">80 kg</span></p><p><span>5 km</span><span>24:10</span></p><p><span>Gainage</span><span>3:15</span></p></div><div class="row"><div class="rg sm"><b>14 h</b></div><div class="kc"><s>Jeûne</s><b>16:8</b></div></div></div></div>' }
      ],
      fr: {
        cat: 'Sport · Nutrition', chip: 'Démarrer la séance',
        tagline: 'Le coach fitness et nutrition qui motive au quotidien.',
        challenge: 'Entre l’application d’entraînement, le carnet de nutrition et le minuteur de jeûne, le suivi est éparpillé — et la motivation s’essouffle.',
        solution: 'FitTrack Pro réunit entraînement, nutrition, jeûne intermittent et records personnels dans une seule application, avec des défis entre amis pour rester motivé.',
        features: [['Programmes d’entraînement', 'Des séances planifiées semaine par semaine.'], ['Suivi nutritionnel', 'Calories et objectifs du jour en un coup d’œil.'], ['Jeûne intermittent', 'Minuteur et historique des fenêtres de jeûne.'], ['Défis entre amis', 'Classements et objectifs partagés.']],
        journey: ['Définir ses objectifs', 'Suivre sa séance du jour', 'Noter ses repas et son jeûne', 'Battre ses records et défier ses amis'],
        goals: ['Tout le suivi dans une seule application', 'Une motivation entretenue par le jeu', 'Des progrès visibles'],
        built: ['Conception produit', 'Conception UX/UI', 'Application web', 'Gamification']
      },
      en: {
        cat: 'Fitness · Nutrition', chip: 'Start workout',
        tagline: 'The fitness and nutrition coach that keeps you motivated.',
        challenge: 'Between the workout app, the food diary and the fasting timer, tracking is scattered — and motivation fades.',
        solution: 'FitTrack Pro brings training, nutrition, intermittent fasting and personal records into one app, with challenges between friends to stay motivated.',
        features: [['Training programs', 'Workouts planned week by week.'], ['Nutrition tracking', 'Calories and daily goals at a glance.'], ['Intermittent fasting', 'Timer and history of fasting windows.'], ['Challenges with friends', 'Leaderboards and shared goals.']],
        journey: ['Set your goals', 'Follow today’s workout', 'Log meals and fasting', 'Beat your records and challenge friends'],
        goals: ['All tracking in one app', 'Motivation through play', 'Visible progress'],
        built: ['Product design', 'UX/UI design', 'Web application', 'Gamification']
      }
    },

    match: {
      name: 'EnergiMatch', mono: 'EM.', acc: '#38BDF8', anim: 'match', live: false, type: 'IA',
      url: 'https://energymatch.netlify.app/', host: 'energimatch.app',
      screens: [
        { fr: 'Qualification', en: 'Qualification', html:
          '<div class="ui center"><div class="panel form"><div class="steps"><b class="d">1</b><b class="d">2</b><b class="c">3</b><b>4</b></div><span class="h">Quel est votre besoin ?</span>' +
          '<div class="row"><p class="opt sel">Électricité</p><p class="opt">Gaz</p><p class="opt">Les deux</p></div>' +
          '<div class="row"><div class="fld" style="flex:1">Consommation annuelle</div><div class="fld" style="flex:1">Nombre de sites</div></div><span class="btnm">Continuer</span></div></div>' },
        { fr: 'Brief IA', en: 'AI brief', html:
          '<div class="ui center"><div class="doc wide"><div class="row" style="align-items:center"><s>Brief client</s><span class="grow"></span><em class="a">Généré par l’IA</em></div>' +
          '<div class="tbl" style="--cols:1fr 1.6fr"><p><span>Profil</span><span>PME · 3 sites</span></p><p><span>Besoin</span><span>Électricité et gaz</span></p><p><span>Volume</span><span>≈ 450 MWh / an</span></p><p><span>Priorité</span><span>Prix fixe sur 3 ans</span></p></div>' +
          '<s>Résumé</s><div class="t">' + lines([96, 90, 72]) + '</div></div></div>' },
        { fr: 'Espace courtier', en: 'Broker space', html:
          '<div class="ui">' + SB + '<div class="col"><div class="row"><div class="kc"><s>Nouvelles demandes</s><b>12</b></div><div class="kc"><s>Compatibilité moyenne</s><b class="acc">91 %</b></div><div class="kc"><s>À traiter</s><b>5</b></div></div>' +
          '<div class="panel list grow"><s><span class="live"></span>En temps réel</s><p><u></u>PME · 3 sites<em class="a">98 %</em></p><p><u></u>Restaurant · 1 site<em>94 %</em></p><p><u></u>Hôtel · 2 sites<em>91 %</em></p><p><u></u>Commerce · 1 site<em>87 %</em></p></div></div></div>' }
      ],
      fr: {
        cat: 'Marketplace · IA', chip: 'Trouver un courtier',
        tagline: 'La mise en relation intelligente entre clients et courtiers en énergie.',
        challenge: 'Pour un professionnel, trouver le bon courtier en énergie prend du temps ; pour un courtier, les demandes arrivent incomplètes et difficiles à qualifier.',
        solution: 'Un parcours de qualification guidé côté client, un brief rédigé automatiquement par l’IA, et un espace où chaque courtier reçoit en temps réel les demandes qui lui correspondent.',
        features: [['Qualification guidée', 'Quelques questions simples, étape par étape.'], ['Brief généré par l’IA', 'Une synthèse claire du besoin, prête à traiter.'], ['Mise en relation', 'Les courtiers les plus adaptés sont proposés.'], ['Espace courtier', 'Les nouvelles demandes arrivent en temps réel.']],
        journey: ['Le client décrit son besoin', 'L’IA rédige le brief', 'Les courtiers adaptés sont proposés', 'Le courtier reprend la demande'],
        goals: ['Des demandes complètes dès le départ', 'Moins d’allers-retours', 'Une mise en relation plus rapide'],
        built: ['Conception UX/UI', 'Marketplace', 'IA appliquée', 'Tableau de bord temps réel']
      },
      en: {
        cat: 'Marketplace · AI', chip: 'Find a broker',
        tagline: 'Smart matching between clients and energy brokers.',
        challenge: 'For a business, finding the right energy broker takes time; for a broker, requests arrive incomplete and hard to qualify.',
        solution: 'A guided qualification flow for clients, a brief written automatically by AI, and a space where each broker receives matching requests in real time.',
        features: [['Guided qualification', 'A few simple questions, step by step.'], ['AI-generated brief', 'A clear summary of the need, ready to handle.'], ['Matching', 'The best-suited brokers are suggested.'], ['Broker space', 'New requests arrive in real time.']],
        journey: ['The client describes the need', 'AI writes the brief', 'Suitable brokers are suggested', 'The broker picks up the request'],
        goals: ['Complete requests from the start', 'Fewer back-and-forths', 'Faster matching'],
        built: ['UX/UI design', 'Marketplace', 'Applied AI', 'Real-time dashboard']
      }
    },

    club: {
      name: 'EnergyClub', mono: 'EC.', acc: '#E879F9', anim: 'iris', live: false, type: 'Web app',
      url: 'https://projet-energy-teams.netlify.app/', host: 'energyclub.app',
      screens: [
        { fr: 'Accueil', en: 'Home', html:
          '<div class="ui ui-club"><div class="hero2"><b>Le club des pros<br>de l’énergie</b><em>Rejoindre le club</em></div>' +
          '<div class="row"><div class="plan"><s>Échanger</s><b>Communauté</b></div><div class="plan"><s>Apprendre</s><b>Contenus</b></div><div class="plan"><s>Se retrouver</s><b>Événements</b></div></div></div>' },
        { fr: 'Contenus', en: 'Content', html:
          '<div class="ui"><div class="cards3"><div class="c2"><i class="g1"></i><b>Marché de l’énergie</b><em>Article</em></div><div class="c2 lock"><i class="g2"></i><b>Masterclass négociation</b><em class="a">Membres</em></div><div class="c2"><i class="g3"></i><b>Veille réglementaire</b><em>Dossier</em></div>' +
          '<div class="c2 lock"><i class="g4"></i><b>Rencontres régionales</b><em class="a">Membres</em></div><div class="c2"><i class="g2"></i><b>Boîte à outils</b><em>Ressources</em></div><div class="c2 lock"><i class="g1"></i><b>Études de cas</b><em class="a">Membres</em></div></div></div>' },
        { fr: 'Adhésion', en: 'Membership', html:
          '<div class="ui ui-club"><div class="row grow"><div class="plan"><s>Membre</s><b>Essentiel</b><div class="t">' + lines([90, 70, 80]) + '</div></div><div class="plan a"><s class="acc">Le plus choisi</s><b>Pro</b><div class="t">' + lines([90, 80, 70, 85]) + '</div></div><div class="plan"><s>Équipe</s><b>Business</b><div class="t">' + lines([85, 75, 90]) + '</div></div>' +
          '<div class="panel pay"><s>Paiement sécurisé</s><div class="fld">Nom sur la carte</div><div class="fld">•••• •••• •••• ••••</div><div class="row"><div class="fld" style="flex:1">MM / AA</div><div class="fld" style="flex:1">•••</div></div><span class="btnm">Rejoindre le club</span></div></div></div>' }
      ],
      fr: {
        cat: 'SaaS · Communauté', chip: 'Rejoindre le club',
        tagline: 'Le club en ligne des professionnels de l’énergie.',
        challenge: 'Les professionnels de l’énergie manquent d’un lieu dédié pour échanger, se former et accéder à des contenus de qualité.',
        solution: 'Une plateforme communautaire avec espace membres, contenus exclusifs et formules d’adhésion, et une inscription avec paiement en ligne simple et sécurisée.',
        features: [['Espace membres', 'Profil, accès et contenus personnalisés.'], ['Contenus exclusifs', 'Articles, ressources et événements réservés aux membres.'], ['Formules d’adhésion', 'Plusieurs offres adaptées à chaque profil.'], ['Paiement en ligne', 'Inscription et paiement en quelques clics.']],
        journey: ['Découvrir le club', 'Choisir sa formule', 'S’inscrire et payer en ligne', 'Accéder aux contenus et à la communauté'],
        goals: ['Une adhésion sans friction', 'Des contenus mis en valeur', 'Une communauté qui grandit'],
        built: ['Conception UX/UI', 'Plateforme SaaS', 'Espace membres', 'Paiement en ligne']
      },
      en: {
        cat: 'SaaS · Community', chip: 'Join the club',
        tagline: 'The online club for energy professionals.',
        challenge: 'Energy professionals lack a dedicated place to connect, learn and access quality content.',
        solution: 'A community platform with a member area, exclusive content and membership plans, plus simple and secure online sign-up and payment.',
        features: [['Member area', 'Profile, access and personalized content.'], ['Exclusive content', 'Articles, resources and events for members only.'], ['Membership plans', 'Several offers for every profile.'], ['Online payment', 'Sign up and pay in a few clicks.']],
        journey: ['Discover the club', 'Choose a plan', 'Sign up and pay online', 'Access content and the community'],
        goals: ['Frictionless membership', 'Content that stands out', 'A growing community'],
        built: ['UX/UI design', 'SaaS platform', 'Member area', 'Online payment']
      }
    },

    site: {
      name: 'Portfolio Vicken', mono: 'Vic.', acc: '#D6B98C', anim: 'curtain', live: true, type: 'Site',
      url: 'https://portfoliovicken.netlify.app/en', host: 'portfolio.site',
      screens: [
        { fr: 'Accueil', en: 'Home', html:
          '<div class="ui ui-site"><div class="nav2"><b>V.</b><span></span><span></span><span></span><em class="a">FR / EN</em></div><div class="hero3"><div><i class="l1"></i><i class="l2"></i><i class="l3"></i><u></u></div><div class="pic"></div></div><div class="row"><p></p><p></p><p></p></div></div>' },
        { fr: 'Réalisations', en: 'Work', html:
          '<div class="ui ui-site"><div class="nav2"><b>V.</b><span></span><span></span><span></span><em>FR / EN</em></div><div class="mason"><i class="g1"></i><i class="g2 tall"></i><i class="g3"></i><i class="g4"></i><i class="g2"></i></div></div>' },
        { fr: 'Contact', en: 'Contact', html:
          '<div class="ui ui-site"><div class="nav2"><b>V.</b><span></span><span></span><span></span><em>FR / EN</em></div><div class="row grow" style="align-items:center"><div class="hero3" style="flex:1"><div><i class="l1"></i><i class="l2"></i></div></div>' +
          '<div class="col" style="flex:1"><div class="fld">Nom</div><div class="fld">E-mail</div><div class="fld tall">Message</div><span class="btnm">Envoyer</span></div></div></div>' }
      ],
      fr: {
        cat: 'Site vitrine', chip: 'Visiter le site',
        tagline: 'Un portfolio élégant et bilingue, fidèle à une personnalité.',
        challenge: 'Se présenter en ligne de façon professionnelle, à un public francophone comme anglophone, avec un site qui reflète vraiment son style.',
        solution: 'Un site vitrine sur-mesure, bilingue FR / EN, au design éditorial soigné, rapide et parfaitement lisible sur mobile comme sur ordinateur.',
        features: [['Design sur-mesure', 'Une identité visuelle propre, pas un modèle générique.'], ['Bilingue FR / EN', 'Changement de langue instantané.'], ['Réalisations mises en valeur', 'Une présentation claire et élégante.'], ['Contact simplifié', 'Une prise de contact en un clic.']],
        journey: ['Découverte du profil', 'Exploration des réalisations', 'Choix de la langue', 'Prise de contact'],
        goals: ['Une image professionnelle', 'Une audience internationale', 'Une navigation fluide sur tous les écrans'],
        built: ['Direction artistique', 'Conception UX/UI', 'Site vitrine', 'Multilingue']
      },
      en: {
        cat: 'Website', chip: 'Visit the site',
        tagline: 'An elegant, bilingual portfolio that reflects a personality.',
        challenge: 'Presenting oneself professionally online, to both French- and English-speaking audiences, with a site that truly reflects one’s style.',
        solution: 'A custom bilingual (FR / EN) website with a refined editorial design, fast and perfectly readable on mobile and desktop.',
        features: [['Custom design', 'A distinctive visual identity, not a generic template.'], ['Bilingual FR / EN', 'Instant language switch.'], ['Work showcased', 'A clear, elegant presentation.'], ['Easy contact', 'Get in touch in one click.']],
        journey: ['Discover the profile', 'Explore the work', 'Choose the language', 'Get in touch'],
        goals: ['A professional image', 'An international audience', 'Smooth browsing on every screen'],
        built: ['Art direction', 'UX/UI design', 'Website', 'Multilingual']
      }
    }
  };
  var ORDER = ['crm', 'ai', 'edu', 'fit', 'match', 'club', 'site'];

  /* ---------- rendu d'une fiche ---------- */
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function build(id) {
    var p = P[id], t = p[L()], u = UI[L()];
    var i = ORDER.indexOf(id), prev = P[ORDER[(i + ORDER.length - 1) % ORDER.length]], next = P[ORDER[(i + 1) % ORDER.length]];
    var tabs = p.screens.map(function (s, k) {
      return '<button type="button" role="tab" id="cs-tab-' + k + '" aria-controls="cs-scr-' + k + '" aria-selected="' + (k === 0) + '" tabindex="' + (k === 0 ? 0 : -1) + '">' + esc(s[L()]) + '</button>';
    }).join('');
    var screens = p.screens.map(function (s, k) {
      return '<div class="cs-screen shot" role="tabpanel" id="cs-scr-' + k + '" aria-labelledby="cs-tab-' + k + '"' + (k ? ' hidden' : '') + '><div class="bar" aria-hidden="true"><i></i><i></i><i></i><span>' + p.host + '</span></div><div aria-hidden="true">' + s.html + '</div></div>';
    }).join('');
    return '<div class="case-panel p-' + id + '" style="--acc:' + p.acc + '" data-anim="' + p.anim + '">' +
      '<header class="cs-head"><div class="cs-id"><span class="pmono">' + p.mono + '</span><span class="tag' + (p.live ? ' tag-live' : '') + '">' + (p.live ? u.statusLive : u.statusDev) + '</span><span class="cs-cat">' + esc(t.cat) + '</span></div>' +
      '<button type="button" class="cs-close" data-close aria-label="' + u.close + '">' + ICON_CLOSE + '</button></header>' +
      '<div class="cs-body">' +
      '<div class="cs-intro"><h2 id="cs-title" class="cs-title">' + esc(p.name) + '</h2><p class="cs-tagline">' + esc(t.tagline) + '</p></div>' +
      '<div class="cs-preview"><div class="cs-tabs" role="tablist" aria-label="' + u.preview + '">' + tabs + '</div><div class="cs-screens">' + screens + '</div><p class="cs-note">' + u.note + '</p></div>' +
      '<div class="cs-two"><section><h3 class="cs-h">' + u.challenge + '</h3><p>' + esc(t.challenge) + '</p></section><section><h3 class="cs-h">' + u.solution + '</h3><p>' + esc(t.solution) + '</p></section></div>' +
      '<section><h3 class="cs-h">' + u.features + '</h3><div class="cs-feats">' + t.features.map(function (f, k) {
        return '<div class="cs-feat"><span class="cs-num">0' + (k + 1) + '</span><b>' + esc(f[0]) + '</b><p>' + esc(f[1]) + '</p></div>';
      }).join('') + '</div></section>' +
      '<section><h3 class="cs-h">' + u.journey + '</h3><ol class="cs-journey">' + t.journey.map(function (j, k) {
        return '<li><span>' + (k + 1) + '</span><p>' + esc(j) + '</p></li>';
      }).join('') + '</ol></section>' +
      '<div class="cs-two"><section><h3 class="cs-h">' + u.goals + '</h3><ul class="cs-goals">' + t.goals.map(function (g) { return '<li class="tick">' + esc(g) + '</li>'; }).join('') + '</ul></section>' +
      '<section><h3 class="cs-h">' + u.built + '</h3><div class="cs-built">' + t.built.map(function (b) { return '<span class="tag">' + esc(b) + '</span>'; }).join('') + '</div></section></div>' +
      '<div class="cs-cta"><a class="btn-ghost" href="' + p.url + '" target="_blank" rel="noopener">' + (p.live ? u.live : u.demo) + ' <span aria-hidden="true">↗</span></a><button type="button" class="btn-primary" data-similar>' + u.similar + '</button></div>' +
      '</div>' +
      '<footer class="cs-foot"><button type="button" data-go="' + ORDER[(i + ORDER.length - 1) % ORDER.length] + '"><span class="dir">← ' + u.prev + '</span><b>' + esc(prev.name) + '</b></button>' +
      '<button type="button" data-go="' + ORDER[(i + 1) % ORDER.length] + '" class="nx"><span class="dir">' + u.next + ' →</span><b>' + esc(next.name) + '</b></button></footer>' +
      '</div>';
  }

  /* ---------- ouverture / fermeture ---------- */
  var dlg = $('#case');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var current = null, trigger = null, pendingContact = null, lastPt = null, closing = false;

  addEventListener('pointerdown', function (e) { lastPt = { x: e.clientX, y: e.clientY }; }, { passive: true });

  function animateIn(id, fromEl) {
    var panel = $('.case-panel', dlg);
    if (reduce) { panel.classList.add('anim-fade'); return; }
    var a = P[id].anim, pr = panel.getBoundingClientRect();
    if (a === 'zoom') {
      var r = fromEl ? fromEl.getBoundingClientRect() : null;
      panel.style.setProperty('--dx', r ? (r.left + r.width / 2 - (pr.left + pr.width / 2)) + 'px' : '0px');
      panel.style.setProperty('--dy', r ? (r.top + r.height / 2 - (pr.top + pr.height / 2)) + 'px' : '0px');
      panel.style.setProperty('--sx', r ? Math.max(r.width / pr.width, .2) : .9);
      panel.style.setProperty('--sy', r ? Math.max(r.height / pr.height, .2) : .9);
    }
    if (a === 'iris') {
      var pt = lastPt || { x: pr.left + pr.width / 2, y: pr.top + pr.height / 2 };
      panel.style.setProperty('--cx', (pt.x - pr.left) + 'px');
      panel.style.setProperty('--cy', (pt.y - pr.top) + 'px');
    }
    panel.classList.add('anim-' + a);
  }

  function render(id, fromEl) {
    current = id;
    dlg.innerHTML = build(id);
    dlg.setAttribute('aria-label', P[id].name);
    animateIn(id, fromEl);
  }

  function open(id, fromEl, push) {
    if (!P[id]) return;
    closing = false; dlg.classList.remove('closing');
    render(id, fromEl);
    if (!dlg.open) {
      dlg.showModal();
      html.classList.add('case-open');
      $('.cs-close', dlg).focus({ preventScroll: true });
    }
    if (push) history.pushState({ bl: id }, '', '#projet-' + id);
  }

  function finish() {
    if (!dlg.open) return;
    dlg.classList.remove('closing'); closing = false;
    dlg.close(); dlg.innerHTML = '';
    html.classList.remove('case-open');
    var id = current; current = null;
    if (pendingContact) { goContact(pendingContact); pendingContact = null; return; }
    var f = trigger || (id && $('#work [data-open="' + id + '"]'));
    if (f) f.focus({ preventScroll: true });
  }

  function doClose() {
    if (!dlg.open || closing) return;
    if (reduce) return finish();
    closing = true;
    dlg.classList.add('closing');
    var panel = $('.case-panel', dlg);
    panel.addEventListener('animationend', function h(e) { if (e.target === panel) { panel.removeEventListener('animationend', h); finish(); } });
    setTimeout(finish, 450);
  }

  // fermeture via l'historique : le bouton « retour » ferme aussi la fiche
  function requestClose() {
    if (history.state && history.state.bl) history.back(); else doClose();
  }

  addEventListener('popstate', function (e) {
    var id = e.state && e.state.bl;
    if (id && P[id]) open(id, null, false); else doClose();
  });

  function goContact(id) {
    var p = P[id], box = $('#contact input[name="type[]"][value="' + p.type + '"]'), msg = $('#contact-msg');
    if (box) box.checked = true;
    if (msg && !msg.value.trim()) msg.value = UI[L()].prefill.replace('{name}', p.name);
    $('#contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(function () { if (msg) { msg.focus({ preventScroll: true }); msg.setSelectionRange(msg.value.length, msg.value.length); } }, reduce ? 0 : 800);
  }

  /* ---------- interactions dans la fiche ---------- */
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); requestClose(); });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) return requestClose(); // clic sur le fond
    var t = e.target.closest('[data-close],[data-go],[data-similar],[role=tab]');
    if (!t) return;
    if (t.hasAttribute('data-close')) requestClose();
    else if (t.hasAttribute('data-go')) {
      var id = t.getAttribute('data-go');
      trigger = $('#work [data-open="' + id + '"]');
      render(id, null);
      history.replaceState({ bl: id }, '', '#projet-' + id);
      $('.cs-close', dlg).focus({ preventScroll: true });
      $('.case-panel', dlg).scrollTop = 0;
    } else if (t.hasAttribute('data-similar')) { pendingContact = current; trigger = null; requestClose(); }
    else selectTab(t);
  });
  dlg.addEventListener('keydown', function (e) {
    var tab = e.target.closest && e.target.closest('[role=tab]');
    if (!tab) return;
    var tabs = $$('[role=tab]', dlg), k = tabs.indexOf(tab), n = null;
    if (e.key === 'ArrowRight') n = (k + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') n = (k - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = tabs.length - 1;
    if (n !== null) { e.preventDefault(); selectTab(tabs[n]); tabs[n].focus(); }
  });
  function selectTab(tab) {
    $$('[role=tab]', dlg).forEach(function (b) {
      var on = b === tab;
      b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
      var pnl = document.getElementById(b.getAttribute('aria-controls'));
      if (on && pnl.hidden) { pnl.hidden = false; pnl.classList.remove('enter'); void pnl.offsetWidth; pnl.classList.add('enter'); }
      else if (!on) pnl.hidden = true;
    });
  }

  document.addEventListener('langchange', function () {
    if (current && dlg.open) {
      var sel = $$('[role=tab]', dlg).findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; });
      dlg.innerHTML = build(current);
      if (sel > 0) selectTab($$('[role=tab]', dlg)[sel]);
    }
  });

  /* ---------- cartes : ouverture, projecteur et étiquette de curseur ---------- */
  $$('#work [data-open]').forEach(function (b) {
    b.addEventListener('click', function () {
      trigger = b;
      open(b.getAttribute('data-open'), b.closest('.proj'), true);
    });
  });

  var chip = $('.cursor-chip');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (chip && fine) {
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0, on = false;
    var loop = function () {
      x += (tx - x) * (reduce ? 1 : .22); y += (ty - y) * (reduce ? 1 : .22);
      chip.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      raf = on || Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0;
    };
    $$('#work .proj').forEach(function (card) {
      var id = card.getAttribute('data-project'), rect = null;
      card.addEventListener('pointerenter', function (e) {
        rect = card.getBoundingClientRect();
        chip.textContent = P[id][L()].chip;
        chip.style.setProperty('--acc', P[id].acc);
        if (!on) { x = tx = e.clientX; y = ty = e.clientY; }
        on = true; chip.classList.add('on');
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener('pointermove', function (e) {
        tx = e.clientX; ty = e.clientY;
        var overLink = e.target.closest && e.target.closest('.ext');
        chip.classList.toggle('on', !overLink);
        if (rect) { card.style.setProperty('--mx', (e.clientX - rect.left) + 'px'); card.style.setProperty('--my', (e.clientY - rect.top) + 'px'); }
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
      card.addEventListener('pointerleave', function () { on = false; chip.classList.remove('on'); });
    });
    addEventListener('scroll', function () { if (on) { on = false; chip.classList.remove('on'); } }, { passive: true });
  }

  /* ---------- lien direct vers une fiche (#projet-xxx) ---------- */
  var m = location.hash.match(/^#projet-([a-z]+)$/);
  if (m && P[m[1]]) {
    history.replaceState(null, '', location.pathname + location.search);
    trigger = $('#work [data-open="' + m[1] + '"]');
    open(m[1], null, true);
  }
})();
