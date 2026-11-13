/* African Sports Broadcast Hub — core utilities
 * Plain browser JS (no build step) so the same files run on the web,
 * inside the Android (Capacitor) shell and the Windows (Tauri) shell.
 * MIT License. */
(function (g) {
  'use strict';
  const ASBH = (g.ASBH = g.ASBH || {});
  /* Android "Reset data & start": wipe saved data before anything reads it */
  if (g.location && g.location.hash === '#reset') {
    try { g.localStorage.clear(); g.sessionStorage.clear(); } catch (e) { /* ignore */ }
    try { g.caches && g.caches.keys().then((ks) => ks.forEach((k) => g.caches.delete(k))); } catch (e) { /* ignore */ }
    try { g.history.replaceState(null, '', g.location.pathname); } catch (e) { /* ignore */ }
  }
  ASBH.version = '2.2.9';

  /* ---------- tiny event bus ---------- */
  const listeners = {};
  ASBH.on = (n, fn) => ((listeners[n] = listeners[n] || []).push(fn), fn);
  ASBH.emit = (n, d) => (listeners[n] || []).forEach((fn) => { try { fn(d); } catch (e) { console.error(e); } });

  /* ---------- safe storage (works in sandboxes where localStorage throws) ---------- */
  const mem = {};
  ASBH.store = {
    get(k, def) {
      try { const v = g.localStorage.getItem('asbh:' + k); return v == null ? def : JSON.parse(v); }
      catch (e) { return k in mem ? mem[k] : def; }
    },
    set(k, v) {
      mem[k] = v;
      try { g.localStorage.setItem('asbh:' + k, JSON.stringify(v)); } catch (e) { /* in-memory only */ }
    }
  };

  /* ---------- African time zones (IANA) ---------- */
  ASBH.TIMEZONES = [
    { id: 'Africa/Nairobi', label: 'Nairobi · Kampala · Dar es Salaam · Addis Ababa', short: 'EAT' },
    { id: 'Indian/Antananarivo', label: 'Antananarivo (Madagascar)', short: 'MDG' },
    { id: 'Indian/Mauritius', label: 'Port Louis (Mauritius)', short: 'MUT' },
    { id: 'Indian/Reunion', label: 'Saint-Denis (Réunion)', short: 'RET' },
    { id: 'Indian/Mahe', label: 'Victoria (Seychelles)', short: 'SCT' },
    { id: 'Africa/Johannesburg', label: 'Johannesburg · Maseru · Mbabane', short: 'SAST' },
    { id: 'Africa/Harare', label: 'Harare · Lusaka · Maputo · Kigali · Lubumbashi', short: 'CAT' },
    { id: 'Africa/Cairo', label: 'Cairo', short: 'EGY' },
    { id: 'Africa/Khartoum', label: 'Khartoum · Juba', short: 'CAT' },
    { id: 'Africa/Lagos', label: 'Lagos · Kinshasa · Luanda · Douala · Tunis · Algiers', short: 'WAT' },
    { id: 'Africa/Casablanca', label: 'Casablanca · Laayoune', short: 'MAR' },
    { id: 'Africa/Abidjan', label: 'Abidjan · Accra · Dakar · Bamako · Conakry', short: 'GMT' },
    { id: 'Atlantic/Cape_Verde', label: 'Praia (Cabo Verde)', short: 'CVT' },
    { id: 'UTC', label: 'UTC / GMT', short: 'GMT' }
  ];
  ASBH.DEFAULT_TZ = 'Africa/Nairobi';

  ASBH.tzShort = (tz) => (ASBH.TIMEZONES.find((t) => t.id === tz) || {}).short || tz.split('/').pop();
  ASBH.tzOffsetLabel = (tz, date = new Date()) => {
    try {
      const p = new Intl.DateTimeFormat('en-GB', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(date);
      return (p.find((x) => x.type === 'timeZoneName') || {}).value.replace('GMT', 'GMT') || 'GMT';
    } catch (e) { return ''; }
  };

  /* Returns parts of a UTC Date in the given zone */
  ASBH.zoned = (date, tz) => {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23'
    });
    const o = {};
    f.formatToParts(date).forEach((p) => (o[p.type] = p.value));
    return { y: +o.year, m: +o.month, d: +o.day, hh: o.hour, mm: o.minute, wd: o.weekday, key: `${o.year}-${o.month}-${o.day}` };
  };
  ASBH.fmtTime = (date, tz, style = 'colon') => {
    const z = ASBH.zoned(date, tz);
    return style === 'h' ? `${z.hh}H${z.mm}` : `${z.hh}:${z.mm}`;
  };
  ASBH.dayKey = (date, tz) => ASBH.zoned(date, tz).key;

  const DAYS = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    pt: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    sw: ['Jumapili', 'Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi']
  };
  const MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    sw: ['Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni', 'Julai', 'Agosti', 'Septemba', 'Oktoba', 'Novemba', 'Desemba']
  };
  ASBH.LANGS = { en: 'English', fr: 'Français', pt: 'Português', sw: 'Kiswahili' };
  /* "Saturday 7 November" for a YYYY-MM-DD key */
  ASBH.dayTitle = (key, lang = 'en') => {
    const [y, m, d] = key.split('-').map(Number);
    const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    const L = DAYS[lang] ? lang : 'en';
    const dd = lang === 'fr' && d === 1 ? '1er' : String(d).padStart(2, '0');
    return `${DAYS[L][wd]} ${dd} ${MONTHS[L][m - 1]}`;
  };
  ASBH.addDaysKey = (key, n) => {
    const [y, m, d] = key.split('-').map(Number);
    const t = new Date(Date.UTC(y, m - 1, d + n));
    return t.toISOString().slice(0, 10);
  };

  /* ---------- misc helpers ---------- */
  ASBH.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  ASBH.slug = (s) => String(s || '').toLowerCase().replace(/ø/g, 'o').replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/ł/g, 'l').replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  ASBH.hashColor = (s) => {
    let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0;
    return `hsl(${Math.abs(h) % 360} 55% 38%)`;
  };
  ASBH.initials = (name) => {
    const w = String(name || '?').replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
    if (w.length === 1) return w[0].slice(0, 3).toUpperCase();
    return w.slice(0, 3).map((x) => x[0]).join('').toUpperCase();
  };
  ASBH.now = () => (ASBH.__fakeNow ? new Date(ASBH.__fakeNow) : new Date());
})(window);
