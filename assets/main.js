/* Build & Launch — interactions */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function scrollToEl(el) { if (window.BL_scrollTo) window.BL_scrollTo(el); else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }

  /* ---------- nav ---------- */
  var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  // état « scrollé » sans écouteur de scroll (évite les recalculs de mise en page forcés)
  new IntersectionObserver(function (es) { nav.classList.toggle('scrolled', !es[0].isIntersecting); }).observe($('#top-sentinel'));
  function lockScroll(on) {
    document.documentElement.classList.toggle('menu-lock', on);
    if (window.BL_lenis) window.BL_lenis[on ? 'stop' : 'start']();
  }
  function closeMenu() {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open'); nav.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false');
    lockScroll(false);
  }
  burger.addEventListener('click', function () {
    var open = !menu.classList.contains('open');
    menu.classList.toggle('open', open); nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    lockScroll(open);
  });
  addEventListener('resize', function () { if (innerWidth >= 1024) closeMenu(); });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  var links = $$('#menu a');
  var secObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  // toutes les sections : celles sans lien éteignent la navigation
  $$('main > section').forEach(function (el) { secObs.observe(el); });

  /* ---------- hero capture → formulaire de contact ---------- */
  $('#quick').addEventListener('submit', function (e) {
    e.preventDefault();
    $('#contact-email').value = $('#quick-email').value;
    scrollToEl($('#contact'));
    setTimeout(function () { $('#contact-msg').focus({ preventScroll: true }); }, reduce ? 0 : 1100);
  });

  /* ---------- apparition au défilement ---------- */
  var revObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(function (el) { revObs.observe(el); });

  /* ---------- filtres projets ---------- */
  $$('.filter').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.filter').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      var f = b.dataset.f;
      $$('#work .proj').forEach(function (p) {
        var show = f === 'all' || p.dataset.cat.split(' ').indexOf(f) > -1;
        var was = !p.classList.contains('hide');
        p.classList.toggle('hide', !show);
        if (show) { p.classList.add('in'); if (!was && !reduce) { p.classList.remove('pop'); void p.offsetWidth; p.classList.add('pop'); } }
      });
    });
  });

  /* ---------- démo automatisation ---------- */
  var nodes = $$('#flow .node'), logs = $$('#flow .flog p'), timer = null;
  function runFlow() {
    var i = 0;
    nodes.concat(logs).forEach(function (n) { n.classList.remove('on'); });
    clearInterval(timer);
    timer = setInterval(function () {
      if (i < nodes.length) nodes[i].classList.add('on');
      if (i === 1) logs[0].classList.add('on');
      if (i === 3) logs[1].classList.add('on');
      if (i === 4) logs[2].classList.add('on');
      i++;
      if (i > nodes.length + 4) runFlow();
    }, 750);
  }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { if (reduce) nodes.concat(logs).forEach(function (n) { n.classList.add('on'); }); else runFlow(); }
      else clearInterval(timer);
    });
  }, { threshold: .35 }).observe($('#flow'));


  $('#yr').textContent = new Date().getFullYear();

  /* ---------- vidéo de présentation ----------
     MP4 (H.264) + WebM (VP9) en secours. Rien n'est téléchargé avant le clic sur lecture ;
     l'image d'aperçu est chargée à l'approche de la section, dans la langue affichée. */
  var video = $('#studio-video'), overlay = $('.vid-play');
  var vLang = 'fr', needsLoad = false, posterOn = false;
  function setPoster() { video.poster = 'assets/video/poster-' + vLang + '.webp'; posterOn = true; }
  function vidLang(l) {
    if (!video || l === vLang) return;
    if (!video.paused || video.currentTime > 0) return; // ne pas couper une lecture en cours
    vLang = l;
    $$('source', video).forEach(function (so) { so.src = 'assets/video/bl-studio-' + l + (so.type === 'video/webm' ? '.webm' : '.mp4'); });
    needsLoad = true; // le lecteur sera rechargé au moment de la lecture seulement
    if (posterOn) setPoster();
  }
  function playVideo() {
    if (!video) return;
    if (!posterOn) setPoster();
    overlay.hidden = true; video.controls = true;
    if (needsLoad) { needsLoad = false; video.load(); }
    var pr = video.play(); if (pr && pr.catch) pr.catch(function () {});
    video.focus({ preventScroll: true });
  }
  if (video) {
    video.controls = false; overlay.hidden = false; // lecteur épuré jusqu'au premier clic
    overlay.addEventListener('click', playVideo);
    video.addEventListener('play', function () { overlay.hidden = true; video.controls = true; });
    document.addEventListener('langchange', function (e) { vidLang(e.detail); });
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { if (!posterOn) setPoster(); o.disconnect(); } }, { rootMargin: '600px 0px' }).observe(video);
    $$('.vid-link[data-play-video]').forEach(function (b) {
      b.addEventListener('click', function () {
        scrollToEl($('#video'));
        setTimeout(playVideo, reduce ? 0 : 1000);
      });
    });
  }

  /* ---------- i18n (FR dans le HTML, EN ici) ---------- */
  var EN = {
    'skip': 'Skip to content',
    'nav.exp': 'Expertise', 'nav.work': 'Work', 'nav.process': 'Process', 'nav.faq': 'FAQ', 'nav.cta': 'Start a project',
    'need.k': 'What you are looking for', 'need.h': 'One need. One tailored solution.', 'need.ex': 'Example',
    'need.1.k': 'Save time', 'need.1.t': 'Automate your repetitive tasks', 'need.1.d': 'Follow-ups, quotes, data entry, reporting: what you redo every week runs on its own, with nothing forgotten.',
    'need.2.k': 'Use AI', 'need.2.t': 'An assistant that knows your business', 'need.2.d': 'It answers your clients, drafts your emails and finds information in your documents, at any hour.',
    'need.3.k': 'Stay in control', 'need.3.t': 'A tool built for your business', 'need.3.d': 'Clients, sales, files: everything in one place, always up to date, on computer and phone.',
    'need.4.k': 'Launch', 'need.4.t': 'Your website or your app', 'need.4.d': 'A website that inspires trust or a ready-to-use app, from idea to launch.',
    'work.all': 'All projects',
    'hero.eyebrow': 'AI · Automation · Web studio', 'hero.t1': 'Your ideas,', 'hero.t2': 'built and launched.',
    'hero.lead': 'Custom AI apps, automations and web products — to save your team time and get your business off the ground.',
    'hero.label': 'Your email', 'hero.video': 'Watch the video · 45 s',
    'stg.label': 'Featured projects',
    'man.k': 'Our expertise', 'man.t': 'We design custom AI apps, automations and web products. Tools your team adopts from day one — and that save time, every day.',
    'vid.k': 'Video', 'vid.h': 'The studio in 45 seconds.', 'vid.sub': 'What we build and how we work, at a glance.', 'vid.play': 'Play video · 0:45',
    'vid.desc': 'Build & Launch presentation video: services, demos of AI apps and automations, work and process. Music, no voice-over.', 'hero.ph': 'Your work email', 'hero.btn': 'Start a project', 'hero.note': 'Fast reply · Clear quote · English or French', 'hero.scroll': 'Discover',
    'st.1': 'products designed and delivered', 'st.2': 'areas of expertise: AI, automation, web', 'st.3': 'automations that never stop',
    'tools.k': 'Tools we master',
    'svc.k': 'Services', 'svc.h': 'What we build for you.', 'svc.sub': 'Three core areas of expertise, one goal: save you time and money — measurably.',
    'svc.1.t': 'AI apps & LLM agents', 'svc.1.p': 'Assistants, chatbots and AI agents connected to your data and tools: they answer, search, extract and act on your behalf.',
    'svc.1.l1': 'Chatbots & business assistants', 'svc.1.l2': 'RAG: AI that knows your documents', 'svc.1.l3': 'Content extraction & generation',
    'svc.2.t': 'Business process automation', 'svc.2.p': 'Your repetitive tasks run on their own: follow-ups, reporting, lead qualification, tool sync. Your team gets hours back every week.',
    'svc.2.l1': 'n8n, Make, Zapier workflows', 'svc.2.l2': 'API integrations & custom scripts', 'svc.2.l3': 'AI built into your processes',
    'svc.3.t': 'Web apps & SaaS', 'svc.3.p': 'CRMs, dashboards, marketplaces, SaaS platforms: tools with a strong identity, built to be adopted from day one.',
    'svc.3.l1': 'Web apps & PWAs', 'svc.3.l2': 'Member areas, subscriptions, payments', 'svc.3.l3': 'Polished UX, mobile & desktop',
    'svc.m1.t': 'CRMs & dashboards', 'svc.m1.p': 'Manage leads, contracts and teams in real time.',
    'svc.m2.t': 'Websites & portfolios', 'svc.m2.p': 'Elegant, fast, multilingual — WordPress, Shopify or custom.',
    'svc.m3.t': 'AI audit & consulting', 'svc.m3.p': 'We find what costs you time and what AI can truly change.',
    'work.k': 'Work', 'work.h': 'Real products, built and shipped.', 'work.sub': 'Live projects and products in final development. Detailed demos on request.',
    'work.f0': 'All', 'work.f1': 'AI', 'work.f2': 'Web apps & SaaS', 'work.f3': 'Websites',
    'st.live': 'Live', 'st.dev': 'In development', 'st.req': 'Demo on request',
    'cta.live': 'View live', 'cta.demo': 'View demo', 'cta.case': 'Explore the project',
    'demo.k': 'In action', 'demo.h': 'An automation, in practice.', 'demo.sub': 'A prospect fills in your form. Within seconds, with nobody behind the screen:',
    'demo.l1': 'AI analyzes and qualifies the request', 'demo.l2': 'Your CRM is updated (score, tags, owner)', 'demo.l3': 'A personalized email goes out instantly', 'demo.l4': 'Your team is notified, reporting updates itself',
    'demo.cta': 'Automate my processes',
    'fl.1': 'New lead', 'fl.1s': 'Form · CRM', 'fl.2': 'AI qualifies it', 'fl.3': 'CRM updated', 'fl.3s': 'Score · tags · owner', 'fl.4': 'Personal email', 'fl.4s': 'Written by AI', 'fl.5': 'Team notified',
    'fl.log1': 'lead #1042 qualified — score 87/100', 'fl.log2': 'personalized follow-up sent', 'fl.log3': 'CRM synced · team notified',
    'proc.k': 'Process', 'proc.h': 'From brief to lift-off, in four steps.', 'proc.sub': 'A simple, transparent process: you always know where your project stands.',
    'proc.1.t': 'Listen', 'proc.1.p': 'We learn your business, your pain points and what costs you time — before talking tech.',
    'proc.2.t': 'Design', 'proc.2.p': 'The simplest solution that works: no bloat, no gimmicks. Every piece has a reason to exist.',
    'proc.3.t': 'Build', 'proc.3.p': 'Development, integration with your existing tools and real-world testing with your team.',
    'proc.4.t': 'Launch', 'proc.4.p': 'Go-live, onboarding, measured impact — hours saved, leads handled — then we iterate.',
    'why.k': 'What we bring', 'why.h': 'Solid code, built for your business.',
    'why.1.t': 'Tech & business mindset', 'why.1.p': 'We understand your business as well as the code. The result: useful tools, not demos.',
    'why.2.t': 'Applied AI expertise', 'why.2.p': 'LLMs, RAG, agents, prompt engineering: AI shipped to production in real companies, not just in theory.',
    'why.3.t': 'Simple & effective', 'why.3.p': 'The simplest solution that works. Less complexity, less maintenance, more results.',
    'why.4.t': 'Measurable impact', 'why.4.p': 'Hours saved, leads handled, errors avoided: we define what matters together, and we measure it.',
    'why.5.t': 'Adopted on day one', 'why.5.p': 'Polished, intuitive interfaces your team actually wants to use.',
    'why.6.t': 'Fast & responsive', 'why.6.p': 'Clear communication, quick answers, regular progress updates. You are never left in the dark.',
    'faq.h': 'Frequently asked questions.', 'faq.sub': 'Another question? Write to us — we reply fast.',
    'faq.1.q': 'What kind of projects do you take on?', 'faq.1.a': 'AI apps and agents, process automation (n8n, Make, Zapier, Python), web apps and SaaS, CRMs, dashboards and websites. From a focused workflow to a complete product.',
    'faq.2.q': 'How much does a project cost?', 'faq.2.a': 'Every project is quoted individually, after a first conversation to understand your needs. You receive a clear quote with scope and deliverables.',
    'faq.3.q': 'How long does delivery take?', 'faq.3.a': 'It depends on scope: a focused automation is much faster than a full application. The timeline is agreed with you upfront, with intermediate deliveries.',
    'faq.4.q': 'Can you work with our existing tools?', 'faq.4.a': 'Yes — that is the priority: we plug AI and automations into your current tools (CRM, email, spreadsheets, Slack, APIs…) instead of replacing everything.',
    'faq.5.q': 'Is our data safe?', 'faq.5.a': 'Privacy is built in from the start: restricted access, protected keys and secrets, and services chosen according to your constraints.',
    'faq.6.q': 'What happens after delivery?', 'faq.6.a': 'You get a documented tool and an onboarding session. Ongoing support to evolve the solution can be set up based on your needs.',
    'ct.h1': 'Ready for lift-off?', 'ct.h2': "Let's talk about your project.",
    'ct.sub': 'A process to automate, a tool idea, an AI project? Describe it in a few lines: you get a fast reply and a first opinion on the best approach.',
    'f.name': 'Name', 'f.email': 'Email', 'f.company': 'Company (optional)', 'f.type': 'Project type',
    'f.t1': 'AI app', 'f.t2': 'Automation', 'f.t3': 'Web app / SaaS', 'f.t4': 'Website', 'f.t5': 'Audit / consulting',
    'f.msg': 'Your project in a few lines', 'f.note': 'Fast reply guaranteed · Clear, detailed quote', 'f.send': 'Send my request',
    'ft.tag': 'We build. You launch.', 'ft.disc': 'AI, automation & web studio. Screens taken from the projects, with sample data.'
  };
  // traductions des projets, générées avec les cartes (assets/projects-data.js)
  if (window.BL_EN) for (var k in window.BL_EN) EN[k] = window.BL_EN[k];
  var META = {
    fr: { title: document.title, desc: $('meta[name=description]').content },
    en: { title: 'Build & Launch — AI apps, automation & web products', desc: 'Build & Launch designs and launches custom AI apps, automations and web products: LLM agents, RAG, n8n, Make, CRMs, SaaS. From idea to launch.' }
  };
  var els = $$('[data-i18n]'), phs = $$('[data-i18n-ph]'), FR = {}, FRPH = {};
  els.forEach(function (el) { FR[el.dataset.i18n] = el.innerHTML; });
  phs.forEach(function (el) { FRPH[el.dataset.i18nPh] = el.placeholder; });
  var btn = $('#lang');
  function setLang(l) {
    els.forEach(function (el) {
      var k = el.dataset.i18n;
      if (l === 'en') { if (EN[k] != null) el.textContent = EN[k]; } else el.innerHTML = FR[k];
    });
    phs.forEach(function (el) { var k = el.dataset.i18nPh; el.placeholder = l === 'en' && EN[k] ? EN[k] : FRPH[k]; });
    document.documentElement.lang = l;
    document.title = META[l].title;
    $('meta[name=description]').content = META[l].desc;
    btn.textContent = l === 'en' ? 'FR' : 'EN';
    btn.setAttribute('aria-label', l === 'en' ? 'FR — version française' : 'EN — English version');
    try { localStorage.setItem('bl-lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }
  btn.addEventListener('click', function () { setLang(document.documentElement.lang === 'en' ? 'fr' : 'en'); });
  var saved = null;
  try { saved = localStorage.getItem('bl-lang'); } catch (e) {}
  var q = new URLSearchParams(location.search).get('lang');
  var start = q || saved || ((navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en');
  if (start === 'en') setLang('en');
  document.documentElement.classList.remove('i18n-wait');
})();
