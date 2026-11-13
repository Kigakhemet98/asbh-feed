/* Highlight posters – modelled on broadcaster promo graphics:
 *   week  – "This week": hero tile (match of the week) + 2-column tiles      (CANAL+ "À voir cette semaine")
 *   month – "In November": same grid, matchdays of one competition grouped    (CANAL+ "En novembre")
 *   clean – list with see-through white logos over a pitch or your own photo  (SuperSport "5 – 11 January")
 * The big events are picked automatically (A.highlightScore) – starred events (☆ on a card) always win. */
(function (A) {
  'use strict';
  const K = A.exportKit; const { FONT, rect, text, fitText, contain } = K;

  /* ---------- picking the big events ---------- */
  const COMP_WEIGHT = [
    [/world cup|afcon|africa cup of nations|^(uefa )?champions league|super bowl|finals?\b/i, 40],
    [/^(english )?premier league|^la ?liga|wimbledon|roland|australian open|us open|caf champions league/i, 34],
    [/^serie a|^bundesliga|^ligue 1|europa league|fa cup|carabao|nations league|^nba|^nfl|top 14|united rugby|champions cup|ipl|t20/i, 26],
    [/formula ?1|motogp|^atp|^wta|pga tour|dp world|six nations|rugby championship/i, 22]
  ];
  const BIG = new Set(['real-madrid', 'barcelona', 'manchester-city', 'liverpool', 'arsenal', 'manchester-united', 'chelsea', 'tottenham-hotspur', 'bayern-munich', 'borussia-dortmund',
    'paris-saint-germain', 'juventus', 'inter-milan', 'ac-milan', 'napoli', 'atletico-madrid', 'marseille', 'simba-sc', 'young-africans', 'al-ahly', 'zamalek', 'orlando-pirates',
    'kaizer-chiefs', 'mamelodi-sundowns', 'los-angeles-lakers', 'boston-celtics', 'golden-state-warriors', 'kansas-city-chiefs', 'rugby-stade-toulousain', 'rugby-leinster-rugby']);
  const stars = () => new Set(A.store.get('stars', []));
  A.isStarred = (id) => stars().has(id);
  A.toggleStar = (id) => { const s = stars(); s.has(id) ? s.delete(id) : s.add(id); A.store.set('stars', [...s]); return s.has(id); };
  A.highlightScore = (e) => {
    let s = 8; for (const [re, w] of COMP_WEIGHT) if (re.test(e.comp)) { s = w; break; }
    if (/\b(race|final|grand prix|derby|clasico|el cl[aá]sico)\b/i.test(e.detail)) s += 10;
    if (/practice|qualifying|the grid|podium|day \d/i.test(e.detail)) s -= 10;
    [e.home, e.away].forEach((t) => { const tm = t && A.findTeam && A.findTeam(t, e.sport); if (tm && BIG.has(tm.id)) s += 12; });
    s += Math.min(new Set(e.channels.map((c) => A.channel(c).provider)).size, 6) * 2;
    if (A.isStarred(e.id)) s += 1000;
    return s;
  };

  /* ---------- items: single events or grouped competitions ---------- */
  const base = (comp) => String(comp).split('·')[0].trim();
  function items(events, mode, max) {
    const byComp = A.groupBy(events, (e) => base(e.comp));
    const out = []; const used = new Set();
    Object.keys(byComp).forEach((c) => {
      const list = byComp[c].slice().sort((a, b) => a.start.localeCompare(b.start));
      const nonTeam = list.every((e) => !e.home);
      if ((mode === 'month' && list.length >= 3) || (nonTeam && list.length >= 2) || (mode === 'clean' && list.length >= 3 && !list.some((e) => A.isStarred(e.id)))) {
        const top = Math.max(...list.map(A.highlightScore));
        out.push({ group: true, comp: c, events: list, start: list[0].start, score: top + 4, channels: [...new Set(list.flatMap((e) => e.channels))], sport: list[0].sport });
        list.forEach((e) => used.add(e.id));
      }
    });
    events.forEach((e) => { if (!used.has(e.id)) out.push({ ev: e, comp: e.comp, start: e.start, score: A.highlightScore(e), channels: e.channels, sport: e.sport }); });
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, max);
  }

  /* ---------- text helpers ---------- */
  const L = {
    week: { en: 'THIS WEEK', fr: 'À VOIR CETTE SEMAINE', pt: 'ESTA SEMANA', sw: 'WIKI HII' },
    month: { en: 'IN {M}', fr: 'EN {M}', pt: 'EM {M}', sw: 'MWEZI WA {M}' },
    at: { en: 'AT', fr: 'À', pt: 'ÀS', sw: 'SAA' },
    motw: { en: 'MATCH OF THE WEEK', fr: "L'AFFICHE DE LA SEMAINE", pt: 'JOGO DA SEMANA', sw: 'MECHI YA WIKI' },
    motm: { en: 'MATCH OF THE MONTH', fr: "L'AFFICHE DU MOIS", pt: 'JOGO DO MÊS', sw: 'MECHI YA MWEZI' },
    watch: { en: 'WHERE TO WATCH', fr: 'OÙ REGARDER', pt: 'ONDE ASSISTIR', sw: 'TAZAMA WAPI' },
    games: { en: '{N} MATCHES', fr: '{N} MATCHS', pt: '{N} JOGOS', sw: 'MECHI {N}' }
  };
  const t = (k, lang) => (L[k][lang] || L[k].en);
  const loc = (lang) => ({ en: 'en-GB', fr: 'fr-FR', pt: 'pt-PT', sw: 'sw' }[lang] || 'en-GB');
  const fmt = (d, tz, lang, o) => new Intl.DateTimeFormat(loc(lang), Object.assign({ timeZone: tz }, o)).format(d).replace(/\./g, '').toUpperCase();
  const dayShort = (d, o) => fmt(d, o.tz, o.lang, { weekday: 'short', day: 'numeric', month: 'short' });
  const dayLong = (d, o) => fmt(d, o.tz, o.lang, { weekday: 'long', day: 'numeric', month: 'long' });
  const monthName = (d, o) => fmt(d, o.tz, o.lang, { month: 'long' });
  function dateList(list, o) {   // "5 & 6 JAN", "2 – 8 NOV", "4 & 25 NOV"
    const days = [...new Set(list.map((e) => A.dayKey(new Date(e.start), o.tz)))].sort();
    const d = (k) => +k.slice(8); const mon = fmt(new Date(list[0].start), o.tz, o.lang, { month: 'short' });
    const consecutive = days.every((k, i) => !i || A.addDaysKey(days[i - 1], 1) === k);
    if (days.length === 1) return `${d(days[0])} ${mon}`;
    if (days.length === 2) return `${d(days[0])} & ${d(days[1])} ${mon}`;
    return consecutive ? `${d(days[0])} – ${d(days[days.length - 1])} ${mon}` : days.slice(0, -1).map(d).join(', ') + ` & ${d(days[days.length - 1])} ${mon}`;
  }
  const timeStr = (e, o) => A.fmtTime(new Date(e.start), o.tz) + ' ' + o.tzLabel;
  const titleOf = (it) => it.group ? base(it.comp).toUpperCase() : it.ev.home ? `${it.ev.home} / ${it.ev.away}`.toUpperCase() : `${base(it.comp)} · ${it.ev.detail}`.toUpperCase();
  const whenOf = (it, o, withTime) => {
    if (it.group) {
      const allSameTime = it.events.every((e) => A.fmtTime(new Date(e.start), o.tz) === A.fmtTime(new Date(it.events[0].start), o.tz));
      return dateList(it.events, o) + (withTime && allSameTime ? ` ${t('at', o.lang)} ${timeStr(it.events[0], o)}` : it.events.some((e) => e.home) ? ' · ' + t('games', o.lang).replace('{N}', it.events.length) : '');
    }
    return dayLong(new Date(it.ev.start), o) + (withTime ? ` ${t('at', o.lang)} ${timeStr(it.ev, o)}` : '');
  };

  /* ---------- tile colours per competition ---------- */
  const COLORS = [
    [/^caf champions/i, ['#1c1708', '#6b5410']], [/afcon|africa cup of nations/i, ['#f4cf1d', '#fbe36a']], [/champions league/i, ['#0b1f8f', '#2f45e0']],
    [/europa league/i, ['#141414', '#ff6a13']], [/premier league/i, ['#c2187a', '#43177a']], [/la ?liga/i, ['#7d0b12', '#d7262e']], [/ligue 1/i, ['#121212', '#333']],
    [/serie a/i, ['#08245e', '#1c6fd6']], [/bundesliga/i, ['#7d0a0a', '#d20515']], [/fa cup/i, ['#6a0b10', '#c8102e']], [/carabao/i, ['#005a31', '#00a651']],
    [/nba/i, ['#0a0f20', '#1d428a']], [/nfl/i, ['#0b1a33', '#013369']], [/formula ?1|f1/i, ['#15151e', '#b00500']], [/motogp/i, ['#0b0b0b', '#3a3a3a']],
    [/^atp/i, ['#33413b', '#7c9189']], [/^wta/i, ['#2a0a3a', '#5a1a7a']], [/united rugby|urc/i, ['#002436', '#00799a']], [/top ?14/i, ['#111', '#4a3a1a']],
    [/champions cup/i, ['#00013a', '#1b2a8f']], [/t20|ipl|cricket/i, ['#11104a', '#3b2ab0']], [/pfl|ufc|mma|boxing/i, ['#0d0d0d', '#3a3a3a']]
  ];
  const colorsFor = (comp, sport) => (COLORS.find(([re]) => re.test(comp)) || [0, [shade(A.sport(sport).color, -0.55), A.sport(sport).color]])[1];
  function shade(hex, k) { const n = parseInt(hex.replace('#', '').replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3'), 16); const f = (c) => Math.round(Math.max(0, Math.min(255, c + c * k)));
    return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; }
  const lum = (css) => { const c = document.createElement('canvas').getContext('2d'); c.fillStyle = css; const h = c.fillStyle; // normalise to #rrggbb
    const n = parseInt(h.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };

  /* ---------- images ---------- */
  async function compImg(comp, bg) { const u = A.USE_LOGOS && A.compLogo(comp, bg); return u ? K.loadImg(A.LOGO_BASE + u) : null; }
  const whiteCache = new Map();
  function whiteLogo(img) {        // see-through white version of any logo
    if (whiteCache.has(img)) return whiteCache.get(img);
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    try {
      const d = x.getImageData(0, 0, c.width, c.height); const p = d.data; let op = 0;
      for (let i = 3; i < p.length; i += 4) if (p[i] > 128) op++;
      const tile = op / (p.length / 4) > 0.72;   // logo on a solid tile → keep only its light parts
      let sum = 0; for (let i = 0; i < p.length; i += 4) if (p[i + 3] > 128) sum += 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2];
      const light = sum / Math.max(op, 1) > 175;   // already a light/white logo → plain silhouette
      for (let i = 0; i < p.length; i += 4) {
        const l = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]; const sat = Math.max(p[i], p[i + 1], p[i + 2]) - Math.min(p[i], p[i + 1], p[i + 2]);
        if (tile) p[i + 3] = Math.max(0, Math.min(255, (l - 120) * 2.2)) * p[i + 3] / 255;
        else if (!light && l > 200 && sat < 40) p[i + 3] = 0;   // white details inside a coloured logo become see-through
        p[i] = p[i + 1] = p[i + 2] = 255;
      }
      x.putImageData(d, 0, 0);
    } catch (e) { /* tainted canvas: keep colours */ }
    whiteCache.set(img, c); return c;
  }
  function tag(ctx, label, x, y, s, center, right) {   // solid red label, broadcast-graphics style
    ctx.font = `800 ${18 * s}px ${FONT}`; const w = ctx.measureText(label).width + 20 * s; const xx = center ? x - w / 2 : right ? x - w : x;
    rect(ctx, xx, y, w, 28 * s, '#e10a17'); text(ctx, label, xx + w / 2, y + 15 * s, { size: 18 * s, weight: 800, color: '#fff', align: 'center' });
  }
  function brand(ctx, x, y, s) {   // hub mark
    rect(ctx, x, y, s, s, '#0f1f4d', s * 0.22); ctx.fillStyle = '#21c25e'; ctx.beginPath(); ctx.moveTo(x + s * 0.31, y + s * 0.28); ctx.lineTo(x + s * 0.31, y + s * 0.72); ctx.lineTo(x + s * 0.69, y + s * 0.5); ctx.fill();
    ctx.lineCap = 'round'; ctx.strokeStyle = '#f5b800'; ctx.lineWidth = s * 0.08; ctx.beginPath(); ctx.arc(x + s * 0.5, y + s * 0.5, s * 0.36, -1.1, 1.1); ctx.stroke();
  }
  function footer(ctx, W, H, o, s) {
    const y = H - 120 * s;
    text(ctx, 'AFRICAN SPORTS', 90 * s, y + 30 * s, { size: 44 * s, weight: 800, italic: true, color: K.C.ink });
    text(ctx, 'BROADCAST HUB', 90 * s, y + 66 * s, { size: 26 * s, weight: 700, color: K.C.mute });
    text(ctx, t('watch', o.lang) + ' · EAT', W - 90 * s, y + 30 * s, { size: 26 * s, weight: 800, color: K.C.ink, align: 'right' });
    if (o.footerText) fitText(ctx, o.footerText, W - 90 * s, y + 68 * s, W * 0.45, 34 * s, { weight: 700, color: K.C.ink, align: 'right' });
  }

  /* ---------- grid tile ---------- */
  async function tile(ctx, it, x, y, w, h, o, im, hero, s) {
    const [c1, c2] = colorsFor(it.comp, it.sport); const g = ctx.createLinearGradient(x, y + h, x + w, y); g.addColorStop(0, c1); g.addColorStop(1, c2);
    rect(ctx, x, y, w, h, g, 0);
    const bright = lum(c1) > 0.6; const ink = bright ? '#111' : '#fff'; const sub = bright ? '#222' : 'rgba(255,255,255,.88)';
    const cl0 = await compImg(it.comp, bright ? 'light' : 'dark'); const cl = cl0 && !bright ? whiteLogo(cl0) : cl0;
    const e = it.ev; const team = e && e.home;
    K.setLogoBg('dark');
    if (team) {
      const r = Math.min(h * 0.24, w * (hero ? 0.09 : 0.14)); const cy = y + h * 0.38;
      const xs = hero ? [x + w * 0.2, x + w * 0.42] : [x + w * 0.22, x + w * 0.78];
      K.drawCrest(ctx, e.home, xs[0], cy, r, im, e.sport); K.drawCrest(ctx, e.away, xs[1], cy, r, im, e.sport);
      if (cl) hero ? contain(ctx, cl, x + w * 0.62, y + h * 0.08, w * 0.3, h * 0.42) : contain(ctx, cl, x + w * 0.38, y + h * 0.12, w * 0.24, h * 0.4);
    } else if (cl) contain(ctx, cl, x + w * (hero ? 0.3 : 0.28), y + h * 0.08, w * (hero ? 0.4 : 0.44), h * 0.52);
    else fitText(ctx, base(it.comp).toUpperCase(), x + w / 2, y + h * 0.35, w * 0.8, 48 * s, { weight: 800, italic: true, color: ink, align: 'center' });
    // channels bottom-right
    const chs = []; const seen = new Set(); it.channels.forEach((c) => { const p = A.channel(c).provider; if (!seen.has(p) && chs.length < (hero ? 3 : 1)) { seen.add(p); chs.push(c); } });
    let bx = x + w - 10 * s; const bh = 40 * s;
    chs.reverse().forEach((c) => { const bw = (A.channel(c).wide ? 150 : 96) * s; bx -= bw; rect(ctx, bx - 4 * s, y + h - bh - 14 * s, bw + 8 * s, bh + 8 * s, 'rgba(0,0,0,.55)', 4 * s); K.drawBadge(ctx, c, bx, y + h - bh - 10 * s, bw, bh, im); bx -= 14 * s; });
    const more = new Set(it.channels.map((c) => A.channel(c).provider)).size - chs.length;
    if (more > 0) { rect(ctx, bx - 44 * s, y + h - bh - 14 * s, 48 * s, bh + 8 * s, 'rgba(0,0,0,.55)', 4 * s); text(ctx, '+' + more, bx - 20 * s, y + h - bh / 2 - 10 * s, { size: 22 * s, weight: 800, color: '#fff', align: 'center' }); bx -= 54 * s; }
    // text bottom-left
    const tw = bx - x - 24 * s; const tsz = (hero ? 30 : 24) * s;
    if (hero) tag(ctx, t(o.style === 'month' ? 'motm' : 'motw', o.lang), x + 16 * s, y + 14 * s, s);
    fitText(ctx, titleOf(it), x + 16 * s, y + h - 46 * s, tw, tsz, { weight: 800, italic: true, color: ink });
    fitText(ctx, whenOf(it, o, o.style !== 'month' || !it.group), x + 16 * s, y + h - 20 * s, tw, tsz * 0.82, { weight: 600, color: sub });
  }

  async function grid(events, o, W, H, im) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const ctx = cv.getContext('2d'); const s = W / 1080;
    ctx.fillStyle = K.C.bg; ctx.fillRect(0, 0, W, H);
    const its = items(events, o.style, 7); if (!its.length) return cv;
    const first = new Date(events.reduce((a, e) => (e.start < a ? e.start : a), events[0].start)); const last = new Date(events.reduce((a, e) => (e.start > a ? e.start : a), events[0].start));
    const title = o.style === 'month' ? t('month', o.lang).replace('{M}', monthName(first, o)) : t('week', o.lang);
    fitText(ctx, title, 90 * s, 80 * s, W * 0.55, 54 * s, { weight: 800, italic: true, color: K.C.ink });
    if (o.title) fitText(ctx, o.title.toUpperCase(), 90 * s, 128 * s, W * 0.6, 24 * s, { weight: 800, color: '#e10a17' });
    if (o.style !== 'month') fitText(ctx, dateList([{ start: first.toISOString() }, { start: last.toISOString() }], o).replace('&', '–'), W - 90 * s, 82 * s, W * 0.35, 30 * s, { weight: 600, color: K.C.ink, align: 'right' });
    const top = 165 * s, bottom = H - 150 * s, gap = 10 * s, mx = 90 * s; const n = its.length - 1; const rows = Math.ceil(n / 2);
    const heroH = rows ? Math.min((bottom - top) * 0.3, 240 * s) : bottom - top;
    await tile(ctx, its[0], mx, top, W - 2 * mx, heroH, o, im, true, s);
    if (rows) {
      const rh = (bottom - top - heroH - gap * rows) / rows; const cw = (W - 2 * mx - gap) / 2;
      for (let i = 1; i < its.length; i++) { const r = Math.floor((i - 1) / 2), c = (i - 1) % 2; const last1 = i === its.length - 1 && c === 0;
        await tile(ctx, its[i], mx + c * (cw + gap), top + heroH + gap + r * (rh + gap), last1 ? W - 2 * mx : cw, rh, o, im, false, s); }
    }
    footer(ctx, W, H, o, s); return cv;
  }

  /* ---------- clean list with see-through white logos ---------- */
  async function clean(events, o, W, H, im) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const ctx = cv.getContext('2d'); const s = W / 1080;
    const bgImg = o.bgImage && im[o.bgImage];
    if (bgImg) { const k = Math.max(W / bgImg.width, H / bgImg.height); ctx.drawImage(bgImg, (W - bgImg.width * k) / 2, (H - bgImg.height * k) / 2, bgImg.width * k, bgImg.height * k); }
    else { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); }
    const sh = ctx.createLinearGradient(0, 0, W * 0.8, 0); sh.addColorStop(0, bgImg ? 'rgba(0,0,0,.55)' : 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = sh; ctx.fillRect(0, 0, W, H);
    text(ctx, 'AFRICAN SPORTS', W - 75 * s, 80 * s, { size: 30 * s, weight: 800, italic: true, color: '#fff', align: 'right' });
    text(ctx, 'BROADCAST HUB', W - 75 * s, 110 * s, { size: 20 * s, weight: 700, color: '#9a9a9a', align: 'right' });
    const first = new Date(events.reduce((a, e) => (e.start < a ? e.start : a), events[0].start)); const last = new Date(events.reduce((a, e) => (e.start > a ? e.start : a), events[0].start));
    const span = o.scope === 'month' || (last - first) > 20 * 864e5 ? monthName(first, o) : dateList([{ start: first.toISOString() }, { start: last.toISOString() }], o).replace('&', '–').replace(/ (\w+)$/, (m, mo) => ' ' + fmt(first, o.tz, o.lang, { month: 'long' }));
    fitText(ctx, span, 75 * s, 150 * s, W * 0.75, 96 * s, { weight: 800, italic: true, color: '#fff' });
    if (o.title) fitText(ctx, o.title.toUpperCase(), 75 * s, 212 * s, W * 0.75, 28 * s, { weight: 800, color: '#e10a17' });
    const ranked = items(events, 'clean', 11); const heroId = ranked[0];
    const list = ranked.slice().sort((a, b) => a.start.localeCompare(b.start));
    const top = (o.title ? 270 : 250) * s, bottom = H - 90 * s; const rh = Math.min((bottom - top) / list.length, 150 * s);
    const cx = W * 0.43; const nameW = cx - 40 * s - 200 * s; const sh2 = { shadowColor: 'rgba(0,0,0,.6)', shadowBlur: 8 * s };
    for (let i = 0; i < list.length; i++) {
      const it = list[i]; const y = top + i * rh; const hero = it === heroId;
      const cl = await compImg(it.comp, 'dark'); if (cl) { const wl = whiteLogo(cl); contain(ctx, wl, 55 * s, y + rh * 0.08, 120 * s, rh * 0.7); }
      Object.assign(ctx, sh2);
      let ty = y + rh * 0.28; const big = (hero ? 38 : 31) * s;
      if (hero) { ctx.shadowBlur = 0; tag(ctx, t(o.style === 'month' ? 'motm' : 'motw', o.lang), W - 75 * s, ty - 14 * s, s * 0.8, false, true); Object.assign(ctx, sh2); }
      if (!it.group && it.ev.home) {
        fitText(ctx, it.ev.home.toUpperCase(), cx - 40 * s, ty, nameW, big, { weight: 800, color: '#fff', align: 'right' });
        fitText(ctx, it.ev.away.toUpperCase(), cx + 40 * s, ty, nameW, big, { weight: 800, color: '#fff', align: 'left' });
        ctx.shadowBlur = 0; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.arc(cx, ty, 19 * s, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - 34 * s, ty); ctx.lineTo(cx - 19 * s, ty); ctx.moveTo(cx + 19 * s, ty); ctx.lineTo(cx + 34 * s, ty); ctx.stroke();
        text(ctx, 'V', cx, ty + 1, { size: 22 * s, weight: 700, color: '#fff', align: 'center' });
      } else fitText(ctx, titleOf(it), cx, ty, (W - cx - 30 * s) * 2, big, { weight: 800, color: '#fff', align: 'center' });
      Object.assign(ctx, sh2);
      const when = it.group ? whenOf(it, o, true) : `${dayShort(new Date(it.ev.start), o)} - ${A.fmtTime(new Date(it.ev.start), o.tz)}`;
      fitText(ctx, when, cx, ty + rh * 0.3, W * 0.56, 24 * s, { weight: 700, color: '#fff', align: 'center' });
      const chn = [...new Set(it.channels.map((c) => A.channel(c).short || A.channel(c).name))].slice(0, 4).join(' · ');
      fitText(ctx, chn, cx, ty + rh * 0.52, W * 0.56, 17 * s, { weight: 600, color: 'rgba(255,255,255,.8)', align: 'center' });
      ctx.shadowBlur = 0;
    }
    text(ctx, ('ALL TIMES EAT · GMT+3' + (o.footerText ? '  ·  ' + o.footerText : '')).toUpperCase(), 75 * s, H - 45 * s, { size: 20 * s, weight: 700, color: '#9a9a9a' });
    return cv;
  }

  Object.assign(A.exportStyles, {
    week: { label: 'Weekly highlights (grid)', logoBg: 'dark', render: async (ev, o, W, H, im) => [await grid(ev, o, W, H, im)] },
    month: { label: 'Monthly highlights (grid)', logoBg: 'dark', render: async (ev, o, W, H, im) => [await grid(ev, o, W, H, im)] },
    clean: { label: 'Clean list (white logos)', logoBg: 'dark', render: async (ev, o, W, H, im) => [await clean(ev, o, W, H, im)] }
  });
})(window.ASBH);
