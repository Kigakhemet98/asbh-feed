// Windows desktop shell (Electron). Serves the web app from an app:// origin so fetch(), feeds and logos work offline.
const { app, BrowserWindow, protocol, net, shell, ipcMain, Notification, Tray, Menu, nativeImage } = require('electron');
const path = require('path'); const fs = require('fs'); const { pathToFileURL } = require('url');
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }]);
app.setAppUserModelId('org.africansports.hub');   // Windows toast notifications show the app name and icon

if (!app.requestSingleInstanceLock()) { app.quit(); }
const ICON = () => path.join(__dirname, 'app', 'icons', 'icon-512.png');
let win = null; let tray = null; let quitting = false;
const hiddenStart = process.argv.includes('--reminders');

function createWindow(show = true) {
  win = new BrowserWindow({ width: 1360, height: 860, minWidth: 380, minHeight: 600, backgroundColor: '#000000', autoHideMenuBar: true, show,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, backgroundThrottling: false },
    title: 'African Sports Broadcast Hub', icon: ICON() });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^(https|webcal|mailto):/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.on('close', (e) => {   // with reminders waiting, keep running in the tray so they still go off
    if (!quitting && pending().length) { e.preventDefault(); win.hide(); trayOn(); notifyOnce(); }
  });
  win.loadURL('app://hub/index.html');
}
function showWin() { if (!win || win.isDestroyed()) createWindow(true); else { win.show(); win.focus(); } }
app.on('second-instance', showWin);

/* ---------- reminders ---------- */
const FILE = () => path.join(app.getPath('userData'), 'reminders.json');
let reminders = [];   // [{ id, at, title, body }]
const timers = new Map();
const pending = () => reminders.filter((r) => r.at > Date.now());
function load() { try { reminders = JSON.parse(fs.readFileSync(FILE(), 'utf8')).filter((r) => r && r.id && r.at > Date.now() - 60e3); } catch { reminders = []; } }
function save() { try { fs.writeFileSync(FILE(), JSON.stringify(reminders)); } catch { /* disk full / read-only */ } }
function fire(r) {
  timers.delete(r.id); reminders = reminders.filter((x) => x.id !== r.id); save(); startup();
  if (Notification.isSupported()) { const n = new Notification({ title: r.title, body: r.body, icon: ICON(), urgency: 'critical' }); n.on('click', showWin); n.show(); }
  if (win && !win.isDestroyed()) win.webContents.send('asbh:reminder-fired', r.id);
  if (!pending().length && win && !win.isVisible() && !quitting) { quitting = true; app.quit(); }   // nothing left to wait for
}
function arm() {
  for (const t of timers.values()) clearTimeout(t); timers.clear();
  for (const r of pending()) {
    const wait = r.at - Date.now();
    timers.set(r.id, setTimeout(() => (Date.now() >= r.at - 1000 ? fire(r) : arm()), Math.min(wait, 2 ** 31 - 1)));   // long waits re-arm
  }
}
/* start quietly at Windows sign-in only while reminders are waiting */
function startup() { try { app.setLoginItemSettings({ openAtLogin: pending().length > 0, args: ['--reminders'] }); } catch { /* not allowed */ } }
function trayOn() {
  if (tray) return;
  tray = new Tray(nativeImage.createFromPath(ICON()).resize({ width: 16, height: 16 }));
  tray.setToolTip('African Sports Broadcast Hub – match reminders on');
  tray.setContextMenu(Menu.buildFromTemplate([{ label: 'Open Sports Hub', click: showWin }, { type: 'separator' }, { label: 'Quit (reminders will not go off)', click: () => { quitting = true; app.quit(); } }]));
  tray.on('click', showWin);
}
let told = false;
function notifyOnce() {
  if (told || !Notification.isSupported()) return; told = true;
  new Notification({ title: 'Sports Hub is still running', body: `${pending().length} match reminder${pending().length > 1 ? 's' : ''} set. Find the app in the system tray.`, icon: ICON() }).show();
}
ipcMain.handle('asbh:rem-set', (_e, r) => {
  if (!r || !r.id || !(+r.at > Date.now())) return 'past';
  reminders = reminders.filter((x) => x.id !== r.id).concat({ id: String(r.id), at: +r.at, title: String(r.title).slice(0, 200), body: String(r.body).slice(0, 400) });
  save(); arm(); startup(); return 'exact';
});
ipcMain.handle('asbh:rem-cancel', (_e, id) => { reminders = reminders.filter((x) => x.id !== id); save(); arm(); startup(); return true; });
ipcMain.handle('asbh:rem-list', () => pending().map((r) => r.id).join(','));

/* TV-guide fetches for the in-app auto-update (live-guides.js). Allow-listed hosts only. */
const GUIDE_HOSTS = /(^|\.)(supersport\.com|beinsports\.com|indazn\.com|dazn\.com|fotmob\.com|github\.io|githubusercontent\.com)$/i;
ipcMain.handle('asbh:fetch', async (_e, url) => {
  const u = new URL(url); if (u.protocol !== 'https:' || !GUIDE_HOSTS.test(u.hostname)) throw new Error('host not allowed: ' + u.hostname);
  const r = await net.fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36 ASBH/2.0', Referer: u.origin + '/', Accept: 'application/json,text/html;q=0.9,*/*;q=0.8' } });
  if (!r.ok) throw new Error(r.status + ' ' + u.hostname);
  return await r.text();
});
app.whenReady().then(() => {
  protocol.handle('app', (req) => {
    const p = decodeURIComponent(new URL(req.url).pathname);
    const file = path.normalize(path.join(__dirname, 'app', p));
    if (!file.startsWith(path.join(__dirname, 'app'))) return new Response('Not found', { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
  load(); arm(); startup();
  if (hiddenStart && pending().length) { createWindow(false); trayOn(); }
  else if (hiddenStart) { app.quit(); return; }
  else createWindow(true);
  app.on('activate', showWin);
});
app.on('before-quit', () => { quitting = true; });
app.on('window-all-closed', () => { if (!pending().length || quitting) app.quit(); });
