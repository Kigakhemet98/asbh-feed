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
 *   Sport 24        sport24live.com/schedule         live flag (airlines and cruise ships) → events
 *   DAZN            dazn.com/en-KE/schedule          read by the apps themselves on the device (DAZN refuses servers outside Africa)
 *
 * A source that fails keeps its previous results (never wipes good data), and every run writes
 * per-source counts to feed.json → "sources", so problems are visible at a glance. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
/* same listing clean-up as the apps (web/js/clean.js, saved here as clean.cjs – keep the two copies identical) */
const CLEAN = createRequire(import.meta.url)('./clean.cjs');

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
const CLUB_LEAGUE = /^(li|le|la|lf|pl|premier league|serie a|ligue ?1|la ?liga|nba|bundesliga)\b/i;   // club codes there: ANG = Angers, not Angola
const expand = (d, c = '') => (CLUB_LEAGUE.test(c) ? d : d.replace(/\b([A-Z]{3})\b(?= v )|(?<= v )\b([A-Z]{3})\b/g, (x) => FIFA[x] || x)).replace(/^D(\d) M(\d)$/, 'Day $1 · Singles $2').replace(/^D(\d) Dbls (\d)$/, 'Day $1 · Doubles $2');   // same as the apps

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
    map.set(k, { start: iso(p.utcStart), end: iso(p.utcEnd), sport: SPORT(p.sport, p.title), comp: cleanComp(comp), detail: expand(detail, comp), channels: chs.length ? chs : ['ss-tbc'], status: 'L', via: 'SuperSport guide' });
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
  [536, 'Saudi Pro League'], [132, 'FA Cup'], [133, 'EFL Cup'], [138, 'Copa del Rey'], [141, 'Coppa Italia'], [209, 'DFB Pokal'], [9806, 'UEFA Nations League'],
  [130, 'MLS'], [290, 'AFC Asian Cup']];
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

/* ---------- Apple TV: every MLS match (2026 →), MLB Friday Night Baseball ---------- */
async function mlbApple() {
  const s = new Date(NOW).toISOString().slice(0, 10), e = new Date(NOW + DAYS * 864e5).toISOString().slice(0, 10);
  const j = await get(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${s}&endDate=${e}&hydrate=broadcasts(all),team`);
  const out = [];
  for (const d of j.dates || []) for (const g of d.games || []) {
    const b = (g.broadcasts || []).map((x) => x.name || '').join(' | ');
    if (!/apple/i.test(b)) continue;
    const t = Date.parse(g.gameDate); if (!inWindow(t)) continue;
    out.push({ start: iso(t), duration: 190, sport: 'mlb', comp: 'MLB · Friday Night Baseball', detail: `${g.teams.away.team.name} @ ${g.teams.home.team.name}`, channels: ['apple-tv'], status: 'L', via: 'MLB schedule (Apple TV)' });
  }
  return { events: out };
}

/* ---------- Sport 24 / Sport 24 Extra – in-flight and at-sea live sport (sport24live.com/schedule JSON) ---------- */
const S24_SPORT = { 'football': 'football', 'soccer': 'football', 'ice hockey': 'hockey', 'basketball': 'basketball', 'american football': 'nfl', 'golf': 'golf', 'tennis': 'tennis',
  'cricket': 'cricket', 'rugby': 'rugby', 'rugby league': 'rugby', 'rugby union': 'rugby', 'baseball': 'mlb', 'motorsport': 'f1', 'formula 1': 'f1', 'motogp': 'motogp', 'aussie rules': 'afl', 'afl': 'afl', 'boxing': 'boxing', 'mma': 'mma', 'cycling': 'cycling', 'athletics': 'athletics' };
const S24_UP = new Set(['UEFA', 'NFL', 'NBA', 'NHL', 'ATP', 'WTA', 'AFC', 'ICC', 'PGA', 'DP', 'LIV', 'MLB', 'F1', 'UFC', 'AFL', 'NRL', 'BWF', 'HSBC', 'FIFA', 'T20', 'ODI', 'SVNS', 'WSL', 'EFL', 'FA', 'US', 'LPGA']);
const s24Title = (t) => String(t || '').toLowerCase().replace(/[a-z0-9®'’]+/g, (w) => { const u = w.toUpperCase().replace(/®/g, ''); return S24_UP.has(u) ? u : w.charAt(0).toUpperCase() + w.slice(1); }).replace(/®/g, '').trim();
const S24_NHL = { 'anaheim': 'Ducks', 'boston': 'Bruins', 'buffalo': 'Sabres', 'calgary': 'Flames', 'carolina': 'Hurricanes', 'chicago': 'Blackhawks', 'colorado': 'Avalanche',
  'columbus': 'Blue Jackets', 'dallas': 'Stars', 'detroit': 'Red Wings', 'edmonton': 'Oilers', 'florida': 'Panthers', 'la': 'Kings', 'los angeles': 'Kings', 'minnesota': 'Wild',
  'montreal': 'Canadiens', 'nashville': 'Predators', 'new jersey': 'Devils', 'nj': 'Devils', 'ny islanders': 'Islanders', 'ny rangers': 'Rangers', 'ottawa': 'Senators', 'ottowa': 'Senators',
  'philadelphia': 'Flyers', 'pittsburgh': 'Penguins', 'san jose': 'Sharks', 'seattle': 'Kraken', 'st louis': 'Blues', 'st. louis': 'Blues', 'tampa bay': 'Lightning', 'tampa': 'Lightning',
  'toronto': 'Maple Leafs', 'utah': 'Mammoth', 'vancouver': 'Canucks', 'vegas': 'Golden Knights', 'washington': 'Capitals', 'winnipeg': 'Jets' };
async function sport24() {
  const out = []; const seen = new Map();
  for (let i = 0; i < DAYS; i++) {
    const day = new Date(NOW + i * 864e5).toISOString().slice(0, 10);
    const j = await get(`https://sport24live.com/wp-json/sport24-schedule/v1/schedule/fetch?date=${day}&timezone=Etc%2FUTC`);
    for (const [feed, list] of Object.entries(j.schedule || {})) for (const x of list || []) {
      if (x.live !== 'Y' && !x.IsLive) continue;
      if (x.continues_from_previous_day) continue;
      const t = Date.parse(`${x.utc_date}T${x.utc_time}:00Z`); if (!inWindow(t)) continue;
      const sport = S24_SPORT[String(x.genre || '').toLowerCase()] || 'other';
      let comp = s24Title(x.title1); let detail = String(x.title2 || '').trim();
      const st = /^(.{2,40}?) - (.+ (?:v|vs|@) .+)$/i.exec(detail); if (st) { comp += ' · ' + st[1]; detail = st[2]; }
      if (SKIP.test(detail) || SKIP.test(comp)) continue;
      if (sport === 'hockey') detail = detail.split(' @ ').map((t) => S24_NHL[t.trim().toLowerCase()] || t.trim()).join(' @ ');
      const ch = x.extra || /extra/i.test(x.supplier || '') ? 's24-extra' : 's24';
      const where = /sea/i.test(feed) ? 'At sea' : 'In flight';
      const k = t + '|' + ch + '|' + detail.toLowerCase();
      if (seen.has(k)) { const e = seen.get(k); if (!e.note.includes(where)) e.note += ' · ' + where; continue; }
      const e = { start: iso(t), duration: +x.duration || 120, sport, comp, detail: detail.replace(/ @ /, ' @ '), channels: [ch], status: 'L', via: 'Sport 24 guide', note: where };
      seen.set(k, e); out.push(e);
    }
  }
  return { events: out };
}

/* ---------- DAZN – public schedule (dazn.com/en-KE/schedule): every listed event is live on DAZN in Africa ---------- */
const DAZN_SPORT = { 'football': 'football', 'basketball': 'basketball', 'baseball': 'mlb', 'ice hockey': 'hockey', 'american football': 'nfl', 'boxing': 'boxing', 'mma': 'mma',
  'kickboxing': 'mma', 'motorsport': 'other', 'tennis': 'tennis', 'golf': 'golf', 'padel': 'padel', 'cycling road': 'cycling', 'cycling': 'cycling', 'triathlon': 'other',
  'swimming': 'aquatics', 'wrestling': 'wwe', 'sport entertainment': 'wwe', 'volleyball': 'volleyball', 'handball': 'handball', 'rugby': 'rugby', 'cricket': 'cricket', 'netball': 'netball', 'athletics': 'athletics' };
const DAZN_COMP = { 'NHL.TV': 'NHL', 'Enterprise National League': 'National League' };
let daznPage = null;
async function daznGet(url) {
  const H = { origin: 'https://www.dazn.com', referer: 'https://www.dazn.com/', 'accept-language': 'en-GB,en;q=0.9' };
  try { return await get(url, { headers: H }); } catch (e) { log('dazn direct', e.message); }
  /* the schedule service refuses plain server requests: ask from inside dazn.com in a real browser, as the website does */
  if (!daznPage) { daznPage = await page(); await daznPage.goto('https://www.dazn.com/en-KE/schedule', { waitUntil: 'domcontentloaded', timeout: 60000 }); await daznPage.waitForTimeout(4000); }
  const r = await daznPage.evaluate(async (u) => { const x = await fetch(u); return { s: x.status, j: x.ok ? await x.json() : null }; }, url);
  if (!r.j) throw new Error('DAZN schedule ' + r.s + ' (also from inside dazn.com)');
  return r.j;
}
async function dazn() {
  const out = []; const seen = new Set();
  for (const [a, b] of [[0, 6], [7, DAYS - 1]]) {
    const d = (i) => new Date(NOW + i * 864e5).toISOString().slice(0, 10);
    const j = await daznGet(`https://epg.discovery.indazn.com/eu/v5/epgWithDatesRange?country=ke&languageCode=en&openBrowse=true&timeZoneOffset=0&startDate=${d(a)}&endDate=${d(b)}&brand=dazn`);
    for (const x of j.Tiles || []) {
      if (x.IsLinear || x.VideoType === 'Linear') continue;
      const t = Date.parse(x.EventStartTime || x.Start); if (!t || !inWindow(t)) continue;
      const sportName = String((x.Sport && x.Sport.Title) || '').toLowerCase(); if (sportName === 'live tv') continue;
      let sport = DAZN_SPORT[sportName] || 'other';
      let comp = String((x.Competition && x.Competition.Title) || x.Label || '').trim(); comp = DAZN_COMP[comp] || comp;
      if (/formula 1|\bf1\b/i.test(comp)) sport = 'f1'; else if (/motogp/i.test(comp)) sport = 'motogp';
      let detail = String(x.Title || '').trim().replace(/ vs\.? /gi, ' v ');
      const st = /^(.{2,40}?): (.+ (?:v|@) .+)$/.exec(detail);
      if (st) { if (!new RegExp('^' + st[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i').test(comp.split(' ')[0])) comp += ' · ' + st[1]; detail = st[2]; }
      if (SKIP.test(detail) || /kickoff|pre-?game|post-?game|show\b|press conference|weigh/i.test(detail)) continue;
      const teams = / v | @ /.test(detail);
      if (!teams && ['football', 'basketball', 'mlb', 'hockey', 'nfl', 'rugby', 'cricket', 'volleyball', 'handball', 'netball'].includes(sport)) continue;   // a programme, not a match
      const k = t + '|' + detail.toLowerCase(); if (seen.has(k)) continue; seen.add(k);
      const ms = x.DurationInMillis || (x.End && Date.parse(x.End) - t);
      out.push({ start: iso(t), duration: ms ? Math.round(ms / 60000) : (sport === 'football' ? 115 : 150), sport, comp, detail, channels: ['dazn'], status: 'L', via: 'DAZN schedule' });
    }
  }
  return { events: out };
}

/* ---------- rights watch: African broadcasters on the MLB and AFC "where to watch" pages ----------
 * Known broadcasters map onto the apps' providers; a broadcaster not seen before is added over the air
 * (provider + "channel TBA" + rights rule) and a GitHub issue is opened so it can be checked. */
const AFRICA = /algeria|angola|benin|botswana|burkina|burundi|cameroon|cape verde|cabo verde|central african|chad|comoros|congo|c[oô]te d.?ivoire|djibouti|egypt|equatorial guinea|eritrea|eswatini|swaziland|ethiopia|gabon|gambia|ghana|guinea|kenya|lesotho|liberia|libya|madagascar|malawi|mali\b|mauritania|mauritius|mayotte|morocco|mozambique|namibia|niger|nigeria|r[ée]union|rwanda|s[aã]o tom[ée]|senegal|seychelles|sierra leone|somalia|south africa|sudan|tanzania|togo|tunisia|uganda|zambia|zanzibar|zimbabwe|western sahara|pan africa|sub-saharan|africa\b/i;
const KNOWN = [[/espn/i, 'espn'], [/bein.*france/i, 'beinfr'], [/bein/i, 'bein'], [/azam/i, 'azam'], [/startimes/i, 'startimes'], [/supersport|dstv|multichoice/i, 'supersport'],
  [/canal\+?|canal plus/i, 'canalplus'], [/new world/i, 'nws'], [/apple/i, 'appletv'], [/dazn/i, 'dazn'], [/\bzap\b/i, 'zap'], [/sporty/i, 'sportytv']];
const WATCH = [
  { key: 'mlb', label: 'MLB', url: 'https://www.mlb.com/postseason/international-broadcasters', sport: 'mlb', comp: '^mlb\\b|major league baseball|world series', kind: 'mlb' },
  { key: 'afc', label: 'AFC competitions', url: 'https://www.the-afc.com/en/more/content/2903007.html', sport: 'football', comp: 'afc asian cup|^asian cup|afc champions league|^acl\\b|afc cup', kind: 'afc' },
  { key: 'afc-asian-cup', label: 'AFC Asian Cup', url: 'https://www.the-afc.com/en/national/afc_asian_cup/afc_asian_cup_-_where_to_watch.html', sport: 'football', comp: 'afc asian cup|^asian cup', kind: 'afc' }
];
const cell = (h) => strip(h || '');
function parseRights(html, kind) {
  const rows = [];
  if (kind === 'mlb') {
    for (const t of html.split(/<table/i).slice(1)) {
      const region = cell((/<th[^>]*>([\s\S]*?)<\/th>/i.exec(t) || [])[1]);
      for (const r of t.split(/<tr/i).slice(1)) {
        const td = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]); if (td.length < 3) continue;
        const terr = cell(td[2]); if (!AFRICA.test(region + ' ' + terr)) continue;
        for (const name of cell(td[1]).split(/,| and | & /).map((x) => x.trim()).filter(Boolean)) rows.push({ name, url: '', territories: terr, region });
      }
    }
  } else {
    const africa = html.split(/<h2[^>]*>\s*Africa\s*<\/h2>/i)[1]; const scope = africa ? africa.split(/<h2/i)[0] : html;
    for (const r of scope.split(/<tr/i).slice(1)) {
      const td = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]); if (td.length < 2) continue;
      const terr = cell(td[0]); if (!AFRICA.test(terr)) continue;
      for (const a of td[1].matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) { const alt = (/alt="([^"]*)"/i.exec(a[2]) || [])[1] || cell(a[2]) || a[1]; rows.push({ name: alt.trim(), url: a[1], territories: terr, region: 'Africa' }); }
    }
  }
  return rows;
}
async function rightsWatch(prev) {
  const watch = {}; const providers = []; const channels = []; const rights = []; const newOnes = [];
  for (const w of WATCH) {
    try {
      const rows = parseRights(await get(w.url, { type: 'text' }), w.kind);
      const list = rows.map((r) => ({ ...r, provider: (KNOWN.find(([re]) => re.test(r.name)) || [])[1] || null }));
      for (const r of list) {
        if (r.provider) continue;
        const id = 'x-' + slug(r.name).replace(/ /g, '-').slice(0, 30); r.provider = id;
        if (!providers.some((p) => p.id === id)) {
          providers.push({ id, name: r.name, note: `${w.label} rights · ${r.territories.slice(0, 80)}`, bg: '#222222', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], url: r.url || w.url });
          channels.push({ id: id + '-tbc', provider: id, name: `${r.name} (channel TBA)`, short: r.name });
        }
        rights.push({ label: `${w.label} – ${r.name}`, sport: w.sport, comp: w.comp, channels: [id + '-tbc'] });
        const seenBefore = ((prev[w.key] || {}).rows || []).some((x) => x.name === r.name);
        if (!seenBefore) newOnes.push(`${w.label}: **${r.name}** – ${r.territories}`);
      }
      watch[w.key] = { ok: true, checked: new Date().toISOString(), url: w.url, rows: list };
    } catch (e) { watch[w.key] = Object.assign({}, prev[w.key] || {}, { ok: false, error: String(e.message || e).slice(0, 120), checked: new Date().toISOString() }); }
  }
  /* known providers that appear for the first time for a competition are reported too */
  for (const w of WATCH) for (const r of (watch[w.key] || {}).rows || []) {
    if (!((prev[w.key] || {}).rows || []).length) continue;
    if (!((prev[w.key] || {}).rows || []).some((x) => x.name === r.name) && !newOnes.some((n) => n.includes(r.name))) newOnes.push(`${w.label}: **${r.name}** – ${r.territories}`);
  }
  if (newOnes.length && process.env.GITHUB_TOKEN && process.env.GITHUB_REPOSITORY) {
    try {
      await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues`, { method: 'POST', headers: { authorization: 'Bearer ' + process.env.GITHUB_TOKEN, accept: 'application/vnd.github+json', 'content-type': 'application/json', 'user-agent': 'asbh-feed' },
        body: JSON.stringify({ title: 'New African broadcaster listed', body: 'The rights watch found broadcaster(s) not listed before:\n\n' + newOnes.map((n) => '- ' + n).join('\n') + '\n\nUnknown names were added to the apps automatically with a "channel TBA" badge. Add the real channel(s) in `manual.json` if needed.' }) });
    } catch (e) { log('issue', e.message); }
  }
  return { watch, providers, channels, rights };
}

/* ---------- name matching ---------- */
const DROP = /^(fc|afc|cf|sc|sfc|bc|cd|ud|sd|rc|rcd|ac|as|ss|sv|vfl|tsg|fk|sk|bk|if|club|1|the|de|w|women|sport|clube?)$/;
const ALIAS = { 'man utd': 'manchester united', 'man united': 'manchester united', 'man city': 'manchester city', 'spurs': 'tottenham', 'wolves': 'wolverhampton', 'inter': 'internazionale', 'psg': 'paris saint germain',
  'bayern munich': 'bayern munchen', 'bayern': 'bayern munchen', 'atletico madrid': 'atletico', 'atl madrid': 'atletico', 'gladbach': 'monchengladbach', 'leverkusen': 'bayer leverkusen', 'cote divoire': 'ivory coast', 'the gambia': 'gambia' };
const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ø/g, 'o').replace(/[^a-z0-9]+/g, ' ').trim();
const norm = (s) => { let x = slug(s); x = ALIAS[x] || x; return x.split(' ').filter((w) => w && !DROP.test(w)).join(' '); };
const sameTeam = (a, b) => { const x = norm(a), y = norm(b); if (!x || !y) return false; if (x === y) return true;
  const short = x.length < y.length ? x : y, long = x.length < y.length ? y : x; return short.length >= 4 && (long.includes(short) || short.split(' ').every((w) => w.length >= 4 && long.split(' ').includes(w))); };
const sides = (e) => { if (e.home && e.away) return [e.home, e.away]; const d = e.detail || '';
  const at = / @ /.exec(d); if (at) return [d.slice(at.index + 3), d.slice(0, at.index)];   // US style "Away @ Home"
  const m = / v(?:s\.?)? /i.exec(d); return m ? [d.slice(0, m.index), d.slice(m.index + m[0].length)] : null; };
const NO_TEAMS = new Set(['golf', 'tennis', 'f1', 'motogp', 'wec', 'wrc', 'nascar', 'supercars', 'superbikes', 'cycling', 'athletics', 'aquatics', 'other']);
const sameMatch = (a, b) => { const s = sides(a), o = sides(b); if (!s || !o) return false; return (sameTeam(s[0], o[0]) && sameTeam(s[1], o[1])) || (sameTeam(s[0], o[1]) && sameTeam(s[1], o[0])); };

/* ---------- run ---------- */
const SOURCES = { supersport, bein, nws, azam, startimes, canalplus, zap, azamtv, mlbApple, sport24 };   // dazn(): DAZN refuses servers outside Africa (403 on GitHub); the apps read its schedule on the device
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
/* expand guide abbreviations ("LI: MCI v FUL", "B'mouth", "ALE v HOL") and fix sports before matching; drop studio shows */
for (const name of Object.keys(parts)) if (parts[name].events) parts[name].events = parts[name].events.filter((e) => {
  try { CLEAN.cleanEvent(e); } catch (err) { log('clean', name, err.message); }
  return !(CLEAN.SHOW_RE && CLEAN.SHOW_RE.test(`${e.comp || ''} ${e.detail || ''}`) && !e.home);
});
const fx = (await fixtures()).events; log('fixtures', fx.length);

/* 1) live events from guides that mark live sport, merged by match */
const events = [];
for (const name of ['supersport', 'bein', 'azam', 'azamtv', 'nws', 'mlbApple', 'sport24']) for (const e of (parts[name] || {}).events || []) {
  const t = +new Date(e.start);
  /* same match = same two teams within 4 h (guides disagree on kick-off by up to an hour), or same title within 45 min.
     Sources run in trust order, so the first (SuperSport / beIN) keeps its kick-off time. */
  const twin = events.find((x) => x.sport === e.sport && ((sides(e) && Math.abs(+new Date(x.start) - t) <= 4 * 3600e3 && sameMatch(x, e)) || (!sides(e) && Math.abs(+new Date(x.start) - t) <= 45 * 60e3 && x.detail === e.detail)
    /* a generic session block ("WTA Finals - Indian Wells") joins the real session of that event starting within 90 min */
    || (NO_TEAMS.has(e.sport) && !sides(e) && !sides(x) && Math.abs(+new Date(x.start) - t) <= 90 * 60e3 && slug(x.comp || '').split(' ')[0] && slug(x.comp || '').split(' ')[0] === slug(e.comp || '').split(' ')[0])));
  if (twin) { twin.channels = [...new Set(twin.channels.concat(e.channels))]; if (!twin.comp && e.comp) twin.comp = e.comp; twin.via = [...new Set(String(twin.via).split(' · ').concat(e.via))].join(' · '); continue; }
  events.push({ ...e });
}
/* every MLS match is on Apple TV; AFC Asian Cup fixtures carry the rights holders' "channel TBA" badges in the apps */
for (const f of fx.filter((x) => x.comp === 'MLS' || x.comp === 'AFC Asian Cup')) {
  const tw = events.find((x) => Math.abs(+new Date(x.start) - +new Date(f.start)) <= 4 * 3600e3 && sameMatch(x, f));
  const add = f.comp === 'MLS' ? ['apple-tv'] : [];
  if (tw) { tw.channels = [...new Set(tw.channels.concat(add))]; continue; }
  events.push({ ...f, channels: add, via: f.comp === 'MLS' ? 'MLS fixtures (Apple TV)' : 'AFC fixtures' });
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
const prevWatch = (read('feed.json', {}) || {}).rightsWatch || {};
const rw = await rightsWatch(prevWatch);
const RAW = 'https://raw.githubusercontent.com/' + (process.env.GITHUB_REPOSITORY || 'Kigakhemet98/asbh-feed') + '/main/logos/';
/* 2.2.2: DStv (Rest of Africa · South Africa), CANAL+ Afrique and beIN MENA channel numbers – edit here to change them over the air */
const NUMS = [{"id": "azam-1", "num": "Azam TV 111", "no": 111}, {"id": "azam-2", "num": "Azam TV 112", "no": 112}, {"id": "azam-3", "num": "Azam TV 113", "no": 113}, {"id": "azam-4", "num": "Azam TV 114", "no": 114}, {"id": "azam-5", "num": "Azam TV 115", "no": 115}, {"id": "ss-swahili", "num": "DStv 216", "no": 216, "countries": "East Africa – Kenya · Uganda · Tanzania"}, {"id": "ss-wwe", "num": "DStv 128 · ROA 226", "no": 128}, {"id": "ss-events", "num": "DStv 199", "no": 199}, {"id": "ss-extra-2", "num": "DStv 217 (South Africa)", "no": 217}, {"id": "ss-blitz", "num": "DStv 220 · 200", "no": 220}, {"id": "ss-grandstand", "num": "DStv 221 · 201", "no": 221}, {"id": "ss-football-plus", "num": "DStv 222 · 206", "no": 222}, {"id": "ss-premier-league", "num": "DStv 223 · 203", "no": 223}, {"id": "ss-laliga", "num": "DStv 224 · 204", "no": 224}, {"id": "ss-football", "num": "DStv 225 · 205", "no": 225}, {"id": "ss-kickoff", "num": "DStv 227 · 207", "no": 227}, {"id": "ss-africa", "num": "DStv 228 · 208", "no": 228}, {"id": "ss-action", "num": "DStv 229 · 209", "no": 229}, {"id": "ss-extra-1", "num": "DStv 230 · 210", "no": 230}, {"id": "ss-rugby", "num": "DStv 231 · 211", "no": 231}, {"id": "ss-cricket", "num": "DStv 232 · 212", "no": 232}, {"id": "ss-golf", "num": "DStv 233 · 213", "no": 233}, {"id": "ss-tennis", "num": "DStv 234 · 214", "no": 234}, {"id": "ss-motorsport", "num": "DStv 235 · 215", "no": 235}, {"id": "ss-maximo-1", "num": "DStv 241 · Angola/Moz 601", "no": 241}, {"id": "ss-maximo-2", "num": "DStv 242 · Angola/Moz 602", "no": 242}, {"id": "ss-stream-245", "num": "DStv Stream 245", "no": 245}, {"id": "ss-stream-246", "num": "DStv Stream 246", "no": 246}, {"id": "ss-stream-247", "num": "DStv Stream 247", "no": 247}, {"id": "ss-stream-248", "num": "DStv Stream 248", "no": 248}, {"id": "ss-stream-950", "num": "DStv Stream 950", "no": 950}, {"id": "ss-stream-951", "num": "DStv Stream 951", "no": 951}, {"id": "ss-stream-952", "num": "DStv Stream 952", "no": 952}, {"id": "cp-sport-1", "num": "CANAL+ 11", "no": 11}, {"id": "cp-sport-2", "num": "CANAL+ 12", "no": 12}, {"id": "cp-sport-3", "num": "CANAL+ 13", "no": 13}, {"id": "cp-sport-4", "num": "CANAL+ 14", "no": 14}, {"id": "cp-sport-5", "num": "CANAL+ 15", "no": 15}, {"id": "bein-1", "num": "beIN 1", "no": 1}, {"id": "bein-2", "num": "beIN 2", "no": 2}, {"id": "bein-3", "num": "beIN 3", "no": 3}, {"id": "bein-4", "num": "beIN 4", "no": 4}, {"id": "bein-5", "num": "beIN 5", "no": 5}, {"id": "bein-6", "num": "beIN 6", "no": 6}, {"id": "bein-7", "num": "beIN 7", "no": 7}, {"id": "bein-8", "num": "beIN 8", "no": 8}, {"id": "bein-9", "num": "beIN 9", "no": 9}, {"id": "bein-10", "num": "beIN 10", "no": 10}, {"id": "bein-news", "num": "beIN 10", "no": 10}, {"id": "bein-sports", "num": "beIN 11", "no": 11}, {"id": "bein-4k", "num": "beIN 14", "no": 14}, {"id": "bein-english-1", "num": "beIN 21", "no": 21}, {"id": "bein-english-2", "num": "beIN 22", "no": 22}, {"id": "bein-french-1", "num": "beIN 26", "no": 26}, {"id": "bein-french-2", "num": "beIN 27", "no": 27}, {"id": "bein-xtra-1", "num": "beIN 41", "no": 41}, {"id": "bein-xtra-2", "num": "beIN 42", "no": 42}, {"id": "bein-xtra-3", "num": "beIN 43", "no": 43}, {"id": "bein-xtra-4", "num": "beIN 44", "no": 44}, {"id": "bein-xtra-5", "num": "beIN 45", "no": 45}, {"id": "bein-xtra-6", "num": "beIN 46", "no": 46}, {"id": "bein-xtra-7", "num": "beIN 47", "no": 47}, {"id": "bein-xtra-8", "num": "beIN 48", "no": 48}, {"id": "bein-xtra-9", "num": "beIN 49", "no": 49}, {"id": "bein-max-1", "num": "beIN 701", "no": 701}, {"id": "bein-max-2", "num": "beIN 702", "no": 702}, {"id": "bein-max-3", "num": "beIN 703", "no": 703}, {"id": "bein-max-4", "num": "beIN 704", "no": 704}, {"id": "bein-max-5", "num": "beIN 705", "no": 705}, {"id": "bein-max-6", "num": "beIN 706", "no": 706}];
const OTA = {
  providers: [
    { id: 'sport24', abbr: '24', name: 'Sport 24', note: 'Live sport on airlines and cruise ships · Sport 24 & Sport 24 Extra (Emirates, Qatar Airways, Turkish Airlines, Etihad, Saudia, British Airways and more)', bg: '#0a0a0a', fg: '#f5e400', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], guide: 'https://sport24live.com/schedule/', url: 'https://sport24live.com/watch/', links: [{ label: 'Where to watch', url: 'https://sport24live.com/watch/' }, { label: 'Schedule', url: 'https://sport24live.com/schedule/' }, { label: 'Rights', url: 'https://sport24live.com/about/' }] },
    { id: 'sportytv', name: 'Sporty TV', note: 'SportyTV channel on DStv & GOtv (since 10 June 2026) · Sporty app', regions: ['east', 'south', 'west'], url: 'https://www.dstv.com/en-ke/news/146550/sportytv-is-now-live-on-dstv-watch-live-sports-for-less/', links: [{ label: 'SportyTV on DStv', url: 'https://www.dstv.com/en-ke/news/146550/sportytv-is-now-live-on-dstv-watch-live-sports-for-less/' }, { label: 'DStv Stream', url: 'https://dstv.stream/#/' }, { label: 'Sporty', url: 'https://sporty.com/' }] },
    { id: 'supersport', note: 'DStv · GOtv · DStv Stream · channel numbers: Rest of Africa · South Africa', url: 'https://dstv.stream/#/', links: [{ label: 'DStv Stream', url: 'https://dstv.stream/#/' }, { label: 'DStv', url: 'https://www.dstv.com' }, { label: 'SuperSport', url: 'https://supersport.com' }] },
    { id: 'appletv', name: 'Apple TV', note: 'Streaming · every MLS match, Friday Night Baseball (in 100+ countries)', stream: true, bg: '#000000', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], url: 'https://tv.apple.com', links: [{ label: 'Apple TV', url: 'https://tv.apple.com' }, { label: 'MLS – how to watch', url: 'https://www.mlssoccer.com/how-to-watch/' }] },
    { id: 'beinfr', abbr: 'beIN', name: 'beIN SPORTS France', note: 'Madagascar · Mauritius · Réunion · Mayotte', bg: '#5b2c8f', fg: '#ffffff', regions: ['indian'], url: 'https://www.beinsports.com/france/' }
  ].concat(rw.providers),
  channels: [
    { id: 's24', provider: 'sport24', name: 'Sport 24', short: 'Sport 24', wide: true, num: 'In flight · At sea', logos: { light: RAW + 'sport24-on-light.png', dark: RAW + 'sport24-on-dark.png' } },
    { id: 's24-extra', provider: 'sport24', name: 'Sport 24 Extra', short: 'Sport 24 Extra', wide: true, num: 'In flight · At sea', logos: { light: RAW + 'sport24-extra-on-light.png', dark: RAW + 'sport24-extra-on-dark.png' } },
    { id: 'st-beta', wide: true, logos: { light: RAW + 'st-beta-on-light.png', dark: RAW + 'st-beta-on-dark.png' } },
    { id: 'sportytv', name: 'SportyTV', short: 'SportyTV', logo: RAW + 'sportytv.png', num: 'DStv 237 · 236', no: 237, countries: 'South Africa · Nigeria · Kenya · Ghana', gotv: ['558 (Kenya) · 58 (Nigeria) · 36 (Ghana)', 'GOtv Starter and up'] },
    ...NUMS,
    { id: 'apple-tv', provider: 'appletv', name: 'Apple TV', short: 'Apple TV', wide: true, logos: { light: RAW + 'apple-tv-on-light.png', dark: RAW + 'apple-tv-on-dark.png' } },
    { id: 'st-tbc', provider: 'startimes', name: 'StarTimes Sports (channel TBA)', short: 'Sports', logo: RAW + 'startimes-star.png' },
    { id: 'beinfr-tbc', provider: 'beinfr', name: 'beIN SPORTS France (channel TBA)', short: 'France', logo: RAW + 'bein-sports.png' }
  ].concat(rw.channels),
  rights: [
    { label: 'AFC Asian Cup – StarTimes (Sub-Saharan Africa)', sport: 'football', comp: 'afc asian cup|^asian cup', channels: ['st-tbc'] },
    { label: 'AFC Asian Cup – Azam (East & Southern Africa)', sport: 'football', comp: 'afc asian cup|^asian cup', channels: ['azam-tbc'] },
    { label: 'AFC Asian Cup – beIN (North Africa)', sport: 'football', comp: 'afc asian cup|^asian cup', channels: ['bein-tbc'] },
    { label: 'MLS – Apple TV', sport: 'football', comp: '^mls\\b|major league soccer|leagues cup', channels: ['apple-tv'] }
  ].concat(rw.rights),
  compLogos: [
    { comp: '^mls\\b|major league soccer|^leagues cup', logo: { light: RAW + 'mls-on-light.png', dark: RAW + 'mls-on-dark.png' } },
    { comp: 'afc asian cup|^asian cup', logo: { light: RAW + 'afc-asian-cup.png', dark: RAW + 'afc-asian-cup-on-dark.png' } }
  ]
};
const feed = {
  version: 2,
  name: 'African Sports Broadcast Hub – live feed',
  updated: new Date().toISOString(),
  notes: 'Built automatically from the broadcasters\' live TV guides several times a day (only live sport, next 10 days). Hand-entered announcements live in manual.json. Calendar files: calendar.ics (all) and calendars/<sport>.ics.',
  sources: status,
  assignments: (manual.assignments || []).concat(auto),
  events: finalEvents.concat(manual.events || []),
  overrides: manual.overrides || [],
  providers: OTA.providers.concat(manual.providers || []),
  channels: OTA.channels.concat(manual.channels || []),
  /* 2.2.3: DStv Stream moved to dstv.stream */
  platforms: [{ id: 'dstv-stream', url: 'https://dstv.stream/#/' }].concat(manual.platforms || []),
  rights: OTA.rights.concat(manual.rights || []),
  compLogos: OTA.compLogos.concat(manual.compLogos || []),
  rightsWatch: rw.watch
};
fs.mkdirSync(path.join(ROOT, 'state'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'state', 'parts.json'), JSON.stringify(parts));
fs.writeFileSync(path.join(ROOT, 'feed.json'), JSON.stringify(feed, null, 1));
log('wrote', finalEvents.length, 'events,', auto.length, 'auto channel confirmations,', Object.keys(bySport).length, 'sport calendars');
