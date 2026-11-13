/* Platform shims: the same web code runs in a browser, the Android app (Capacitor)
 * and the Windows app (Tauri). Only file saving / sharing differs. */
(function (A) {
  'use strict';
  const cap = window.Capacitor;
  const tauri = window.__TAURI__;
  A.platform = cap && cap.isNativePlatform && cap.isNativePlatform() ? 'android' : tauri ? 'windows' : 'web';

  const toB64 = (blob) => new Promise((r) => { const f = new FileReader(); f.onload = () => r(String(f.result).split(',')[1]); f.readAsDataURL(blob); });

  if (window.ASBHNative) {
    /* Native Android app: saves posters to Downloads (MediaStore) through the Java bridge */
    A.platform = 'android'; document.documentElement.classList.add('android');
    A.saveBlob = async (blob, name) => { window.ASBHNative.save(await toB64(blob), name, blob.type || 'image/png'); };
    /* if the app stopped last time, show the saved report once so it can be copied and sent */
    window.addEventListener('load', () => setTimeout(() => {
      let t = ''; try { t = window.ASBHNative.lastCrash ? String(window.ASBHNative.lastCrash() || '') : ''; } catch (e) { t = ''; }
      if (!t.trim()) return;
      const box = document.createElement('div'); box.id = 'crash-report';
      box.innerHTML = '<div class="cr-in"><h2>The app stopped last time</h2><p>It has restarted. If this keeps happening, copy this report and send it to the developer.</p>' +
        '<textarea readonly></textarea><div class="cr-act"><button type="button" data-a="copy">Copy report</button><button type="button" data-a="close">Close</button></div></div>';
      box.querySelector('textarea').value = 'African Sports Broadcast Hub ' + A.version + ' · ' + navigator.userAgent + '\n\n' + t;
      box.addEventListener('click', (e) => { const a = e.target.dataset && e.target.dataset.a;
        if (a === 'copy') { const ta = box.querySelector('textarea'); ta.select(); try { navigator.clipboard.writeText(ta.value); } catch (x) { document.execCommand('copy'); } e.target.textContent = 'Copied'; }
        if (a === 'close') box.remove(); });
      document.body.appendChild(box);
    }, 800));
  } else if (A.platform === 'android') {
    /* Saves to Documents/ASBH and opens the Android share sheet */
    A.saveBlob = async (blob, name) => {
      const { Filesystem, Share } = cap.Plugins;
      const res = await Filesystem.writeFile({ path: 'ASBH/' + name, data: await toB64(blob), directory: 'DOCUMENTS', recursive: true });
      try { await Share.share({ title: name, files: [res.uri] }); } catch (e) { /* user closed share sheet */ }
    };
  } else if (A.platform === 'windows') {
    /* Native "Save as" dialog */
    A.saveBlob = async (blob, name) => {
      const path = await tauri.dialog.save({ defaultPath: name });
      if (!path) return;
      await tauri.fs.writeFile(path, new Uint8Array(await blob.arrayBuffer()));
    };
  }
})(window.ASBH);
