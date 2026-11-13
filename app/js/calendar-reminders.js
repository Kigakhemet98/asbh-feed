/* Calendars and match reminders (Windows app, Android app, website).
 *
 * Add to calendar: Google Calendar, Outlook.com, Microsoft 365, Apple / iCloud (.ics), the phone's own
 * calendar app (Android), or a plain .ics file. Subscribe: calendar feeds on GitHub that update themselves
 * from the live TV guides (all live sport, or one sport).
 *
 * Reminders (like the DStv guide): 1, 5, 10 or 30 minutes before kick-off.
 *   Android  → window.ASBHReminders (AlarmManager notification, also when the app is closed / after a restart)
 *   Windows  → window.asbhRem (Windows notification; the app keeps running in the tray while reminders wait)
 *   Website  → browser notification while the page is open
 * A reminder follows its match: when the guides move the kick-off, the reminder moves with it. */
(function (A) {
  'use strict';
  const E = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const KEY = 'reminders';
  const FEED_BASE = 'https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/';
  const OPTIONS = [1, 5, 10, 30];
  const nativeAndroid = () => !!window.ASBHReminders;
  const nativeWin = () => !!window.asbhRem;

  /* ---------- helpers ---------- */
  const tz = 'Africa/Nairobi';
  const hm = (d) => new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
  const dayLabel = (d) => {
    const k = A.dayKey(new Date(d), tz); const today = A.dayKey(A.now ? A.now() : new Date(), tz);
    const pre = k === today ? 'Today, ' : k === A.addDaysKey(today, 1) ? 'Tomorrow, ' : '';
    return pre + new Date(d).toLocaleDateString('en-GB', { weekday: pre ? undefined : 'short', day: 'numeric', month: 'short', year: '2-digit', timeZone: tz }).replace(/ (\d\d)$/, " '$1");
  };
  const chanList = (e) => [...new Set(e.channels || [])].filter((c) => !/-tbc$/.test(c)).map((c) => { const ch = A.channel(c); return ch.name + (ch.num ? ' (' + ch.num + ')' : ''); });
  const endOf = (e) => e.end || new Date(+new Date(e.start) + 120 * 6e4).toISOString();
  const title = (e) => e.detail + (e.comp ? ' · ' + e.comp : '');
  const describe = (e) => `${e.comp || ''}\nLIVE on: ${chanList(e).join(', ') || 'channel to be announced'}\n\nFrom African Sports Broadcast Hub`.trim();
  const slug = (s) => A.slug ? A.slug(s) : String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  /* the same match keeps its key when the guides change its time or channels */
  const sidesOf = (e) => { if (e.home && e.away) return [e.home, e.away]; const m = / v(?:s\.?)? | @ /i.exec(e.detail || ''); return m ? [e.detail.slice(0, m.index), e.detail.slice(m.index + m[0].length)] : null; };
  A.remKey = (e) => { const s = sidesOf(e); return 'r-' + slug(e.sport + '-' + (s ? s.map(slug).sort().join('-') : e.detail) + '-' + String(e.comp || '').split('·')[0]).slice(0, 90); };

  let toastEl = null; let toastT = 0;
  A.remToast = (msg) => {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'rem-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 4200);
  };

  /* ---------- bottom sheet (shared by desktop and phone) ---------- */
  let sheetEl = null; let handler = null;
  const phone = () => !!(A.mSheet && A.mSheet.active());
  function sheet(html, onClick) {
    handler = onClick;
    if (phone()) { A.mSheet.open(`<div class="rem-in-m">${html}</div>`); return; }   // the phone sheet already handles the back button
    close(true);
    sheetEl = document.createElement('div'); sheetEl.className = 'rem-sheet'; sheetEl.innerHTML = `<div class="rem-sheet-in" role="dialog" aria-modal="true"><div class="rem-grab"></div>${html}</div>`;
    sheetEl.addEventListener('click', (ev) => { if (ev.target === sheetEl) close(); });
    document.body.appendChild(sheetEl); requestAnimationFrame(() => sheetEl && sheetEl.classList.add('in'));
  }
  function close(keepHandler) {
    if (!keepHandler) handler = null;
    if (phone()) { A.mSheet.close(); return; }
    if (!sheetEl) return; const s = sheetEl; sheetEl = null; s.classList.remove('in'); setTimeout(() => s.remove(), 220);
  }
  document.addEventListener('click', (ev) => { const b = ev.target.closest('.rem-sheet [data-r], #m-sheet [data-r]'); if (b && handler) { ev.preventDefault(); handler(b.dataset.r, b, ev); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  /* ---------- open a link outside the app ---------- */
  function openOut(url) {
    if (nativeAndroid() && window.ASBHReminders.openUrl) { if (!window.ASBHReminders.openUrl(url)) A.remToast('No app on this phone can open that link'); return; }
    const w = window.open(url, '_blank', 'noopener'); if (!w && !nativeWin()) location.href = url;
  }

  A.openOut = openOut;
  /* any element with data-golink opens that site (broadcaster badges, "Broadcaster sites" chips, Channels tab) */
  document.addEventListener('click', (ev) => { const g = ev.target.closest('[data-golink]'); if (!g) return;
    ev.preventDefault(); ev.stopPropagation(); openOut(g.getAttribute('data-golink')); }, true);
  document.addEventListener('keydown', (ev) => { if (ev.key !== 'Enter') return; const g = ev.target.closest && ev.target.closest('[data-golink]'); if (g) { ev.preventDefault(); openOut(g.getAttribute('data-golink')); } });

  /* ---------- calendars ---------- */
  const stamp = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  A.toIcs = (evs, name) => {
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//African Sports Broadcast Hub//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
    if (name) L.push('X-WR-CALNAME:' + esc(name));
    evs.forEach((e) => L.push('BEGIN:VEVENT', 'UID:' + A.remKey(e) + '-' + A.dayKey(new Date(e.start), tz) + '@asbh', 'DTSTAMP:' + stamp(new Date()), 'DTSTART:' + stamp(e.start), 'DTEND:' + stamp(endOf(e)),
      'SUMMARY:' + esc(title(e)), 'DESCRIPTION:' + esc(describe(e)), 'LOCATION:' + esc(chanList(e).join(' · ') || 'TBA'), 'CATEGORIES:' + esc(A.sport(e.sport).name),
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc(e.detail), 'TRIGGER:-PT10M', 'END:VALARM', 'END:VEVENT'));
    L.push('END:VCALENDAR'); return L.join('\r\n') + '\r\n';
  };
  const links = (e) => {
    const q = (o) => Object.entries(o).map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&');
    const s = new Date(e.start).toISOString(), en = new Date(endOf(e)).toISOString();
    const ms = { subject: title(e), startdt: s, enddt: en, body: describe(e), location: chanList(e).join(' · '), allday: 'false', path: '/calendar/action/compose', rru: 'addevent' };
    return {
      google: 'https://calendar.google.com/calendar/render?' + q({ action: 'TEMPLATE', text: title(e), dates: stamp(s) + '/' + stamp(en), details: describe(e), location: chanList(e).join(' · '), ctz: tz }),
      outlook: 'https://outlook.live.com/calendar/0/action/compose?' + q(ms),
      office: 'https://outlook.office.com/calendar/0/action/compose?' + q(ms)
    };
  };
  const subs = (file, name) => {
    const https = FEED_BASE + file; const webcal = https.replace(/^https:/, 'webcal:');
    return { google: 'https://calendar.google.com/calendar/r?cid=' + encodeURIComponent(webcal), outlook: 'https://outlook.live.com/calendar/0/addfromweb?url=' + encodeURIComponent(https) + '&name=' + encodeURIComponent(name),
      office: 'https://outlook.office.com/calendar/0/addfromweb?url=' + encodeURIComponent(https) + '&name=' + encodeURIComponent(name), apple: webcal, https };
  };
  const ICO = {
    google: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3" fill="#fff"/><path d="M3 9h18" stroke="#4285f4" stroke-width="2"/><text x="12" y="18.5" font-size="8" font-weight="700" text-anchor="middle" fill="#4285f4" font-family="Arial">31</text></svg>',
    outlook: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" fill="#0a64d6"/><circle cx="9" cy="12" r="3.6" fill="none" stroke="#fff" stroke-width="2"/><path d="M14 8h6M14 12h6M14 16h6" stroke="#fff" stroke-width="1.6"/></svg>',
    office: '<svg viewBox="0 0 24 24"><path d="M4 6l10-3 6 2v14l-6 2-10-3z" fill="#d83b01"/><path d="M14 3v18" stroke="#fff" stroke-width="1.5"/></svg>',
    apple: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="4" fill="#fff"/><path d="M3 9h18" stroke="#ff3b30" stroke-width="3"/><text x="12" y="18.5" font-size="8" font-weight="700" text-anchor="middle" fill="#111" font-family="Arial">ICS</text></svg>',
    phone: '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3" fill="none" stroke="#fff" stroke-width="2"/><path d="M9 8h6M9 12h6" stroke="#fff" stroke-width="2"/></svg>',
    file: '<svg viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6z" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 10v7m-3-3l3 3 3-3" stroke="#fff" stroke-width="2" fill="none"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };
  A.remIcon = ICO.clock;
  const opt = (r, icon, label, sub) => `<button class="rem-opt" data-r="${r}"><span class="rem-ic">${icon}</span><span>${E(label)}${sub ? `<small>${E(sub)}</small>` : ''}</span></button>`;

  A.openCalendar = (e) => {
    if (!e) return; const L = links(e); const sp = A.sport(e.sport);
    const all = subs('calendar.ics', 'Live sport · African TV'); const one = subs('calendars/' + e.sport + '.ics', 'Live ' + sp.name + ' · African TV');
    sheet(`<h2 class="rem-h">Add to calendar</h2><p class="rem-sub">${E(e.detail)} · ${E(dayLabel(e.start))} ${E(hm(e.start))} EAT</p>
      <div class="rem-list">
        ${nativeAndroid() ? opt('phone', ICO.phone, 'Phone calendar', 'Opens your calendar app with the match filled in') : ''}
        ${opt('google', ICO.google, 'Google Calendar')}
        ${opt('outlook', ICO.outlook, 'Outlook.com / Hotmail')}
        ${opt('office', ICO.office, 'Microsoft 365 (work or school)')}
        ${opt('apple', ICO.apple, 'Apple Calendar / iCloud', 'Downloads an .ics file – open it to add')}
        ${opt('file', ICO.file, 'Download .ics file', 'Any calendar app')}
      </div>
      <h3 class="rem-h3">Subscribe – updates by itself</h3><p class="rem-sub">Every live ${E(sp.name.toLowerCase())} broadcast on African TV, refreshed from the live guides several times a day.</p>
      <div class="rem-chips">
        <button class="rem-chip" data-r="sub:google:one">Google</button><button class="rem-chip" data-r="sub:outlook:one">Outlook</button><button class="rem-chip" data-r="sub:apple:one">Apple / iCloud</button><button class="rem-chip" data-r="sub:copy:one">Copy link</button>
      </div>
      <p class="rem-sub">All live sport:</p>
      <div class="rem-chips">
        <button class="rem-chip" data-r="sub:google:all">Google</button><button class="rem-chip" data-r="sub:outlook:all">Outlook</button><button class="rem-chip" data-r="sub:apple:all">Apple / iCloud</button><button class="rem-chip" data-r="sub:copy:all">Copy link</button>
      </div>`, (r) => {
      const file = A.slug(e.detail) + '.ics';
      if (r === 'phone') { if (!window.ASBHReminders.addToCalendar(title(e), String(+new Date(e.start)), String(+new Date(endOf(e))), describe(e), chanList(e).join(' · '))) A.remToast('No calendar app found on this phone'); close(); return; }
      if (r === 'google' || r === 'outlook' || r === 'office') { openOut(L[r]); close(); return; }
      if (r === 'apple' || r === 'file') { A.saveBlob(new Blob([A.toIcs([e])], { type: 'text/calendar' }), file); close(); A.remToast(nativeAndroid() ? 'Saved to Downloads/ASBH – open it to add to your calendar' : 'Calendar file saved – open it to add the match'); return; }
      if (r.startsWith('sub:')) {
        const [, kind, which] = r.split(':'); const s = which === 'all' ? all : one;
        if (kind === 'copy') { (navigator.clipboard ? navigator.clipboard.writeText(s.https) : Promise.reject()).then(() => A.remToast('Calendar link copied – paste it into “Add calendar from URL”'), () => prompt('Calendar link', s.https)); return; }
        openOut(kind === 'apple' ? s.apple : s[kind]); close();
      }
    });
  };

  /* ---------- reminders ---------- */
  const store = () => A.store.get(KEY, {});
  const put = (o) => A.store.set(KEY, o);
  A.reminderFor = (e) => (e ? store()[A.remKey(e)] || null : null);
  function body(rec) { return `Starts at ${hm(rec.start)} EAT${rec.minutes ? ` (in ${rec.minutes} min)` : ''} · ${rec.chans.length ? rec.chans.join(', ') : 'channel to be announced'}`; }
  const webTimers = new Map();
  async function arm(rec) {
    const at = +new Date(rec.start) - rec.minutes * 6e4; const t = rec.detail;
    if (nativeAndroid()) return String(window.ASBHReminders.schedule(rec.key, String(at), t, body(rec)));
    if (nativeWin()) return String(await window.asbhRem.set({ id: rec.key, at, title: t, body: body(rec) }));
    clearTimeout(webTimers.get(rec.key));
    if (at <= Date.now()) return 'past';
    if ('Notification' in window && Notification.permission === 'default') { try { await Notification.requestPermission(); } catch (e) { /* ignore */ } }
    webTimers.set(rec.key, setTimeout(() => { try { new Notification(t, { body: body(rec), icon: 'icons/icon-512.png' }); } catch (e) { A.remToast(t + ' – ' + body(rec)); } const s = store(); delete s[rec.key]; put(s); A.emit && A.emit('reminders', {}); }, Math.min(at - Date.now(), 2 ** 31 - 1)));
    return 'page';
  }
  function disarm(key) {
    if (nativeAndroid()) window.ASBHReminders.cancel(key);
    else if (nativeWin()) window.asbhRem.cancel(key);
    else { clearTimeout(webTimers.get(key)); webTimers.delete(key); }
  }
  A.setReminder = async (e, minutes) => {
    const rec = { key: A.remKey(e), id: e.id, start: e.start, minutes, detail: e.detail, comp: e.comp || '', sport: e.sport, chans: chanList(e) };
    if (+new Date(e.start) - minutes * 6e4 <= Date.now()) { A.remToast(+new Date(e.start) <= Date.now() ? 'This match has already started' : `It starts in less than ${minutes} minute${minutes > 1 ? 's' : ''} – pick a shorter time`); return false; }
    const s = store(); s[rec.key] = rec; put(s);
    const how = await arm(rec);
    A.remToast(`You will be reminded about ${rec.detail} ${minutes} minute${minutes > 1 ? 's' : ''} before it starts.`);
    if (how === 'inexact' && nativeAndroid() && window.ASBHReminders.openExactSettings) setTimeout(() => A.remToast('Tip: allow “Alarms & reminders” for Sports Hub so reminders are on the minute'), 4400);
    if (how === 'page') setTimeout(() => A.remToast('Keep this page open for the reminder – the Windows and Android apps remind you even when closed'), 4400);
    A.emit && A.emit('reminders', {});
    return true;
  };
  A.cancelReminder = (e) => {
    const s = store(); const k = A.remKey(e); if (!s[k]) return; delete s[k]; put(s); disarm(k);
    A.remToast(`Reminder for ${e.detail} cancelled.`); A.emit && A.emit('reminders', {});
  };

  A.openReminder = (e) => {
    if (!e) return; const rec = A.reminderFor(e);
    const ch = (e.channels || []).filter((c) => !/-tbc$/.test(c))[0];
    const head = `<div class="rem-ev">${ch ? `<span class="rem-chlogo">${A.badge(ch)}</span>` : ''}<span class="rem-num">${E(ch ? (A.channel(ch).num || '').split('·')[0] : '')}</span><span class="rem-when"><b>${E(dayLabel(e.start))}</b> ${E(hm(e.start))} – ${E(hm(endOf(e)))}</span></div><h2 class="rem-title">${E(e.detail)}</h2><p class="rem-sub">${E(e.comp || '')}</p>`;
    if (rec) {
      sheet(`${head}<p class="rem-on">${A.remIcon} Reminder set · ${rec.minutes} minute${rec.minutes > 1 ? 's' : ''} before</p>
        <div class="rem-list">${OPTIONS.filter((m) => m !== rec.minutes).map((m) => `<button class="rem-opt plain" data-r="m${m}">Change to ${m} minute${m > 1 ? 's' : ''} before</button>`).join('')}
        <button class="rem-opt plain danger" data-r="cancel">${A.remIcon} Cancel Reminder</button></div>`,
      async (r) => { if (r === 'cancel') { A.cancelReminder(e); close(); return; } if (r[0] === 'm') { close(); await A.setReminder(e, +r.slice(1)); } });
      return;
    }
    sheet(`${head}<h3 class="rem-h">Set Reminder</h3><p class="rem-sub">When would you like to be reminded?</p>
      <div class="rem-list">${OPTIONS.map((m) => `<button class="rem-opt plain" data-r="m${m}">${m} Minute${m > 1 ? 's' : ''} before</button>`).join('')}</div>`,
    async (r) => { close(); await A.setReminder(e, +r.slice(1)); });
  };

  /* ---------- keep reminders on their match ---------- */
  A.on && A.on('data', () => {
    const s = store(); let changed = false; const now = Date.now();
    for (const [k, rec] of Object.entries(s)) {
      if (+new Date(rec.start) < now - 3 * 3600e3) { delete s[k]; changed = true; continue; }
      const cands = (A.data.events || []).filter((e) => A.remKey(e) === k);
      if (!cands.length) continue;
      const ev = cands.sort((a, b) => Math.abs(+new Date(a.start) - +new Date(rec.start)) - Math.abs(+new Date(b.start) - +new Date(rec.start)))[0];
      if (Math.abs(+new Date(ev.start) - +new Date(rec.start)) > 4 * 864e5) continue;
      const chans = chanList(ev);
      if (ev.start !== rec.start || chans.join() !== rec.chans.join()) {
        const moved = ev.start !== rec.start;
        Object.assign(rec, { start: ev.start, id: ev.id, chans }); changed = true;
        if (+new Date(rec.start) - rec.minutes * 6e4 > now) arm(rec);
        if (moved) A.remToast(`Kick-off moved: ${rec.detail} now ${dayLabel(rec.start)} ${hm(rec.start)} – your reminder moved too.`);
      }
    }
    if (changed) put(s);
  });
  /* re-arm after the website reloads (the apps keep their own alarms) */
  if (!nativeAndroid() && !nativeWin()) setTimeout(() => Object.values(store()).forEach((r) => +new Date(r.start) - r.minutes * 6e4 > Date.now() && arm(r)), 1500);
  if (nativeWin() && window.asbhRem.onFired) window.asbhRem.onFired((id) => { const s = store(); delete s[id]; put(s); A.emit && A.emit('reminders', {}); });
  /* drop reminders the phone already delivered */
  if (nativeAndroid()) setTimeout(() => { try { const live = new Set(String(window.ASBHReminders.list() || '').split(',').filter(Boolean)); const s = store(); let ch = false;
    for (const k of Object.keys(s)) if (!live.has(k) && +new Date(s[k].start) - s[k].minutes * 6e4 < Date.now()) { delete s[k]; ch = true; } if (ch) put(s); } catch (e) { /* ignore */ } }, 2000);
})(window.ASBH);
