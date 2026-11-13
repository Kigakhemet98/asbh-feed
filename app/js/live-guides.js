/* Live TV guides, fetched inside the app in the background.
 *
 * The Windows app (Electron) and the Android app fetch these sites natively (no browser CORS limits):
 *   Windows  → window.asbhNet.fetch(url)            (preload bridge, desktop/preload.js)
 *   Android  → https://appassets.androidplatform.net/__net?u=<url>   (native proxy in the app shell)
 * In a plain browser the sites block cross-origin requests, so the website relies on the hourly
 * GitHub/feeds build (data/schedule.json) instead – same data, same format.
 *
 * Every refresh REPLACES the previous guide data, so kick-off changes, postponements and
 * cancellations published by the broadcasters flow through automatically. */
(function (A) {
  'use strict';
  const HOURS = 2;                       // refresh interval for the guides
  const DAYS = 10;                       // look-ahead window
  const KEY = 'liveGuides';

  /* ---------- transport ---------- */
  const isAndroid = !!window.ASBHNative && location.host === 'appassets.androidplatform.net';
  A.netAvailable = () => !!(window.asbhNet && window.asbhNet.fetch) || isAndroid;
  A.netFetch = async (url, type = 'json') => {
    let text;
    if (window.asbhNet && window.asbhNet.fetch) text = await window.asbhNet.fetch(url);
    else if (isAndroid) { const r = await fetch('/__net?u=' + encodeURIComponent(url), { cache: 'no-store' }); if (!r.ok) throw new Error(r.status + ' ' + url); text = await r.text(); }
    else { const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error(r.status + ' ' + url); text = await r.text(); }
    return type === 'json' ? JSON.parse(text) : text;
  };

  const iso = (d) => new Date(d).toISOString();
  const day = (offset) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);
  const SPORT = (s, t = '') => {
    const x = (s + ' ' + t).toLowerCase();
    if (/futebol|football|soccer/.test(x) && !/usa football|american/.test(x)) return 'football';
    if (/usa football|american football|\bnfl\b/.test(x)) return 'nfl';
    if (/basket/.test(x)) return 'basketball'; if (/ice hockey|\bnhl\b/.test(x)) return 'hockey';
    if (/\bufc\b/.test(x)) return 'ufc'; if (/\bmma\b|muay|pfl/.test(x)) return 'mma'; if (/box/.test(x)) return 'boxing';
    if (/rugby/.test(x)) return 'rugby'; if (/cricket/.test(x)) return 'cricket'; if (/tennis/.test(x)) return 'tennis';
    if (/golf/.test(x)) return 'golf'; if (/formula ?1|\bf1\b/.test(x)) return 'f1'; if (/motogp/.test(x)) return 'motogp';
    if (/cycling/.test(x)) return 'cycling'; if (/wwe|luta livre|wrestling|aew/.test(x)) return 'wwe'; if (/volley/.test(x)) return 'volleyball';
    if (/premier league|liga|serie a|bundesliga|ligue|eredivisie|primeira|\bcup\b|copa|coupe|pokal|afcon|\bcaf\b|uefa|fifa|champions league|europa|conference|saudi|super lig|qualif/.test(x)) return 'football';
    return 'other';
  };
  const SKIP = /build.?up|wrap|countdown|courtside|tip-off|scoreboard|gameday|inside the|nba today|nfl live|first take|mcafee|schrager|soccer africa|line ?up|monday night football|extra time|fanzone|mundo da bola|paddock|press conference|weigh-in/i;

  /* SuperSport titles use short codes: "PL: …", "UNL '26: CZE v ESP", "AFCON Qualifier '27: GHA v SOM" */
  const COMP = [[/^PL$/, 'Premier League'], [/^UNL/, 'UEFA Nations League'], [/^AFCON (Qualifier|Eliminatórias)/, 'AFCON 2027 Qualifiers'], [/^UWCL$/, "UEFA Women's Champions League"],
    [/^WSL/, "Women's Super League"], [/^CCL \(W\)/, "CAF Women's Champions League"], [/^Int CRI/, 'International Cricket'], [/^Nations Champs/, 'Nations Championship'],
    [/^ATP World Tour Finals/, 'ATP Finals'], [/^WBBL/, "Women's Big Bash League"], [/^BBL/, 'Big Bash League'], [/^Pro20 Cup/, 'CSA Pro20 Cup'], [/^Diski Challenge/, 'DStv Diski Challenge'],
    [/^NBA/, 'NBA'], [/^CBB$/, 'NCAA Basketball'], [/^NHL/, 'NHL'], [/^PFL WT/, 'PFL World Tournament'], [/^WTCS/, 'World Triathlon Championship Series'], [/^LaLiga|^La Liga/, 'LaLiga'],
    [/^SA ?L$|^Serie A/, 'Serie A'], [/^BL$|^Bundesliga/, 'Bundesliga'], [/^UCL$/, 'UEFA Champions League'], [/^UEL$/, 'UEFA Europa League'], [/^URC/, 'United Rugby Championship'], [/^F1\b/, 'Formula 1']];
  const cleanComp = (c) => { for (const [re, v] of COMP) if (re.test(c)) return v; return c.replace(/\s+('\d\d|\d\d\/\d\d)\b/g, '').trim(); };
  const FIFA = { GHA: 'Ghana', SOM: 'Somalia', CMR: 'Cameroon', NAM: 'Namibia', ZAM: 'Zambia', BDI: 'Burundi', GAB: 'Gabon', LES: 'Lesotho', EGY: 'Egypt', MAW: 'Malawi', UGA: 'Uganda',
    BOT: 'Botswana', ANG: 'Angola', SSD: 'South Sudan', ZIM: 'Zimbabwe', GEQ: 'Equatorial Guinea', KEN: 'Kenya', RSA: 'South Africa', NGR: 'Nigeria', TAN: 'Tanzania', CPV: 'Cape Verde',
    LBR: 'Liberia', MOZ: 'Mozambique', ETH: 'Ethiopia', MAR: 'Morocco', NIG: 'Niger', CIV: "Cote d'Ivoire", GAM: 'The Gambia', GUI: 'Guinea', ERI: 'Eritrea', COD: 'DR Congo', SLE: 'Sierra Leone',
    BEN: 'Benin', CTA: 'Central African Republic', BFA: 'Burkina Faso', MTN: 'Mauritania', COM: 'Comoros', CGO: 'Congo', TUN: 'Tunisia', LBY: 'Libya', ALG: 'Algeria', TOG: 'Togo', SEN: 'Senegal',
    SDN: 'Sudan', MLI: 'Mali', RWA: 'Rwanda', MAD: 'Madagascar', GNB: 'Guinea-Bissau', CZE: 'Czechia', ESP: 'Spain', SRB: 'Serbia', GER: 'Germany', SWE: 'Sweden', BIH: 'Bosnia and Herzegovina',
    ROU: 'Romania', DEN: 'Denmark', NOR: 'Norway', TUR: 'Turkey', BEL: 'Belgium', ENG: 'England', CRO: 'Croatia', MDA: 'Moldova', KAZ: 'Kazakhstan', NED: 'Netherlands', GRE: 'Greece', KVX: 'Kosovo',
    ISR: 'Israel', WAL: 'Wales', POR: 'Portugal', CYP: 'Cyprus', MNE: 'Montenegro', FIN: 'Finland', SMR: 'San Marino', SVK: 'Slovakia', ISL: 'Iceland', LUX: 'Luxembourg', LAT: 'Latvia',
    SVN: 'Slovenia', SLO: 'Slovenia', SUI: 'Switzerland', NIR: 'Northern Ireland', UKR: 'Ukraine', ITA: 'Italy', SCO: 'Scotland', GEO: 'Georgia', ALB: 'Albania', MKD: 'North Macedonia', HUN: 'Hungary',
    POL: 'Poland', ARM: 'Armenia', BLR: 'Belarus', EST: 'Estonia', BUL: 'Bulgaria', FRA: 'France', FRO: 'Faroe Islands', AUT: 'Austria', IRL: 'Republic of Ireland', LIE: 'Liechtenstein',
    AZE: 'Azerbaijan', NZL: 'New Zealand', IND: 'India', AUS: 'Australia', BAN: 'Bangladesh', ARG: 'Argentina', JPN: 'Japan', FIJ: 'Fiji', IRE: 'Ireland', PAK: 'Pakistan', SRI: 'Sri Lanka', WIN: 'West Indies' };
  const CLUB_LEAGUE = /^(li|le|la|lf|pl|premier league|serie a|ligue 1|la ?liga|nba|bundesliga)\b/i;   // club codes there: ANG = Angers, not Angola
  const expand = (d, c = '') => (CLUB_LEAGUE.test(c) ? d : d.replace(/\b([A-Z]{3})\b(?= v )|(?<= v )\b([A-Z]{3})\b/g, (x) => FIFA[x] || x)).replace(/^D(\d) M(\d)$/, 'Day $1 · Singles $2').replace(/^D(\d) Dbls (\d)$/, 'Day $1 · Doubles $2');

  /* ---------- SuperSport 10-day guide (supersport.com/tv-guide) ---------- */
  const SS_NUM = { 128: 'ss-wwe', 199: 'ss-events', 200: 'ss-blitz', 206: 'ss-football-plus', 211: 'ss-rugby', 212: 'ss-cricket', 213: 'ss-golf', 215: 'ss-motorsport', 217: 'ss-extra-2', 201: 'ss-grandstand', 203: 'ss-premier-league', 204: 'ss-laliga', 224: 'ss-laliga', 205: 'ss-football', 207: 'ss-kickoff', 208: 'ss-africa',
    209: 'ss-action', 210: 'ss-extra-1', 214: 'ss-tennis', 218: 'espn', 219: 'espn2', 222: 'ss-football-plus', 235: 'ss-motorsport', 241: 'ss-maximo-1', 242: 'ss-maximo-2',
    244: 'awsn', 245: 'ss-stream-245', 246: 'ss-stream-246', 247: 'ss-stream-247', 248: 'ss-stream-248', 950: 'ss-stream-950', 951: 'ss-stream-951', 952: 'ss-stream-952' };
  async function supersport() {
    const rows = await A.netFetch(`https://supersport.com/apix/guide/v6/tvguide?countryCode=ke&startDateTime=${day(0)}&endDateTime=${day(DAYS)}&removeCompletedEvents=true`);
    const map = new Map();
    for (const p of rows) {
      if (!p.isLive || /news|talk show|magazine|variety/i.test(p.sport) || SKIP.test(p.title)) continue;
      const chs = (p.channel || []).map((c) => (c.channelCode === 'TBC' ? 'ss-tbc' : SS_NUM[c.channelNumber])).filter(Boolean);
      const i = p.title.indexOf(':'); const comp = i > 0 ? p.title.slice(0, i).trim() : p.title; const detail = i > 0 ? p.title.slice(i + 1).trim() : p.title;
      const k = p.utcStart + '|' + detail.toLowerCase(); const prev = map.get(k);
      if (prev) { prev.channels = [...new Set(prev.channels.concat(chs))]; continue; }
      map.set(k, { start: iso(p.utcStart), end: iso(p.utcEnd), sport: SPORT(p.sport, p.title), comp: cleanComp(comp), detail: expand(detail, comp), channels: chs.length ? chs : ['ss-tbc'], status: 'L', src: 'guide:supersport' });
    }
    return [...map.values()];
  }

  /* ---------- beIN SPORTS MENA (beinsports.com/en-mena/tv-guide) ---------- */
  function beinId(name) {
    const t = name.toLowerCase(); const n = (/(\d+)/.exec(t) || [])[1];
    for (const k of ['xtra', 'max', 'afc']) if (t.includes(k)) return n ? `bein-${k}-${n}` : (k === 'afc' ? 'bein-afc' : null);
    if (/\ben\b|english/.test(t)) return n ? 'bein-english-' + n : null; if (/\bfr\b|french/.test(t)) return n ? 'bein-french-' + n : null;
    if (t.includes('nba')) return 'bein-nba'; if (t.includes('4k')) return 'bein-4k'; if (t.includes('news')) return null;
    return n ? 'bein-' + n : 'bein-sports';
  }
  async function bein() {
    const base = 'https://www.beinsports.com/api/opta';
    const ch = (await A.netFetch(base + '/tv-channel?region=en-mena')).rows || [];
    const q = new URLSearchParams({ searchKey: '', startBefore: new Date(Date.now() + DAYS * 864e5).toISOString(), endAfter: new Date().toISOString(), limit: '5000' });
    ch.forEach((c) => q.append('channelIds', c.id));
    const rows = (await A.netFetch(base + '/tv-event?' + q)).rows || [];
    const map = new Map();
    for (const e of rows) {
      if (!e.live || /entertainment|sports (general|news)/i.test(e.category)) continue;
      const c = beinId((e.channel && e.channel.name) || ''); if (!c) continue;
      const parts = e.title.split(' - '); const detail = parts[0].replace(/\s+vs\.?\s+/i, ' v ').replace(/\s*\([A-Z]{3}\)/g, '').trim();
      const k = e.startDate + '|' + detail; if (map.has(k)) { map.get(k).channels.push(c); continue; }
      map.set(k, { start: iso(e.startDate), end: iso(e.endDate), sport: SPORT(e.category, e.title), comp: cleanComp(e.category.replace(/^(Tennis|Basketball) - /, '').replace(/^English Premier League$/, 'Premier League').replace(/^AFCON Qualifiers$/, 'AFCON 2027 Qualifiers')), detail, channels: [c], status: 'L', src: 'guide:bein' });
    }
    return [...map.values()];
  }

  /* ---------- DAZN (Uganda storefront = Africa catalogue) ---------- */
  async function dazn() {
    const out = []; const seen = new Set();
    for (let i = 0; i < DAYS; i += 7) {
      const j = await A.netFetch(`https://epg.discovery.indazn.com/eu/v5/epgWithDatesRange?country=ug&languageCode=en&openBrowse=true&timeZoneOffset=0&startDate=${day(i)}&endDate=${day(Math.min(i + 6, DAYS - 1))}&brand=dazn`);
      for (const t of j.Tiles || []) {
        const comp = ((t.Competition && t.Competition.Title) || '').trim(); const sport = (t.Sport && t.Sport.Title) || '';
        if (/Live TV|NFL Game Pass|NHL\.TV|FIFA\+|U23|NCAA/.test(comp + '|' + sport) || /Broadcast\)|Commentary Available|Playbook|Field Pass/.test(t.Title) || SKIP.test(t.Title)) continue;
        const detail = t.Title.replace(/\s*\(.*\)$/, '').replace(/ vs\. /g, ' v '); const k = t.Start + detail; if (seen.has(k)) continue; seen.add(k);
        out.push({ start: iso(t.Start), end: t.End && !t.End.startsWith('3000') ? iso(t.End) : undefined, sport: SPORT(sport, comp), comp, detail, channels: ['dazn'], status: 'L', src: 'guide:dazn' });
      }
    }
    return out;
  }

  /* ---------- Fixtures (FotMob) for leagues whose African rights holders publish no guide:
   *            Azam TV, StarTimes, CANAL+ Afrique and ZAP. Channels are added by the rights plugin. */
  const LEAGUES = [[47, 'Premier League'], [87, 'LaLiga'], [55, 'Serie A'], [54, 'Bundesliga'], [53, 'Ligue 1'], [42, 'UEFA Champions League'],
    [73, 'UEFA Europa League'], [536, 'Saudi Pro League'], [130, 'MLS']];   // MLS: every match on Apple TV
  async function fixtures() {
    const out = []; const now = Date.now(); const end = now + 14 * 864e5;
    for (const [id, name] of LEAGUES) {
      try {
        const j = await A.netFetch('https://www.fotmob.com/api/data/leagues?id=' + id);
        for (const m of (j.fixtures && j.fixtures.allMatches) || []) {
          const t = Date.parse((m.status && m.status.utcTime) || m.utcTime); if (!(t > now - 3 * 3600e3 && t < end)) continue;
          if (new Date(t).getUTCHours() === 0 && new Date(t).getUTCMinutes() === 0) continue;   // 00:00 = kick-off not set yet
          if (m.status && m.status.cancelled) continue;
          out.push({ start: iso(t), duration: 115, sport: 'football', comp: name, detail: `${m.home.name} v ${m.away.name}`, channels: [], status: 'L', src: 'fixtures' });
        }
      } catch (e) { /* one league failing must not stop the rest */ }
      await new Promise((r) => setTimeout(r, 400));
    }
    return out;
  }

  const SOURCES = { supersport, bein, dazn, fixtures };
  let running = null;
  A.refreshGuides = async (force) => {
    if (!A.netAvailable()) return null;
    const cache = A.store.get(KEY, null);
    if (!force && cache && Date.now() - cache.at < HOURS * 3600e3) return cache;
    if (running) return running;
    running = (async () => {
      const prev = (cache && cache.parts) || {}; const parts = {}; const status = {};
      for (const [name, fn] of Object.entries(SOURCES)) {
        try { parts[name] = await fn(); status[name] = parts[name].length; }
        catch (e) { parts[name] = prev[name] || []; status[name] = 'kept previous (' + (e.message || e) + ')'; }   // keep last good copy
      }
      const out = { at: Date.now(), parts, status };
      try { A.store.set(KEY, out); } catch (e) { /* storage full: keep in memory */ }
      return out;
    })();
    try { return await running; } finally { running = null; }
  };

  /* ---------- plugin: guide events into the schedule ---------- */
  A.plugins.register({
    id: 'live-guides', builtin: true, name: 'Live TV guides (auto-update)', version: A.version,
    description: `Fetches the SuperSport 10-day guide, beIN SPORTS MENA, DAZN and league fixtures every ${HOURS} hours in the background (Windows and Android apps). New World Sport, Azam TV Max and StarTimes arrive through the live feed on GitHub (rebuilt from their guides every 3 hours). Kick-off changes and postponements replace the old listing automatically.`,
    source: async () => {
      const g = A.store.get(KEY, null);
      // stale or missing: fetch in the background, then redraw – never block the first paint
      if (A.netAvailable() && (!g || Date.now() - g.at >= HOURS * 3600e3)) A.refreshGuides(false).then((n) => n && n !== g && A.refresh());
      if (!g || !g.parts) return { events: [] };
      return { events: [].concat(...Object.values(g.parts)) };
    }
  });

  /* ---------- plugin: same match from several sources → one listing ----------
   * Keyed by sport + both teams (order-free). The newest source wins the kick-off time (a moved
   * or postponed match therefore shows its new time once) and channel lists are combined. */
  const RANK = { 'guide:supersport': 5, 'guide:bein': 5, 'guide:dazn': 5, feeds: 4, imported: 4, fixtures: 3, bundled: 1 };
  const DROP = /^(fc|afc|cf|sc|sfc|bc|cd|ud|sd|rc|rcd|ac|as|ss|sv|vfl|tsg|fk|sk|bk|if|real|club|1|the|de|w|women)$/;
  const norm = (s) => A.slug(s).split('-').filter((w) => !DROP.test(w)).join('-');
  /* a side resolves to its registry team when known, so "Cleveland" and "Cavaliers" are one team */
  const side = (name, sport) => { const t = A.findTeam && A.findTeam(name, sport); return t && !t.flag ? 'id:' + t.id : norm(name); };
  const sides = (e) => { if (e.home && e.away) return [side(e.home, e.sport), side(e.away, e.sport)];
    const m = / v(?:s\.?)? | @ /i.exec(e.detail || ''); return m ? [side(e.detail.slice(0, m.index), e.sport), side(e.detail.slice(m.index + m[0].length), e.sport)] : null; };
  const same = (a, b) => a === b || (!a.startsWith('id:') && !b.startsWith('id:') && a.length >= 4 && b.length >= 4 && (a.includes(b) || b.includes(a)));
  const teamKey = (e) => { const s = sides(e); return s ? e.sport + ':' + s.slice().sort().join('|') : null; };
  const twinOf = (e, list) => { const s = sides(e); const t = +new Date(e.start);
    return list.find((x) => x.sport === e.sport && Math.abs(+new Date(x.start) - t) < 4 * 864e5 && (() => { const o = sides(x);
      return (same(s[0], o[0]) && same(s[1], o[1])) || (same(s[0], o[1]) && same(s[1], o[0])); })()); };
  A.plugins.register({
    id: 'dedupe', builtin: true, name: 'One listing per match', version: A.version,
    description: 'Merges the same match coming from different guides and keeps the newest kick-off time.',
    transform: (events) => {
      const out = []; const byKey = new Map();
      for (const e of events) {
        const k = teamKey(e);
        if (!k) {   /* sessions without two teams (tennis order of play, races…): same title within an hour = one listing */
          const dk = 'x:' + e.sport + ':' + norm(e.detail || '') + ':' + norm(String(e.comp || '').split('·')[0]); const t = +new Date(e.start);
          const lst = byKey.get(dk) || []; const tw = lst.find((x) => Math.abs(+new Date(x.start) - t) <= 36e5);
          if (tw) { tw.channels = [...new Set(tw.channels.concat(e.channels))]; if ((RANK[e.src] || 2) > (RANK[tw.src] || 2)) Object.assign(tw, { start: e.start, end: e.end, src: e.src }); continue; }
          lst.push(e); byKey.set(dk, lst); out.push(e); continue;
        }
        const bucket = byKey.get(e.sport) || []; const twin = twinOf(e, bucket);
        if (!twin) { bucket.push(e); byKey.set(e.sport, bucket); out.push(e); continue; }
        const a = RANK[twin.src] || 2, b = RANK[e.src] || 2;
        const win = b > a ? e : twin;
        Object.assign(twin, { start: win.start, end: win.end, comp: win.comp.length >= twin.comp.length ? win.comp : twin.comp,
          channels: [...new Set(win.channels.concat(win === e ? twin.channels : e.channels))], src: win.src });
      }
      /* a guide slot titled only by the stage ("Semi-Final 2", "Final", "Match 12") is the same broadcast
         as the real fixture of that competition starting within half an hour – keep the fixture, merge channels */
      const STAGE = /^(semi[- ]?finals?|quarter[- ]?finals?|finals?|round of \d+|group [a-z]|match(day)? ?\d*|leg ?\d|play-?offs?|third place.*)( ?\d+)?( · .*)?$/i;
      const comp0 = (c) => norm(String(c || '').split('·')[0]);
      return out.filter((e) => {
        if (/prod_?test|^test\b/i.test(String(e.comp || '') + ' ' + String(e.detail || ''))) return false;   // guide test entries
        if (A.SHOW_RE && !e.home && A.SHOW_RE.test(String(e.comp || '') + ' ' + String(e.detail || ''))) return false;   // shows, not live sport
        if (e.home || !STAGE.test(String(e.detail || '').trim())) return true;
        const t = +new Date(e.start);
        const real = out.find((x) => x !== e && x.home && x.sport === e.sport && comp0(x.comp) === comp0(e.comp) && Math.abs(+new Date(x.start) - t) <= 30 * 6e4);
        if (!real) return true;
        real.channels = [...new Set((real.channels || []).concat(e.channels || []))]; if (!real.round) real.round = e.detail; return false;
      });
    }
  });

  /* ---------- plugin: rights holders without a public guide ----------
   * For live league fixtures, add the channel each broadcaster uses for that competition
   * (Azam TV, StarTimes, CANAL+ Afrique, ZAP), unless the event already lists that broadcaster. */
  const fxKey = (n, sport) => { const t = A.findTeam && A.findTeam(n, sport); return t ? 'id:' + t.id : norm(n); };
  function fixtureChannels(e) {
    if (!e.home || !e.away) return [];
    const list = (A.FIXTURE_CHANNELS || []).concat(A.FIXTURE_CHANNELS_REMOTE || []);
    if (!list.length) return [];
    const day = A.dayKey(new Date(e.start), 'Africa/Nairobi'); const t = +new Date(e.start);
    const a = fxKey(e.home, e.sport), b = fxKey(e.away, e.sport);
    const out = [];
    list.forEach((f) => {
      /* auto-confirmed slots carry the kick-off time: must be within 30 min (a replay never matches);
         hand-entered announcements carry only the EAT date */
      if (f.start ? Math.abs(+new Date(f.start) - t) > 30 * 6e4 : (f.date && f.date !== day)) return;
      const [x, y] = (f.teams || []).map((n) => fxKey(n, e.sport)); if (!x || !y) return;
      if ((same(a, x) && same(b, y)) || (same(a, y) && same(b, x))) out.push(...(f.channels || []));
    });
    return out.filter((c) => A.CHANNELS.some((x) => x.id === c));
  }
  A.plugins.register({
    id: 'rights-map', builtin: true, name: 'Rights holders (Azam · StarTimes · CANAL+ · ZAP)', version: A.version,
    description: 'Adds Azam TV, StarTimes, CANAL+ Afrique and ZAP Z Sports channels to the leagues they hold the rights to.',
    transform: (events) => events.map((e) => {
      if (e.status !== 'L' || /hypermotion|segunda|women|u-?\d\d\b|youth|reserve/i.test(e.comp || '')) return e;
      let ch = e.channels;
      /* channels announced for this exact fixture (bundled list + hosted feeds) */
      const fx = fixtureChannels(e);
      if (fx.length) ch = [...new Set(ch.concat(fx))];
      for (const [prov, map] of [['supersport', A.SUPERSPORT], ['azam', A.AZAM], ['startimes', A.STARTIMES], ['canalplus', A.CANALPLUS], ['zap', A.ZAP]]) {
        if (!map || ch.some((c) => A.channel(c).provider === prov)) continue;
        const r = map.find((x) => (!x.sport || x.sport === e.sport) && x.comp && x.comp.test(e.comp || ''));
        if (r && r.main && r.main[0]) ch = ch.concat(r.main[0]);
      }
      /* rights announced over the air (feed.json "rights"): new broadcasters / competitions without a reinstall */
      for (const r of A.RIGHTS_REMOTE || []) {
        if (r.sport && r.sport !== e.sport) continue;
        if (!r.re.test(e.comp || '') && !(r.detail && new RegExp(r.detail, 'i').test(e.detail || ''))) continue;
        const known = r.channels.filter((c) => A.CHANNELS.some((x) => x.id === c)); if (!known.length) continue;
        const prov = A.channel(known[0]).provider; if (ch.some((c) => A.channel(c).provider === prov)) continue;
        ch = ch.concat(known);
      }
      /* a real channel from the same broadcaster replaces its "channel TBA" placeholder */
      const real = new Set(ch.filter((c) => !/-tbc$/.test(c)).map((c) => A.channel(c).provider));
      const tidy = ch.filter((c) => !/-tbc$/.test(c) || !real.has(A.channel(c).provider));
      if (tidy.length !== ch.length) ch = tidy;
      return ch === e.channels ? e : Object.assign({}, e, { channels: ch });
    }).filter((e) => e.channels.length || e.src !== 'fixtures')   // a fixture nobody in Africa shows is not listed
  });

  /* background timer: also refresh when the app comes back to the foreground */
  setInterval(() => { A.refreshGuides(false).then((g) => g && A.refresh && A.refresh()); }, 20 * 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) A.refreshGuides(false).then((g) => g && A.refresh && A.refresh()); });
})(window.ASBH);
