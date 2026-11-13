/* Result views: table (tabular), list (non-tabular), channel view, live now. */
(function (A) {
  'use strict';
  const E = A.esc;

  A.USE_LOGOS = A.USE_LOGOS !== false;
  A.LOGO_BASE = A.LOGO_BASE || '';

  /* tapping a channel or platform badge opens the broadcaster's own site */
  const go = (c) => { const u = (A.providerLinks ? A.providerLinks(c.provider)[0] || {} : {}).url; return u ? ` data-golink="${E(u)}" role="link" tabindex="0"` : ''; };
  A.siteChips = (e) => { const seen = new Set(); const out = [];
    (e.channels || []).forEach((c) => { const pid = A.channel(c).provider; if (seen.has(pid)) return; seen.add(pid); (A.providerLinks(pid) || []).forEach((l) => out.push(l)); });
    return out.length ? `<div class="sites"><span class="lbl">Broadcaster sites</span>${out.map((l) => `<button type="button" class="site" data-golink="${E(l.url)}">${E(l.label)} ↗</button>`).join('')}</div>` : ''; };
  A.badge = (chId, opts = {}) => {
    const c = A.channel(chId); const p = A.provider(c.provider);
    const LN = { en: 'English', pt: 'Portuguese', sw: 'Swahili', fr: 'French', ar: 'Arabic' };
    const title = `${c.name} · ${p.name}` + (c.langs ? ` · ${c.langs.map((l) => LN[l] || l).join(' / ')}` : '') + (c.countries ? ` · ${c.countries} only` : '');
    if (A.USE_LOGOS && A.hasLogo(c) && !opts.text) {
      const img = (bg, cls) => `<img class="${cls}" src="${E(A.LOGO_BASE + A.logoFor(c, bg))}" alt="${E(c.name)}" loading="lazy" onerror="this.parentNode.outerHTML=ASBH.badge('${E(chId)}',{text:1})">`;
      const both = c.logos && c.logos.light && c.logos.dark;
      return `<span class="ch ch-logo"${go(c)} title="${E(title)}">${both ? img('light', 'on-light') + img('dark', 'on-dark') : img('light', '')}</span>`;
    }
    const brand = p.name.replace(/ (Afrique|MENA|Africa|League Pass)$/, '');
    const short = c.short || c.name;
    return `<span class="ch"${go(c)} style="--cb:${p.bg};--fg:${p.fg};--ac:${p.accent || p.fg}" title="${E(title)}">${short.toUpperCase() === brand.toUpperCase() ? '' : `<b>${E(brand)}</b>`}<i>${E(short)}</i></span>`;
  };
  A.platformBadge = (pid) => {
    const p = A.streamingPlatform(pid); if (!p) return '';
    if (A.USE_LOGOS && (p.logo || p.logos)) {
      const img = (bg, cls) => `<img class="${cls}" src="${E(A.LOGO_BASE + A.logoFor(p, bg))}" alt="${E(p.name)}" loading="lazy">`;
      return `<span class="pf pf-logo"${p.url ? ` data-golink="${E(p.url)}" role="link" tabindex="0"` : ''} title="${E(p.name)} (${p.kind === 'tv' ? 'pay-TV platform' : 'streaming platform'})">${p.logos ? img('light', 'on-light') + img('dark', 'on-dark') : img('light', '')}</span>`;
    }
    return `<span class="pf"${p.url ? ` data-golink="${E(p.url)}" role="link" tabindex="0"` : ''} style="--cb:${p.bg || '#333'};--fg:${p.fg || '#fff'}" title="${E(p.name)} (${p.kind === 'tv' ? 'pay-TV platform' : 'streaming platform'})">${E(p.name)}</span>`;
  };
  A.platformRow = (e) => { const ps = A.platformsFor(e.channels); return ps.length ? `<div class="stream"><span class="lbl">Watch on</span>${ps.map(A.platformBadge).join('')}</div>` : ''; };
  /* Official order of play (tennis) */
  A.orderOfPlay = (e) => e.sport !== 'tennis' ? null : e.oop || (/^atp/i.test(e.comp) ? 'https://www.atptour.com/en/scores/current' : /^wta/i.test(e.comp) ? 'https://www.wtatennis.com/scores' : null);
  A.badgesByProvider = (chs) => {
    const groups = {};
    chs.forEach((id) => { const pv = A.channel(id).provider; (groups[pv] = groups[pv] || []).push(id); });
    return Object.keys(groups).map((pv) => `<span class="chg">${groups[pv].map((id) => A.badge(id)).join('')}</span>`).join('');
  };
  A.crest = (team, size = 40, sport) => {
    const L = A.USE_LOGOS && A.teamLogo(team, 'light', sport);
    if (L) {
      const D = A.teamLogo(team, 'dark', sport); const cls = 'crest' + (L.flag ? ' flag' : '');
      const img = (src, extra) => `<img class="${cls}${extra}" src="${E(A.LOGO_BASE + src)}" alt="${E(team)}" title="${E(team)}" width="${size}" height="${size}" loading="lazy">`;
      return D && D.src !== L.src ? img(L.src, ' on-light') + img(D.src, ' on-dark') : img(L.src, '');
    }
    if (A.INDIVIDUAL && A.INDIVIDUAL.test(sport || '')) return '';   // players / fighters: no badge rather than initials
    return `<span class="crest mono" style="--c:${A.hashColor(team)};width:${size}px;height:${size}px">${E(A.initials(team))}</span>`;
  };
  A.compTag = (comp, h = 18) => {
    const L = A.USE_LOGOS && A.compLogo(comp, 'light'); if (!L) return '';
    const D = A.compLogo(comp, 'dark'); const img = (s, c) => `<img class="cl ${c}" src="${E(A.LOGO_BASE + s)}" alt="" height="${h}">`;
    return D !== L ? img(L, 'on-light') + img(D, 'on-dark') : img(L, '');
  };
  const isLive = (e, now) => new Date(e.start) <= now && now < new Date(e.end);
  A.isLive = isLive;
  const statusPill = (e, now) => isLive(e, now)
    ? '<span class="st live">● LIVE NOW</span>'
    : `<span class="st st-${E(e.status)}" title="${E(A.STATUS[e.status] || '')}">${E(e.status)}</span>`;
  const sportTag = (id) => { const s = A.sport(id); return `<span class="sp" style="--c:${s.color}">${E(s.name)}</span>`; };

  /* ---------- table (tabular) ---------- */
  A.renderTable = (events, ctx) => {
    if (!events.length) return empty();
    const now = A.now(); const tz = ctx.tz;
    const showG = ctx.showGmt && tz !== 'UTC';
    return `<div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Date</th><th>Sport</th><th>Programme title</th><th>Episode / detail</th>
      <th>Start <small>${E(A.tzShort(tz))}</small></th><th>End</th>${showG ? '<th>GMT</th>' : ''}<th>Channel</th><th>Status</th></tr></thead>
      <tbody>${events.map((e) => {
        const s = new Date(e.start), en = new Date(e.end);
        return `<tr class="${isLive(e, now) ? 'is-live' : ''}" data-id="${E(e.id)}">
          <td data-l="Date">${E(A.dayKey(s, tz))}</td><td data-l="Sport">${sportTag(e.sport)}</td>
          <td data-l="Programme"><span class="cmp">${A.compTag(e.comp)}${E(e.comp)}</span></td><td data-l="Detail" class="det">${E(e.detail)}</td>
          <td data-l="Start" class="t">${A.fmtTime(s, tz)}</td><td data-l="End" class="t">${A.fmtTime(en, tz)}</td>
          ${showG ? `<td data-l="GMT" class="t g">${A.fmtTime(s, 'UTC')}</td>` : ''}
          <td data-l="Channel" class="chs">${A.badgesByProvider(e.channels)}${A.platformRow(e)}</td><td data-l="Status">${statusPill(e, now)}</td></tr>`;
      }).join('')}</tbody></table></div>`;
  };

  /* ---------- list (non-tabular) grouped by day ---------- */
  A.renderList = (events, ctx) => {
    if (!events.length) return empty();
    const now = A.now(); const tz = ctx.tz; const days = groupBy(events, (e) => A.dayKey(new Date(e.start), tz));
    return Object.keys(days).map((k) => `<section class="day"><h2 class="day-h"><span>${E(A.dayTitle(k, ctx.lang))}</span><small>${days[k].length} broadcasts</small></h2>
      ${days[k].map((e) => card(e, ctx, now)).join('')}</section>`).join('');
  };
  function card(e, ctx, now) {
    const s = new Date(e.start); const live = isLive(e, now); const sp = A.sport(e.sport);
    const who = e.home
      ? `<div class="teams">${A.crest(e.home, 40, e.sport)}<div class="names"><b>${E(e.home)}</b><b>${E(e.away)}</b></div>${A.crest(e.away, 40, e.sport)}</div>`
      : `<div class="teams solo"><div class="names"><b>${E(e.detail)}</b></div></div>`;
    return `<article class="card ${live ? 'is-live' : ''}" style="--c:${sp.color}" data-id="${E(e.id)}">
      <div class="when"><span class="big">${A.fmtTime(s, ctx.tz)}</span><span class="tz">${E(A.tzShort(ctx.tz))}</span>
${live ? '<span class="st live">● LIVE</span>' : ''}</div>
      <div class="what"><div class="meta">${sportTag(e.sport)}<span class="comp">${A.compTag(e.comp, 20)}${E(e.comp)}</span></div>${who}
        <div class="chs">${A.badgesByProvider(e.channels)}</div>${A.platformRow(e)}</div>
      <div class="acts"><button class="ico" data-act="export-match" title="Export poster for this match" aria-label="Export poster">⤓</button>
        <button class="ico star" data-act="star" title="Highlight this event on weekly/monthly posters" aria-label="Highlight">${A.isStarred && A.isStarred(e.id) ? '★' : '☆'}</button>
        ${A.orderOfPlay(e) ? `<a class="ico oop" href="${A.orderOfPlay(e)}" target="_blank" rel="noopener" title="Official order of play" aria-label="Order of play">≡</a>` : ''}
        <button class="ico rem ${A.reminderFor && A.reminderFor(e) ? 'on' : ''}" data-act="remind" title="${A.reminderFor && A.reminderFor(e) ? 'Reminder set – click to change or cancel' : 'Set a reminder'}" aria-label="Reminder">${A.remIcon || '⏰'}</button>
        <button class="ico" data-act="ics" title="Add to calendar (Google, Outlook, Apple, .ics)" aria-label="Add to calendar">＋</button></div></article>`;
  }

  /* ---------- channel view ---------- */
  A.renderChannels = (events, ctx) => {
    const now = A.now(); const by = {};
    events.forEach((e) => e.channels.forEach((c) => (by[c] = by[c] || []).push(e)));
    /* every channel of each broadcaster, in channel-number order – also the ones with nothing listed this week */
    const ORDER = ['supersport', 'espn', 'canalplus', 'startimes', 'azam', 'bein', 'zap'];
    const provs = ORDER.concat(A.PROVIDERS.map((p) => p.id).filter((id) => ORDER.indexOf(id) < 0));
    const filtered = !!(ctx && (A.ui && (A.ui.providers || []).length));
    return provs.map((p) => {
      let list = (A.channelsOf ? A.channelsOf(p) : A.CHANNELS.filter((c) => c.provider === p)).map((c) => c.id);
      Object.keys(by).forEach((id) => { if (A.channel(id).provider === p && list.indexOf(id) < 0) list.push(id); });
      if (filtered) list = list.filter((id) => by[id]);
      if (!list.length || (!list.some((id) => by[id]) && ORDER.indexOf(p) < 0)) return '';
      return `<section class="prov"><h2 class="day-h"><span>${E(A.provider(p).name)}</span><small>${E(A.provider(p).note || '')}</small>${A.providerLinks(p).map((l) => `<button type="button" class="site" data-golink="${E(l.url)}">${E(l.label)} ↗</button>`).join('')}</h2>
      <div class="chgrid">${list.map((id) => { const c = A.channel(id); return `<div class="chcol${by[id] ? '' : ' empty'}"><div class="chhead">${A.badge(id)}<span>${E(c.name)}${c.num ? `<small>${E(c.num)}</small>` : ''}</span></div>
        <ul>${(by[id] || []).map((e) => { const s = new Date(e.start); return `<li class="${isLive(e, now) ? 'is-live' : ''}" data-id="${E(e.id)}">
          <time>${E(A.dayTitle(A.dayKey(s, ctx.tz), ctx.lang).split(' ').slice(0, 2).join(' '))} · ${A.fmtTime(s, ctx.tz)}</time>
          <span>${sportTag(e.sport)} ${E(e.comp)}</span><b>${E(e.detail)}</b></li>`; }).join('') || '<li class="none">Nothing listed this week</li>'}</ul></div>`; }).join('')}</div></section>`;
    }).join('') || empty();
  };

  /* ---------- live now ---------- */
  A.renderLive = (events, ctx) => {
    const now = A.now();
    const live = events.filter((e) => isLive(e, now));
    const next = events.filter((e) => new Date(e.start) > now).slice(0, 12);
    return `<section class="day"><h2 class="day-h"><span>Live now</span><small>${A.fmtTime(now, ctx.tz)} ${E(A.tzShort(ctx.tz))}</small></h2>
      ${live.length ? live.map((e) => card(e, ctx, now)).join('') : '<p class="empty">Nothing is live on these channels right now.</p>'}</section>
      <section class="day"><h2 class="day-h"><span>Coming up next</span><small>${next.length} broadcasts</small></h2>${next.map((e) => card(e, ctx, now)).join('') || '<p class="empty">No upcoming broadcasts match your filters.</p>'}</section>`;
  };

  function empty() { return '<p class="empty">No broadcasts match these filters. Try “All sports”, more days, or another region.</p>'; }
  function groupBy(a, f) { const o = {}; a.forEach((x) => (o[f(x)] = o[f(x)] || []).push(x)); return o; }
  A.groupBy = groupBy;

  /* ---------- calendar export ---------- */
  A.toIcs = (evs) => {
    const d = (s) => new Date(s).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//African Sports Broadcast Hub//EN'];
    evs.forEach((e) => lines.push('BEGIN:VEVENT', 'UID:' + e.id + '@asbh', 'DTSTAMP:' + d(new Date()), 'DTSTART:' + d(e.start), 'DTEND:' + d(e.end),
      'SUMMARY:' + e.detail, 'DESCRIPTION:' + e.comp, 'CATEGORIES:' + A.sport(e.sport).name,
      'LOCATION:' + e.channels.map((c) => A.channel(c).name).join('\\, '), 'END:VEVENT'));
    lines.push('END:VCALENDAR'); return lines.join('\r\n');
  };
})(window.ASBH);
