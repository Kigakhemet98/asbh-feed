/* Service worker: app shell offline, schedule feed network-first so updates arrive quickly. */
const CACHE = 'asbh-v23';
const SHELL = ['./', 'index.html', 'css/app.css', 'fonts/fonts.css', 'js/core.js', 'js/data-channels.js', 'js/data-sports.js', 'js/data-seed.js',
  'js/logos.js', 'js/data-teams.js', 'js/plugins.js', 'js/live-guides.js', 'js/views.js', 'js/export.js', 'js/export-highlights.js', 'js/platform.js', 'js/data-countries.js', 'js/clean.js', 'js/calendar-reminders.js', 'js/app.js', 'js/mobile.js', 'plugins/index.js', 'icons/icon.svg', 'manifest.webmanifest'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  const isData = /\/data\/|\.json$|\.csv$|\.ics$/.test(u.pathname);
  if (isData) {
    e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then((m) => m || fetch(e.request).then((r) => { if (r.ok && u.origin === location.origin) { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); } return r; })));
  }
});
