/* Plugins, schedule sources and live updates.
 *
 * A plugin is a plain object passed to ASBH.plugins.register():
 *   {
 *     id: 'my-plugin', name: 'My plugin', version: '1.0.0', description: '...',
 *     source:    async (ctx) => ({ events: [...], channels: [...], providers: [...] }), // optional
 *     transform: (events) => events,           // optional: patch / filter merged events
 *     init:      (ASBH) => {}                  // optional: add sports, views, export themes...
 *   }
 * Plugins can be bundled (web/plugins/*.js) or loaded at runtime from a URL in Settings.
 * See docs/PLUGINS.md for the feed format.
 */
(function (A) {
  'use strict';
  const registry = new Map();
  const state = { events: [], lastUpdate: null, errors: [], fingerprint: '' };
  A.data = state;

  const settings = () => A.store.get('settings', {});
  const isEnabled = (id) => (settings().disabledPlugins || []).indexOf(id) < 0;

  A.plugins = {
    register(p) {
      if (!p || !p.id) throw new Error('plugin needs an id');
      registry.set(p.id, p);
      try { p.init && p.init(A); } catch (e) { console.error('plugin init', p.id, e); }
      A.emit('plugins', A.plugins.list());
      return p;
    },
    get: (id) => registry.get(id),
    list: () => [...registry.values()].map((p) => ({ id: p.id, name: p.name || p.id, version: p.version || '', description: p.description || '', enabled: isEnabled(p.id), builtin: !!p.builtin })),
    setEnabled(id, on) {
      const s = settings(); const d = new Set(s.disabledPlugins || []);
      on ? d.delete(id) : d.add(id); s.disabledPlugins = [...d]; A.store.set('settings', s);
    },
    /* Load a third-party plugin script by URL (it must call ASBH.plugins.register) */
    loadUrl(url) {
      return new Promise((res, rej) => {
        const sc = document.createElement('script'); sc.src = url; sc.async = true;
        sc.onload = () => res(url); sc.onerror = () => rej(new Error('Could not load ' + url));
        document.head.appendChild(sc);
      });
    }
  };

  /* ---------- normalisation ---------- */
  A.normalizeEvent = (e, src) => {
    const ev = Object.assign({}, e);
    ev.start = new Date(ev.start).toISOString();
    ev.end = ev.end ? new Date(ev.end).toISOString() : new Date(+new Date(ev.start) + (ev.duration || 120) * 60000).toISOString();
    ev.sport = ev.sport || 'other';
    if (A.cleanEvent) A.cleanEvent(ev);   // codes, short names, sport fixes (clean.js – shared with the GitHub feed job)
    if (A.canonComp && ev.comp) {   // one clean league name (and keep golf's day number in the listing)
      const d = /\s+d(\d)$/i.exec(ev.comp); const c = A.canonComp(ev.comp);
      if (c !== ev.comp && d && ev.detail && !/day|round|r\d/i.test(ev.detail)) ev.detail = `Day ${d[1]} · ${ev.detail}`;
      ev.comp = c;
    }
    ev.channels = Array.isArray(ev.channels) ? ev.channels : String(ev.channels || '').split(/[\s,;|]+/).filter(Boolean);
    if (!ev.detail && ev.home) ev.detail = `${ev.home} v ${ev.away || ''}`.trim();
    if (!ev.home && ev.detail) {
      const at = / @ /.exec(ev.detail);   // US style "Away @ Home"
      if (at) { ev.away = ev.detail.slice(0, at.index).trim(); ev.home = ev.detail.slice(at.index + 3).replace(/\s*\(.*\)$/, '').trim(); ev.detail = `${ev.home} v ${ev.away}`; }
      else { const m = / v(?:s\.?)? /i.exec(ev.detail); if (m) { ev.home = ev.detail.slice(0, m.index).trim(); ev.away = ev.detail.slice(m.index + m[0].length).trim(); } }
    }
    /* guide abbreviations ("HBH v BRH", "SU v SFC") → full club names when the team is known */
    if (ev.home && ev.away && A.findTeam) {
      let ch = false;
      ['home', 'away'].forEach((k) => { const v = ev[k]; if (/^[A-Z0-9]{2,4}$/.test(v)) { const t = A.findTeam(v, ev.sport); if (t && t.name && !t.flag) { ev[k] = t.name; ch = true; } } });
      if (ch) ev.detail = `${ev.home} v ${ev.away}`;
    }
    ev.id = ev.id || A.slug(`${ev.start}-${ev.comp}-${ev.detail}`);
    ev.status = ev.status || 'L';
    ev.src = ev.src || src;
    return ev;
  };

  /* Merge: same id → later source wins but channel lists are unioned. Overrides patch by id. */
  function merge(batches) {
    const map = new Map();
    batches.forEach(({ events = [], overrides = [] }) => {
      events.forEach((e) => {
        const prev = map.get(e.id);
        map.set(e.id, prev ? Object.assign({}, prev, e, { channels: [...new Set([...(prev.channels || []), ...(e.channels || [])])] }) : e);
      });
      overrides.forEach((o) => {
        const prev = map.get(o.id); if (!prev) return;
        if (o.cancelled) map.delete(o.id); else map.set(o.id, A.normalizeEvent(Object.assign({}, prev, o), prev.src));
      });
    });
    return [...map.values()].sort((a, b) => a.start.localeCompare(b.start) || a.comp.localeCompare(b.comp));
  }

  /* ---------- parsers for imported files ---------- */
  A.parsers = {
    json(text) {
      const j = JSON.parse(text);
      return Array.isArray(j) ? { events: j } : j;
    },
    /* CSV header: start,duration,sport,comp,detail,channels,status  (channels space/pipe separated, start in ISO or "YYYY-MM-DD HH:MM" GMT) */
    csv(text) {
      const lines = text.trim().split(/\r?\n/); const head = splitCsv(lines.shift()).map((h) => h.trim().toLowerCase());
      const events = lines.filter(Boolean).map((l) => {
        const c = splitCsv(l); const o = {}; head.forEach((h, i) => (o[h] = (c[i] || '').trim()));
        const start = /T/.test(o.start) ? o.start : o.start.replace(' ', 'T') + ':00Z';
        return { start, duration: +o.duration || 120, sport: o.sport, comp: o.comp || o.competition, detail: o.detail || o.event, channels: o.channels, status: o.status };
      });
      return { events };
    },
    /* Minimal iCalendar: SUMMARY "Home v Away", CATEGORIES sport, LOCATION channels, DESCRIPTION competition */
    ics(text) {
      const events = []; let cur = null;
      text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/).forEach((l) => {
        if (l === 'BEGIN:VEVENT') cur = {};
        else if (l === 'END:VEVENT' && cur) { events.push(cur); cur = null; }
        else if (cur) {
          const i = l.indexOf(':'); const k = l.slice(0, i).split(';')[0]; const v = l.slice(i + 1);
          const dt = (s) => s.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/, '$1-$2-$3T$4:$5:$6Z');
          if (k === 'DTSTART') cur.start = dt(v); if (k === 'DTEND') cur.end = dt(v);
          if (k === 'SUMMARY') cur.detail = v; if (k === 'CATEGORIES') cur.sport = A.slug(v.split(',')[0]);
          if (k === 'LOCATION') cur.channels = v.replace(/\\,/g, ',').split(/[,;]/).map((x) => A.slug(x.trim()));
          if (k === 'DESCRIPTION') cur.comp = v; if (k === 'UID') cur.id = A.slug(v);
        }
      });
      return { events };
    }
  };
  function splitCsv(line) {
    const out = []; let cur = ''; let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
      else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur); return out;
  }

  /* ---------- built-in sources ---------- */
  A.plugins.register({
    id: 'bundled', builtin: true, name: 'Bundled starter schedule', version: A.version,
    description: 'Fixtures shipped with the app (works offline).',
    source: async () => ({ events: A.SEED })
  });

  A.plugins.register({
    id: 'feeds', builtin: true, name: 'Schedule feeds', version: A.version,
    description: 'JSON / CSV / ICS feeds by URL (e.g. the GitHub Action output data/schedule.json).',
    source: async () => {
      const urls = [...new Set((settings().feeds || A.DEFAULT_FEEDS || []).concat(A.LIVE_FEED ? [A.LIVE_FEED] : []))];   // the live feed is always read
      const out = { events: [], channels: [], providers: [], platforms: [], overrides: [] };
      const assigns = []; const rights = []; const logos = []; let liveOk = false;
      for (const url of urls) {
        try {
          const r = await fetch(url, { cache: 'no-cache' }); if (!r.ok) throw new Error(r.status + ' ' + url);
          const t = await r.text();
          const kind = /\.csv(\?|$)/i.test(url) ? 'csv' : /\.ics(\?|$)/i.test(url) ? 'ics' : 'json';
          const j = A.parsers[kind](t);
          ['events', 'channels', 'providers', 'platforms', 'overrides'].forEach((k) => out[k].push(...(j[k] || [])));
          if (Array.isArray(j.rights)) rights.push(...j.rights);          // which broadcaster shows a competition (over the air)
          if (Array.isArray(j.compLogos)) logos.push(...j.compLogos);     // competition logos hosted on GitHub
          if (Array.isArray(j.assignments)) assigns.push(...j.assignments);   // over-the-air channel announcements
          if (url === A.LIVE_FEED) { liveOk = true; if (j.app) A.appUpdate(j.app); }
        } catch (e) { state.errors.push(String(e.message || e)); }
      }
      /* keep the last good copy of the live feed's extras, so they survive being offline and app restarts */
      const KEY = 'feedExtras';
      if (liveOk) { try { A.store.set(KEY, { at: Date.now(), assigns, rights, logos, providers: out.providers, channels: out.channels, platforms: out.platforms }); } catch (e) { /* storage full */ } }
      else { const c = A.store.get(KEY, null); if (c) { assigns.push(...(c.assigns || [])); rights.push(...(c.rights || [])); logos.push(...(c.logos || []));
        out.providers.push(...(c.providers || [])); out.channels.push(...(c.channels || [])); out.platforms.push(...(c.platforms || [])); } }
      A.FIXTURE_CHANNELS_REMOTE = assigns;
      const re = (x) => { try { return new RegExp(x, 'i'); } catch (e) { return null; } };
      A.RIGHTS_REMOTE = rights.map((r) => r && Array.isArray(r.channels) && Object.assign({}, r, { re: re(r.comp || '^$') })).filter((r) => r && r.re);
      A.COMP_LOGOS_REMOTE = logos.map((l) => l && l.logo && [re(l.comp || '^$'), l.logo]).filter((l) => l && l[0]);
      A.addPlatforms && A.addPlatforms(out.platforms);
      return out;
    }
  });

  A.DTC_BY_SPORT = Object.assign({ f1: ['f1tv'], motogp: ['videopass'], nfl: ['gamepass'], basketball: ['nba-lp'], football: ['apple-tv'],
    match: { 'nba-lp': /\bNBA\b/i, f1tv: /formula ?1|\bF1\b/i, videopass: /motogp|moto2|moto3/i, gamepass: /\bNFL\b/i, 'apple-tv': /^mls\b|major league soccer|leagues cup|campeones cup/i } }, A.DTC_BY_SPORT || {});
  A.plugins.register({
    id: 'streaming', builtin: true, name: 'Streaming services', version: A.version,
    description: 'Adds NBA League Pass, F1 TV, MotoGP VideoPass and NFL Game Pass to every live event of their sport.'
  });

  A.plugins.register({
    id: 'bein-mena', builtin: true, name: 'beIN SPORTS MENA line-ups', version: A.version,
    description: 'Adds the usual beIN channels to Premier League, LaLiga, Carabao Cup, F1, MotoGP, NBA and NFL games that have no beIN channel listed yet (North Africa / MENA).',
    transform: (events) => { const busy = new Set(); return events.map((e) => {
      if (e.status !== 'L') return e;
      const r = (A.BEIN_MENA || []).find((x) => x.sport === e.sport && x.comp.test(e.comp)); if (!r) return e;
      const hasBein = e.channels.some((c) => A.channel(c).provider === 'bein');
      // a channel shows one match at a time: overlapping games of the same competition only get CONNECT
      const slot = (c) => c + '@' + e.start.slice(0, 13);
      const usual = hasBein ? [] : r.main.filter((c) => !busy.has(slot(c)));
      if (hasBein) e.channels.forEach((c) => busy.add(slot(c))); else usual.forEach((c) => busy.add(slot(c)));
      const add = (usual.length === r.main.length ? usual : []).filter((c) => e.channels.indexOf(c) < 0);
      return add.length ? Object.assign({}, e, { channels: e.channels.concat(add), beinUsual: !hasBein || e.beinUsual }) : e;
    }); }
  });

  A.plugins.register({
    id: 'supersport-laliga', builtin: true, name: 'SuperSport LaLiga (DStv 224)', version: A.version,
    description: 'SuperSport holds LaLiga across sub-Saharan Africa: every live LaLiga match is listed on SuperSport LaLiga (DStv 224).',
    transform: (events) => events.map((e) => e.status === 'L' && /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i.test(e.comp) && e.channels.indexOf('ss-laliga') < 0
      ? Object.assign({}, e, { channels: ['ss-laliga'].concat(e.channels) }) : e)
  });

  A.plugins.register({
    id: 'zap-z-sports', builtin: true, name: 'ZAP Z Sports rights (Angola · Mozambique)', version: A.version,
    description: 'Adds Z Sports LaLiga (ZAP 23) to every live LaLiga match and Z Sports 2 (ZAP 22) to the Bundesliga and Serie A, per ZAP\'s rights.',
    transform: (events) => events.map((e) => {
      if (e.status !== 'L') return e;
      const add = (A.ZAP || []).filter((r) => r.auto && (!r.sport || r.sport === e.sport) && r.comp.test(e.comp || '')).map((r) => r.main[0]).filter((c) => e.channels.indexOf(c) < 0);
      return add.length ? Object.assign({}, e, { channels: e.channels.concat(add) }) : e;
    })
  });

  A.plugins.register({
    id: 'imported', builtin: true, name: 'Imported files', version: A.version,
    description: 'Schedules you imported from JSON, CSV or ICS files on this device.',
    source: async () => ({ events: A.store.get('imported', []) })
  });

  A.importText = (text, filename = '') => {
    const kind = /\.csv$/i.test(filename) ? 'csv' : /\.ics$/i.test(filename) ? 'ics' : 'json';
    const j = A.parsers[kind](text);
    A.addChannels(j.channels); A.addProviders(j.providers);
    const evs = (j.events || []).map((e) => A.normalizeEvent(e, 'import:' + filename));
    const cur = A.store.get('imported', []);
    const map = new Map(cur.map((e) => [e.id, e])); evs.forEach((e) => map.set(e.id, e));
    A.store.set('imported', [...map.values()]);
    return evs.length;
  };

  /* ---------- refresh loop ---------- */
  A.refresh = async () => {
    state.errors = [];
    const batches = [];
    for (const p of registry.values()) {
      if (!p.source || !isEnabled(p.id)) continue;
      try {
        const r = (await p.source({ A, settings: settings() })) || {};
        A.addProviders(r.providers); A.addChannels(r.channels); A.addPlatforms && A.addPlatforms(r.platforms);
        batches.push({ events: (r.events || []).map((e) => A.normalizeEvent(e, p.id)), overrides: r.overrides || [] });
      } catch (e) { state.errors.push(`${p.name}: ${e.message || e}`); }
    }
    let events = merge(batches);
    const PL = new Set((A.PLATFORMS || []).map((p) => p.id));
    events.forEach((e) => { e.channels = e.channels.filter((c) => !PL.has(c)); });
    /* Direct-to-consumer streaming services carry every live event of their sport across Africa */
    const DTC = A.DTC_BY_SPORT || {};
    events.forEach((e) => { const extra = (DTC[e.sport] || []).filter((id) => (!DTC.match || !DTC.match[id] || DTC.match[id].test(e.comp)) && e.channels.indexOf(id) < 0);
      if (extra.length && e.status === 'L' && isEnabled('streaming')) e.channels = e.channels.concat(extra); });
    for (const p of registry.values()) if (p.transform && isEnabled(p.id)) { try { events = p.transform(events) || events; } catch (e) { console.error(e); } }
    const fp = events.map((e) => e.id + e.start + e.channels.join()).join('|');
    const changed = state.fingerprint && fp !== state.fingerprint;
    state.events = events; state.fingerprint = fp; state.lastUpdate = new Date();
    A.emit('data', { changed });
    return events;
  };

  let timer = null;
  A.startAutoRefresh = () => {
    clearInterval(timer);
    const mins = settings().refreshMinutes || 15;
    if (mins > 0) timer = setInterval(A.refresh, mins * 60000);
  };

  /* ---------- "new version available": the live feed names the latest app version (over the air) ---------- */
  const newer = (a, b) => { const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
    for (let i = 0; i < Math.max(x.length, y.length); i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); } return false; };
  A.appUpdate = (info) => {
    if (!info || !info.latest || !newer(info.latest, A.version)) return;
    const KEY = 'updateSeen'; if (A.store.get(KEY, '') === info.latest + '|' + new Date().toDateString()) return;   // at most once a day
    const show = () => {
      if (document.getElementById('asbh-update')) return;
      const b = document.createElement('div'); b.id = 'asbh-update'; b.className = 'asbh-update'; b.setAttribute('role', 'status');
      const url = info.downloads || 'https://github.com/Kigakhemet98/asbh-feed#download-the-apps';
      b.innerHTML = `<span>New version <b>${String(info.latest).replace(/[^0-9.]/g, '')}</b> is available${info.notes ? ' – ' + String(info.notes).replace(/[<>&]/g, '') : ''}.</span>`
        + `<button type="button" data-golink="${url.replace(/"/g, '')}">Download</button><button type="button" class="x" aria-label="Dismiss">✕</button>`;
      b.querySelector('.x').onclick = () => { A.store.set(KEY, info.latest + '|' + new Date().toDateString()); b.remove(); };
      document.body.appendChild(b);
    };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
  };
})(window.ASBH);
