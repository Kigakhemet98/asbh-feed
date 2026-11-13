/* Poster export engine (Canvas 2D, no dependencies).
 * Styles modelled on the Sport&TV Madagascar schedule posters:
 *   cards    – big rows with crests, two time zones, channel logos (≈11 rows / page)
 *   compact  – dense list for busy days (≈30 rows / page)
 *   featured – single-match poster
 * Plugins can add styles via ASBH.exportStyles[name] = { rowH, drawRow, ... }. */
(function (A) {
  'use strict';
  const FONT = '"Barlow Condensed","Roboto Condensed","Arial Narrow",Arial,sans-serif';
  /* poster palettes: black (default) or white background – every colour below comes from C */
  const THEMES = {
    black: { bg: '#000000', navy: '#ffffff', blue: '#ffffff', ink: '#ffffff', mute: '#9a9a9a', line: '#262626', panel: '#101010', panel2: '#161616', crestFill: '#1a1a1a', crestRing: '#4a4a4a', crestInk: '#e6e6e6', outline: '#3a3a3a', logoBg: 'dark' },
    white: { bg: '#ffffff', navy: '#111111', blue: '#111111', ink: '#111111', mute: '#666666', line: '#dddddd', panel: '#f3f3f3', panel2: '#e9e9e9', crestFill: '#eeeeee', crestRing: '#c4c4c4', crestInk: '#333333', outline: '#c4c4c4', logoBg: 'light' }
  };
  A.EXPORT_THEMES = { black: 'Black background', white: 'White background' };
  const C = Object.assign({ red: '#e10a17' }, THEMES.black);
  const SIZES = { portrait: [1080, 1350], story: [1080, 1920], square: [1080, 1080], landscape: [1920, 1080], a4: [1240, 1754] };
  A.EXPORT_SIZES = { portrait: 'Portrait post 1080×1350', story: 'Story / status 1080×1920', square: 'Square 1080×1080', landscape: 'Landscape / TV 1920×1080', a4: 'A4 print 150 dpi' };

  /* ---------- image cache ---------- */
  const imgs = new Map();
  function loadImg(src) {
    if (!src) return Promise.resolve(null);
    if (imgs.has(src)) return imgs.get(src);
    const p = new Promise((res) => { const i = new Image(); i.decoding = 'async'; if (/^https?:/i.test(src)) i.crossOrigin = 'anonymous';   // logos hosted on GitHub must not taint the poster canvas
      i.onload = () => res(trim(i)); i.onerror = () => res(null); i.src = src; });
    imgs.set(src, p); return p;
  }
  /* crop fully transparent borders (many supplied logos carry big empty margins, which made them look tiny next to others) */
  function trim(img) {
    try {
      const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height; if (!w || !h || /\.svg(\?|$)/i.test(img.src)) return img;
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const x = cv.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, w, h).data; let t = h, b = -1, l = w, r = -1;
      for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) if (d[(yy * w + xx) * 4 + 3] > 10) { if (yy < t) t = yy; if (yy > b) b = yy; if (xx < l) l = xx; if (xx > r) r = xx; }
      if (b < 0 || (t === 0 && l === 0 && b === h - 1 && r === w - 1)) return img;
      const o = document.createElement('canvas'); o.width = r - l + 1; o.height = b - t + 1; o.getContext('2d').drawImage(cv, l, t, o.width, o.height, 0, 0, o.width, o.height); return o;
    } catch (e) { return img; }
  }
  async function preload(events, opts) {
    const srcs = new Set();
    if (A.USE_LOGOS) events.forEach((e) => {
      e.channels.forEach((c) => { const u = A.logoFor(A.channel(c), opts.logoBg); if (u) srcs.add(A.LOGO_BASE + u); });
      A.platformsFor(e.channels).forEach((pid) => { const u = A.logoFor(A.streamingPlatform(pid), opts.logoBg); if (u) srcs.add(A.LOGO_BASE + u); });
      [e.home, e.away].forEach((t) => { const L = t && A.teamLogo(t, opts.logoBg, e.sport); if (L) srcs.add(A.LOGO_BASE + L.src); });
      const cl = A.USE_LOGOS && A.compLogo(e.comp, opts.logoBg); if (cl) srcs.add(A.LOGO_BASE + cl);
    });
    if (opts.brandLogo) srcs.add(opts.brandLogo);
    if (opts.bgImage) srcs.add(opts.bgImage);
    const out = {}; await Promise.all([...srcs].map(async (s) => (out[s] = await loadImg(s)))); return out;
  }

  /* ---------- drawing helpers ---------- */
  const rr = (x, ctx, l, t, w, h, r) => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(l, t, w, h, r) : ctx.rect(l, t, w, h); };
  function rect(ctx, x, y, w, h, fill, r = 0) { ctx.fillStyle = fill; rr(0, ctx, x, y, w, h, r); ctx.fill(); }
  function text(ctx, s, x, y, { size = 24, weight = 700, italic = false, color = C.ink, align = 'left', base = 'middle', max } = {}) {
    ctx.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${FONT}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = base;
    let str = String(s);
    if (max) { while (ctx.measureText(str).width > max && str.length > 2) str = str.slice(0, -2) + '…'; }
    ctx.fillText(str, x, y); return ctx.measureText(str).width;
  }
  function fitText(ctx, s, x, y, max, size, o = {}) {
    let sz = size; ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 700} ${sz}px ${FONT}`;
    while (ctx.measureText(s).width > max && sz > 12) { sz -= 1; ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 700} ${sz}px ${FONT}`; }
    return text(ctx, s, x, y, Object.assign({}, o, { size: sz, max }));
  }
  function contain(ctx, img, x, y, w, h) {
    const s = Math.min(w / img.width, h / img.height); const iw = img.width * s, ih = img.height * s;
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
  }
  /* channel logos: same optical size in every slot – fit the box, but cap the area so square logos don't dwarf wide ones */
  function containLogo(ctx, img, x, y, w, h) {
    const s = Math.min(w / img.width, h / img.height, Math.sqrt((0.6 * w * h) / (img.width * img.height)));
    const iw = img.width * s, ih = img.height * s; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
  }
  let LOGO_BG = 'light';
  function drawBadge(ctx, chId, x, y, w, h, im) {
    const ch = A.channel(chId); const p = A.provider(ch.provider); const u = A.logoFor(ch, LOGO_BG);
    const img = A.USE_LOGOS && u && im[A.LOGO_BASE + u];
    if (img && /-tbc$/.test(chId)) {   // broadcaster known, channel not announced yet: logo + "TBA"
      const lw = Math.min(w * 0.42, h * 1.1); containLogo(ctx, img, x, y, lw, h);
      fitText(ctx, 'TBA', x + lw + 5, y + h / 2 + 1, w - lw - 6, Math.round(h * 0.42), { weight: 800, color: C.mute, base: 'middle' }); return;
    }
    if (img) { containLogo(ctx, img, x, y, w, h); return; }
    rect(ctx, x, y, w, h, p.bg, h * 0.22);
    if (p.bg.toLowerCase() === '#ffffff') { ctx.strokeStyle = p.accent || p.fg; ctx.lineWidth = 2; rr(0, ctx, x + 1, y + 1, w - 2, h - 2, h * 0.22); ctx.stroke(); }
    const brand = p.name.replace(/ (Afrique|MENA|Africa|League Pass)$/, '').toUpperCase();
    const short = (ch.short || ch.name).toUpperCase();
    if (short === brand) { fitText(ctx, short, x + w / 2, y + h / 2, w - 8, Math.round(h * 0.5), { color: p.accent || p.fg, align: 'center', weight: 800, italic: true }); return; }
    if (h >= 30) {
      fitText(ctx, brand, x + w / 2, y + h * 0.3, w - 8, Math.round(h * 0.28), { color: p.fg, align: 'center', weight: 800 });
      fitText(ctx, short, x + w / 2, y + h * 0.7, w - 8, Math.round(h * 0.36), { color: p.accent || p.fg, align: 'center', weight: 800, italic: true });
    } else {
      fitText(ctx, short.startsWith((p.abbr || brand).toUpperCase()) ? short : `${(p.abbr || brand)} ${short}`, x + w / 2, y + h / 2, w - 6, Math.round(h * 0.55), { color: p.fg, align: 'center', weight: 800 });
    }
  }
  /* "STREAM ON" strip of platform logos, right-aligned at (xr, y) */
  function drawPlatforms(ctx, e, xr, y, h, im) {
    const ps = A.platformsFor(e.channels); if (!ps.length) return xr;
    let x = xr;
    ps.slice().reverse().forEach((pid) => {
      const p = A.streamingPlatform(pid); const u = A.logoFor(p, LOGO_BG); const img = A.USE_LOGOS && u && im[A.LOGO_BASE + u];
      if (img) { const w = Math.min(h * 4.2, img.width * h / img.height); x -= w; contain(ctx, img, x, y, w, h); }
      else { ctx.font = `800 ${Math.round(h * 0.62)}px ${FONT}`; const w = ctx.measureText(p.name.toUpperCase()).width + h * 0.8; x -= w;
        rect(ctx, x, y, w, h, p.bg || '#333', h / 2); text(ctx, p.name.toUpperCase(), x + w / 2, y + h / 2 + 1, { size: Math.round(h * 0.62), weight: 800, color: p.fg || '#fff', align: 'center' }); }
      x -= 6;
    });
    return x - 2 - text(ctx, 'WATCH ON', x - 2, y + h / 2 + 1, { size: Math.round(h * 0.55), weight: 800, color: C.mute, align: 'right' });
  }
  /* competition logo (contain) – returns drawn width, 0 if none */
  function drawComp(ctx, comp, x, y, w, h, im, align = 'left') {
    const u = A.USE_LOGOS && A.compLogo(comp, LOGO_BG); const img = u && im[A.LOGO_BASE + u]; if (!img) return 0;
    const s = Math.min(w / img.width, h / img.height); const iw = img.width * s, ih = img.height * s;
    const xx = align === 'center' ? x + (w - iw) / 2 : x; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(img, xx, y + (h - ih) / 2, iw, ih); return iw;
  }
  function drawCrest(ctx, team, cx, cy, r, im, sport) {
    const L = A.USE_LOGOS && A.teamLogo(team, LOGO_BG, sport); const img = L && im[A.LOGO_BASE + L.src];
    if (img && L.flag) {   // national team: round flag with a white ring
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 6; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - Math.max(2, r * 0.07), 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2); ctx.restore(); return;
    }
    if (img) { contain(ctx, img, cx - r, cy - r, r * 2, r * 2); return; }
    if (A.INDIVIDUAL && A.INDIVIDUAL.test(sport || '')) return;   // players / fighters: no badge
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 6;
    /* no badge available: one neutral house style so every poster looks the same */
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = C.crestFill; ctx.fill(); ctx.restore();
    ctx.lineWidth = Math.max(1.5, r * 0.06); ctx.strokeStyle = C.crestRing; ctx.beginPath(); ctx.arc(cx, cy, r - ctx.lineWidth / 2, 0, Math.PI * 2); ctx.stroke();
    fitText(ctx, A.initials(team), cx, cy + 1, r * 1.45, Math.round(r * 0.66), { color: C.crestInk, align: 'center', weight: 800 });
  }
  function background(ctx, W, H) { ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); }
  function footer(ctx, W, H, o) {
    const y = H - 62; rect(ctx, 22, y, W - 44, 1, C.line);
    const tw = text(ctx, 'AFRICAN SPORTS', 28, y + 24, { size: 26, weight: 800, italic: true, color: C.ink });
    text(ctx, 'BROADCAST HUB', 28, y + 46, { size: 18, weight: 700, color: C.mute });
    text(ctx, (o.footerText || 'ALL TIMES EAT · GMT+3').toUpperCase(), W - 28, y + 33, { size: 22, weight: 700, color: C.mute, align: 'right', max: W - tw - 90 });
  }

  /* header bar: [EAT][DAY TITLE ................ brand] */
  function headerBar(ctx, W, y, title, o, h = 72) {
    rect(ctx, 22, y, 92, h, C.red); text(ctx, 'EAT', 68, y + h / 2 + 1, { size: Math.round(h * 0.38), weight: 800, color: '#fff', align: 'center' });
    rect(ctx, 114, y, W - 136, h, C.bg); rect(ctx, 114, y + h - 3, W - 136, 3, C.red);
    fitText(ctx, title.toUpperCase(), 134, y + h / 2 + 1, W - 420, Math.round(h * 0.6), { color: C.ink, weight: 800, italic: true });
    text(ctx, 'WHERE TO WATCH', W - 36, y + h / 2 + 1, { size: Math.round(h * 0.28), weight: 700, color: C.mute, align: 'right' });
  }

  /* ---------- styles ---------- */
  A.exportStyles = {
    cards: {
      label: 'Cards (crests & logos)', headH: 72, rowH: 104, gap: 6,
      heightOf(e, o) { const mid = e.channels.filter((c) => o.columns.indexOf(A.channel(c).provider) < 0).length; return mid > 6 ? 168 : mid > 4 ? 136 : 104; },
      drawRow(ctx, e, y, W, o, im) {
        const h = this.heightOf(e, o); rect(ctx, 22, y, W - 44, h, o.alt ? C.panel2 : C.panel);
        const s = new Date(e.start);
        rect(ctx, 22, y, 4, h, C.red);
        fitText(ctx, A.fmtTime(s, o.tz), 96, y + h / 2, 130, 44, { weight: 800, color: C.ink, align: 'center' });
        const colsW = o.columns.length * 112; const right = W - 22 - colsW;
        let nx;
        const solo = A.INDIVIDUAL && A.INDIVIDUAL.test(e.sport || '');   // fighters / players: show the event logo instead of empty crests
        if (e.home && solo) {
          if (!drawComp(ctx, e.comp, 200, y + 18, 152, h - 36, im, 'center')) {
            const label = (e.comp || A.sport(e.sport).name).replace(/\s*·.*$/, '').toUpperCase();
            ctx.lineWidth = 2; ctx.strokeStyle = C.outline; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(193, y + 19, 166, h - 38, 8) : ctx.rect(193, y + 19, 166, h - 38); ctx.stroke();
            fitText(ctx, label, 276, y + h / 2 + 1, 150, 22, { color: C.crestInk, align: 'center', weight: 800, italic: true });
          }
          nx = 374;
          fitText(ctx, e.home.toUpperCase() + ' ·', nx, y + h * 0.33, 238, 27, { italic: true, weight: 700 });
          fitText(ctx, e.away.toUpperCase(), nx, y + h * 0.68, 238, 27, { italic: true, weight: 700 });
        } else if (e.home) {
          drawCrest(ctx, e.home, 228, y + h / 2, 38, im, e.sport); drawCrest(ctx, e.away, 322, y + h / 2, 38, im, e.sport); nx = 374;
          fitText(ctx, e.home.toUpperCase() + ' ·', nx, y + h * 0.33, 238, 27, { italic: true, weight: 700 });
          fitText(ctx, e.away.toUpperCase(), nx, y + h * 0.68, 238, 27, { italic: true, weight: 700 });
        } else {
          if (A.USE_LOGOS && A.compLogo(e.comp, LOGO_BG) && im[A.LOGO_BASE + A.compLogo(e.comp, LOGO_BG)]) {
            drawComp(ctx, e.comp, 200, y + 18, 152, h - 36, im, 'center');
          } else {
            /* no competition logo: a quiet outlined wordmark of the competition (sport name only as last resort) */
            const label = (e.comp || A.sport(e.sport).name).replace(/\s*·.*$/, '').toUpperCase();
            ctx.lineWidth = 2; ctx.strokeStyle = C.outline; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(193, y + 19, 166, h - 38, 8) : ctx.rect(193, y + 19, 166, h - 38); ctx.stroke();
            fitText(ctx, label, 276, y + h / 2 + 1, 150, 22, { color: C.crestInk, align: 'center', weight: 800, italic: true });
          }
          nx = 374; fitText(ctx, e.detail.toUpperCase(), nx, y + h * 0.36, 238, 30, { weight: 700 });
          fitText(ctx, e.comp, nx, y + h * 0.7, 238, 20, { weight: 600, color: C.mute });
        }
        const mx = 612, mw = right - mx - 8;
        const pl = drawPlatforms(ctx, e, right - 6, y + 6, 20, im);   // left edge of the "WATCH ON" strip
        if (e.home) { const lw = drawComp(ctx, e.comp, mx, y + 4, 40, 22, im); const room = pl - 14 - mx - (lw ? lw + 6 : 0);
          if (room > 30) fitText(ctx, e.comp.toUpperCase(), mx + (lw ? lw + 6 : 0), y + 16, room, 15, { weight: 800, color: C.mute, base: 'middle' }); }
        const mid = e.channels.filter((c) => o.columns.indexOf(A.channel(c).provider) < 0);
        slotGrid(ctx, mid, mx, y + 30, mw, h - 38, im, 100, 36, 'left');
        o.columns.forEach((pid, i) => {
          const cs = e.channels.filter((c) => A.channel(c).provider === pid);
          gridBadges(ctx, cs, right + i * 112 + 6, y + 10, 100, h - 20, im, 100, cs.length > 1 ? 38 : 44, true);
        });
      }
    },
    compact: {
      label: 'Compact list', headH: 54, rowH: 34, gap: 2,
      drawRow(ctx, e, y, W, o, im) {
        const h = this.rowH; rect(ctx, 22, y, W - 44, h, o.alt ? C.panel2 : C.panel);
        const s = new Date(e.start);
        rect(ctx, 22, y, 3, h, C.red);
        text(ctx, A.fmtTime(s, o.tz), 92, y + h / 2, { size: 26, weight: 800, color: C.ink, align: 'center' });
        const t = e.home ? `${e.home} · ${e.away}` : `${e.detail} — ${e.comp}`;
        fitText(ctx, t.toUpperCase(), 168, y + h / 2, 330, 21, { weight: 700 });
        if (!drawComp(ctx, e.comp, 506, y + 3, 132, h - 6, im, 'center')) {
          rect(ctx, 506, y + 5, 132, h - 10, A.sport(e.sport).color, 5);
          fitText(ctx, e.comp.toUpperCase(), 572, y + h / 2, 124, 14, { color: '#fff', weight: 800, align: 'center' });
        }
        const colsW = o.columns.length * 112; const right = W - 22 - colsW;
        const mid = e.channels.filter((c) => o.columns.indexOf(A.channel(c).provider) < 0);
        let x = 646; let more = 0;
        mid.forEach((c) => { const bw2 = A.channel(c).wide ? 120 : 72;
          if (x + bw2 + 2 + 30 <= right || (x + bw2 + 2 <= right && c === mid[mid.length - 1])) { drawBadge(ctx, c, x, y + 4, bw2, h - 8, im); x += bw2 + 4; } else more++; });
        if (more) text(ctx, '+' + more, x + 2, y + h / 2, { size: 18, weight: 800, color: C.mute });
        o.columns.forEach((pid, i) => { const cs = e.channels.filter((c) => A.channel(c).provider === pid);
          if (cs[0]) drawBadge(ctx, cs[0], right + i * 112 + 8, y + 3, 96, h - 6, im); });
      }
    }
  };
  /* fixed-slot grid: every logo gets the same box (wide logos two boxes), rows centred */
  function slotGrid(ctx, list, x, y, w, h, im, bw, bh, align) {
    if (!list.length) return; const gx = Math.round(bw * 0.09), gy = Math.round(bh * 0.2);
    for (let k = 1; k >= 0.5; k -= 0.05) {
      const sw = bw * k, sh = bh * k, per = Math.max(1, Math.floor((w + gx) / (sw + gx)));
      const rows = []; let cur = [], used = 0;
      list.forEach((c) => { const n = A.channel(c).wide ? 2 : 1; if (used + n > per && cur.length) { rows.push(cur); cur = []; used = 0; } cur.push(c); used += n; });
      if (cur.length) rows.push(cur);
      const tot = rows.length * sh + (rows.length - 1) * gy; if (tot > h && k > 0.5) continue;
      let yy = y + Math.max(0, (h - tot) / 2);
      rows.forEach((row) => { const units = row.reduce((a, c) => a + (A.channel(c).wide ? 2 : 1), 0); let xx = align === 'left' ? x : x + (w - (units * sw + (units - 1) * gx)) / 2;
        row.forEach((c) => { const n = A.channel(c).wide ? 2 : 1; const ww = n * sw + (n - 1) * gx; drawBadge(ctx, c, xx, yy, ww, sh, im); xx += ww + gx; }); yy += sh + gy; });
      return;
    }
  }
  /* Flow layout: wide logos (streaming services) get a wider slot so they stay readable */
  function gridBadges(ctx, list, x, y, w, h, im, bw, bh, center) {
    if (!list.length) return;
    const wOf = (c, k) => (A.channel(c).wide ? bw * 1.75 : bw) * k;
    const layout = (k) => { const rows = [[]]; let rx = 0;
      list.forEach((c) => { const ww = wOf(c, k); if (rx > 0 && rx + ww > w) { rows.push([]); rx = 0; } rows[rows.length - 1].push(c); rx += ww + 6; }); return rows; };
    let k = 1, rows = layout(1);
    while (k > 0.55 && rows.length * (bh * k + 4) - 4 > h) { k -= 0.05; rows = layout(k); }
    const H2 = bh * k; const used = rows.length * (H2 + 4) - 4; let yy = y + (h - used) / 2;
    rows.forEach((r) => { const rw = r.reduce((a, c) => a + wOf(c, k) + 6, -6); let xx = center ? x + (w - rw) / 2 : x;
      r.forEach((c) => { const ww = wOf(c, k); drawBadge(ctx, c, xx, yy, ww, H2, im); xx += ww + 6; }); yy += H2 + 4; });
  }


  /* helpers shared with plugin styles (export-highlights.js) */
  A.exportKit = { FONT, C, THEMES, rect, text, fitText, contain, containLogo, loadImg, drawBadge, drawCrest: (...a) => drawCrest(...a), setLogoBg: (b) => (LOGO_BG = b) };

  /* ---------- pagination & render ---------- */
  A.renderPosters = async (events, opts) => {
    const o = Object.assign({ style: 'cards', size: 'portrait', tz: A.DEFAULT_TZ, tz2: 'UTC', lang: 'en', columns: [], groupBy: 'day' }, opts);
    o.tz = 'Africa/Nairobi'; o.tz2 = 'Africa/Nairobi'; o.tzLabel = 'EAT'; o.tz2Label = 'EAT';   // all posters: East Africa Time only
    const [W, H] = SIZES[o.size] || SIZES.portrait;
    const st0 = A.exportStyles[o.style] || {};
    o.theme = THEMES[o.theme] ? o.theme : 'black'; Object.assign(C, THEMES[o.theme]);
    o.logoBg = o.logoBg || st0.logoBg || THEMES[o.theme].logoBg; LOGO_BG = o.logoBg;   // logo variant that reads on the poster background
    const im = await preload(events, o);
    if (st0.render) return st0.render(events, o, W, H, im);
    if (o.style === 'featured') return [featured(events[0], W, H, o, im)];
    const st = A.exportStyles[o.style] || A.exportStyles.cards;

    const groups = A.groupBy(events, (e) => A.dayKey(new Date(e.start), o.tz));
    const blocks = [];
    Object.keys(groups).sort().forEach((k) => {
      const title = o.title ? `${o.title} · ${A.dayTitle(k, o.lang)}` : A.dayTitle(k, o.lang);
      blocks.push({ head: title }); groups[k].forEach((e) => blocks.push({ ev: e }));
    });
    const top = 22, bottom = H - 62 - 14; const pages = []; let cur = []; let y = top;
    const rowH = (e) => (st.heightOf ? st.heightOf(e, o) : st.rowH);
    const need = (b) => (b.head ? st.headH + st.gap + st.rowH : rowH(b.ev)) + st.gap;
    let lastHead = null;
    blocks.forEach((b) => {
      if (y + need(b) > bottom) { pages.push(cur); cur = []; y = top; if (b.ev && lastHead) { cur.push({ head: lastHead }); y += st.headH + st.gap; } }
      if (b.head) lastHead = b.head;
      cur.push(b); y += b.head ? st.headH + st.gap : rowH(b.ev) + st.gap;
    });
    if (cur.length) pages.push(cur);
    return pages.map((pg) => {
      let Hp = H;
      if (o.trim && pages.length === 1) { const used = pg.reduce((a, b) => a + (b.head ? st.headH : rowH(b.ev)) + st.gap, top); Hp = Math.min(H, Math.max(Math.round(W * 0.5), used + 14 + 62 + 8)); }
      const cv = document.createElement('canvas'); cv.width = W; cv.height = Hp; const ctx = cv.getContext('2d'); ctx.imageSmoothingQuality = 'high';
      background(ctx, W, Hp); let yy = top; let alt = false;
      pg.forEach((b) => {
        if (b.head) { headerBar(ctx, W, yy, b.head, o, st.headH); yy += st.headH + st.gap; alt = false; }
        else { st.drawRow(ctx, b.ev, yy, W, Object.assign({}, o, { alt }), im); yy += rowH(b.ev) + st.gap; alt = !alt; }
      });
      footer(ctx, W, Hp, o); return cv;
    });
  };

  function featured(e, W, H, o, im) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const ctx = cv.getContext('2d');
    const sp = A.sport(e.sport); background(ctx, W, H);
    const s = new Date(e.start); const k = A.dayKey(s, o.tz);
    fitText(ctx, A.dayTitle(k, o.lang).toUpperCase(), W / 2, H * 0.08, W - 80, 96, { align: 'center', weight: 800, color: C.navy });
    const hasL = drawComp(ctx, e.comp, W / 2 - 200, H * 0.125, 400, H * 0.08, im, 'center') > 0; const py = H * 0.14 + (hasL ? H * 0.07 : 0);
    rect(ctx, W / 2 - 260, py + 54, 520, 2, C.red);
    fitText(ctx, e.comp.toUpperCase(), W / 2, py + 26, 490, 32, { align: 'center', weight: 800, color: C.ink, italic: true });
    if (e.round) text(ctx, e.round, W / 2, py + 84, { size: 30, weight: 600, align: 'center' });
    const ty = H * 0.28;
    rect(ctx, W / 2 - 140, ty, 280, 80, C.red);
    text(ctx, A.fmtTime(s, o.tz), W / 2, ty + 42, { size: 64, weight: 800, color: '#fff', align: 'center' });
    text(ctx, 'EAT', W / 2, ty + 108, { size: 28, weight: 800, color: C.mute, align: 'center' });
    const cy = H * 0.52, r = Math.min(170, W * 0.15);
    if (e.home) {
      drawCrest(ctx, e.home, W * 0.22, cy, r, im, e.sport); drawCrest(ctx, e.away, W * 0.78, cy, r, im, e.sport);
      text(ctx, 'VS', W / 2, cy, { size: 90, weight: 800, italic: true, color: C.red, align: 'center' });
      fitText(ctx, e.home.toUpperCase(), W * 0.22, cy + r + 46, W * 0.42, 44, { align: 'center', weight: 800 });
      fitText(ctx, e.away.toUpperCase(), W * 0.78, cy + r + 46, W * 0.42, 44, { align: 'center', weight: 800 });
    } else {
      fitText(ctx, e.detail.toUpperCase(), W / 2, cy, W - 120, 120, { align: 'center', weight: 800, italic: true, color: C.navy });
    }
    if (e.venue) text(ctx, e.venue.toUpperCase(), W / 2, cy + r + 100, { size: 34, weight: 700, align: 'center', color: C.mute });
    /* channels: equal slots on a centred grid, same height for every logo */
    { const top = Math.max(H * 0.715, cy + r + (e.venue ? 130 : 80)), bot = H - 62 - (A.platformsFor(e.channels).length ? 84 : 20);
      rect(ctx, 60, top - 14, W - 120, 1, C.line);
      slotGrid(ctx, e.channels, 60, top, W - 120, bot - top, im, W > 1500 ? 230 : 196, W > 1500 ? 82 : 70); }
    { const ps = A.platformsFor(e.channels); if (ps.length) drawPlatforms(ctx, e, W / 2 + 40 + ps.length * 70, H - 62 - 70, 40, im); }
    footer(ctx, W, H, o); return cv;
  }

  /* ---------- saving (overridden by platform shims for Android / Windows) ---------- */
  A.saveBlob = A.saveBlob || (async (blob, name) => {
    if (A.PREVIEW) { A.toast && A.toast('Saving files is switched off in this preview. It works on the website and in the apps.'); return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  });
  A.canvasBlob = (cv) => new Promise((r) => cv.toBlob(r, 'image/png'));
})(window.ASBH);
