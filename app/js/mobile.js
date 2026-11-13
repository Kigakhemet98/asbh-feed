/* Phone layout (Android app and narrow screens), modelled on the Live Soccer TV app:
 * bottom navigation (Matches · Leagues · Teams · Channels · More), a week strip, matches grouped
 * under collapsible competition headers, compact rows, favourites. No ads, no purchases. */
(function (A) {
  'use strict';
  const E = A.esc;
  const mq = window.matchMedia('(max-width: 760px)');
  const isPhone = () => mq.matches || document.documentElement.classList.contains('android');
  const M = Object.assign({ tab: 'matches', day: null, sport: '', open: {}, favOnly: false, q: '', comp: '', team: '', channel: '' }, A.store.get('mobile', {}));
  const FAV = Object.assign({ teams: [], comps: [] }, A.store.get('fav', {}));
  const save = () => { A.store.set('mobile', Object.assign({}, M, { day: null })); A.store.set('fav', FAV); };
  const today = () => A.dayKey(A.now(), 'Africa/Nairobi');
  const dk = (e) => A.dayKey(new Date(e.start), 'Africa/Nairobi');
  const t = (e) => A.fmtTime(new Date(e.start), 'Africa/Nairobi');
  const ICON = {
    matches: '<svg viewBox="0 0 24 24"><path d="M4 18h16M6 18a6 6 0 0 1 12 0" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    leagues: '<svg viewBox="0 0 24 24"><path d="M7 4h10v4a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    teams: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="5" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 20a6 6 0 0 1 12 0M1.5 19a4 4 0 0 1 5-3.5M22.5 19a4 4 0 0 0-5-3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    channels: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    more: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1-4.5-4.3 6.1-.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    starOn: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1-4.5-4.3 6.1-.8z" fill="#f5c518" stroke="#f5c518" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8"/><rect x="7" y="13" width="4" height="3" fill="currentColor"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 15V3M7 8l5-5 5 5M5 13v6h14v-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    live: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="#e10a17"/><path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="1.8"/></svg>',
    filter: '<svg viewBox="0 0 24 24"><path d="M3 5h18l-7 8v6l-4-2v-4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2"/></svg>'
  };

  /* ---------- data helpers ---------- */
  const base = () => A.data.events.filter((e) => A.matchesFilters(e, { date: true, sport: true, comp: true }));
  const isFavEv = (e) => FAV.comps.indexOf(e.comp) >= 0 || [e.home, e.away].some((n) => n && FAV.teams.indexOf(n) >= 0);
  function dayEvents() {
    const d = M.day || today();
    return base().filter((e) => (dk(e) === d || (d === today() && A.isLive(e, A.now()))) && (!M.sport || e.sport === M.sport)
      && (!M.favOnly || isFavEv(e)) && (!M.comp || e.comp === M.comp) && (!M.channel || e.channels.indexOf(M.channel) >= 0)
      && (!M.team || [e.home, e.away].indexOf(M.team) >= 0)
      && (!M.q || `${e.comp} ${e.detail} ${e.channels.map((c) => A.channel(c).name).join(' ')}`.toLowerCase().indexOf(M.q.toLowerCase()) >= 0))
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }
  const compLogo = (comp, h = 26) => { const L = A.compLogo(comp, 'dark'); return L ? `<img loading="lazy" decoding="async" src="${E(A.LOGO_BASE + L)}" alt="" style="height:${h}px;width:${h}px;object-fit:contain">` : `<span class="m-cl-txt" style="--c:${(A.sport(sportOf(comp)) || {}).color || '#3a3f4b'}">${E(initials(comp))}</span>`; };
  const COMP_SPORT = {}; const sportOf = (comp) => COMP_SPORT[comp] || (COMP_SPORT[comp] = ((A.data && A.data.events || []).find((e) => e.comp === comp) || {}).sport || 'other');
  const initials = (t) => { const w = String(t || '?').replace(/[·()\-–]/g, ' ').split(/\s+/).filter((x) => x && !/^(the|of|de|la|le|and|presented|by)$/i.test(x));
    const n = w.find((x) => /\d/.test(x) && x.length <= 4); return (w.length > 1 ? w.slice(0, 3).map((x) => x[0]).join('') : (w[0] || '?').slice(0, 3)).toUpperCase().slice(0, n ? 2 : 3) + (n && !w.slice(0, 3).join('').includes(n) ? n : ''); };
  const chLogo = (id) => { const c = A.channel(id); const L = A.hasLogo(c) && A.logoFor(c, 'dark'); if (L && /-tbc$/.test(id)) return `<span class="m-tbc"><img src="${E(A.LOGO_BASE + L)}" alt=""><b>TBA</b></span>`; return L ? `<img loading="lazy" decoding="async" src="${E(A.LOGO_BASE + L)}" alt="${E(c.name)}" title="${E(c.name)}">` : `<span class="m-ch-txt">${E(c.short || c.name)}</span>`; };
  const sportName = (id) => A.sport(id).name;

  /* ---------- shell ---------- */
  function mount() {
    if (document.getElementById('m-app')) return;
    const app = document.createElement('div'); app.id = 'm-app';
    app.innerHTML = `<header id="m-top"></header><div id="m-sub"></div><main id="m-main"></main>
      <nav id="m-nav">${['matches', 'leagues', 'teams', 'channels', 'more'].map((k) => `<button type="button" data-tab="${k}">${ICON[k]}<span>${k[0].toUpperCase() + k.slice(1)}</span></button>`).join('')}</nav>
      <div id="m-sheet" hidden><div class="m-sheet-in"></div></div>`;
    document.body.appendChild(app);
    app.addEventListener('click', onClick);
    app.querySelector('#m-sheet').addEventListener('click', (e) => { if (e.target.id === 'm-sheet') closeSheet(); });
  }
  function apply() {
    const on = isPhone();
    document.documentElement.classList.toggle('m-on', on);
    if (on) mount();
    if (A.render) A.render(); else if (on) draw();   // rebuild for the layout now in use
  }

  function top(title, left = '', right = '') { return `<div class="m-bar"><div class="m-l">${left}</div><h1>${E(title)}</h1><div class="m-r">${right}</div></div>`; }
  function draw() {
    if (isPhone()) syncTabLayer();
    const nav = document.querySelectorAll('#m-nav button'); nav.forEach((b) => b.classList.toggle('on', b.dataset.tab === M.tab));
    ({ matches: drawMatches, leagues: drawLeagues, teams: drawTeams, channels: drawChannels, more: drawMore })[M.tab]();
    save();
  }

  /* ---------- Matches ---------- */
  function drawMatches() {
    const d = M.day || today(); const dt = new Date(d + 'T12:00:00+03:00');
    const month = dt.toLocaleDateString('en-GB', { month: 'long', timeZone: 'Africa/Nairobi' }).toUpperCase();
    const filt = [M.comp, M.team, M.channel].filter(Boolean)[0];
    document.getElementById('m-top').innerHTML = top(month,
      `<button class="m-ic" data-act="search" aria-label="Search">${ICON.search}</button><button class="m-ic ${M.favOnly ? 'on' : ''}" data-act="favonly" aria-label="Favourites only">${M.favOnly ? ICON.starOn : ICON.star}</button>`,
      `<button class="m-ic" data-act="pickdate" aria-label="Pick a date">${ICON.cal}<input type="date" id="m-date" value="${d}"></button><button class="m-ic" data-act="filters" aria-label="Filters">${ICON.filter}</button>`);
    // week strip: Monday → Sunday of the selected week, swipe arrows for the next/previous week
    const mon = A.addDaysKey(d, -((dt.getUTCDay() + 6) % 7));
    let strip = `<button class="m-wk" data-act="week" data-d="${A.addDaysKey(mon, -7)}" aria-label="Previous week">${ICON.back}</button>`;
    for (let i = 0; i < 7; i++) {
      const k = A.addDaysKey(mon, i); const kd = new Date(k + 'T12:00:00+03:00');
      strip += `<button class="m-day ${k === d ? 'on' : ''} ${k === today() ? 'today' : ''}" data-act="day" data-d="${k}"><i>${kd.toLocaleDateString('en-GB', { weekday: 'narrow', timeZone: 'Africa/Nairobi' })}</i><b>${kd.getUTCDate()}</b></button>`;
    }
    strip += `<button class="m-wk" data-act="week" data-d="${A.addDaysKey(mon, 7)}" aria-label="Next week">${ICON.right}</button>`;
    const evs = dayEvents(); const counts = {}; base().filter((e) => dk(e) === d).forEach((e) => (counts[e.sport] = (counts[e.sport] || 0) + 1));
    const chips = `<button class="m-chip ${!M.sport ? 'on' : ''}" data-act="sport" data-s="">All</button>` + A.SPORTS.filter((s) => counts[s.id]).map((s) => `<button class="m-chip ${M.sport === s.id ? 'on' : ''}" data-act="sport" data-s="${s.id}" style="--c:${s.color}">${E(s.name)} <span>${counts[s.id]}</span></button>`).join('');
    document.getElementById('m-sub').innerHTML = `<div class="m-week">${strip}</div><div class="m-chips">${chips}</div>`
      + (M.q ? `<div class="m-active">Search: “${E(M.q)}” <button data-act="clear" data-k="q">✕</button></div>` : '')
      + (filt ? `<div class="m-active">${E(M.comp || M.team || A.channel(M.channel).name)} <button data-act="clear" data-k="${M.comp ? 'comp' : M.team ? 'team' : 'channel'}">✕</button></div>` : '');
    // group by competition (live competitions first, then by first kick-off)
    const groups = new Map(); evs.forEach((e) => { const k = e.sport + '|' + e.comp; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(e); });
    const now = A.now();
    const order = [...groups.entries()].sort((a, b) => (b[1].some((e) => A.isLive(e, now)) - a[1].some((e) => A.isLive(e, now))) || (FAV.comps.indexOf(b[1][0].comp) >= 0) - (FAV.comps.indexOf(a[1][0].comp) >= 0) || (new Date(a[1][0].start) - new Date(b[1][0].start)));
    let html = '';
    if (!order.length) html = `<div class="m-empty">No broadcasts ${M.favOnly ? 'for your favourites ' : ''}on this day.<br><button class="m-btn" data-act="day" data-d="${today()}">Go to today</button></div>`;
    for (const [k, list] of order) {
      const open = M.open[k] !== false; const e0 = list[0];
      html += `<section class="m-grp ${open ? 'open' : ''}"><button class="m-gh" data-act="toggle" data-k="${E(k)}">${compLogo(e0.comp)}<span class="m-gt">${E(sportName(e0.sport).toUpperCase())} — ${E(e0.comp.toUpperCase())}</span><em>${list.length}</em><span class="m-chev">${ICON.chev}</span></button>`;
      if (open) html += list.map(row).join('');
      html += '</section>';
    }
    document.getElementById('m-main').innerHTML = html;
  }
  function row(e) {
    const now = A.now(); const live = A.isLive(e, now); const id = E(e.id);
    const teams = e.home && e.away
      ? `<div class="m-tm">${A.crest(e.home, 22, e.sport)}<span>${E(e.home)}</span></div><div class="m-tm">${A.crest(e.away, 22, e.sport)}<span>${E(e.away)}</span></div>`
      : `<div class="m-tm single"><span>${E(e.detail)}</span></div>`;
    const chs = e.channels.slice(0, 3).map(chLogo).join('') + (e.channels.length > 3 ? `<span class="m-more">+${e.channels.length - 3}</span>` : '');
    return `<button class="m-row ${live ? 'live' : ''}" data-act="open" data-id="${id}">
      <span class="m-time">${live ? '<b class="m-live">LIVE</b>' : E(t(e))}${A.reminderFor && A.reminderFor(e) ? `<i class="m-remdot" title="Reminder set">${A.remIcon}</i>` : ''}${e.status && e.status !== 'L' ? `<small>${E(e.status === 'D' ? 'Delayed' : e.status === 'R' ? 'Repeat' : e.status === 'H' ? 'Highl.' : e.status)}</small>` : ''}</span>
      <span class="m-teams">${teams}</span><span class="m-chs">${chs}</span></button>`;
  }
  function openMatch(id) {
    const e = A.data.events.find((x) => x.id === id); if (!e) return;
    const fav = isFavEv(e);
    sheet(`<div class="m-sh-head">${compLogo(e.comp, 30)}<div><b>${E(e.comp)}</b><small>${E(sportName(e.sport))} · ${E(A.dayTitle(dk(e), 'en'))} · ${E(t(e))} EAT</small></div></div>
      <h2 class="m-sh-title">${e.home && e.away ? `${A.crest(e.home, 44, e.sport)}<span>${E(e.home)}<br>${E(e.away)}</span>${A.crest(e.away, 44, e.sport)}` : `<span>${E(e.detail)}</span>`}</h2>
      <div class="m-sh-rem">${(() => { const r = A.reminderFor && A.reminderFor(e); if (+new Date(e.start) <= Date.now() && !r) return `<button class="m-rembtn" disabled>${A.remIcon || ''}<span>Started</span></button>`; return `<button class="m-rembtn ${r ? 'on' : ''}" data-act="remind" data-id="${E(e.id)}">${A.remIcon || ''}<span>${r ? 'Cancel Reminder' : 'Set Reminder'}</span></button>`; })()}
        <button class="m-rembtn" data-act="calsheet" data-id="${E(e.id)}"><svg viewBox="0 0 24 24" width="22" height="22"><rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>Add to calendar</span></button></div>
      <h3 class="m-sh-h">Where to watch</h3><div class="m-sh-chs">${e.channels.map((c) => { const u = (A.providerLinks(A.channel(c).provider)[0] || {}).url;
        return `<${u ? `button type="button" data-golink="${E(u)}"` : 'div'} class="m-sh-ch">${chLogo(c)}<span>${E(A.channel(c).name)}${A.channel(c).num ? ` · ${E(A.channel(c).num)}` : ''}</span>${u ? '<i class="m-go">↗</i>' : ''}</${u ? 'button' : 'div'}>`; }).join('')}</div>
      ${A.siteChips(e)}
      ${A.platformRow(e)}
      <div class="m-sh-acts">
        <button class="m-btn" data-act="exportmatch" data-id="${E(e.id)}">Export poster</button>

        <button class="m-btn ghost" data-act="favcomp" data-c="${E(e.comp)}">${FAV.comps.indexOf(e.comp) >= 0 ? '★ League saved' : '☆ Follow league'}</button>
        ${e.home ? `<button class="m-btn ghost" data-act="favteam" data-t="${E(e.home)}">${FAV.teams.indexOf(e.home) >= 0 ? '★' : '☆'} ${E(e.home)}</button>` : ''}
        ${e.away ? `<button class="m-btn ghost" data-act="favteam" data-t="${E(e.away)}">${FAV.teams.indexOf(e.away) >= 0 ? '★' : '☆'} ${E(e.away)}</button>` : ''}
        ${A.orderOfPlay && A.orderOfPlay(e) ? `<a class="m-btn ghost" href="${E(A.orderOfPlay(e))}" target="_blank" rel="noopener">Order of play</a>` : ''}
      </div>${fav ? '' : ''}`);
  }

  /* ---------- Leagues / Teams / Channels ---------- */
  function listItem(icon, label, act, data, sub = '') { return `<button class="m-li" data-act="${act}" ${data}><span class="m-ico">${icon}</span><span>${E(label)}${sub ? `<small>${E(sub)}</small>` : ''}</span><i>${ICON.right}</i></button>`; }
  function section(title, icon, body) { return body ? `<section class="m-sec"><h2>${icon}<span>${E(title)}</span></h2>${body}</section>` : ''; }
  const upcoming = () => base().filter((e) => new Date(e.end) > A.now());
  function drawLeagues() {
    document.getElementById('m-top').innerHTML = top('LEAGUES', `<button class="m-ic" data-act="search">${ICON.search}</button>`);
    document.getElementById('m-sub').innerHTML = '';
    const ev = upcoming(); const n = {}; ev.forEach((e) => { n[e.comp] = (n[e.comp] || 0) + 1; COMP_SPORT[e.comp] = e.sport; });
    const favs = FAV.comps.map((c) => listItem(compLogo(c, 30), c, 'gocomp', `data-c="${E(c)}"`, n[c] ? `${n[c]} upcoming` : 'nothing scheduled')).join('');
    const bySport = {}; Object.keys(n).forEach((c) => (bySport[COMP_SPORT[c]] = bySport[COMP_SPORT[c]] || []).push(c));
    M.lgOpen = M.lgOpen || {};
    let html = section('Favourite leagues', ICON.starOn, favs || '<p class="m-hint">Tap ☆ Follow league on any match to save it here.</p>');
    /* one folding group per sport: tap Football to see Premier League, LaLiga … */
    A.SPORTS.forEach((sp) => {
      const list = (bySport[sp.id] || []).sort((a, b) => n[b] - n[a] || a.localeCompare(b)); if (!list.length) return;
      const open = !!M.lgOpen[sp.id]; const total = list.reduce((t, c) => t + n[c], 0);
      html += `<section class="m-sec m-fold${open ? ' open' : ''}"><button class="m-foldh" data-act="lgfold" data-s="${E(sp.id)}"><span class="m-dot" style="--c:${sp.color}"></span><span>${E(sp.name)}<small>${list.length} league${list.length > 1 ? 's' : ''} · ${total} upcoming</small></span><i>${ICON.right}</i></button>` +
        (open ? list.map((c) => listItem(compLogo(c, 30), c, 'gocomp', `data-c="${E(c)}"`, `${n[c]} upcoming`)).join('') : '') + '</section>';
    });
    document.getElementById('m-main').innerHTML = html;
  }
  function drawTeams() {
    document.getElementById('m-top').innerHTML = top('TEAMS', `<button class="m-ic" data-act="search">${ICON.search}</button>`);
    document.getElementById('m-sub').innerHTML = '';
    const ev = upcoming(); const n = {}; const sp = {};
    ev.forEach((e) => [e.home, e.away].forEach((x) => { if (x && A.teamLogo(x, 'dark', e.sport)) { n[x] = (n[x] || 0) + 1; sp[x] = e.sport; } }));
    const favs = FAV.teams.map((x) => listItem(A.crest(x, 30, sp[x]), x, 'goteam', `data-t="${E(x)}"`)).join('');
    const pop = Object.keys(n).sort((a, b) => n[b] - n[a] || a.localeCompare(b)).slice(0, 120).map((x) => listItem(A.crest(x, 30, sp[x]), x, 'goteam', `data-t="${E(x)}"`, `${n[x]} upcoming · ${sportName(sp[x])}`)).join('');
    document.getElementById('m-main').innerHTML = section('Favourite teams', ICON.starOn, favs || '<p class="m-hint">Tap a match, then ☆ a team to follow it.</p>') + section('Teams on TV this week', '🔥', pop);
  }
  function drawChannels() {
    document.getElementById('m-top').innerHTML = top('CHANNELS');
    document.getElementById('m-sub').innerHTML = '';
    const ev = upcoming(); const n = {}; ev.forEach((e) => e.channels.forEach((c) => (n[c] = (n[c] || 0) + 1)));
    M.chOpen = M.chOpen || {};
    const ORDER = ['supersport', 'espn', 'canalplus', 'startimes', 'azam', 'bein', 'zap'];
    const provs = ORDER.map((id) => A.provider(id)).concat(A.PROVIDERS.filter((p) => ORDER.indexOf(p.id) < 0));
    let html = '';
    provs.forEach((p) => {
      const list = A.channelsOf ? A.channelsOf(p.id) : A.CHANNELS.filter((c) => c.provider === p.id); if (!list.length) return;
      const live = list.reduce((t, c) => t + (n[c.id] || 0), 0); const open = M.chOpen[p.id] !== false && (M.chOpen[p.id] || ORDER.indexOf(p.id) >= 0);
      html += `<section class="m-sec m-fold${open ? ' open' : ''}"><button class="m-foldh" data-act="chfold" data-p="${E(p.id)}"><span>${E(p.name)}<small>${list.length} channel${list.length > 1 ? 's' : ''} · ${live} upcoming</small></span><i>${ICON.right}</i></button>` +
        (open && A.providerLinks(p.id).length ? `<div class="m-sites">${A.providerLinks(p.id).map((l) => `<button type="button" class="m-site" data-golink="${E(l.url)}">${E(l.label)} ↗</button>`).join('')}</div>` : '') +
        (open ? list.map((c) => `<button class="m-li m-chrow" data-act="gochannel" data-c="${E(c.id)}"><span class="m-chlogo">${chLogo(c.id)}</span><span>${E(c.name)}<small>${c.num ? E(c.num) + ' · ' : ''}${n[c.id] ? n[c.id] + ' upcoming' : 'nothing listed this week'}</small></span><i>${ICON.right}</i></button>`).join('') : '') + '</section>';
    });
    document.getElementById('m-main').innerHTML = html;
  }

  /* ---------- More ---------- */
  function drawMore() {
    document.getElementById('m-top').innerHTML = top('MORE');
    document.getElementById('m-sub').innerHTML = '';
    const it = (icon, label, act, sub, color) => `<button class="m-li" data-act="${act}"><span class="m-ico" style="--c:${color}">${icon}</span><span>${E(label)}${sub ? `<small>${E(sub)}</small>` : ''}</span><i>${ICON.right}</i></button>`;
    document.getElementById('m-main').innerHTML = `<section class="m-sec flat">
      ${it(ICON.share, 'Export poster', 'export', 'Day, week, month, sport, league or broadcaster', '#e10a17')}
      ${it(ICON.live, 'Live now', 'livenow', 'Everything on air right now', '#e10a17')}
      ${it(ICON.filter, 'Region, broadcaster & platform', 'filters', 'Show only what you can watch', '#7b61ff')}</section>
      <section class="m-sec flat">
      ${it(ICON.gear, 'Settings, updates & plugins', 'settings', 'Feeds, auto-update, plugins', '#2f80ed')}
      ${it(ICON.info, 'About the app', 'about', 'Version ' + A.version + ' · free, open source, no ads', '#2f80ed')}</section>`;
  }
  function about() {
    const g = A.store.get('liveGuides', null);
    sheet(`<h2 class="m-sh-title"><span>African Sports Broadcast Hub</span></h2>
      <p>Version ${E(A.version)} · times in East Africa Time (EAT, GMT+3).</p>
      <p>Free and open source (MIT). <b>No ads, no subscriptions, no tracking.</b></p>
      <p>Guides update in the background${g ? ` · last check ${E(A.fmtTime(new Date(g.at), 'Africa/Nairobi'))} EAT` : ''}. Rights and schedules can change — check with your broadcaster.</p>`);
  }

  /* ---------- sheet ---------- */
  /* Android back button / browser back: every sheet, dialog and non-home tab is one history step */
  let skipPop = 0; const layer = () => history.pushState({ asbh: Date.now() }, '');
  const unlayer = () => { skipPop++; history.back(); };
  let sheetLayer = false, tabLayer = false;
  /* leaving the Matches tab adds one back step; coming home by any route removes it */
  const syncTabLayer = () => { if (M.tab !== 'matches' && !tabLayer) { layer(); tabLayer = true; } else if (M.tab === 'matches' && tabLayer) { tabLayer = false; unlayer(); } };
  function sheet(html) { const s = document.getElementById('m-sheet'); s.querySelector('.m-sheet-in').innerHTML = `<div class="m-grab"></div>${html}`;
    if (s.hidden && !sheetLayer) { layer(); sheetLayer = true; }
    s.hidden = false; requestAnimationFrame(() => s.classList.add('show')); }
  function closeSheet(fromBack) { const s = document.getElementById('m-sheet'); if (s.hidden) return;
    s.classList.remove('show'); setTimeout(() => (s.hidden = true), 200);
    if (sheetLayer) { sheetLayer = false; if (!fromBack) unlayer(); } }
  A.mSheet = { active: () => isPhone(), open: (html) => sheet(html), close: () => closeSheet() };   // used by calendar-reminders.js
  /* dialogs (export, settings) opened from the phone shell also close with back */
  const dlgLayers = new Set();
  new MutationObserver((ms) => ms.forEach((m) => { const d = m.target; if (!isPhone() || d.tagName !== 'DIALOG') return;
    if (d.open && !dlgLayers.has(d)) { dlgLayers.add(d); layer(); }
    else if (!d.open && dlgLayers.has(d)) { dlgLayers.delete(d); if (!d.__byBack) unlayer(); d.__byBack = false; } }))
    .observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['open'] });
  function filtersSheet() {
    const sel = (id) => document.getElementById(id);
    // reuse the desktop filter form (region, broadcaster, channel, platform, type) inside the sheet
    const form = sel('filter-form'); sheet('<h2 class="m-sh-title"><span>Filters</span></h2><div id="m-filters"></div><button class="m-btn" data-act="closesheet">Show matches</button>');
    sel('m-filters').appendChild(form); form.classList.add('in-sheet');
    const back = () => { sel('filters').appendChild(form); form.classList.remove('in-sheet'); };
    const s = sel('m-sheet'); const obs = new MutationObserver(() => { if (s.hidden) { back(); obs.disconnect(); draw(); } }); obs.observe(s, { attributes: true, attributeFilter: ['hidden'] });
  }

  /* ---------- events ---------- */
  function onClick(ev) {
    const b = ev.target.closest('[data-act],[data-tab]'); if (!b) return;
    if (b.dataset.tab) { const was = M.tab; M.tab = b.dataset.tab;
      draw(); window.scrollTo(0, 0); return; }
    const a = b.dataset.act;
    if (a === 'day' || a === 'week') { M.day = b.dataset.d; if (M.tab !== 'matches') M.tab = 'matches'; closeSheet(); draw(); return; }
    if (a === 'pickdate') { const i = document.getElementById('m-date'); if (ev.target === i) return; if (i.showPicker) try { i.showPicker(); } catch (e) { i.click(); } else i.click(); i.onchange = () => { if (i.value) { M.day = i.value; draw(); } }; return; }
    if (a === 'sport') { M.sport = b.dataset.s; draw(); return; }
    if (a === 'toggle') { M.open[b.dataset.k] = !(M.open[b.dataset.k] !== false); draw(); return; }
    if (a === 'favonly') { M.favOnly = !M.favOnly; draw(); return; }
    if (a === 'clear') { M[b.dataset.k] = ''; draw(); return; }
    if (a === 'search') { const q = prompt('Search team, league or channel', M.q || ''); if (q !== null) { M.q = q.trim(); M.tab = 'matches'; draw(); } return; }
    if (a === 'open') { openMatch(b.dataset.id); return; }
    if (a === 'closesheet') { closeSheet(); return; }
    if (a === 'exportmatch') { closeSheet(); A.openExport({ scope: 'match', match: b.dataset.id, style: 'featured' }); return; }
    if (a === 'remind') { const e = A.data.events.find((x) => x.id === b.dataset.id); if (!e) return; if (A.reminderFor(e)) { A.cancelReminder(e); openMatch(e.id); } else A.openReminder(e); return; }
    if (a === 'calsheet') { const e = A.data.events.find((x) => x.id === b.dataset.id); if (e) A.openCalendar(e); return; }
    if (a === 'ics') { const e = A.data.events.find((x) => x.id === b.dataset.id); if (e) A.saveBlob(new Blob([A.toIcs([e])], { type: 'text/calendar' }), A.slug(e.detail) + '.ics'); return; }
    if (a === 'favcomp') { const c = b.dataset.c; const i = FAV.comps.indexOf(c); i >= 0 ? FAV.comps.splice(i, 1) : FAV.comps.push(c); save(); b.textContent = i >= 0 ? '☆ Follow league' : '★ League saved'; return; }
    if (a === 'favteam') { const x = b.dataset.t; const i = FAV.teams.indexOf(x); i >= 0 ? FAV.teams.splice(i, 1) : FAV.teams.push(x); save(); b.textContent = (i >= 0 ? '☆ ' : '★ ') + x; return; }
    if (a === 'lgfold') { M.lgOpen = M.lgOpen || {}; M.lgOpen[b.dataset.s] = !M.lgOpen[b.dataset.s]; save(); draw(); return; }
    if (a === 'chfold') { M.chOpen = M.chOpen || {}; const id = b.dataset.p; const was = b.parentNode.classList.contains('open'); M.chOpen[id] = !was; save(); draw(); return; }
    if (a === 'gocomp') { M.comp = b.dataset.c; M.team = M.channel = ''; M.tab = 'matches'; M.day = nextDay((e) => e.comp === M.comp); draw(); return; }
    if (a === 'goteam') { M.team = b.dataset.t; M.comp = M.channel = ''; M.tab = 'matches'; M.day = nextDay((e) => [e.home, e.away].indexOf(M.team) >= 0); draw(); return; }
    if (a === 'gochannel') { M.channel = b.dataset.c; M.comp = M.team = ''; M.tab = 'matches'; M.day = nextDay((e) => e.channels.indexOf(M.channel) >= 0); draw(); return; }
    if (a === 'export') { A.openExport(); return; }
    if (a === 'livenow') { M.tab = 'matches'; M.day = today(); M.q = ''; draw(); const g = document.querySelector('.m-row.live'); if (g) g.scrollIntoView({ block: 'center' }); return; }
    if (a === 'filters') { filtersSheet(); return; }
    if (a === 'settings') { A.openSettings(); return; }
    if (a === 'about') { about(); return; }
  }
  const nextDay = (fn) => { const e = upcoming().filter(fn).sort((a, b) => new Date(a.start) - new Date(b.start))[0]; return e ? dk(e) : today(); };

  /* redraw whenever the schedule or filters change */
  A.mobileRefresh = () => { if (isPhone()) draw(); };
  mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
  window.addEventListener('popstate', () => {
    if (skipPop) { skipPop--; return; }
    const d = [...dlgLayers].pop(); if (d) { d.__byBack = true; d.close(); return; }
    const s = document.getElementById('m-sheet'); if (s && !s.hidden) { closeSheet(true); return; }
    if (M.tab !== 'matches') { tabLayer = false; M.tab = 'matches'; draw(); window.scrollTo(0, 0); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isPhone()) { const s = document.getElementById('m-sheet'); if (s && !s.hidden) closeSheet(); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(apply, 0)); else setTimeout(apply, 0);
})(window.ASBH);
