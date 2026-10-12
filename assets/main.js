/* Build & Launch — interactions */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- starfield ---------- */
  var cv = $('#stars'), ctx = cv.getContext('2d'), stars = [], W, H, dpr;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    var n = Math.round((innerWidth * innerHeight) / 9000);
    stars = [];
    for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * .8 + .2, t: Math.random() * 6.28 });
  }
  var shoot = null, last = 0;
  function frame(ts) {
    ctx.clearRect(0, 0, W, H);
    var sy = scrollY * dpr;
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], y = ((s.y - sy * s.z * .15) % H + H) % H;
      var a = .25 + .55 * s.z * (reduce ? 1 : (.6 + .4 * Math.sin(ts / 900 + s.t)));
      ctx.fillStyle = 'rgba(200,225,255,' + a + ')';
      ctx.fillRect(s.x, y, s.z * 1.6 * dpr, s.z * 1.6 * dpr);
    }
    if (!reduce) {
      if (!shoot && ts - last > 5000 && Math.random() < .01) { shoot = { x: Math.random() * W * .6, y: Math.random() * H * .4, l: 0 }; last = ts; }
      if (shoot) {
        shoot.l += 14 * dpr;
        var g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x + shoot.l, shoot.y - shoot.l * .45);
        g.addColorStop(0, 'rgba(0,202,254,0)'); g.addColorStop(1, 'rgba(0,202,254,.8)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.5 * dpr; ctx.beginPath();
        ctx.moveTo(shoot.x + Math.max(0, shoot.l - 220 * dpr), shoot.y - Math.max(0, shoot.l - 220 * dpr) * .45);
        ctx.lineTo(shoot.x + shoot.l, shoot.y - shoot.l * .45); ctx.stroke();
        if (shoot.l > 600 * dpr) shoot = null;
      }
      requestAnimationFrame(frame);
    }
  }
  size(); addEventListener('resize', size);
  requestAnimationFrame(frame);
  if (reduce) addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true });

  /* ---------- nav ---------- */
  var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  function onScroll() { nav.classList.toggle('scrolled', scrollY > 20); }
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  function closeMenu() { menu.classList.remove('open'); nav.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = !menu.classList.contains('open');
    menu.classList.toggle('open', open); nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // active section highlight
  var links = $$('#menu a');
  var secObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['services', 'realisations', 'process', 'pourquoi', 'faq'].forEach(function (id) { var el = document.getElementById(id); if (el) secObs.observe(el); });

  /* ---------- reveal on scroll ---------- */
  var revObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(function (el, i) {
    var sib = el.parentElement ? $$(':scope > .reveal', el.parentElement).indexOf(el) : 0;
    el.style.transitionDelay = Math.min(sib, 5) * 80 + 'ms';
    revObs.observe(el);
  });

  /* ---------- project filters ---------- */
  $$('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.filters button').forEach(function (x) { x.classList.toggle('on', x === b); });
      var f = b.dataset.f;
      $$('#work .proj').forEach(function (p) {
        var show = f === 'all' || p.dataset.cat.split(' ').indexOf(f) > -1;
        p.classList.toggle('hide', !show);
        p.classList.toggle('proj-wide', show && p.dataset.wide === '1' && f === 'all');
      });
    });
  });
  $$('#work .proj-wide').forEach(function (p) { p.dataset.wide = '1'; });

  /* ---------- automation demo ---------- */
  var flow = $('#flow'), nodes = $$('#flow .node'), logs = $$('#flow .flow-log p'), timer = null;
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
      if (i > nodes.length + 4) { runFlow(); }
    }, 700);
  }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { if (reduce) { nodes.concat(logs).forEach(function (n) { n.classList.add('on'); }); } else runFlow(); }
      else clearInterval(timer);
    });
  }, { threshold: .35 }).observe(flow);

  /* ---------- process line ---------- */
  new IntersectionObserver(function (es, o) {
    es.forEach(function (e) { if (e.isIntersecting) { $('#procfill').style.width = '100%'; o.disconnect(); } });
  }, { threshold: .4 }).observe($('.proc'));

  $('#yr').textContent = new Date().getFullYear();

  /* ---------- i18n (FR in HTML, EN here) ---------- */
  var EN = {
    'skip': 'Skip to content',
    'nav.services': 'Services', 'nav.work': 'Work', 'nav.process': 'Process', 'nav.why': 'Why us', 'nav.faq': 'FAQ', 'nav.cta': 'Start a project',
    'hero.eyebrow': 'AI · Automation · Web studio', 'hero.t1': 'Your ideas,', 'hero.t2': 'built and launched.',
    'hero.lead': 'Custom AI apps, automations and web products — designed to save your team time and get your business off the ground.',
    'hero.cta1': 'Tell us about your project', 'hero.cta2': 'See our work',
    'hero.s1': 'products built', 'hero.s2': 'core expertises', 'hero.s3': 'automations running',
    'hv.q': 'Summarize this contract and list the deadlines.', 'hv.a': '3 years · price review on Jan 1 · 3-month notice · next deadline →', 'hv.d': 'March 15',
    'hv.flow': 'workflow · new lead', 'hv.log': 'lead qualified · CRM updated · email sent', 'hv.kpi': 'manual tasks', 'hv.kpinote': 'example target',
    'svc.k': 'Services', 'svc.h': 'What we build for you.', 'svc.sub': 'Three core areas of expertise, one goal: save you time and money — measurably.',
    'svc.1.t': 'AI apps & LLM agents', 'svc.1.p': 'Assistants, chatbots and AI agents connected to your data and tools: they answer, search, extract and act on your behalf.',
    'svc.1.l1': 'Chatbots & business assistants', 'svc.1.l2': 'RAG: AI that knows your documents', 'svc.1.l3': 'Content extraction & generation',
    'svc.2.t': 'Business process automation', 'svc.2.p': 'Your repetitive tasks run on their own: follow-ups, reporting, lead qualification, tool sync. Your team gets hours back every week.',
    'svc.2.l1': 'n8n, Make, Zapier workflows', 'svc.2.l2': 'API integrations & custom scripts', 'svc.2.l3': 'AI built into your processes',
    'svc.3.t': 'Web apps & SaaS', 'svc.3.p': 'CRMs, dashboards, marketplaces, SaaS platforms: tools with a strong visual identity, built to be adopted from day one.',
    'svc.3.l1': 'Web apps & PWAs', 'svc.3.l2': 'Member areas, subscriptions, payments', 'svc.3.l3': 'Polished UX, mobile & desktop',
    'svc.m1.t': 'CRMs & dashboards', 'svc.m1.p': 'Manage leads, contracts and teams in real time.',
    'svc.m2.t': 'Websites & portfolios', 'svc.m2.p': 'Elegant, fast, multilingual — WordPress, Shopify or custom.',
    'svc.m3.t': 'AI audit & consulting', 'svc.m3.p': 'We find what costs you time and what AI can truly change.',
    'work.k': 'Work', 'work.h': 'Real products, built & shipped.', 'work.sub': 'Live projects and products in final development — click to explore. Detailed demos on request.',
    'work.f0': 'All', 'work.f1': 'AI', 'work.f2': 'Web apps & SaaS', 'work.f3': 'Websites',
    'st.live': 'Live', 'st.dev': 'In development', 'cat.crm': 'CRM · Energy', 'cat.ai': 'AI agent', 'cat.site': 'Website',
    'cta.live': 'View live', 'cta.demo': 'View demo', 'tag.pay': 'Payments', 'tag.multi': 'Multilingual',
    'p.crm': 'CRM for energy brokers: centralized lead management, contract tracking, automated follow-ups and an analytics dashboard for sales teams.',
    'p.crm.l1': 'Automated follow-ups', 'p.crm.l2': 'Analytics dashboard', 'p.crm.l3': 'Contract tracking',
    'p.ai': 'All-in-one AI agent: chat, deep research, image generation and document extraction — powered by LLMs and Supabase.',
    'p.edu': 'Modern learning platform: a PWA with push notifications, intuitive navigation and step-by-step learning content.',
    'p.fit': 'Fitness & nutrition coach: training programs, nutrition tracking, intermittent fasting, personal records and challenges with friends.',
    'p.match': 'Matching energy clients with brokers: smart qualification flow, auto-generated brief and a real-time broker dashboard.',
    'p.club': 'Community platform for energy professionals: member area, exclusive content, subscriptions and online payments.',
    'p.site': 'Elegant multilingual website (FR / EN): profile, work and contact, with a smooth experience on mobile and desktop.',
    'demo.k': 'In action', 'demo.h': 'An automation, in practice.', 'demo.sub': 'A prospect fills in your form. Within seconds, with nobody behind the screen:',
    'demo.l1': 'AI analyzes and qualifies the request', 'demo.l2': 'Your CRM is updated (score, tags, owner)', 'demo.l3': 'A personalized email goes out instantly', 'demo.l4': 'Your team is notified, reporting updates itself',
    'demo.cta': 'Automate my processes',
    'fl.1': 'New lead', 'fl.2': 'AI qualifies it', 'fl.3': 'CRM updated', 'fl.4': 'Personal email', 'fl.4s': 'Written by AI', 'fl.5': 'Team notified',
    'fl.log1': 'lead #1042 qualified — score 87/100', 'fl.log2': 'personalized follow-up sent', 'fl.log3': 'CRM synced · team notified',
    'proc.k': 'Process', 'proc.h': 'From brief to lift-off, in 4 steps.', 'proc.sub': 'A simple, transparent process: you always know where your project stands.',
    'proc.1.t': 'Listen', 'proc.1.p': 'We learn your business, your pain points and what costs you time — before talking tech.',
    'proc.2.t': 'Design', 'proc.2.p': 'The simplest solution that works: no bloat, no gimmicks. Every piece has a reason to exist.',
    'proc.3.t': 'Build', 'proc.3.p': 'Development, integration with your existing tools and real-world testing with your team.',
    'proc.4.t': 'Launch', 'proc.4.p': 'Go-live, onboarding, measured impact — hours saved, leads handled — then we iterate.',
    'why.k': 'Why Build & Launch', 'why.h': 'Solid code, built for your business.',
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
    'ct.l1': 'Fast reply guaranteed', 'ct.l2': 'Clear, detailed quote', 'ct.l3': 'Projects in English or French',
    'f.name': 'Name', 'f.email': 'Email', 'f.company': 'Company (optional)', 'f.type': 'Project type',
    'f.t1': 'AI app', 'f.t2': 'Automation', 'f.t3': 'Web app / SaaS', 'f.t4': 'Website', 'f.t5': 'Audit / consulting',
    'f.msg': 'Your project in a few lines', 'f.send': 'Send my request',
    'ft.tag': 'We build. You launch.'
  };
  var META = {
    fr: { title: document.title, desc: $('meta[name=description]').content },
    en: { title: 'Build & Launch — AI apps, automation & web products', desc: 'Build & Launch designs and launches custom AI apps, automations and web products: LLM agents, RAG, n8n, Make, CRMs, SaaS. From idea to launch.' }
  };
  var els = $$('[data-i18n]'), FR = {};
  els.forEach(function (el) { FR[el.dataset.i18n] = el.innerHTML; });
  var btn = $('#lang');
  function setLang(l) {
    els.forEach(function (el) {
      var k = el.dataset.i18n, v = l === 'en' ? EN[k] : FR[k];
      if (v != null) { if (l === 'en') el.textContent = v; else el.innerHTML = v; }
    });
    document.documentElement.lang = l;
    document.title = META[l].title;
    $('meta[name=description]').content = META[l].desc;
    btn.textContent = l === 'en' ? 'FR' : 'EN';
    btn.setAttribute('aria-label', l === 'en' ? 'Passer en français' : 'Switch to English');
    $('.form').setAttribute('action', l === 'en' ? 'merci.html?lang=en' : 'merci.html');
    try { localStorage.setItem('bl-lang', l); } catch (e) {}
  }
  btn.addEventListener('click', function () { setLang(document.documentElement.lang === 'en' ? 'fr' : 'en'); });
  var saved = null;
  try { saved = localStorage.getItem('bl-lang'); } catch (e) {}
  var q = new URLSearchParams(location.search).get('lang');
  var start = q || saved || ((navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en');
  if (start === 'en') setLang('en');
})();
