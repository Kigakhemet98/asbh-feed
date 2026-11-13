/* African Sports Broadcast Hub — UI wiring */
(function (A) {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const E = A.esc;

  const saved = A.store.get('ui', {});
  const S = Object.assign({ sport: '', view: 'list', days: 7, type: '', region: '', providers: [], channels: [], platform: '', comp: '', q: '', showGmt: false }, saved);
  S.tz = 'Africa/Nairobi'; S.showGmt = false;   // the hub runs on East Africa Time only
  if (S.platform && !A.streamingPlatform(S.platform)) S.platform = '';
  S.channels = (S.channels || []).filter((c) => A.CHANNELS.some((x) => x.id === c));
  S.from = S.from && saved.fromPinned ? S.from : A.dayKey(A.now(), S.tz);
  const persist = () => A.store.set('ui', Object.assign({}, S, { from: S.from, fromPinned: S.fromPinned }));

  /* ---------- filtering ---------- */
  function inRange(e) {
    const k = A.dayKey(new Date(e.start), S.tz); const end = A.addDaysKey(S.from, +S.days - 1);
    const live = A.isLive(e, A.now());
    return (k >= S.from && k <= end) || (live && S.from === A.dayKey(A.now(), S.tz));
  }
  function matches(e, skip = {}) {
    if (!skip.date && !inRange(e)) return false;
    if (!skip.sport && S.sport && e.sport !== S.sport) return false;
    if (S.type && e.status !== S.type) return false;
    if (S.region && !e.channels.some((c) => { const ch = A.channel(c); return (ch.regions || A.provider(ch.provider).regions || []).indexOf(S.region) >= 0; })) return false;
    if (S.providers.length && !e.channels.some((c) => S.providers.indexOf(A.channel(c).provider) >= 0)) return false;
    if (S.channels.length && !e.channels.some((c) => S.channels.indexOf(c) >= 0)) return false;
    if (S.platform && A.platformsFor(e.channels).indexOf(S.platform) < 0) return false;
    if (!skip.comp && S.comp && e.comp !== S.comp) return false;
    if (S.q) {
      const hay = `${e.comp} ${e.detail} ${A.sport(e.sport).name} ${e.channels.map((c) => A.channel(c).name).join(' ')}`.toLowerCase();
      if (!S.q.toLowerCase().split(/\s+/).every((w) => hay.indexOf(w) >= 0)) return false;
    }
    return true;
  }
  const filtered = () => A.data.events.filter((e) => matches(e));

  /* ---------- rendering ---------- */
  function renderSports() {
    const base = A.data.events.filter((e) => matches(e, { sport: true }));
    const counts = {}; base.forEach((e) => (counts[e.sport] = (counts[e.sport] || 0) + 1));
    const btn = (id, name, color, n) => `<button type="button" data-sport="${id}" aria-pressed="${S.sport === id}" style="--c:${color}">${E(name)}${n != null ? `<span class="n">${n}</span>` : ''}</button>`;
    $('#sports').innerHTML = btn('', 'All sports', '#e10a17', base.length) +
      A.SPORTS.filter((s) => counts[s.id]).map((s) => btn(s.id, s.name, s.color, counts[s.id])).join('') +
      A.SPORTS.filter((s) => !counts[s.id] && s.id !== 'other').map((s) => btn(s.id, s.name, s.color, 0)).join('');
  }
  function renderCompOptions() {
    const comps = [...new Set(A.data.events.filter((e) => matches(e, { comp: true })).map((e) => e.comp))].sort();
    if (S.comp && comps.indexOf(S.comp) < 0) comps.unshift(S.comp);
    $('#f-comp').innerHTML = '<option value="">All competitions</option>' + comps.map((c) => `<option ${c === S.comp ? 'selected' : ''}>${E(c)}</option>`).join('');
  }
  function render() {
    renderSports(); renderCompOptions();
    const evs = filtered(); const ctx = { tz: S.tz, showGmt: S.showGmt, lang: A.store.get('settings', {}).lang || 'en' };
    $$('.tabs button').forEach((b) => b.setAttribute('aria-selected', b.dataset.view === S.view));
    $('#btn-live').classList.toggle('on', S.view === 'live');
    const fn = { table: A.renderTable, list: A.renderList, channels: A.renderChannels, live: A.renderLive }[S.view] || A.renderList;
    /* phone layout: the desktop list is hidden, so don't build it (it held thousands of logo images in memory) */
    if (document.documentElement.classList.contains('m-on')) $('#out').innerHTML = '';
    else $('#out').innerHTML = fn(S.view === 'live' ? A.data.events.filter((e) => matches(e, { date: true })) : evs, ctx);
    const end = A.addDaysKey(S.from, +S.days - 1);
    const nCh = new Set(evs.flatMap((e) => e.channels)).size;
    $('#summary').textContent = S.view === 'live' ? `Live and upcoming · times in ${A.tzShort(S.tz)} (${A.tzOffsetLabel(S.tz)})`
      : `${evs.length} broadcasts on ${nCh} channels · ${A.dayTitle(S.from, ctx.lang)}${+S.days > 1 ? ' – ' + A.dayTitle(end, ctx.lang) : ''} · times in ${A.tzShort(S.tz)} (${A.tzOffsetLabel(S.tz)})`;
    const active = [S.type, S.region, S.comp, S.q, S.platform].filter(Boolean).length + S.providers.length + S.channels.length;
    $('#filter-count').textContent = active ? `(${active})` : '';
    const u = A.data.lastUpdate; $('#updated').textContent = u ? `Schedule updated ${A.fmtTime(u, S.tz)} ${A.tzShort(S.tz)}` : '';
    persist();
    if (A.mobileRefresh) A.mobileRefresh();
  }

  /* ---------- filter controls ---------- */
  function fillStatic() {
    const tzOpts = (sel) => A.TIMEZONES.map((t) => `<option value="${t.id}" ${t.id === sel ? 'selected' : ''}>${E(t.short)} (${E(A.tzOffsetLabel(t.id))}) · ${E(t.label)}</option>`).join('');
    $('#f-region').innerHTML = '<option value="">All regions</option>' + Object.entries(A.REGIONS).map(([k, v]) => `<option value="${k}" ${k === S.region ? 'selected' : ''}>${E(v)}</option>`).join('');
    $('#f-platform').innerHTML = '<option value="">Any platform</option>' + A.PLATFORMS.map((p) => `<option value="${p.id}" ${p.id === S.platform ? 'selected' : ''}>${E(p.name)} (${p.kind === 'tv' ? 'pay-TV' : 'streaming'}${p.countries ? ', ' + E(p.countries) + ' only' : ''}) — carries ${E(p.providers.map((x) => A.provider(x).name).join(', '))}</option>`).join('');
    fillProviders();
    $('#f-from').value = S.from; $('#f-days').value = String(S.days); $('#f-type').value = S.type; $('#f-q').value = S.q;
  }
  function fillProviders() {
    $('#f-provider').innerHTML = A.PROVIDERS.map((p) => `<option value="${p.id}" ${S.providers.indexOf(p.id) >= 0 ? 'selected' : ''}>${E(p.name)}</option>`).join('');
    const chs = A.CHANNELS.filter((c) => !S.providers.length || S.providers.indexOf(c.provider) >= 0);
    const groups = {}; chs.forEach((c) => (groups[c.provider] = groups[c.provider] || []).push(c));
    $('#f-channel').innerHTML = Object.keys(groups).map((pid) => `<optgroup label="${E(A.provider(pid).name)}">${groups[pid].map((c) => {
      const sp = A.sportsFor ? A.sportsFor(c.id) : [];
      const LN = { en: 'EN', pt: 'PT', sw: 'Swahili', fr: 'FR', ar: 'AR' };
      const label = c.name + (c.num ? ' (' + c.num + ')' : '') + (c.langs ? ' [' + c.langs.map((l) => LN[l] || l).join('/') + ']' : '') + (c.countries ? ' — ' + c.countries + ' only' : '') + (c.streamOnly ? ' — DStv Stream only' : '') + (sp.length ? ' — ' + sp.join(' · ') : '');
      return `<option value="${c.id}" ${S.channels.indexOf(c.id) >= 0 ? 'selected' : ''}>${E(label)}</option>`; }).join('')}</optgroup>`).join('');
  }
  const multi = (sel) => [...$(sel).selectedOptions].map((o) => o.value);

  function bind() {
    $('#sports').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; S.sport = b.dataset.sport; S.comp = ''; if (S.view === 'live') S.view = 'list'; render(); };
    $$('.tabs button').forEach((b) => (b.onclick = () => { S.view = b.dataset.view; render(); }));
    $('#btn-live').onclick = () => { S.view = S.view === 'live' ? 'list' : 'live'; render(); };
    $('#f-from').onchange = (e) => { S.from = e.target.value || A.dayKey(A.now(), S.tz); S.fromPinned = S.from !== A.dayKey(A.now(), S.tz); render(); };
    $('#f-days').onchange = (e) => { S.days = +e.target.value; render(); };
    $('#f-type').onchange = (e) => { S.type = e.target.value; render(); };
    $('#f-region').onchange = (e) => { S.region = e.target.value; render(); };
    $('#f-provider').onchange = () => { S.providers = multi('#f-provider'); S.channels = S.channels.filter((c) => !S.providers.length || S.providers.indexOf(A.channel(c).provider) >= 0); fillProviders(); render(); };
    $('#f-channel').onchange = () => { S.channels = multi('#f-channel'); render(); };
    $('#f-platform').onchange = (e) => { S.platform = e.target.value; render(); };
    $('#f-comp').onchange = (e) => { S.comp = e.target.value; render(); };
    let qt; $('#f-q').oninput = (e) => { clearTimeout(qt); qt = setTimeout(() => { S.q = e.target.value.trim(); render(); }, 180); };
    $('#f-reset').onclick = () => { Object.assign(S, { sport: '', type: '', region: '', providers: [], channels: [], platform: '', comp: '', q: '', days: 7, from: A.dayKey(A.now(), S.tz), fromPinned: false }); fillStatic(); render(); };
    $('.quick').onclick = (e) => {
      const q = e.target.dataset.q; if (!q) return; const today = A.dayKey(A.now(), S.tz);
      const wd = new Date(today + 'T12:00:00Z').getUTCDay();
      if (q === 'today') { S.from = today; S.days = 1; }
      if (q === 'tomorrow') { S.from = A.addDaysKey(today, 1); S.days = 1; }
      if (q === 'weekend') { const toSat = (6 - wd + 7) % 7; S.from = wd === 0 ? today : A.addDaysKey(today, toSat); S.days = wd === 0 ? 1 : 2; }
      if (q === 'week') { S.from = today; S.days = 7; }
      S.fromPinned = S.from !== today; $('#f-from').value = S.from; $('#f-days').value = String(S.days); render();
    };
    $('#filters-toggle').onclick = () => { const f = $('#filters'); f.classList.toggle('open'); $('#filters-toggle').setAttribute('aria-expanded', f.classList.contains('open')); };
    $$('.prints button').forEach((b) => (b.onclick = () => {
      if (A.PREVIEW) { S.view = b.dataset.print; render(); toast('Printing works on the website and in the apps (switched off in this preview)'); return; } const v = S.view; S.view = b.dataset.print; render(); setTimeout(() => { window.print(); S.view = v; render(); }, 60); }));
    $('#out').onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return; const id = b.closest('[data-id]').dataset.id; const ev = A.data.events.find((x) => x.id === id);
      if (b.dataset.act === 'star') { const on = A.toggleStar(id); b.textContent = on ? '★' : '☆'; toast(on ? 'Will be featured on highlight posters' : 'Removed from highlights'); }
      if (b.dataset.act === 'ics') A.openCalendar(ev);
      if (b.dataset.act === 'remind') A.openReminder(ev);
      if (b.dataset.act === 'export-match') openExport({ scope: 'match', match: id, style: 'featured' });
    };
    $('#btn-export').onclick = () => openExport({});
    $('#btn-settings').onclick = openSettings;
    const setTop = () => document.documentElement.style.setProperty('--topH', $('.top').offsetHeight + 'px');
    window.addEventListener('resize', setTop); setTop();
  }

  /* ---------- export dialog ---------- */
  let canvases = []; let bgData = null;
  function openExport(pre) {
    pre = pre && typeof pre === "object" && !(pre instanceof Event) ? pre : {};
    const st = A.store.get('settings', {}); const x = A.store.get('export', {});
    const tzOpts = (sel) => A.TIMEZONES.map((t) => `<option value="${t.id}" ${t.id === sel ? 'selected' : ''}>${E(t.short)} (${E(A.tzOffsetLabel(t.id))}) · ${E(t.label)}</option>`).join('');
    $('#x-prov').innerHTML = '<option value="">All broadcasters</option>' + A.PROVIDERS.map((p) => `<option value="${p.id}" ${p.id === x.prov ? 'selected' : ''}>${E(p.name)}</option>`).join('');
    $('#x-size').innerHTML = Object.entries(A.EXPORT_SIZES).map(([k, v]) => `<option value="${k}" ${k === (x.size || 'portrait') ? 'selected' : ''}>${v}</option>`).join('');
    $('#x-lang').innerHTML = Object.entries(A.LANGS).map(([k, v]) => `<option value="${k}" ${k === (x.lang || st.lang || 'en') ? 'selected' : ''}>${v}</option>`).join('');
    const cols = (x.cols2 || []).filter((id) => A.PROVIDERS.some((p) => p.id === id));
    $('#x-cols').innerHTML = A.PROVIDERS.map((p) => `<option value="${p.id}" ${cols.indexOf(p.id) >= 0 ? 'selected' : ''}>${E(p.name)}</option>`).join('');
    $('#x-sport').innerHTML = A.SPORTS.map((s) => `<option value="${s.id}" ${s.id === (S.sport || 'football') ? 'selected' : ''}>${E(s.name)}</option>`).join('');
    const pool = A.data.events.filter((e) => matches(e, { sport: true, comp: true }));
    $('#x-comp').innerHTML = [...new Set(pool.map((e) => e.comp))].sort().map((c) => `<option ${c === S.comp ? 'selected' : ''}>${E(c)}</option>`).join('');
    const mpool = filtered().length ? filtered() : A.data.events;
    $('#x-match').innerHTML = mpool.map((e) => `<option value="${E(e.id)}" ${e.id === pre.match ? 'selected' : ''}>${E(A.dayTitle(A.dayKey(new Date(e.start), S.tz)).split(' ').slice(0, 3).join(' '))} ${A.fmtTime(new Date(e.start), S.tz)} · ${E(e.detail)} (${E(e.comp)})</option>`).join('');
    if (pre.match && !mpool.some((e) => e.id === pre.match)) { const ev = A.data.events.find((e) => e.id === pre.match); if (ev) $('#x-match').insertAdjacentHTML('afterbegin', `<option value="${E(ev.id)}" selected>${E(ev.detail)}</option>`); }
    $('#x-day').value = S.from; $('#x-footer').value = x.footer || ''; $('#x-theme').value = x.theme === 'white' ? 'white' : 'black';
    $('#x-scope').value = pre.scope || x.scope || 'results'; $('#x-style').value = pre.style || (x.style === 'featured' ? 'cards' : x.style) || 'cards';
    scopeUi(); $('#x-preview').innerHTML = ''; $('#x-dl').disabled = true; $('#x-share').hidden = true; canvases = [];
    $('#dlg-export').showModal();
    if (pre.scope === 'match') renderExport();
  }
  function scopeUi() {
    const sc = $('#x-scope').value;
    $('#x-day-l').hidden = !(sc === 'day' || sc === 'week' || sc === 'month'); $('#x-bg-l').hidden = $('#x-style').value !== 'clean'; $('#x-sport-l').hidden = sc !== 'sport'; $('#x-comp-l').hidden = sc !== 'comp'; $('#x-match-l').hidden = sc !== 'match';
    if (sc === 'match') $('#x-style').value = 'featured'; else if ($('#x-style').value === 'featured') $('#x-style').value = 'cards';
    $('#x-bg-l').hidden = $('#x-style').value !== 'clean';
  }
  function exportEvents() {
    const sc = $('#x-scope').value; const tz = 'Africa/Nairobi';
    if (sc === 'match') return A.data.events.filter((e) => e.id === $('#x-match').value);
    if (sc === 'day' || sc === 'week' || sc === 'month') {
      let from = $('#x-day').value || S.from; let to = A.addDaysKey(from, sc === 'day' ? 0 : 6);
      if (sc === 'month') { from = from.slice(0, 8) + '01'; const [y, m] = from.split('-').map(Number); to = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10); }
      return A.data.events.filter((e) => { const k = A.dayKey(new Date(e.start), tz); return k >= from && k <= to && matches(e, { date: true }); });
    }
    if (sc === 'sport') return A.data.events.filter((e) => e.sport === $('#x-sport').value && matches(e, { sport: true }));
    if (sc === 'comp') return A.data.events.filter((e) => e.comp === $('#x-comp').value && matches(e, { comp: true, sport: true }));
    return filtered();
  }
  async function renderExport() {
    const prov = $('#x-prov').value; const ofProv = (c) => A.channel(c).provider === prov;
    let evs = exportEvents(); const prev = $('#x-preview');
    if (prov) evs = evs.filter((e) => e.channels.some(ofProv)).map((e) => Object.assign({}, e, { channels: e.channels.filter(ofProv) }));
    if (!evs.length) { prev.innerHTML = '<p class="empty">Nothing to export for this choice.</p>'; return; }
    const sc = $('#x-scope').value;
    const o = { style: $('#x-style').value, size: $('#x-size').value, tz: 'Africa/Nairobi', tz2: 'Africa/Nairobi', lang: $('#x-lang').value,
      columns: multi('#x-cols'), footerText: $('#x-footer').value.trim(), trim: $('#x-trim').checked, theme: $('#x-theme').value || 'black', logoBg: $('#x-logobg').value || undefined, bgImage: $('#x-style').value === 'clean' ? bgData : undefined, scope: sc,
      title: [prov ? A.provider(prov).name : '', sc === 'sport' ? A.sport($('#x-sport').value).name : sc === 'comp' ? $('#x-comp').value : ''].filter(Boolean).join(' · ') };
    A.store.set('export', { prov, tz: o.tz, tz2: o.tz2, size: o.size, lang: o.lang, cols2: o.columns, footer: o.footerText, style: o.style, scope: sc, theme: o.theme });
    prev.innerHTML = '<p class="hint">Rendering…</p>';
    try {
      await Promise.all(['500', '600', '700', '800', 'italic 700', 'italic 800'].map((w) => document.fonts.load(`${w} 20px "Barlow Condensed"`)));
    } catch (e) { /* fall back to system fonts */ }
    canvases = await A.renderPosters(evs, o);
    prev.innerHTML = '';
    canvases.forEach((c) => { if (A.PREVIEW) { const i = new Image(); i.src = c.toDataURL('image/png'); i.alt = 'Poster preview'; prev.appendChild(i); } else prev.appendChild(c); });
    if (A.PREVIEW) prev.insertAdjacentHTML('afterbegin', '<p class="hint" style="grid-column:1/-1">Preview mode: saving files is switched off here. Downloads work on the website and in the Android and Windows apps.</p>');
    $('#x-dl').disabled = !!A.PREVIEW; $('#x-dl').textContent = canvases.length > 1 ? `Download ${canvases.length} PNGs` : 'Download PNG';
    $('#x-share').hidden = !(navigator.canShare && A.platform === 'web');
  }
  function exportName(i) {
    const sc = $('#x-scope').value; const tag = sc === 'match' ? A.slug(($('#x-match').selectedOptions[0] || {}).textContent || 'match').slice(0, 50)
      : sc === 'sport' ? $('#x-sport').value : sc === 'comp' ? A.slug($('#x-comp').value) : ($('#x-day').value || S.from);
    return `asbh-${$('#x-prov').value ? $('#x-prov').value + '-' : ''}${sc}-${tag}${canvases.length > 1 ? '-p' + (i + 1) : ''}.png`;
  }
  function bindExport() {
    $('#x-scope').onchange = scopeUi; $('#x-render').onclick = renderExport;
    $('#x-style').onchange = () => { const st = $('#x-style').value; const sc = $('#x-scope').value;
      if (st === 'week' && sc !== 'month') $('#x-scope').value = 'week'; if (st === 'month') $('#x-scope').value = 'month';
      if (st === 'clean' && !['week', 'month'].includes(sc)) $('#x-scope').value = 'week'; scopeUi(); };
    $('#x-bg').onchange = (e) => { const f = e.target.files[0]; if (!f) { bgData = null; return; } const r = new FileReader(); r.onload = () => { bgData = r.result; }; r.readAsDataURL(f); };
    $('#x-dl').onclick = async () => { for (let i = 0; i < canvases.length; i++) await A.saveBlob(await A.canvasBlob(canvases[i]), exportName(i)); toast('Poster saved'); };
    $('#x-share').onclick = async () => {
      const files = await Promise.all(canvases.map(async (c, i) => new File([await A.canvasBlob(c)], exportName(i), { type: 'image/png' })));
      if (navigator.canShare({ files })) navigator.share({ files, title: 'African Sports Broadcast Hub' }).catch(() => {});
    };
  }

  /* ---------- settings ---------- */
  function openSettings() {
    const st = A.store.get('settings', {});
    $('#s-feeds').value = (st.feeds || A.DEFAULT_FEEDS).join('\n'); $('#s-refresh').value = String(st.refreshMinutes == null ? 15 : st.refreshMinutes);
    renderPlugins(); $('#s-errors').textContent = A.data.errors.join('\n'); $('#dlg-settings').showModal();
  }
  function renderPlugins() {
    $('#s-plugins').innerHTML = A.plugins.list().map((p) => `<li><input type="checkbox" data-pl="${E(p.id)}" ${p.enabled ? 'checked' : ''} aria-label="Enable ${E(p.name)}">
      <div><b>${E(p.name)}</b> <small>${E(p.version)}${p.builtin ? ' · built in' : ''}</small><small>${E(p.description)}</small></div></li>`).join('');
  }
  function bindSettings() {
    $('#s-plugins').onchange = (e) => { const id = e.target.dataset.pl; if (!id) return; A.plugins.setEnabled(id, e.target.checked); A.refresh(); };
    $('#s-save').onclick = async () => {
      const st = A.store.get('settings', {}); st.feeds = $('#s-feeds').value.split(/\s+/).filter(Boolean); st.refreshMinutes = +$('#s-refresh').value;
      A.store.set('settings', st); A.startAutoRefresh(); await A.refresh(); $('#s-errors').textContent = A.data.errors.join('\n') || 'Up to date.';
    };
    $('#s-import').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try { const n = A.importText(await f.text(), f.name); await A.refresh(); toast(`Imported ${n} broadcasts from ${f.name}`); fillProviders(); }
      catch (err) { $('#s-errors').textContent = 'Import failed: ' + err.message; }
    };
    $('#s-clear').onclick = async () => { A.store.set('imported', []); await A.refresh(); toast('Imported schedules cleared'); };
    $('#s-ics').onclick = () => A.saveBlob(new Blob([A.toIcs(filtered())], { type: 'text/calendar' }), 'asbh-schedule.ics');
    $('#s-plugin-add').onclick = async () => {
      const url = $('#s-plugin-url').value.trim(); if (!url) return;
      try { await A.plugins.loadUrl(url); const st = A.store.get('settings', {}); st.pluginUrls = [...new Set([...(st.pluginUrls || []), url])]; A.store.set('settings', st); renderPlugins(); await A.refresh(); toast('Plugin loaded'); }
      catch (err) { $('#s-errors').textContent = err.message; }
    };
  }

  /* ---------- toast ---------- */
  let tt; function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 3200); }
  A.toast = toast;

  /* ---------- boot ---------- */
  A.on('data', ({ changed }) => { fillProviders(); render(); if (changed) toast('Schedule updated — channel or time changes applied'); });
  A.on('plugins', () => { if ($('#dlg-settings').open) renderPlugins(); });
  A.on('reminders', () => render());

  async function boot() {
    fillStatic(); bind(); bindExport(); bindSettings();
    const st = A.store.get('settings', {});
    for (const u of st.pluginUrls || []) { try { await A.plugins.loadUrl(u); } catch (e) { A.data.errors.push(e.message); } }
    await A.refresh(); A.startAutoRefresh();
    setInterval(() => { if (S.view === 'live') render(); }, 60000);
    if ('serviceWorker' in navigator && /^https?:/.test(location.protocol) && A.platform === 'web' && !A.NO_SW) {
      try { navigator.serviceWorker.register('sw.js'); } catch (e) { /* sandboxed */ }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  Object.assign(A, { ui: S, render, openExport, openSettings, matchesFilters: matches });
})(window.ASBH);
