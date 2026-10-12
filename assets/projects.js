/* Build & Launch — cartes et fiches projets
   Les données viennent de assets/projects-data.js (généré depuis src/projects.mjs).
   Chaque projet a sa propre identité : couleur, monogramme, étiquette de curseur,
   animation d'apparition, de survol et d'ouverture.
   Les captures sont celles des produits, avec des données de démonstration :
   aucun code, aucune architecture ni aucun détail de mise en production. */
(function () {
  'use strict';
  var DATA = window.BL_PROJECTS;
  if (!DATA) return;
  var P = DATA.items, ORDER = DATA.order;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var html = document.documentElement;
  function L() { return html.lang === 'en' ? 'en' : 'fr'; }
  function scrollToEl(el) { if (window.BL_scrollTo) window.BL_scrollTo(el); else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }

  /* ---------- libellés de l'interface ---------- */
  var UI = {
    fr: {
      preview: 'Captures du projet', note: 'Captures réelles du produit, avec des données de démonstration.',
      slide: 'diapositive', prevShot: 'Capture précédente', nextShot: 'Capture suivante',
      challenge: 'Le défi', solution: 'La solution', features: 'Fonctionnalités clés', journey: 'Parcours utilisateur',
      goals: 'Pensé pour', built: 'Ce que nous avons conçu', live: 'Voir en ligne', demo: 'Voir la démo',
      similar: 'Un projet similaire ? Parlons-en', close: 'Fermer', prev: 'Projet précédent', next: 'Projet suivant',
      statusLive: 'En ligne', statusDev: 'En développement',
      prefill: 'Bonjour, je souhaiterais un projet similaire à {name}. '
    },
    en: {
      preview: 'Project screens', note: 'Real product screens, with sample data.',
      slide: 'slide', prevShot: 'Previous screen', nextShot: 'Next screen',
      challenge: 'The challenge', solution: 'The solution', features: 'Key features', journey: 'User journey',
      goals: 'Designed for', built: 'What we built', live: 'View live', demo: 'View demo',
      similar: 'Want something similar? Let’s talk', close: 'Close', prev: 'Previous project', next: 'Next project',
      statusLive: 'Live', statusDev: 'In development',
      prefill: 'Hello, I’d like a project similar to {name}. '
    }
  };

  /* ---------- rendu d'une fiche ---------- */
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_L = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICON_R = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function pic(g, sizes, alt, eager) {
    var set = g.w.map(function (w) { return g.src + '-' + w + '.webp ' + w + 'w'; }).join(', ');
    var w = g.w[Math.min(1, g.w.length - 1)];
    return '<img src="' + g.src + '-' + w + '.webp" srcset="' + set + '" sizes="' + sizes + '" width="' + w + '" height="' + Math.round(w * g.ratio) + '" alt="' + esc(alt) + '"' + (eager ? '' : ' loading="lazy"') + ' decoding="async">';
  }
  function build(id) {
    var p = P[id], t = p[L()], u = UI[L()], l = L();
    var i = ORDER.indexOf(id), prevId = ORDER[(i + ORDER.length - 1) % ORDER.length], nextId = ORDER[(i + 1) % ORDER.length];
    var n = p.gallery.length;
    var slides = p.gallery.map(function (g, k) {
      var label = g[l], alt = p.name + ' — ' + label;
      var inner = g.kind === 'mob'
        ? '<div class="cs-phone">' + pic(g, '(min-width: 768px) 280px, 56vw', alt, k === 0) + '</div>'
        : '<div class="bar" aria-hidden="true"><i></i><i></i><i></i><span>' + esc(p.host) + '</span></div><div class="cs-shot">' + pic(g, '(min-width: 1120px) 1040px, 96vw', alt, k === 0) + '</div>';
      return '<div class="cs-slide is-' + g.kind + '" id="cs-s' + k + '" role="group" aria-roledescription="' + u.slide + '" aria-label="' + (k + 1) + ' / ' + n + ' · ' + esc(label) + '">' + inner + '</div>';
    }).join('');
    var dots = p.gallery.map(function (g, k) {
      return '<button type="button" class="cs-dot" data-slide="' + k + '" aria-controls="cs-s' + k + '"' + (k ? '' : ' aria-current="true"') + '>' + esc(g[l]) + '</button>';
    }).join('');
    return '<div class="case-panel p-' + id + '" style="--acc:' + p.acc + '" data-anim="' + p.anim + '" data-lenis-prevent>' +
      '<header class="cs-head"><div class="cs-id"><span class="pmono">' + esc(p.mono) + '</span><span class="tag' + (p.live ? ' tag-live' : '') + '">' + (p.live ? u.statusLive : u.statusDev) + '</span><span class="cs-cat">' + esc(t.cat) + '</span></div>' +
      '<button type="button" class="cs-close" data-close aria-label="' + u.close + '">' + ICON_CLOSE + '</button></header>' +
      '<div class="cs-body">' +
      '<div class="cs-intro"><h2 id="cs-title" class="cs-title">' + esc(p.name) + '</h2><p class="cs-tagline">' + esc(t.tagline) + '</p></div>' +
      '<section class="cs-gal" aria-label="' + u.preview + '">' +
      '<div class="cs-stage"><div class="cs-track" tabindex="0">' + slides + '</div>' +
      (n > 1 ? '<button type="button" class="cs-arrow l" data-step="-1" aria-label="' + u.prevShot + '">' + ICON_L + '</button><button type="button" class="cs-arrow r" data-step="1" aria-label="' + u.nextShot + '">' + ICON_R + '</button>' : '') +
      '</div>' +
      (n > 1 ? '<div class="cs-dots">' + dots + '</div>' : '') +
      '<p class="cs-note">' + u.note + '</p></section>' +
      '<div class="cs-two"><section><h3 class="cs-h">' + u.challenge + '</h3><p>' + esc(t.challenge) + '</p></section><section><h3 class="cs-h">' + u.solution + '</h3><p>' + esc(t.solution) + '</p></section></div>' +
      '<section><h3 class="cs-h">' + u.features + '</h3><div class="cs-feats">' + t.features.map(function (f, k) {
        return '<div class="cs-feat"><span class="cs-num">0' + (k + 1) + '</span><b>' + esc(f[0]) + '</b><p>' + esc(f[1]) + '</p></div>';
      }).join('') + '</div></section>' +
      '<section><h3 class="cs-h">' + u.journey + '</h3><ol class="cs-journey">' + t.journey.map(function (j, k) {
        return '<li><span>' + (k + 1) + '</span><p>' + esc(j) + '</p></li>';
      }).join('') + '</ol></section>' +
      '<div class="cs-two"><section><h3 class="cs-h">' + u.goals + '</h3><ul class="cs-goals">' + t.goals.map(function (g) { return '<li class="tick">' + esc(g) + '</li>'; }).join('') + '</ul></section>' +
      '<section><h3 class="cs-h">' + u.built + '</h3><div class="cs-built">' + t.built.map(function (b) { return '<span class="tag">' + esc(b) + '</span>'; }).join('') + '</div></section></div>' +
      '<div class="cs-cta"><a class="btn-ghost" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + (p.live ? u.live : u.demo) + ' <span aria-hidden="true">↗</span></a><button type="button" class="btn-primary" data-similar>' + u.similar + '</button></div>' +
      '</div>' +
      '<footer class="cs-foot"><button type="button" data-go="' + prevId + '"><span class="dir">← ' + u.prev + '</span><b>' + esc(P[prevId].name) + '</b></button>' +
      '<button type="button" data-go="' + nextId + '" class="nx"><span class="dir">' + u.next + ' →</span><b>' + esc(P[nextId].name) + '</b></button></footer>' +
      '</div>';
  }

  /* ---------- galerie de la fiche (carrousel à défilement natif) ---------- */
  var slideIdx = 0;
  function track() { return $('.cs-track', dlg); }
  function goSlide(k, smooth) {
    var tr = track(), s = tr && tr.children[k];
    if (!s) return;
    tr.scrollTo({ left: s.offsetLeft - tr.offsetLeft, behavior: smooth && !reduce ? 'smooth' : 'auto' });
    setDot(k);
  }
  function setDot(k) {
    slideIdx = k;
    var box = $('.cs-dots', dlg);
    $$('.cs-dot', dlg).forEach(function (d, j) {
      if (j !== k) return d.removeAttribute('aria-current');
      d.setAttribute('aria-current', 'true');
      // pastilles défilantes (mobile) : garder la pastille active visible
      if (box && box.scrollWidth > box.clientWidth) box.scrollTo({ left: d.offsetLeft - box.offsetLeft - (box.clientWidth - d.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    });
    var n = track() ? track().children.length : 0;
    $$('.cs-arrow', dlg).forEach(function (a) { a.disabled = (a.classList.contains('l') && k === 0) || (a.classList.contains('r') && k === n - 1); });
  }
  function wireGallery() {
    var tr = track();
    if (!tr) return;
    var raf = 0;
    tr.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; var k = Math.round(tr.scrollLeft / tr.clientWidth); if (k !== slideIdx) setDot(k); });
    }, { passive: true });
    tr.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); goSlide(Math.max(0, Math.min(tr.children.length - 1, slideIdx + (e.key === 'ArrowRight' ? 1 : -1))), true); }
    });
    setDot(0);
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
    wireGallery();
    animateIn(id, fromEl);
  }

  function open(id, fromEl, push) {
    if (!P[id]) return;
    closing = false; dlg.classList.remove('closing');
    render(id, fromEl);
    if (!dlg.open) {
      dlg.showModal();
      html.classList.add('case-open');
      if (window.BL_lenis) window.BL_lenis.stop();
      $('.cs-close', dlg).focus({ preventScroll: true });
    }
    if (push) history.pushState({ bl: id }, '', '#projet-' + id);
  }

  function cleanup() {
    dlg.classList.remove('closing'); closing = false;
    dlg.innerHTML = '';
    html.classList.remove('case-open');
    if (window.BL_lenis) window.BL_lenis.start();
    var id = current; current = null;
    if (pendingContact) { goContact(pendingContact); pendingContact = null; return; }
    var f = trigger || (id && $('#work [data-open="' + id + '"]'));
    if (f) f.focus({ preventScroll: true });
  }
  function finish() {
    if (!dlg.open) return;
    dlg.close();
    cleanup();
  }
  // fermeture imposée par le navigateur (Échap sans interaction préalable avec la page)
  dlg.addEventListener('close', function () {
    if (!current) return;
    cleanup();
    if (history.state && history.state.bl) history.back();
  });

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
    scrollToEl($('#contact'));
    setTimeout(function () { if (msg) { msg.focus({ preventScroll: true }); msg.setSelectionRange(msg.value.length, msg.value.length); } }, reduce ? 0 : 1100);
  }

  /* ---------- interactions dans la fiche ---------- */
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); requestClose(); });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) return requestClose(); // clic sur le fond
    var t = e.target.closest('[data-close],[data-go],[data-similar],[data-slide],[data-step]');
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
    else if (t.hasAttribute('data-slide')) goSlide(+t.getAttribute('data-slide'), true);
    else if (t.hasAttribute('data-step')) goSlide(Math.max(0, Math.min(track().children.length - 1, slideIdx + +t.getAttribute('data-step'))), true);
  });

  document.addEventListener('langchange', function () {
    if (current && dlg.open) {
      var k = slideIdx, top = $('.case-panel', dlg).scrollTop;
      dlg.innerHTML = build(current);
      wireGallery();
      $('.case-panel', dlg).scrollTop = top;
      if (k) goSlide(k, false);
    }
  });

  /* ---------- cartes ---------- */
  var cards = $$('#work .proj');
  cards.forEach(function (card) {
    var b = $('[data-open]', card);
    b.addEventListener('click', function () { trigger = b; open(b.getAttribute('data-open'), card, true); });

    // aperçu défilant : la page complète se charge à la demande puis défile dans la fenêtre
    var sc = $('.pm-scroll', card);
    if (sc) {
      var ratio = sc.getAttribute('height') / sc.getAttribute('width'), screens = ratio / .625;
      card.style.setProperty('--dur', Math.min(9, Math.max(2.4, (screens - 1) * 1.25)).toFixed(2) + 's');
      card._load = function () {
        if (!sc.dataset.src) return;
        sc.addEventListener('load', function () { sc.classList.add('ready'); }, { once: true });
        sc.srcset = sc.dataset.srcset; sc.src = sc.dataset.src;
        delete sc.dataset.src; delete sc.dataset.srcset;
      };
    }
  });

  if (fine) {
    cards.forEach(function (card) {
      card.addEventListener('pointerenter', function () { if (card._load) card._load(); card.classList.add('preview'); });
      card.addEventListener('pointerleave', function () { card.classList.remove('preview'); });
    });
  } else if (!reduce && 'IntersectionObserver' in window) {
    // écrans tactiles : l'aperçu se charge à l'approche et se joue quand la carte est bien visible
    var near = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { if (e.target._load) e.target._load(); near.unobserve(e.target); } });
    }, { rootMargin: '400px 0px' });
    var play = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('preview', e.isIntersecting); });
    }, { threshold: .6 });
    cards.forEach(function (c) { near.observe(c); play.observe(c); });
  }

  // étiquette qui suit le curseur
  var chip = $('.cursor-chip');
  if (chip && fine) {
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0, on = false;
    var loop = function () {
      x += (tx - x) * (reduce ? 1 : .22); y += (ty - y) * (reduce ? 1 : .22);
      chip.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      raf = on || Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0;
    };
    cards.forEach(function (card) {
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
  var m = location.hash.match(/^#projet-([a-z0-9]+)$/);
  if (m && P[m[1]]) {
    history.replaceState(null, '', location.pathname + location.search);
    trigger = $('#work [data-open="' + m[1] + '"]');
    open(m[1], null, true);
  }
})();
