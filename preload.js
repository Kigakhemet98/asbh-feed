// Exposes a few safe functions to the web app:
//  asbhNet.fetch  – fetch a TV-guide URL from the main process (no browser CORS limits; allow-listed https hosts only)
//  asbhRem.*      – match reminders shown as Windows notifications, also while the window is closed (tray)
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('asbhNet', { fetch: (url) => ipcRenderer.invoke('asbh:fetch', String(url)) });
contextBridge.exposeInMainWorld('asbhRem', {
  set: (r) => ipcRenderer.invoke('asbh:rem-set', { id: String(r.id), at: Number(r.at), title: String(r.title), body: String(r.body) }),
  cancel: (id) => ipcRenderer.invoke('asbh:rem-cancel', String(id)),
  list: () => ipcRenderer.invoke('asbh:rem-list'),
  onFired: (fn) => ipcRenderer.on('asbh:reminder-fired', (_e, id) => fn(String(id)))
});
