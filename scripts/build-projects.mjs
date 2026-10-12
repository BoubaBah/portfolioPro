/* Build & Launch — génération des projets
   Lit src/projects.mjs + src/projects/<id>/*, puis :
     - produit les images optimisées dans assets/projects/<id>/
     - écrit les cartes, la scène du hero et le défilé d'écrans dans index.html
       (entre les marqueurs <!-- XXX:START --> / <!-- XXX:END -->)
     - écrit assets/projects-data.js (fiches détaillées + traductions EN)
   Usage : node scripts/build-projects.mjs  (lancé par npm run build) */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import projects from '../src/projects.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src/projects');
const OUT = path.join(ROOT, 'assets/projects');
const PUB = 'assets/projects';

// largeurs produites par type de capture
const WIDTHS = { desk: [480, 1024, 1600], mob: [320, 640], full: [640, 1024] };
const RATIO = { desk: 10 / 16, mob: 844 / 390 };
const QUALITY = 80;
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; // image vide en attendant le chargement à la demande

const kindOf = (name) => (name.endsWith('-full') ? 'full' : name.endsWith('-m') ? 'mob' : 'desk');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function findSource(id, name) {
  for (const ext of ['webp', 'png', 'jpg', 'jpeg']) {
    const f = path.join(SRC, id, `${name}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  throw new Error(`Image introuvable : src/projects/${id}/${name}.(webp|png|jpg)`);
}

/* ---------- images ---------- */
const produced = new Set();
const IMG = {}; // IMG[id][name] = { kind, w: [...], ratio }

async function image(id, name) {
  IMG[id] ??= {};
  if (IMG[id][name]) return IMG[id][name];
  const kind = kindOf(name), src = findSource(id, name);
  const meta = await sharp(src).metadata();
  const ratio = kind === 'full' ? meta.height / meta.width : RATIO[kind];
  const dir = path.join(OUT, id);
  fs.mkdirSync(dir, { recursive: true });
  const ws = WIDTHS[kind].filter((w, i) => i === 0 || w <= meta.width);
  for (const w of ws) {
    const file = path.join(dir, `${name}-${w}.webp`);
    produced.add(file);
    if (fs.existsSync(file) && fs.statSync(file).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    const h = Math.round(w * ratio);
    await sharp(src)
      .resize(w, h, { fit: 'cover', position: 'top' })
      .webp({ quality: kind === 'full' ? QUALITY - 6 : QUALITY, effort: 5, smartSubsample: true })
      .toFile(file);
  }
  return (IMG[id][name] = { kind, w: ws, ratio: +ratio.toFixed(4) });
}

const base = (id, name) => `${PUB}/${id}/${name}`;
const srcset = (id, name, im) => im.w.map((w) => `${base(id, name)}-${w}.webp ${w}w`).join(', ');
const pick = (im, target) => im.w.find((w) => w >= target) ?? im.w[im.w.length - 1];

function imgTag(id, name, im, { sizes, cls = '', lazy = true, alt = '', data = false, target = 800, extra = '', low = false }) {
  const w = pick(im, target), h = Math.round(w * im.ratio);
  const a = data
    ? `src="${BLANK}" data-src="${base(id, name)}-${w}.webp" data-srcset="${srcset(id, name, im)}"`
    : `src="${base(id, name)}-${w}.webp" srcset="${srcset(id, name, im)}"`;
  return `<img ${a} sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${lazy ? ' loading="lazy"' : ''}${low ? ' fetchpriority="low"' : ''} decoding="async"${extra}>`;
}

/* ---------- validation ---------- */
const ids = new Set();
for (const p of projects) {
  for (const k of ['id', 'name', 'mono', 'acc', 'anim', 'filter', 'contactType', 'host', 'images', 'fr', 'en']) {
    if (p[k] == null) throw new Error(`Projet ${p.id || '?'} : champ « ${k} » manquant`);
  }
  if (ids.has(p.id)) throw new Error(`Identifiant en double : ${p.id}`);
  if (!/^[a-z0-9]+$/.test(p.id)) throw new Error(`Identifiant invalide (a-z, 0-9) : ${p.id}`);
  ids.add(p.id);
  for (const l of ['fr', 'en']) for (const k of ['cat', 'chip', 'desc', 'tagline', 'challenge', 'solution', 'features', 'journey', 'goals', 'built']) {
    if (p[l][k] == null) throw new Error(`Projet ${p.id} (${l}) : champ « ${k} » manquant`);
  }
}

/* ---------- traitement ---------- */
const data = { order: [], items: {} };
const EN = {};
for (const p of projects) {
  const { images } = p;
  const names = new Set([images.cover, images.scroll, images.mobile, ...images.gallery.map((g) => g[0])].filter(Boolean));
  for (const n of names) await image(p.id, n);
  data.order.push(p.id);
  data.items[p.id] = {
    name: p.name, mono: p.mono, acc: p.acc, anim: p.anim, live: !!p.live, url: p.url || null, host: p.host, type: p.contactType,
    gallery: images.gallery.map(([n, fr, en]) => {
      const im = IMG[p.id][n];
      return { src: base(p.id, n), kind: im.kind, w: im.w, ratio: im.ratio, fr, en };
    }),
    fr: p.fr, en: p.en
  };
  EN[`pj.${p.id}.cat`] = p.en.cat;
  EN[`pj.${p.id}.desc`] = p.en.desc;
  (p.en.points || []).forEach((t, i) => (EN[`pj.${p.id}.l${i + 1}`] = t));
  EN[`pj.${p.id}.open`] = `Explore the ${p.name} project`;
  if (p.hero) EN[`pj.${p.id}.hero`] = p.hero.en;
}

/* ---------- cartes ---------- */
function card(p, i) {
  const { id, images } = p, fr = p.fr, feat = !!p.featured;
  const cover = IMG[id][images.cover], mob = images.mobile && IMG[id][images.mobile], full = images.scroll && IMG[id][images.scroll];
  const sizes = feat ? '(min-width: 1024px) 680px, (min-width: 768px) 90vw, 92vw' : '(min-width: 1200px) 560px, (min-width: 768px) 46vw, 92vw';
  const live = p.live
    ? '<span class="tag tag-live" data-i18n="st.live">En ligne</span>'
    : '<span class="tag" data-i18n="st.dev">En développement</span>';
  const media = [
    `<div class="pm" aria-hidden="true">`,
    `<div class="pm-win"><div class="bar"><i></i><i></i><i></i><span>${esc(p.host)}</span></div>`,
    `<div class="pm-view">`,
    imgTag(id, images.cover, cover, { sizes, cls: 'pm-cover', target: feat ? 1024 : 1024 }),
    full ? imgTag(id, images.scroll, full, { sizes, cls: 'pm-scroll', data: true, target: 640, lazy: false }) : '',
    `</div></div>`,
    mob ? `<div class="pm-phone">${imgTag(id, images.mobile, mob, { sizes: feat ? '(min-width: 1024px) 170px, 26vw' : '(min-width: 768px) 120px, 26vw', target: 320 })}</div>` : '',
    `</div>`
  ].join('');
  const points = feat && fr.points
    ? `<ul class="proj-points">${fr.points.map((t, k) => `<li class="tick" data-i18n="pj.${id}.l${k + 1}">${esc(t)}</li>`).join('')}</ul>`
    : '';
  const cta = `<div class="proj-actions"><span class="proj-cta" aria-hidden="true"><span data-i18n="cta.case">Découvrir le projet</span><span class="arr">→</span></span>` +
    (p.url ? `<a class="ext" href="${esc(p.url)}" target="_blank" rel="noopener"><span data-i18n="${p.live ? 'cta.live' : 'cta.demo'}">${p.live ? 'Voir en ligne' : 'Voir la démo'}</span> <span aria-hidden="true">↗</span></a>` : '') +
    `</div>`;
  return [
    `<article class="proj p-${id}${feat ? ' is-feat' : ''}${mob ? ' has-phone' : ''}${full ? ' has-scroll' : ''}" data-project="${id}" data-cat="${esc(p.filter)}" data-anim="${p.anim}" style="--acc:${p.acc}">`,
    media,
    `<div class="proj-body">`,
    `<div class="proj-meta"><span class="pmono" aria-hidden="true">${esc(p.mono)}</span>${live}<span class="proj-cat" data-i18n="pj.${id}.cat">${esc(fr.cat)}</span></div>`,
    `<h3 class="proj-title"><button type="button" class="proj-open" data-open="${id}" aria-haspopup="dialog">${esc(p.name)}</button></h3>`,
    `<p class="proj-desc" data-i18n="pj.${id}.desc">${esc(fr.desc)}</p>`,
    points,
    cta,
    `</div>`,
    `</article>`
  ].join('\n');
}
const cardsHtml = projects.map(card).join('\n\n');

/* ---------- scène du hero ----------
   Le projet vedette dans une fenêtre, deux projets sur téléphone : chacun ouvre
   sa fiche au clic et porte sa propre notification (champ « hero »). */
const featured = projects.find((p) => p.featured) || projects[0];
const phones = projects.filter((p) => p.heroPhone && p.images.mobile && p !== featured).slice(0, 2);
const fCover = IMG[featured.id][featured.images.cover];
const heroChip = (p, cls) => p.hero
  ? `<span class="stage-chip ${cls}" style="--c:${p.acc}" aria-hidden="true"><i></i><span><b>${esc(p.name)}</b><em data-i18n="pj.${p.id}.hero">${esc(p.hero.fr)}</em></span></span>`
  : '';
const openLabel = (p) => `<span class="sr-only" data-i18n="pj.${p.id}.open">Découvrir le projet ${esc(p.name)}</span>`;
const stageHtml = [
  `<button type="button" class="stage-win stage-item" data-open="${featured.id}" aria-haspopup="dialog" style="--acc:${featured.acc}">${openLabel(featured)}`,
  `<span class="stage-screen"><span class="bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(featured.host)}</span></span>`,
  imgTag(featured.id, featured.images.cover, fCover, { sizes: '(min-width: 1280px) 1080px, 92vw', target: 1600, lazy: false, low: true }),
  `</span>${heroChip(featured, 'sc-win')}</button>`,
  ...phones.map((p, i) => `<button type="button" class="stage-ph stage-ph-${i ? 'r' : 'l'} stage-item" data-open="${p.id}" aria-haspopup="dialog" style="--acc:${p.acc}">${openLabel(p)}` +
    `<span class="stage-phone">${imgTag(p.id, p.images.mobile, IMG[p.id][p.images.mobile], { sizes: '(min-width: 1024px) 210px, 30vw', target: 640, low: true })}</span>` +
    `${heroChip(p, i ? 'sc-r' : 'sc-l')}</button>`)
].join('\n');

/* ---------- défilé d'écrans ---------- */
const deskShots = [], mobShots = [];
for (const p of projects) {
  const g = p.images.gallery.map((x) => x[0]);
  g.filter((n) => kindOf(n) === 'desk').slice(0, 2).forEach((n) => deskShots.push([p, n]));
  if (p.images.mobile) mobShots.push([p, p.images.mobile]);
}
const tile = ([p, n]) => `<li class="reel-${IMG[p.id][n].kind}" style="--acc:${p.acc}">${imgTag(p.id, n, IMG[p.id][n], { sizes: IMG[p.id][n].kind === 'mob' ? '130px' : '384px', target: 480 })}</li>`;
const half = Math.ceil(deskShots.length / 2);
const rowA = deskShots.slice(0, half), rowB = [];
deskShots.slice(half).forEach((d, i) => { rowB.push(d); if (mobShots[i]) rowB.push(mobShots[i]); });
mobShots.slice(deskShots.length - half).forEach((m) => rowB.push(m));
const row = (items, dir) => `<div class="reel-row" data-dir="${dir}"><ul class="reel-track">${items.map(tile).join('')}</ul></div>`;
const reelHtml = row(rowA, 1) + '\n' + row(rowB, -1);

/* ---------- écriture ---------- */
const indexFile = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');
function inject(marker, content) {
  const re = new RegExp(`(<!-- ${marker}:START -->)[\\s\\S]*?(<!-- ${marker}:END -->)`);
  if (!re.test(html)) throw new Error(`Marqueur ${marker} absent de index.html`);
  html = html.replace(re, `$1\n${content}\n$2`);
}
inject('STAGE', stageHtml);
inject('PROJECTS', cardsHtml);
inject('REEL', reelHtml);
html = html.replace(/data-count-projects data-to="\d+">\d+</, `data-count-projects data-to="${projects.length}">${projects.length}<`);
fs.writeFileSync(indexFile, html);

fs.writeFileSync(
  path.join(ROOT, 'assets/projects-data.js'),
  '/* Généré par scripts/build-projects.mjs à partir de src/projects.mjs — ne pas modifier à la main. */\n' +
  `window.BL_PROJECTS=${JSON.stringify(data)};\nwindow.BL_EN=${JSON.stringify(EN)};\n`
);

// ménage : images qui ne sont plus utilisées
let removed = 0;
for (const d of fs.existsSync(OUT) ? fs.readdirSync(OUT) : []) {
  const dir = path.join(OUT, d);
  for (const f of fs.readdirSync(dir)) if (!produced.has(path.join(dir, f))) { fs.unlinkSync(path.join(dir, f)); removed++; }
  if (!fs.readdirSync(dir).length) fs.rmdirSync(dir);
}

const kb = [...produced].reduce((s, f) => s + fs.statSync(f).size, 0) / 1024;
console.log(`✓ ${projects.length} projets · ${produced.size} images (${kb.toFixed(0)} Ko)${removed ? ` · ${removed} obsolètes supprimées` : ''}`);
