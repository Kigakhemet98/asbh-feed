# F1 Data Hub — releases & over-the-air updates

**F1 Data Hub** (Android & Windows 11) reads the live F1 TV listings and channel logos from this repo's [`feed.json`](../feed.json) and [`logos/readme`](../logos/readme), and checks this folder for updates every 6 hours.

## Download (latest: 3.1.0)

| Platform | Download | Install |
|---|---|---|
| Android 10+ | [F1DataHub-3.1.0.apk](https://github.com/Kigakhemet98/asbh-feed/raw/f1hub-downloads/F1DataHub-3.1.0.apk) | Open it and allow *Install unknown apps*. Installs over older versions and keeps settings. |
| Windows 11 | [F1DataHub-3.1.0.exe](https://github.com/Kigakhemet98/asbh-feed/raw/f1hub-downloads/F1DataHub-3.1.0.exe) | Run it; SmartScreen: *More info → Run anyway*. Choose *Yes* to install. Updates itself from 3.1.0 on. |

Checksums: [SHA256SUMS.txt](https://github.com/Kigakhemet98/asbh-feed/blob/f1hub-downloads/SHA256SUMS.txt)

## How updates work

- [`ota.json`](ota.json) lists the newest **app-code bundle** and **installers**.
- **App code** (`bundle-<version>.js`) is signed with an ECDSA P-256 key. The app verifies the signature on the device before saving it and applies it on the next start. If a new bundle ever fails to start, the app goes back to its built-in code automatically.
- **Installers**: when `apk`/`exe` in `ota.json` is newer than the installed app, a banner offers it. The Windows app downloads it, checks the SHA-256, replaces itself and restarts.
- Only bundles signed with the private key are accepted. The key is **not** in this repo — keep it safe and private.

Public key (built into the apps):
```json
{"kty":"EC","crv":"P-256","x":"winqQTnoJce85MktKpbHOU8DGjfRZDaWbl6oQKPGZRc","y":"cQHpp6nsdoup1UiarO7VE7fMbjwVa2M_ONCUObqXXjU"}
```

## Publishing an update (from the F1 Data Hub source)

1. Change the code in `www/`, bump `APP_VERSION` in `www/js/data.js`.
2. `node scripts/build_ota.mjs --key path/to/ota_private.pem --notes "What changed"` → writes `dist/ota/ota.json` and `bundle-<version>.js`.
3. Copy both files into this folder and push to `main`. Every installed app picks it up within 6 hours (or *Settings → Check for updates*).
4. Only when the Android/Windows shell itself changes: rebuild the APK/EXE, put them on the `f1hub-downloads` branch, then run step 2 with `--shell <new version>` so `ota.json` points to them.

## What's new in 3.1.1 (20 Nov 2026) – over-the-air

- **2026 car renders**: official formula1.com car images (side view) where available, otherwise drawn 2026 liveries; add your own renders in [`cars/`](cars/README.md) (top-down renders for the grid).
- **F1 logo** below the date on session cards and in the grid / race results graphics.
- **Channel numbers** under every channel logo (DStv 235 · 215, DStv 241 · Angola/Moz 601, beIN 8, CANAL+ 14…) – from `channels.json`.
- **CANAL+ SPORT 4 (CANAL+ 14)** as Canal+ Afrique's F1 channel (per the ASBH rights list), with its logo.
- **Race results line-up** graphic after the race, with DNF / DNS / DSQ; **Championship battle** card.

## What's new in 3.1.0 (20 Nov 2026)

- **Live TV guide times**: SuperSport (Motorsport, Máximo 1, Grandstand), beIN SPORTS (8, 4K) and Sport 24 Extra times and channels come straight from `feed.json`, refreshed every 15 minutes, in the schedule, timers, calendar files and graphics. Canal+ times stay estimates (Canal+ blocks automated guide reading).
- **Broadcaster logos** from this repo on schedules and in the Graphics studio (session card, What to Watch, poster) and the *Watch on* row (DStv, DStv Stream, beIN CONNECT, CANAL+, F1 TV, Sport 24).
- **Over-the-air updates** (signed code bundles, update banner, Windows self-update).
