/* Builds feed.json and the calendar files from the broadcasters' own live TV guides.
 *
 * Runs on GitHub Actions several times a day (see .github/workflows/update-feed.yml), so kick-off
 * changes, new channel confirmations and postponements reach both apps over the air.
 *
 * Only LIVE sport is kept:
 *   SuperSport      supersport.com/tv-guide          isLive flag                     → events
 *   beIN MENA       beinsports.com/en-mena/tv-guide  live flag                       → events
 *   New World Sport myt.mu/home/new-world-sport-guide (live-events-only guide)        → events
 *   Azam TV Max     web.azamtvmax.com/tv-guide       "LIVE" in the title             → events
 *   StarTimes       m.startimestv.com                no live flag: a slot counts only when it starts
 *                                                    within 30 min of the real kick-off  → assignments
 *   CANAL+ Rwanda   canalplus.com/rw/programme-tv    best effort (rendered page)     → assignments
 *   ZAP Angola      zap.co.ao/tv/guia-tv             guide data only served inside Angola: checked, logged
 *   Azam TV         azamtv.com/program-guide         currently publishes no channels: checked, logged
 *
 * A source that fails keeps its previous results (never wipes good data), and every run writes
 * per-source counts to feed.json → "sources", so problems are visible at a glance. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DAYS = 10;
const NOW = Date.now();
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const read = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8')); } catch { return d; } };
const manual = read('manual.json', { assignments: [], events: [], overrides: [] });
const CH = read('channels.json', []);
const CHAN = Object.fromEntries(CH.map((c) => [c.id, c]));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

async function get(url, { type = 'json', headers = {}, timeout = 30000 } = {}) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: type === 'json' ? 'application/json' : 'text/html', ...headers }, signal: ctl.signal });
    if (!r.ok) throw new Error(r.status + ' ' + url.slice(0, 90));
    return type === 'json' ? await r.json() : await r.text();
  } finally { clearTimeout(t); }
}
const day = (o) => new Date(NOW + o * 864e5).toISOString().slice(0, 10);
const iso = (d) => new Date(d).toISOString();
const inWindow = (t) => t > NOW - 4 * 3600e3 && t < NOW + DAYS * 864e5;

/* ---------- shared helpers (same rules as the apps) ---------- */
const SPORT = (s, t = '') => {
  const x = (s + ' ' + t).toLowerCase();
  if (/futebol|football|soccer/.test(x) && !/usa football|american/.test(x)) return 'football';
  if (/usa football|american football|\bnfl\b/.test(x)) return 'nfl';
  if (/basket/.test(x)) return 'basketball'; if (/ice hockey|\bnhl\b/.test(x)) return 'hockey';
  if (/\bufc\b/.test(x)) return 'ufc'; if (/\bmma\b|muay|pfl/.test(x)) return 'mma'; if (/box/.test(x)) return 'boxing';
  if (/rugby/.test(x)) return 'rugby'; if (/cricket/.test(x)) return 'cricket'; if (/tennis|\bwta\b|\batp\b/.test(x)) return 'tennis';
  if (/golf/.test(x)) return 'golf'; if (/formula ?1|\bf1\b/.test(x)) return 'f1'; if (/motogp/.test(x)) return 'motogp';
  if (/cycling|tour of|tour de/.test(x)) return 'cycling'; if (/wwe|wrestling|aew/.test(x)) return 'wwe'; if (/volley/.test(x)) return 'volleyball';
  if (/premier league|liga|serie a|bundesliga|ligue|eredivisie|\bcup\b|copa|coupe|pokal|afcon|\bcaf\b|uefa|fifa|champions league|europa|saudi|qualif/.test(x)) return 'football';
  return 'other';
};
const SKIP = /build.?up|wrap|countdown|courtside|tip-off|scoreboard|gameday|inside the|nba today|nfl live|first take|mcafee|soccer africa|line ?up|extra time|fanzone|paddock|press conference|weigh-in|highlights|magazine|grand show|preview|review|replay|repeat|classic/i;
const COMP = [[/^PL$/, 'Premier League'], [/^UNL/, 'UEFA Nations League'], [/^AFCON (Qualifier|Eliminatórias)/, 'AFCON 2027 Qualifiers'], [/^UWCL$/, "UEFA Women's Champions League"],
  [/^WSL/, "Women's Super League"], [/^CCL \(W\)/, "CAF Women's Champions League"], [/^Int CRI/, 'International Cricket'], [/^Nations Champs/, 'Nations Championship'],
  [/^ATP World Tour Finals/, 'ATP Finals'], [/^WBBL/, "Women's Big Bash League"], [/^BBL/, 'Big Bash League'], [/^Pro20 Cup/, 'CSA Pro20 Cup'], [/^Diski Challenge/, 'DStv Diski Challenge'],
  [/^NBA/, 'NBA'], [/^CBB$/, 'NCAA Basketball'], [/^NHL/, 'NHL'], [/^PFL WT/, 'PFL World Tournament'], [/^LaLiga|^La Liga/, 'LaLiga'],
  [/^SA ?L$|^Serie A/, 'Serie A'], [/^BL$|^Bundesliga/, 'Bundesliga'], [/^UCL$/, 'UEFA Champions League'], [/^UEL$/, 'UEFA Europa League'], [/^URC/, 'United Rugby Championship'], [/^F1\b/, 'Formula 1'],
  [/^Q AFCON/i, 'AFCON 2027 Qualifiers'], [/^UEFA NATIONS LEAGUE/i, 'UEFA Nations League'], [/^LA LIGA HYPERMOTION/i, 'LaLiga Hypermotion'], [/^LA ?LIGA\b/i, 'LaLiga'],
  [/^PREMIER LEAGUE/i, 'Premier League'], [/^SERIE A/i, 'Serie A'], [/^LIGUE 1/i, 'Ligue 1'], [/^UEFA CHAMPIONS LEAGUE/i, 'UEFA Champions League'], [/^UEFA EUROPA LEAGUE/i, 'UEFA Europa League']];
const cleanComp = (c) => { for (const [re, v] of COMP) if (re.test(c)) return v; return c.replace(/\s+('\d\d|\d\d\/\d\d)\b/g, '').trim(); };
const FIFA = { GHA: 'Ghana', SOM: 'Somalia', CMR: 'Cameroon', NAM: 'Namibia', ZAM: 'Zambia', BDI: 'Burundi', GAB: 'Gabon', LES: 'Lesotho', EGY: 'Egypt', MAW: 'Malawi', UGA: 'Uganda',
  BOT: 'Botswana', ANG: 'Angola', SSD: 'South Sudan', ZIM: 'Zimbabwe', GEQ: 'Equatorial Guinea', KEN: 'Kenya', RSA: 'South Africa', NGR: 'Nigeria', TAN: 'Tanzania', CPV: 'Cape Verde',
  LBR: 'Liberia', MOZ: 'Mozambique', ETH: 'Ethiopia', MAR: 'Morocco', NIG: 'Niger', CIV: "Cote d'Ivoire", GAM: 'The Gambia', GUI: 'Guinea', ERI: 'Eritrea', COD: 'DR Congo', SLE: 'Sierra Leone',
  BEN: 'Benin', CTA: 'Central African Republic', BFA: 'Burkina Faso', MTN: 'Mauritania', COM: 'Comoros', CGO: 'Congo', TUN: 'Tunisia', LBY: 'Libya', ALG: 'Algeria', TOG: 'Togo', SEN: 'Senegal',
  SDN: 'Sudan', MLI: 'Mali', RWA: 'Rwanda', MAD: 'Madagascar', GNB: 'Guinea-Bissau', CZE: 'Czechia', ESP: 'Spain', SRB: 'Serbia', GER: 'Germany', SWE: 'Sweden', BIH: 'Bosnia and Herzegovina',
  ROU: 'Romania', DEN: 'Denmark', NOR: 'Norway', TUR: 'Turkey', BEL: 'Belgium', ENG: 'England', CRO: 'Croatia', MDA: 'Moldova', KAZ: 'Kazakhstan', NED: 'Netherlands', GRE: 'Greece', KVX: 'Kosovo',
  ISR: 'Israel', WAL: 'Wales', POR: 'Portugal', CYP: 'Cyprus', MNE: 'Montenegro', FIN: 'Finland', SMR: 'San Marino', SVK: 'Slovakia', ISL: 'Iceland', LUX: 'Luxembourg', LAT: 'Latvia',
  SVN: 'Slovenia', SUI: 'Switzerland', NIR: 'Northern Ireland', UKR: 'Ukraine', ITA: 'Italy', SCO: 'Scotland', GEO: 'Georgia', ALB: 'Albania', MKD: 'North Macedonia', HUN: 'Hungary',
  POL: 'Poland', ARM: 'Armenia', BLR: 'Belarus', EST: 'Estonia', BUL: 'Bulgaria', FRA: 'France', FRO: 'Faroe Islands', AUT: 'Austria', IRL: 'Republic of Ireland', LIE: 'Liechtenstein',
  AZE: 'Azerbaijan', NZL: 'New Zealand', IND: 'India', AUS: 'Australia', BAN: 'Bangladesh', ARG: 'Argentina', JPN: 'Japan', FIJ: 'Fiji', IRE: 'Ireland', PAK: 'Pakistan', SRI: 'Sri Lanka', WIN: 'West Indies' };
const expand = (d) => d.replace(/\b([A-Z]{3})\b(?= v )|(?<= v )\b([A-Z]{3})\b/g, (x) => FIFA[x] || x).replace(/^D(\d) M(\d)$/, 'Day $1 · Singles $2').replace(/^D(\d) Dbls (\d)$/, 'Day $1 · Doubles $2');   // same as the apps

/* French (myt.mu / CANAL+) country names → the English names the apps use */
const FR = { 'rd congo': 'DR Congo', 'rdc': 'DR Congo', 'gambie': 'The Gambia', 'guinée-bissau': 'Guinea-Bissau', 'guinee-bissau': 'Guinea-Bissau', 'cameroun': 'Cameroon', 'namibie': 'Namibia',
  'guinée': 'Guinea', 'guinee': 'Guinea', 'erythrée': 'Eritrea', 'érythrée': 'Eritrea', 'soudan': 'Sudan', 'soudan du sud': 'South Sudan', 'somalie': 'Somalia', 'république centrafricaine': 'Central African Republic',
  'centrafrique': 'Central African Republic', 'italie': 'Italy', 'turquie': 'Turkey', 'belgique': 'Belgium', 'mauritanie': 'Mauritania', 'comores': 'Comoros', 'afrique du sud': 'South Africa', 'zambie': 'Zambia',
  'tanzanie': 'Tanzania', 'ethiopie': 'Ethiopia', 'éthiopie': 'Ethiopia', 'cap-vert': 'Cape Verde', 'cap vert': 'Cape Verde', 'maroc': 'Morocco', 'serbie': 'Serbia', 'allemagne': 'Germany', 'pays-bas': 'Netherlands', 'grèce': 'Greece',
  'moldavie': 'Moldova', 'ouganda': 'Uganda', 'algerie': 'Algeria', 'algérie': 'Algeria', 'israël': 'Israel', 'norvège': 'Norway', 'pays de galles': 'Wales', 'danemark': 'Denmark', 'suède': 'Sweden',
  'bosnie-herzégovine': 'Bosnia and Herzegovina', 'lettonie': 'Latvia', 'arménie': 'Armenia', 'finlande': 'Finland', 'saint-marin': 'San Marino', 'espagne': 'Spain', 'angleterre': 'England', 'islande': 'Iceland',
  'suisse': 'Switzerland', 'ecosse': 'Scotland', 'écosse': 'Scotland', 'guinée equatoriale': 'Equatorial Guinea', 'guinée équatoriale': 'Equatorial Guinea', 'sénégal': 'Senegal', 'bénin': 'Benin', 'tunisie': 'Tunisia',
  'libye': 'Libya', 'egypte': 'Egypt', 'égypte': 'Egypt', 'nigéria': 'Nigeria', 'côte d\'ivoire': "Cote d'Ivoire", 'cote d\'ivoire': "Cote d'Ivoire", 'liberia': 'Liberia', 'libéria': 'Liberia', 'tchad': 'Chad',
  'croatie': 'Croatia', 'autriche': 'Austria', 'pologne': 'Poland', 'hongrie': 'Hungary', 'roumanie': 'Romania', 'ukraine': 'Ukraine', 'irlande': 'Republic of Ireland', 'irlande du nord': 'Northern Ireland',
  'slovaquie': 'Slovakia', 'slovénie': 'Slovenia', 'tchéquie': 'Czechia', 'république tchèque': 'Czechia', 'géorgie': 'Georgia', 'albanie': 'Albania', 'macédoine du nord': 'North Macedonia', 'estonie': 'Estonia',
  'lituanie': 'Lithuania', 'biélorussie': 'Belarus', 'bulgarie': 'Bulgaria', 'chypre': 'Cyprus', 'monténégro': 'Montenegro', 'féroé': 'Faroe Islands', 'îles féroé': 'Faroe Islands', 'azerbaïdjan': 'Azerbaijan',
  'kazakhstan': 'Kazakhstan', 'luxembourg': 'Luxembourg', 'liechtenstein': 'Liechtenstein', 'andorre': 'Andorra', 'malte': 'Malta', 'gibraltar': 'Gibraltar', 'portugal': 'Portugal', 'france': 'France', 'kosovo': 'Kosovo' };
const fr = (n) => FR[n.trim().toLowerCase()] || n.trim();
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s(/-])([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(Fc|Afc|Sc|Utd|Dr|Jkt|Kmc|Ii|Iii)\b/g, (x) => ({ Fc: 'FC', Afc: 'AFC', Sc: 'SC', Utd: 'Utd', Dr: 'DR', Jkt: 'JKT', Kmc: 'KMC', Ii: 'II', Iii: 'III' }[x]));

/* ---------- SuperSport ---------- */
const SS_NUM = { 128: 'ss-wwe', 199: 'ss-events', 200: 'ss-blitz', 201: 'ss-grandstand', 203: 'ss-premier-league', 204: 'ss-laliga', 224: 'ss-laliga', 205: 'ss-football', 206: 'ss-football-plus', 207: 'ss-kickoff', 208: 'ss-africa',
  209: 'ss-action', 210: 'ss-extra-1', 211: 'ss-rugby', 212: 'ss-cricket', 213: 'ss-golf', 214: 'ss-tennis', 215: 'ss-motorsport', 217: 'ss-extra-2', 218: 'espn', 219: 'espn2', 222: 'ss-football-plus', 235: 'ss-motorsport',
  241: 'ss-maximo-1', 242: 'ss-maximo-2', 243: 'ss-swahili', 244: 'awsn', 245: 'ss-stream-245', 246: 'ss-stream-246', 247: 'ss-stream-247', 248: 'ss-stream-248', 950: 'ss-stream-950', 951: 'ss-stream-951', 952: 'ss-stream-952' };
async function supersport() {
  const rows = await get(`https://supersport.com/apix/guide/v6/tvguide?countryCode=ke&startDateTime=${day(0)}&endDateTime=${day(DAYS)}&removeCompletedEvents=true`);
  const map = new Map();
  for (const p of rows) {
    if (!p.isLive || /news|talk show|magazine|variety/i.test(p.sport) || SKIP.test(p.title)) continue;
    const chs = (p.channel || []).map((c) => (c.channelCode === 'TBC' ? 'ss-tbc' : SS_NUM[c.channelNumber])).filter((c) => c && (CHAN[c] || c === 'ss-tbc'));
    const i = p.title.indexOf(':'); const comp = i > 0 ? p.title.slice(0, i).trim() : p.title; const detail = i > 0 ? p.title.slice(i + 1).trim() : p.title;
    const k = p.utcStart + '|' + detail.toLowerCase(); const prev = map.get(k);
    if (prev) { prev.channels = [...new Set(prev.channels.concat(chs))]; continue; }
    map.set(k, { start: iso(p.utcStart), end: iso(p.utcEnd), sport: SPORT(p.sport, p.title), comp: cleanComp(comp), detail: expand(detail), channels: chs.length ? chs : ['ss-tbc'], status: 'L', via: 'SuperSport guide' });
  }
  return { events: [...map.values()] };
}

/* ---------- beIN SPORTS MENA ---------- */
function beinId(name) {
  const t = name.toLowerCase(); const n = (/(\d+)/.exec(t) || [])[1];
  for (const k of ['xtra', 'max', 'afc']) if (t.includes(k)) return n ? `bein-${k}-${n}` : (k === 'afc' ? 'bein-afc' : null);
  if (/\ben\b|english/.test(t)) return n ? 'bein-english-' + n : null; if (/\bfr\b|french/.test(t)) return n ? 'bein-french-' + n : null;
  if (t.includes('nba')) return 'bein-nba'; if (t.includes('4k')) return 'bein-4k'; if (t.includes('news')) return null;
  return n ? 'bein-' + n : 'bein-sports';
}
async function bein() {
  const base = 'https://www.beinsports.com/api/opta';
  const ch = (await get(base + '/tv-channel?region=en-mena')).rows || [];
  const q = new URLSearchParams({ searchKey: '', startBefore: new Date(NOW + DAYS * 864e5).toISOString(), endAfter: new Date(NOW).toISOString(), limit: '5000' });
  ch.forEach((c) => q.append('channelIds', c.id));
  const rows = (await get(base + '/tv-event?' + q)).rows || [];
  const map = new Map();
  for (const e of rows) {
    if (!e.live || /entertainment|sports (general|news)/i.test(e.category)) continue;
    const c = beinId((e.channel && e.channel.name) || ''); if (!c || !CHAN[c]) continue;
    const detail = e.title.split(' - ')[0].replace(/\s+vs\.?\s+/i, ' v ').replace(/\s*\([A-Z]{3}\)/g, '').trim();
    const k = e.startDate + '|' + detail; if (map.has(k)) { const x = map.get(k); if (!x.channels.includes(c)) x.channels.push(c); continue; }
    map.set(k, { start: iso(e.startDate), end: iso(e.endDate), sport: SPORT(e.category, e.title), comp: cleanComp(e.category.replace(/^(Tennis|Basketball) - /, '').replace(/^English Premier League$/, 'Premier League').replace(/^AFCON Qualifiers$/, 'AFCON 2027 Qualifiers')), detail, channels: [c], status: 'L', via: 'beIN SPORTS guide' });
  }
  return { events: [...map.values()] };
}

/* ---------- New World Sport (myt.mu) – a live-events-only guide, times in Mauritius time (UTC+4) ---------- */
const MONTHS = { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 };
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#0?39;|&apos;/g, "'").replace(/\s+/g, ' ').trim();
async function nws() {
  const html = await get('https://www.myt.mu/home/new-world-sport-guide', { type: 'text' });
  const panel = html.split('id="panel-allsports"')[1] || html;
  const body = panel.split(/<div class="sport-panel/)[0];
  const out = []; const seen = new Set();
  const parts = body.split(/<h3 class="guide-date-heading">/).slice(1);
  for (const part of parts) {
    const dm = /^\s*\w+\s+(\d{1,2})\s+(\w+)\s+(\d{4})/.exec(strip(part.split('</h3>')[0])); if (!dm) continue;
    const [, d, mon, y] = dm; const mi = MONTHS[mon.toLowerCase()]; if (mi === undefined) continue;
    for (const row of part.split(/<tr>/).slice(2)) {
      const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => strip(m[1])); if (cells.length < 5) continue;
      let [tour, ev, sp, time, chan] = cells;
      const tm = /^(\d{1,2}):(\d{2})$/.exec(time); const cm = /New World Sport (\d+)/i.exec(chan); if (!tm || !cm) continue;
      if (SKIP.test(ev) || ev.toLowerCase() === tour.toLowerCase()) continue;
      const start = Date.UTC(+y, mi, +d, +tm[1] - 4, +tm[2]); if (!inWindow(start)) continue;
      const ch = 'nws-' + cm[1]; if (!CHAN[ch]) continue;
      ev = ev.replace(/^(.+?)-Bosnie vs Herzégovine$/i, '$1 vs Bosnie-Herzégovine');   // the guide splits "Bosnia-Herzegovina" wrongly
      const vs = / vs\.? /i.exec(ev);
      const detail = vs ? `${fr(ev.slice(0, vs.index))} v ${fr(ev.slice(vs.index + vs[0].length))}` : ev;
      const sport = SPORT(sp, tour);
      if (!vs && !['tennis', 'f1', 'motogp', 'golf', 'cycling'].includes(sport)) continue;   // a show, not a match
      const k = start + detail; if (seen.has(k)) { out.find((x) => x._k === k).channels.push(ch); continue; } seen.add(k);
      out.push({ _k: k, start: iso(start), duration: sport === 'football' ? 115 : 120, sport, comp: cleanComp(tour.replace(/^Q AFCON/i, 'Q AFCON')), detail, channels: [ch], status: 'L', via: 'New World Sport guide (my.t)' });
    }
  }
  out.forEach((e) => delete e._k);
  return { events: out };
}

/* ---------- Azam TV Max – public guide service; live matches carry "LIVE" in the title ---------- */
async function azam() {
  const H = { platform: 'WEBAPP', language: 'en', local: 'WEBAPP' };
  const out = []; const seen = new Set();
  const eatMidnight = (o) => { const d = new Date(NOW + 3 * 3600e3 + o * 864e5); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - 3 * 3600e3; };
  for (let o = 0; o < 7; o++) {
    let all = []; let off = 0; let cnt = 0;
    try {
      do {
        const j = await get(`https://api.aztv.videoready.tv/content-detail-service/pub/v1/mybox/${eatMidnight(o)}?offset=${off}&limit=100`, { headers: H });
        if (!j.data) break; cnt = j.data.meta.count || 0; all = all.concat(j.data.meta.meta || []); off += 100;
      } while (off < cnt && off < 1000);
    } catch (e) { if (o === 0) throw e; break; }
    for (const ch of all) {
      const m = /azam sports (\d)/i.exec(ch.title || ''); if (!m) continue; const id = 'azam-' + m[1]; if (!CHAN[id]) continue;
      for (const e of ch.channelDay || []) {
        const t = e.title || ''; if (!/\bLIVE\b/i.test(t) || !/\sV\s/i.test(t)) continue;
        const start = e.eventStartUtc; if (!inWindow(start)) continue;
        const raw = t.replace(/\bLIVE\b/ig, '').replace(/\s+/g, ' ').trim(); const p = raw.split(/\s+V\s+/i);
        const detail = `${titleCase(p[0])} v ${titleCase(p.slice(1).join(' v '))}`.replace(/Guinea Bissau/i, 'Guinea-Bissau');
        const k = start + '|' + detail; if (seen.has(k)) continue; seen.add(k);
        const sport = SPORT((e.boxCoverImage || '') + ' ' + t) === 'other' ? 'football' : SPORT((e.boxCoverImage || '') + ' ' + t);
        out.push({ start: iso(start), end: iso(e.eventEndUtc), sport, comp: '', detail, channels: [id], status: 'L', via: 'Azam TV Max guide', lang: e.language || '' });
      }
    }
  }
  return { events: out };
}

/* ---------- Pages that only render in a browser (StarTimes, CANAL+, ZAP, azamtv.com) ---------- */
let browser = null;
const debug = async (name, pg, extra = '') => { try { fs.mkdirSync(path.join(ROOT, 'state', 'debug'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'state', 'debug', name + '.txt'), `${new Date().toISOString()}\n${pg.url()}\n${extra}\n\n` + (await pg.innerText('body')).slice(0, 6000)); } catch { /* ignore */ } };
async function page(tz = 'Africa/Nairobi') {
  if (!browser) { const { chromium } = await import('playwright'); browser = await chromium.launch(); }
  const ctx = await browser.newContext({ userAgent: UA, timezoneId: tz, locale: 'en-GB', viewport: { width: 480, height: 900 } });
  return ctx.newPage();
}

/* StarTimes: channel page → date tabs → rows "HH:MM  Competition-Home vs Away" (EAT, browser time zone) */
const ST_CHANNELS = { 649: 'st-world-football', 302: 'st-sports-premium', 443: 'st-sports-life', 266: 'st-sports-focus', 1031981242: 'st-sports-arena', 150: 'espn', 151: 'espn2' };   // Sanyuka Prime publishes no guide
function splitSlot(title) {
  const t = title.replace(/\s+/g, ' ').trim(); if (!/ vs\.? /i.test(t)) return null;
  const m = /^(.*?(?:MD ?\d+|\)|\bR\d+|Round \d+|Matchday \d+|\d{4}(?:[-/]\d{2,4})?))\s*-\s*(.+ vs\.? .+)$/i.exec(t);
  const [comp, teams] = m ? [m[1], m[2]] : (() => { const i = t.lastIndexOf('-', t.search(/ vs\.? /i)); return i > 0 ? [t.slice(0, i), t.slice(i + 1)] : ['', t]; })();
  const v = / vs\.? /i.exec(teams); return { comp: comp.trim(), home: teams.slice(0, v.index).trim(), away: teams.slice(v.index + v[0].length).trim() };
}
async function startimes() {
  const slots = []; const pg = await page();
  for (const [cid, ch] of Object.entries(ST_CHANNELS)) {
    if (!CHAN[ch]) continue;
    try {
      await pg.goto(`https://m.startimestv.com/browser/liveDetail?channelId=${cid}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await pg.waitForSelector('.tv-guide li', { timeout: 30000 });   // ads keep the network busy: wait for the guide itself
      const tabs = await pg.$$eval('.tv-guide li span', (s) => s.map((x) => x.textContent.trim()));
      const ti = tabs.indexOf('Today');
      for (let i = Math.max(0, ti); i < tabs.length; i++) {
        await pg.click(`.tv-guide li:nth-child(${i + 1}) span`); await pg.waitForTimeout(1800);
        const rows = await pg.$$eval('.epg', (els) => els.map((e) => ({ time: (e.querySelector('.playTime') || {}).textContent || '', title: ((e.querySelector('.playTitle') || {}).childNodes[0] || {}).textContent || '' })));
        const eat = new Date(NOW + 3 * 3600e3); let y = eat.getUTCFullYear(), mo = eat.getUTCMonth(), d = eat.getUTCDate();
        if (tabs[i] !== 'Today') { const [mm, dd] = tabs[i].split('/').map(Number); mo = mm - 1; d = dd; if (mm - 1 < eat.getUTCMonth() - 6) y++; }
        for (const r of rows) {
          const tm = /(\d{1,2}):(\d{2})/.exec(r.time); if (!tm) continue; const s = splitSlot(r.title); if (!s || SKIP.test(r.title)) continue;
          const start = Date.UTC(y, mo, d, +tm[1] - 3, +tm[2]); if (!inWindow(start)) continue;
          slots.push({ start: iso(start), teams: [s.home, s.away], comp: s.comp, channels: [ch], source: 'StarTimes guide' });
        }
      }
    } catch (e) { log('startimes', cid, e.message); }
  }
  await pg.context().close();
  if (!slots.length) throw new Error('no StarTimes rows read');
  return { slots };
}

/* CANAL+ Rwanda: load the public guide like a visitor and keep the guide data the page itself receives */
const CP = { 'canal+ sport 1': 'cp-sport-1', 'canal+ sport 2': 'cp-sport-2', 'canal+ sport 3': 'cp-sport-3', 'canal+ sport 4': 'cp-sport-4', 'canal+ sport 5': 'cp-sport-5' };
async function canalplus() {
  const pg = await page(); const got = []; const seenUrls = [];
  pg.on('response', async (r) => { const u = r.url(); if (!/json/.test(r.headers()['content-type'] || '')) return; seenUrls.push(u.replace(/[?].*/, '').slice(0, 120)); try { got.push(await r.json()); } catch { /* not json */ } });
  await pg.goto('https://www.canalplus.com/rw/programme-tv/', { waitUntil: 'networkidle', timeout: 90000 });
  for (const sel of ['button:has-text("Tout accepter")', 'button:has-text("Accepter")', '#didomi-notice-agree-button']) { try { await pg.click(sel, { timeout: 3000 }); break; } catch { /* no banner */ } }
  await pg.waitForTimeout(4000);
  const slots = [];
  const walk = (o, chName) => {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) { o.forEach((x) => walk(x, chName)); return; }
    const name = (o.channelName || o.name || o.title || '').toString().toLowerCase(); const cn = CP[name] ? name : chName;
    const st = o.startTime || o.startDate || o.timecode || o.start; const title = o.title || o.name || '';
    if (cn && st && typeof title === 'string' && / [-–] | vs\.? | contre /i.test(title)) {
      const t = typeof st === 'number' ? st : Date.parse(st); const m = / vs\.? | contre | [-–] /i.exec(title);
      if (t && inWindow(t) && m && !SKIP.test(title)) slots.push({ start: iso(t), teams: [fr(title.slice(0, m.index).replace(/^.*:\s*/, '')), fr(title.slice(m.index + m[0].length).replace(/\s*\(.*$/, ''))], channels: [CP[cn]], source: 'CANAL+ guide' });
    }
    for (const v of Object.values(o)) walk(v, cn);
  };
  got.forEach((j) => walk(j, null));
  await debug('canalplus', pg, 'json responses: ' + [...new Set(seenUrls)].join('\n'));
  await pg.context().close();
  if (!slots.length) throw new Error('CANAL+ blocks automated visits from cloud servers ("Unexpected Request") - CANAL+ channels come from broadcaster announcements (manual.json) and the rights list');
  return { slots };
}

async function zap() {
  try { await get('https://zapon.zapsi.net/ao/m/api/epg/channels', { timeout: 20000 }); }
  catch (e) { throw new Error('guide server only answers inside Angola (' + e.message.slice(0, 40) + ')'); }
  throw new Error('guide server answered – parser to be added');
}
async function azamtv() {
  /* public guide service behind azamtv.com/program-guide (times are East Africa Time) */
  const url = 'https://web1.azamtvltd.co.tz/api/method/azam_tv.azam_tv.api.get_show_by_date_and_country';
  const out = []; const seen = new Set(); const chans = new Set();
  for (let o = 0; o < 7; o++) {
    const date = new Date(NOW + 3 * 3600e3 + o * 864e5).toISOString().slice(0, 10);
    for (let pg = 1; pg <= 12; pg++) {
      let rows;
      try {
        const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'user-agent': UA, origin: 'https://azamtv.com', referer: 'https://azamtv.com/' }, body: JSON.stringify({ date, category: 'All', country: 'TANZANIA', page_no: pg, page_size: 50 }) });
        if (!r.ok) throw new Error(r.status); rows = ((await r.json()).message || {}).program_details || [];
      } catch (e) { if (o === 0 && pg === 1) throw e; break; }
      if (!rows.length) break;
      for (const x of rows) {
        chans.add(x.channel_name);
        const m = /azam sports (\d)/i.exec(x.channel_name || ''); if (!m) continue; const id = 'azam-' + m[1]; if (!CHAN[id]) continue;
        const t = x.title || ''; if (!/\bLIVE\b/i.test(t) || !/\sV\s/i.test(t)) continue;
        const start = Date.parse(x.since + '+03:00'); const end = Date.parse(x.till + '+03:00'); if (!inWindow(start)) continue;
        const p = t.replace(/\bLIVE\b/ig, '').replace(/\s+/g, ' ').trim().split(/\s+V\s+/i);
        const detail = `${titleCase(p[0])} v ${titleCase(p.slice(1).join(' v '))}`; const k = start + detail; if (seen.has(k)) continue; seen.add(k);
        out.push({ start: iso(start), end: iso(end), sport: 'football', comp: '', detail, channels: [id], status: 'L', via: 'Azam TV guide (azamtv.com)' });
      }
    }
  }
  if (![...chans].some((c) => /azam sports/i.test(c))) throw new Error(`azamtv.com lists ${chans.size} channels but no Azam Sports channel (sports there = ESPN / ESPN 2 only) – the Azam TV Max guide covers Azam Sports`);
  return { events: out };
}

/* ---------- fixtures (real kick-off times) used to confirm StarTimes / CANAL+ slots ---------- */
const LEAGUES = [[47, 'Premier League'], [87, 'LaLiga'], [55, 'Serie A'], [54, 'Bundesliga'], [53, 'Ligue 1'], [42, 'UEFA Champions League'], [73, 'UEFA Europa League'],
  [536, 'Saudi Pro League'], [132, 'FA Cup'], [133, 'EFL Cup'], [138, 'Copa del Rey'], [141, 'Coppa Italia'], [209, 'DFB Pokal'], [9806, 'UEFA Nations League']];
async function fixtures() {
  const out = [];
  for (const [id, name] of LEAGUES) {
    try {
      const j = await get('https://www.fotmob.com/api/data/leagues?id=' + id);
      for (const m of (j.fixtures && j.fixtures.allMatches) || []) {
        const t = Date.parse((m.status && m.status.utcTime) || m.utcTime); if (!inWindow(t) || (m.status && m.status.cancelled)) continue;
        out.push({ start: iso(t), duration: 115, sport: 'football', comp: name, detail: `${m.home.name} v ${m.away.name}`, home: m.home.name, away: m.away.name, channels: [], status: 'L' });
      }
    } catch { /* one league failing must not stop the rest */ }
  }
  return { events: out };
}

/* ---------- name matching ---------- */
const DROP = /^(fc|afc|cf|sc|sfc|bc|cd|ud|sd|rc|rcd|ac|as|ss|sv|vfl|tsg|fk|sk|bk|if|club|1|the|de|w|women|sport|clube?)$/;
const ALIAS = { 'man utd': 'manchester united', 'man united': 'manchester united', 'man city': 'manchester city', 'spurs': 'tottenham', 'wolves': 'wolverhampton', 'inter': 'internazionale', 'psg': 'paris saint germain',
  'bayern munich': 'bayern munchen', 'bayern': 'bayern munchen', 'atletico madrid': 'atletico', 'atl madrid': 'atletico', 'gladbach': 'monchengladbach', 'leverkusen': 'bayer leverkusen', 'cote divoire': 'ivory coast', 'the gambia': 'gambia' };
const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ø/g, 'o').replace(/[^a-z0-9]+/g, ' ').trim();
const norm = (s) => { let x = slug(s); x = ALIAS[x] || x; return x.split(' ').filter((w) => w && !DROP.test(w)).join(' '); };
const sameTeam = (a, b) => { const x = norm(a), y = norm(b); if (!x || !y) return false; if (x === y) return true;
  const short = x.length < y.length ? x : y, long = x.length < y.length ? y : x; return short.length >= 4 && (long.includes(short) || short.split(' ').every((w) => w.length >= 4 && long.split(' ').includes(w))); };
const sides = (e) => { if (e.home && e.away) return [e.home, e.away]; const m = / v(?:s\.?)? /i.exec(e.detail || ''); return m ? [e.detail.slice(0, m.index), e.detail.slice(m.index + m[0].length)] : null; };
const sameMatch = (a, b) => { const s = sides(a), o = sides(b); if (!s || !o) return false; return (sameTeam(s[0], o[0]) && sameTeam(s[1], o[1])) || (sameTeam(s[0], o[1]) && sameTeam(s[1], o[0])); };

/* ---------- run ---------- */
const SOURCES = { supersport, bein, nws, azam, startimes, canalplus, zap, azamtv };
const prevParts = read('state/parts.json', {});
const parts = {}; const status = {};
for (const [name, fn] of Object.entries(SOURCES)) {
  const t0 = Date.now();
  try { parts[name] = await fn(); const n = (parts[name].events || parts[name].slots || []).length; status[name] = { ok: true, count: n, at: new Date().toISOString() }; log(name, 'ok', n, Date.now() - t0 + 'ms'); }
  catch (e) {
    const keep = prevParts[name] && (prevParts[name].events || prevParts[name].slots || []).filter((x) => +new Date(x.start) > NOW - 4 * 3600e3);
    parts[name] = keep && keep.length ? (prevParts[name].events ? { events: keep } : { slots: keep }) : { events: [] };
    status[name] = { ok: false, error: String(e.message || e).slice(0, 200), kept: keep ? keep.length : 0, at: new Date().toISOString() };
    log(name, 'FAILED', e.message);
  }
}
if (browser) await browser.close();
const fx = (await fixtures()).events; log('fixtures', fx.length);

/* 1) live events from guides that mark live sport, merged by match */
const events = [];
for (const name of ['supersport', 'bein', 'azam', 'azamtv', 'nws']) for (const e of parts[name].events || []) {
  const t = +new Date(e.start);
  /* same match = same two teams within 4 h (guides disagree on kick-off by up to an hour), or same title within 45 min.
     Sources run in trust order, so the first (SuperSport / beIN) keeps its kick-off time. */
  const twin = events.find((x) => x.sport === e.sport && ((sides(e) && Math.abs(+new Date(x.start) - t) <= 4 * 3600e3 && sameMatch(x, e)) || (!sides(e) && Math.abs(+new Date(x.start) - t) <= 45 * 60e3 && x.detail === e.detail)
    /* a generic session block ("WTA Finals - Indian Wells") joins the real session of that event starting within 90 min */
    || (!sides(e) && !sides(x) && Math.abs(+new Date(x.start) - t) <= 90 * 60e3 && slug(x.comp || '').split(' ')[0] && slug(x.comp || '').split(' ')[0] === slug(e.comp || '').split(' ')[0])));
  if (twin) { twin.channels = [...new Set(twin.channels.concat(e.channels))]; if (!twin.comp && e.comp) twin.comp = e.comp; twin.via = [...new Set(String(twin.via).split(' · ').concat(e.via))].join(' · '); continue; }
  events.push({ ...e });
}
/* an event without a competition takes it from the fixture list */
for (const e of events) if (!e.comp) { const f = fx.find((x) => Math.abs(+new Date(x.start) - +new Date(e.start)) <= 45 * 60e3 && sameMatch(x, e)); e.comp = f ? f.comp : (e.sport === 'football' ? 'Football' : ''); }

/* 2) StarTimes / CANAL+ slots: confirmed only when they start within 30 min of a real kick-off */
const auto = [];
for (const name of ['startimes', 'canalplus']) for (const s of parts[name].slots || []) {
  const t = +new Date(s.start); const probe = { home: s.teams[0], away: s.teams[1] };
  const real = events.concat(fx).find((x) => Math.abs(+new Date(x.start) - t) <= 30 * 60e3 && sameMatch(x, probe));
  if (!real) continue;   // replay, highlights or a match nobody else lists: not added
  auto.push({ start: real.start, date: new Date(+new Date(real.start) + 3 * 3600e3).toISOString().slice(0, 10), teams: sides(real), channels: s.channels, source: s.source + ' (auto)' });
  let ev = events.find((x) => Math.abs(+new Date(x.start) - +new Date(real.start)) <= 30 * 60e3 && sameMatch(x, real));
  if (!ev) { ev = { ...real, channels: [], via: s.source }; events.push(ev); }
  ev.channels = [...new Set(ev.channels.concat(s.channels))];
  if (!String(ev.via || '').includes(s.source)) ev.via = [ev.via, s.source].filter(Boolean).join(' · ');
}
/* manual broadcaster announcements (manual.json) apply on top */
for (const a of manual.assignments || []) {
  const ev = events.find((x) => sides(x) && sameMatch(x, { home: a.teams[0], away: a.teams[1] }) && new Date(+new Date(x.start) + 3 * 3600e3).toISOString().slice(0, 10) === a.date);
  if (ev) ev.channels = [...new Set(ev.channels.concat(a.channels))];
}
events.sort((a, b) => a.start.localeCompare(b.start));
/* a real channel from a broadcaster replaces its "channel TBA" placeholder */
for (const e of events) { const real = new Set(e.channels.filter((c) => !/-tbc$/.test(c)).map((c) => (CHAN[c] || {}).provider)); e.channels = e.channels.filter((c) => !/-tbc$/.test(c) || !real.has((CHAN[c] || {}).provider)); }
const finalEvents = events.filter((e) => +new Date(e.start) > NOW - 4 * 3600e3).map(({ lang, ...e }) => e);

/* ---------- calendars (.ics) ---------- */
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const stamp = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const fold = (l) => { const out = []; let s = l; while (Buffer.byteLength(s) > 74) { let n = 74; while (Buffer.byteLength(s.slice(0, n)) > 74) n--; out.push(s.slice(0, n)); s = ' ' + s.slice(n); } out.push(s); return out.join('\r\n'); };
const chName = (id) => { const c = CHAN[id]; return c ? `${c.name}${c.num ? ' (' + c.num + ')' : ''}` : id; };
function ics(list, name) {
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//African Sports Broadcast Hub//Live sport//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', `X-WR-CALNAME:${esc(name)}`, 'X-WR-TIMEZONE:Africa/Nairobi', 'REFRESH-INTERVAL;VALUE=DURATION:PT6H', 'X-PUBLISHED-TTL:PT6H'];
  for (const e of list) {
    const end = e.end || new Date(+new Date(e.start) + (e.duration || 120) * 60000).toISOString();
    const uid = crypto.createHash('sha1').update(e.sport + '|' + (sides(e) || [e.detail]).map(norm).sort().join('|') + '|' + new Date(+new Date(e.start) + 3 * 3600e3).toISOString().slice(0, 10)).digest('hex').slice(0, 20);
    const chans = e.channels.filter((c) => !/-tbc$/.test(c)).map(chName);
    L.push('BEGIN:VEVENT', `UID:${uid}@asbh`, `DTSTAMP:${stamp(NOW)}`, `DTSTART:${stamp(e.start)}`, `DTEND:${stamp(end)}`,
      fold(`SUMMARY:${esc(e.detail + (e.comp ? ' · ' + e.comp : ''))}`), fold(`DESCRIPTION:${esc((e.comp || '') + '\nLIVE on: ' + (chans.join(', ') || 'channel to be announced') + '\nSource: ' + (e.via || 'live TV guides'))}`),
      fold(`LOCATION:${esc(chans.join(' · ') || 'TBA')}`), `CATEGORIES:${esc(e.sport)}`, 'BEGIN:VALARM', 'ACTION:DISPLAY', fold(`DESCRIPTION:${esc(e.detail)} starts in 10 minutes`), 'TRIGGER:-PT10M', 'END:VALARM', 'END:VEVENT');
  }
  L.push('END:VCALENDAR'); return L.map(fold).join('\r\n') + '\r\n';
}
fs.mkdirSync(path.join(ROOT, 'calendars'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'calendars'))) if (f.endsWith('.ics')) fs.unlinkSync(path.join(ROOT, 'calendars', f));
fs.writeFileSync(path.join(ROOT, 'calendar.ics'), ics(finalEvents, 'Live sport · African TV'));
const bySport = {}; finalEvents.forEach((e) => (bySport[e.sport] = bySport[e.sport] || []).push(e));
for (const [s, l] of Object.entries(bySport)) fs.writeFileSync(path.join(ROOT, 'calendars', s + '.ics'), ics(l, 'Live ' + s + ' · African TV'));

/* ---------- feed.json ---------- */
const feed = {
  version: 2,
  name: 'African Sports Broadcast Hub – live feed',
  updated: new Date().toISOString(),
  notes: 'Built automatically from the broadcasters\' live TV guides several times a day (only live sport, next 10 days). Hand-entered announcements live in manual.json. Calendar files: calendar.ics (all) and calendars/<sport>.ics.',
  sources: status,
  assignments: (manual.assignments || []).concat(auto),
  events: finalEvents.concat(manual.events || []),
  overrides: manual.overrides || []
};
fs.mkdirSync(path.join(ROOT, 'state'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'state', 'parts.json'), JSON.stringify(parts));
fs.writeFileSync(path.join(ROOT, 'feed.json'), JSON.stringify(feed, null, 1));
log('wrote', finalEvents.length, 'events,', auto.length, 'auto channel confirmations,', Object.keys(bySport).length, 'sport calendars');
