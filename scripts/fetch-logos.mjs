/* One-off helper: downloads team / competition logos into logos/fetched/ for the apps.
 * For each wanted entry: Wikipedia search → the page's lead image (the crest / logo, PNG render ≤512px),
 * plus, when an official site is given, its declared logo images (og:image, icons, <img> with "logo").
 * Run from Actions → "Fetch logos" (workflow_dispatch). Results are reviewed before they go into the apps. */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'logos', 'fetched'); fs.mkdirSync(OUT, { recursive: true });
const UA = 'asbh-feed-logo-fetch/1.0 (https://github.com/Kigakhemet98/asbh-feed; non-commercial)';
const wanted = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'logo-wanted.json'), 'utf8'));
const only = (process.env.ONLY || '').split(',').filter(Boolean);
const report = [];
const ext = (u, ct = '') => (/svg/.test(ct) || /\.svg(\?|$)/i.test(u) ? 'svg' : /png/.test(ct) || /\.png(\?|$)/i.test(u) ? 'png' : /webp/.test(ct) || /\.webp/i.test(u) ? 'webp' : /jpe?g/.test(ct) || /\.jpe?g/i.test(u) ? 'jpg' : /icon|ico/.test(ct) ? 'ico' : 'img');
async function save(url, file) {
  const r = await fetch(url, { headers: { 'user-agent': UA } }); if (!r.ok) throw new Error(r.status + ' ' + url);
  const ct = r.headers.get('content-type') || ''; if (!/image|svg|octet/.test(ct)) throw new Error('not an image: ' + ct);
  const buf = Buffer.from(await r.arrayBuffer()); if (buf.length < 300) throw new Error('too small');
  const f = `${file}.${ext(url, ct)}`; fs.writeFileSync(path.join(OUT, f), buf); return f;
}
async function wiki(w) {
  const api = `https://${w.lang || 'en'}.wikipedia.org/w/api.php`;
  const q = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: w.q, gsrlimit: '1', prop: 'pageimages', piprop: 'thumbnail|name|original', pithumbsize: '512', pilicense: 'any', redirects: '1' });
  const j = await (await fetch(`${api}?${q}`, { headers: { 'user-agent': UA } })).json();
  const p = Object.values((j.query || {}).pages || {})[0]; if (!p) throw new Error('no page');
  const src = (p.thumbnail && p.thumbnail.source) || (p.original && p.original.source); if (!src) throw new Error('no image on ' + p.title);
  return { title: p.title, file: await save(src, w.key), image: p.pageimage };
}
async function site(w) {
  const out = [];
  const r = await fetch(w.site, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36' } }); const html = await r.text();
  const urls = new Set();
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/gi)) urls.add(m[1]);
  for (const m of html.matchAll(/<link[^>]+rel="(?:apple-touch-icon|icon|shortcut icon)"[^>]+href="([^"]+)"/gi)) urls.add(m[1]);
  for (const m of html.matchAll(/<img[^>]+>/gi)) { const t = m[0]; if (/logo/i.test(t)) { const s = /(?:src|data-src)="([^"]+)"/i.exec(t); if (s) urls.add(s[1]); } }
  let i = 0;
  for (const u of [...urls].slice(0, 6)) { try { out.push(await save(new URL(u, w.site).href, `${w.key}-site${++i}`)); } catch (e) { /* skip */ } }
  return out;
}
for (const w of wanted) {
  if (only.length && !only.includes(w.key)) continue;
  const rec = { key: w.key, q: w.q };
  try { Object.assign(rec, await wiki(w)); } catch (e) { rec.wikiError = String(e.message).slice(0, 120); }
  if (w.site) { try { rec.site = await site(w); } catch (e) { rec.siteError = String(e.message).slice(0, 120); } }
  report.push(rec); console.log(JSON.stringify(rec));
  await new Promise((r) => setTimeout(r, 300));
}
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
