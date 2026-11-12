# asbh-feed

The live data feed for **African Sports Broadcast Hub**, the Windows and Android apps. It is non-commercial and has no ads.

The apps download [`feed.json`](feed.json) every time they refresh, so a change pushed here reaches every installed app within about 15 minutes, with no reinstall.

**Feed address** (paste it into the apps under *Settings → Schedule feeds*, on its own line under `data/schedule.json`):

```
https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/feed.json
```

## What goes in `feed.json`

- **`assignments`**: the channel a broadcaster has announced for one fixture. The app matches it on both teams and the date in EAT, then replaces that broadcaster's "TBA" badge.

  ```json
  { "date": "2026-11-12", "teams": ["Cameroon", "Namibia"], "channels": ["cp-sport-3"] }
  ```

  Team names can be in English or French (e.g. *Cameroun*, *Centrafrique*, *RD Congo*). The channel IDs are listed in [CHANNEL-IDS.md](CHANNEL-IDS.md).

- **`events`**: extra fixtures that no guide lists. Each one needs `start` (ISO, UTC), `sport`, `comp`, `detail` and `channels`.

- **`overrides`**: corrections or cancellations for an event, matched by its `id`.

Remove old entries whenever you like. Past dates are ignored automatically.
