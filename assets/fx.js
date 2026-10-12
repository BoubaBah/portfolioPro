/* Build & Launch — effets visuels
   Défilement doux, entrée et zoom du hero, titres révélés mot à mot, texte qui
   s'allume au défilement, compteurs, défilés, parallaxe, boutons magnétiques,
   cartes inclinables, FAQ animée. Tout est désactivé si l'utilisateur
   préfère réduire les animations. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function range(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function outCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function outExpo(t) { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function inOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function outBack(t) { var c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  function absTop(el) { var t = 0; while (el) { t += el.offsetTop; el = el.offsetParent; } return t; }

  /* ---------- défilement doux (souris / pavé tactile) ---------- */
  var lenis = null;
  if (!reduce && fine && window.Lenis) {
    lenis = new window.Lenis({
      autoRaf: true, lerp: .1, anchors: true,
      prevent: function (n) { return !!(n.closest && n.closest('#case')); }
    });
    window.BL_lenis = lenis;
  }
  window.BL_scrollTo = function (el) {
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  /* ---------- boucle de défilement unique ---------- */
  var onFrame = [], onMeasure = [], vh = innerHeight, lastY = scrollY, ticking = false;
  function frame() {
    ticking = false;
    var y = scrollY, v = y - lastY; lastY = y;
    for (var i = 0; i < onFrame.length; i++) onFrame[i](y, v);
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  function measure() {
    vh = innerHeight;
    for (var i = 0; i < onMeasure.length; i++) onMeasure[i]();
    request();
  }
  var mq = 0;
  function remeasure() { cancelAnimationFrame(mq); mq = requestAnimationFrame(measure); }

  /* ---------- barre de progression ---------- */
  var bar = $('.nav-progress'), docH = 1;
  if (bar) {
    onMeasure.push(function () { docH = Math.max(1, document.documentElement.scrollHeight - vh); });
    onFrame.push(function (y) { bar.style.transform = 'scaleX(' + clamp(y / docH, 0, 1).toFixed(4) + ')'; });
  }

  /* ---------- « Build & Launch » : le bleu du logo monte en descendant ---------- */
  var words = $$('.brand-word'), ftw = $$('.ft-word span'), F = {};
  if (!reduce) {
    onMeasure.push(function () { var f = $('.ft-word'); F.top = f ? absTop(f) : 0; F.h = f ? f.offsetHeight : 1; F.p = -1; F.q = -1; });
    onFrame.push(function (y) {
      var p = clamp(y / docH, 0, 1);
      if (Math.abs(p - F.p) > .001) { F.p = p; words.forEach(function (w) { w.style.backgroundPosition = '50% ' + (p * 100).toFixed(2) + '%'; }); }
      var q = outCubic(clamp((y + vh - F.top) / (F.h + vh * .55), 0, 1));
      if (Math.abs(q - F.q) > .001) { F.q = q; ftw.forEach(function (w, i) { w.style.backgroundPosition = '50% ' + (clamp(q * 1.15 - i * .07, 0, 1) * 100).toFixed(2) + '%'; }); }
    });
  }

  /* ---------- scène 1 — hero : le décor zoome, les besoins se déroulent le long d'une ligne ---------- */
  var hero = $('#top');
  if (hero && !reduce) {
    var hpin = $('.scene-pin', hero), bg = $('.hero-bg', hero), shade = $('.hero-shade', hero),
      copy = $('.hero-copy', hero), board = $('.needs', hero), track = $('.needs-in', hero), tl = $('.tl', hero),
      steps = $$('.tl-step', hero), rail = $('.tl-rail', hero), fill = $('.tl-fill', hero), dot = $('.tl-head', hero),
      cue = $('.hero-cue', hero), H = { p: -1 };
    var parts = steps.map(function (st) { return { st: st, node: $('.tl-node', st), branch: $('.tl-branch', st), txt: $('.tl-txt', st) }; });
    html.classList.add('hero-live');
    // chaque étape a sa fenêtre de temps dans le défilement
    var win = function (i) { var a = .12 + i * .16; return [a, a + .2]; };
    onMeasure.push(function () {
      var h = hpin.offsetHeight;
      H.mobile = innerWidth < 768;
      var copyBottom = copy.offsetTop + copy.offsetHeight;
      var peek = clamp(h - copyBottom - 12, 0, h * .16);
      H.y0 = h - board.offsetTop - peek;
      H.over = Math.max(0, board.offsetTop + board.offsetHeight + 24 - h);
      H.top = absTop(hero); H.dist = Math.max(1, hero.offsetHeight - h); H.h = h;
      // positions dans la frise : haut de chaque étape et centre de son point
      H.base = board.offsetTop + tl.offsetTop;
      H.tops = steps.map(function (st) { return st.offsetTop; });
      H.nodes = parts.map(function (q) { return q.st.offsetTop + q.node.offsetTop + q.node.offsetHeight / 2; });
      // la ligne s'arrête au dernier point
      H.rail = Math.max(1, H.nodes[H.nodes.length - 1] - 8);
      rail.style.bottom = 'auto'; rail.style.height = H.rail + 'px';
      var prev = 0;
      H.shift = steps.map(function (st, i) {
        var top = H.base + H.tops[i], want = Math.min(top + st.offsetHeight - (h - 40), top - 120);
        prev = Math.max(prev, clamp(want, 0, H.over));
        return prev;
      });
      H.p = -1;
    });
    onFrame.push(function (y) {
      var p = clamp((y - H.top) / H.dist, 0, 1);
      if (p === H.p) return;
      H.p = p;
      // le titre s'efface en remontant
      var c = outCubic(range(p, 0, .1));
      copy.style.opacity = (1 - c).toFixed(3);
      copy.style.transform = 'translate3d(0,' + (-c * H.h * .12).toFixed(1) + 'px,0) scale(' + (1 - c * .06).toFixed(4) + ')';
      copy.style.pointerEvents = c > .4 ? 'none' : '';
      // le décor zoome et s'assombrit pour laisser la place au texte
      var b = inOut(p);
      bg.style.transform = 'scale(' + (1 + .32 * b).toFixed(4) + ') translate3d(0,' + (-3 * b).toFixed(2) + '%,0)';
      shade.style.setProperty('--dark', (range(p, .04, .4) * .84).toFixed(3));
      // la frise monte et se redresse
      var s = outCubic(range(p, .05, .26)), z = inOut(range(p, .86, 1));
      board.style.transform = 'perspective(1600px) translate3d(0,' + (H.y0 * (1 - s)).toFixed(1) + 'px,0) rotateX(' + (16 * (1 - s)).toFixed(2) + 'deg) scale(' + (.94 + .06 * s + .02 * z).toFixed(4) + ')';
      // progression de chaque étape et décalage de la frise pour garder l'étape en cours à l'écran
      var sh = 0, k, es = [];
      for (k = 0; k < steps.length; k++) {
        var wk = win(k), from = k ? H.shift[k - 1] : 0;
        sh = from + (H.shift[k] - from) * inOut(range(p, wk[0] - .05, wk[1] - .02));
        if (p < wk[1] - .02) break;
      }
      for (k = 0; k < steps.length; k++) es[k] = range(p, win(k)[0], win(k)[1]);
      track.style.transform = 'translate3d(0,' + (-sh).toFixed(1) + 'px,0)';
      // la ligne se remplit jusqu'au point de l'étape qui arrive
      var fy = 0;
      parts.forEach(function (q, i) {
        var e = es[i], d = H.mobile ? 1 : (i % 2 ? 1 : -1);
        var a = outCubic(range(e, .15, 1)), n = outBack(range(e, 0, .45));
        q.node.style.opacity = clamp(n * 1.4, 0, 1).toFixed(3);
        q.node.style.transform = 'scale(' + (.4 + .6 * n).toFixed(4) + ')';
        q.branch.style.transform = 'scaleX(' + outCubic(range(e, .2, .7)).toFixed(4) + ')';
        q.txt.style.opacity = a.toFixed(3);
        q.txt.style.transform = 'translate3d(' + (-d * (1 - a) * 36).toFixed(1) + 'px,' + ((1 - a) * 18).toFixed(1) + 'px,0)';
        q.st.style.visibility = e <= 0 ? 'hidden' : '';
        var on = e > .55;
        if (on !== q.st.classList.contains('on')) q.st.classList.toggle('on', on);
        if (e > 0) { var from = i ? H.nodes[i - 1] : 0; fy = Math.max(fy, from + (H.nodes[i] - from) * outCubic(range(e, 0, .45))); }
      });
      fill.style.transform = 'scaleY(' + clamp((fy - 8) / H.rail, 0, 1).toFixed(4) + ')';
      var moving = fy > 1 && fy < H.nodes[H.nodes.length - 1] - 1;
      dot.style.transform = 'translate3d(0,' + (fy - 8).toFixed(1) + 'px,0)';
      dot.style.opacity = fy > 1 ? (moving ? 1 : .6) : 0;
      if (cue) cue.style.opacity = (1 - range(p, 0, .05)).toFixed(3);
    });
  }

  /* ---------- scène 2 — projets : la fenêtre monte, les téléphones arrivent ---------- */
  var sw = $('.scene-work');
  if (sw && !reduce) {
    var wpin = $('.scene-pin', sw), wcopy = $('.scene-copy', sw), stage = $('.stage', sw), phones = $$('.stage-ph', sw),
      chips = $$('.stage-chip', sw), glows = $$('.work-glow i', sw), W = { p: -1 };
    onMeasure.push(function () {
      var h = wpin.offsetHeight;
      W.top = absTop(sw); W.dist = Math.max(1, sw.offsetHeight - h); W.h = h;
      var copyBottom = wcopy.offsetTop + wcopy.offsetHeight;
      var peek = clamp(h - copyBottom + 40, 0, h * .24);
      W.y0 = h - stage.offsetTop - peek;
      W.zoom = innerWidth < 768 ? .03 : .05;
      W.p = -1;
    });
    onFrame.push(function (y) {
      var raw = (y - W.top) / W.dist;
      if (raw < -1.2 || raw > 1.2) return; // hors champ : rien à recalculer
      var p = clamp(raw, 0, 1);
      if (p === W.p) return;
      W.p = p;
      var c = outCubic(range(p, 0, .3));
      wcopy.style.opacity = (1 - c).toFixed(3);
      wcopy.style.transform = 'translate3d(0,' + (-c * W.h * .1).toFixed(1) + 'px,0) scale(' + (1 - c * .05).toFixed(4) + ')';
      glows.forEach(function (g, i) {
        g.style.transform = 'scale(' + (.55 + .6 * outCubic(range(p, 0, .7)) + i * .1).toFixed(4) + ')';
        g.style.opacity = (.35 + .65 * range(p, 0, .5)).toFixed(3);
      });
      var s = outCubic(range(p, .02, .62)), z = inOut(range(p, .7, 1));
      stage.style.transform = 'perspective(1600px) translate3d(0,' + (W.y0 * (1 - s)).toFixed(1) + 'px,0) rotateX(' + (28 * (1 - s)).toFixed(2) + 'deg) scale(' + (.86 + .14 * s + W.zoom * z).toFixed(4) + ')';
      phones.forEach(function (ph, i) {
        var e = outBack(range(p, .28 + i * .06, .62 + i * .06)), d = i ? 1 : -1;
        ph.style.opacity = clamp(e * 1.5, 0, 1).toFixed(3);
        // invisible = ni cliquable ni atteignable au clavier
        ph.style.visibility = e <= 0 ? 'hidden' : '';
        ph.style.pointerEvents = e < .6 ? 'none' : '';
        ph.style.transform = 'translate3d(' + (d * (1 - e) * 45).toFixed(1) + '%,' + ((1 - e) * 55).toFixed(1) + '%,0) rotate(' + (d * (1 - e) * 12).toFixed(2) + 'deg)';
      });
      // chaque notification apparaît juste après son projet (fenêtre, puis téléphones)
      chips.forEach(function (ch, i) {
        var e = outCubic(range(p, .38 + i * .12, .56 + i * .12));
        ch.style.opacity = e.toFixed(3);
        ch.style.transform = 'translate3d(0,' + ((1 - e) * 28).toFixed(1) + 'px,0) scale(' + (.88 + .12 * e).toFixed(4) + ')';
      });
    });
  }

  /* ---------- titres révélés mot à mot ---------- */
  function splitWords(el, start) {
    var words = el.textContent.trim().split(/[ \t\n\r]+/), i = start || 0;
    el.textContent = '';
    words.forEach(function (w, k) {
      var o = document.createElement('span'), n = document.createElement('span');
      o.className = 'w'; n.textContent = w; n.style.setProperty('--i', i++);
      o.appendChild(n); el.appendChild(o);
      if (k < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return i;
  }
  var heads = $$('.h-section, .h-split');
  function splitAll() {
    if (reduce) return;
    heads.forEach(function (h) {
      var parts = h.matches('[data-i18n]') ? [h] : $$('[data-i18n]', h), i = 0;
      if (!parts.length) parts = [h];
      parts.forEach(function (p) { i = splitWords(p, i); });
      h.classList.add('split');
    });
  }
  splitAll();

  /* ---------- texte qui s'allume au défilement ---------- */
  var scrubs = $$('[data-scrub]').map(function (el) { return { el: el, words: [], n: -1 }; });
  function splitScrub(s) {
    if (reduce) return;
    splitWords(s.el, 0);
    s.words = $$('.w', s.el); s.n = -1;
    s.el.classList.add('scrub');
  }
  scrubs.forEach(splitScrub);
  if (scrubs.length && !reduce) {
    onMeasure.push(function () { scrubs.forEach(function (s) { s.top = absTop(s.el); s.h = s.el.offsetHeight; s.n = -1; }); });
    onFrame.push(function (y) {
      scrubs.forEach(function (s) {
        var p = clamp((y + vh * .82 - s.top) / (s.h + vh * .38), 0, 1), n = Math.round(p * s.words.length);
        if (n === s.n) return;
        s.n = n;
        for (var i = 0; i < s.words.length; i++) s.words[i].classList.toggle('on', i < n);
      });
    });
  }

  document.addEventListener('langchange', function () {
    splitAll();
    scrubs.forEach(splitScrub);
    remeasure();
  });

  /* ---------- apparitions déclenchées à l'écran ---------- */
  if ('IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add('in');
        if (el.hasAttribute('data-count')) count(el);
        seen.unobserve(el);
      });
    }, { threshold: .3, rootMargin: '0px 0px -8% 0px' });
    heads.concat($$('.ft-word, [data-count], .proj')).forEach(function (el) { seen.observe(el); });
  } else $$('.split, .ft-word, .proj').forEach(function (el) { el.classList.add('in'); });

  /* ---------- icônes des services : le trait se dessine ---------- */
  if (!reduce) $$('#services .card > svg').forEach(function (svg) {
    svg.classList.add('draw');
    $$('path, circle, rect', svg).forEach(function (n) { n.setAttribute('pathLength', '1'); });
  });

  /* ---------- compteurs ---------- */
  function count(el) {
    var to = +el.getAttribute('data-to');
    if (reduce || !to) { el.textContent = to; return; }
    var t0 = performance.now(), dur = 1600 + to * 12;
    (function tick(t) {
      var k = clamp((t - t0) / dur, 0, 1);
      el.textContent = Math.round(outExpo(k) * to);
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if (!reduce) $$('[data-count]').forEach(function (el) { if (!el.classList.contains('in')) el.textContent = '0'; });

  /* ---------- défilé des outils ---------- */
  $$('.marquee-track').forEach(function (t) {
    $$('li', t).forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); t.appendChild(c); });
  });

  /* ---------- défilé d'écrans : accélère avec le défilement ---------- */
  var reel = $('.reel-wrap');
  if (reel && !reduce && Element.prototype.animate) {
    var anims = $$('.reel-track', reel).map(function (t) {
      t.insertAdjacentHTML('beforeend', t.innerHTML);
      var d = +t.parentNode.getAttribute('data-dir') || 1;
      return t.animate(
        [{ transform: 'translate3d(' + (d > 0 ? 0 : -50) + '%,0,0)' }, { transform: 'translate3d(' + (d > 0 ? -50 : 0) + '%,0,0)' }],
        { duration: 80000, iterations: Infinity }
      );
    });
    var rate = 1, target = 1, reelOn = false, rraf = 0;
    var rloop = function () {
      rate += (target - rate) * .08; target += (1 - target) * .06;
      anims.forEach(function (a) { a.playbackRate = rate; });
      rraf = reelOn ? requestAnimationFrame(rloop) : 0;
    };
    onFrame.push(function (y, v) { if (reelOn) target = clamp(1 + Math.abs(v) * .35, 1, 9); });
    new IntersectionObserver(function (es) {
      reelOn = es[0].isIntersecting;
      anims.forEach(function (a) { if (reelOn) a.play(); else a.pause(); });
      if (reelOn && !rraf) rraf = requestAnimationFrame(rloop);
    }).observe(reel);
  }

  /* ---------- vidéo : la carte s'ouvre en arrivant ---------- */
  var vcard = $('.vid-card');
  if (vcard && !reduce) {
    var V = {};
    onMeasure.push(function () { V.top = absTop(vcard); });
    onFrame.push(function (y) {
      var p = outCubic(clamp((y + vh - V.top) / (vh * .75), 0, 1));
      if (p === V.p) return;
      V.p = p;
      vcard.style.transform = 'scale(' + (.88 + .12 * p).toFixed(4) + ')';
    });
  }

  /* ---------- parallaxe du décor de contact ---------- */
  var cimg = $('#contact .parallax');
  if (cimg && !reduce) {
    var C = {};
    onMeasure.push(function () { var s = $('#contact'); C.top = absTop(s); C.h = s.offsetHeight; });
    onFrame.push(function (y) {
      if (y + vh < C.top || y > C.top + C.h) return;
      var p = (y + vh - C.top) / (C.h + vh);
      cimg.style.transform = 'translate3d(0,' + ((p - .5) * -14).toFixed(2) + '%,0) scale(1.18)';
    });
  }

  /* ---------- étapes de la méthode : la ligne suit le défilement ---------- */
  var proc = $('.proc'), pfill = $('#procfill');
  if (proc && pfill && !reduce) {
    var R = {};
    onMeasure.push(function () { R.top = absTop(proc); R.h = proc.offsetHeight; });
    onFrame.push(function (y) {
      var p = clamp((y + vh * .7 - R.top) / (R.h * .9), 0, 1);
      pfill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      proc.style.setProperty('--pp', p.toFixed(4));
    });
  }

  /* ---------- pointeur : projecteur, inclinaison, boutons magnétiques ---------- */
  if (fine && !reduce) {
    $$('.spot').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
    $$('.tilt').forEach(function (el) {
      var r = null;
      el.addEventListener('pointerenter', function () { r = el.getBoundingClientRect(); el.classList.add('tilting'); });
      el.addEventListener('pointermove', function (e) {
        if (!r) return;
        var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(900px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateY(-4px)';
      }, { passive: true });
      el.addEventListener('pointerleave', function () { r = null; el.classList.remove('tilting'); el.style.transform = ''; });
    });
    $$('.magnet').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * .22, y = (e.clientY - r.top - r.height / 2) * .32;
        el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
      }, { passive: true });
      el.addEventListener('pointerleave', function () { el.style.translate = ''; });
    });
  }

  /* ---------- FAQ : ouverture en douceur ---------- */
  if (!reduce && Element.prototype.animate) {
    $$('.faq').forEach(function (d) {
      var sum = $('summary', d), body = $('p', d), busy = false;
      sum.addEventListener('click', function (e) {
        e.preventDefault();
        if (busy) return;
        busy = true;
        var opening = !d.open;
        if (opening) { d.open = true; d.classList.add('opening'); }
        else d.classList.add('closing');
        var h = body.scrollHeight;
        body.style.overflow = 'hidden';
        var a = body.animate(
          opening ? [{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }] : [{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: opening ? 420 : 320, easing: 'cubic-bezier(.2,.7,.2,1)' }
        );
        a.onfinish = a.oncancel = function () {
          if (!opening) d.open = false;
          d.classList.remove('opening', 'closing');
          body.style.overflow = '';
          busy = false;
          remeasure();
        };
      });
    });
  }

  /* ---------- mise en route ---------- */
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', remeasure);
  addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  if ('ResizeObserver' in window) {
    var lastH = 0;
    new ResizeObserver(function () {
      var h = document.body.offsetHeight;
      if (h !== lastH) { lastH = h; remeasure(); }
    }).observe(document.body);
  } else remeasure();
})();
