# asbh-feed

The live data feed for **African Sports Broadcast Hub**, the Windows and Android apps. It is non-commercial and has no ads.

The apps (2.1.8 and later) download [`feed.json`](feed.json) every time they refresh (about every 15 minutes), so changes reach every installed app over the air, with no reinstall.

## How it updates itself

A GitHub job ([`.github/workflows/update-feed.yml`](.github/workflows/update-feed.yml)) runs **every 3 hours**. It reads the broadcasters' own live TV guides, keeps **live sport only** for the **next 10 days**, and rebuilds `feed.json` and the calendar files. Kick-off changes and new channel confirmations are picked up on the next run.

| Guide | How live sport is recognised | Status |
|---|---|---|
| SuperSport – supersport.com/tv-guide | the guide's own "live" flag | ✅ |
| beIN SPORTS MENA – beinsports.com/en-mena/tv-guide | the guide's own "live" flag | ✅ |
| New World Sport – myt.mu/home/new-world-sport-guide | the guide lists only live events | ✅ |
| Azam TV Max – web.azamtvmax.com/tv-guide | "LIVE" in the programme title | ✅ (Azam publishes one day at a time) |
| StarTimes – m.startimestv.com | no live flag: a slot counts only if it starts within 30 minutes of the real kick-off (so replays never count) | ✅ |
| Azam TV – azamtv.com/program-guide | checked every run; its sports section currently lists ESPN only | ⚠️ |
| CANAL+ Rwanda – canalplus.com/rw/programme-tv | blocks automated visits from cloud servers | ⚠️ use announcements |
| ZAP Angola – zap.co.ao/tv/guia-tv | guide server only answers inside Angola | ⚠️ use announcements |

Each run's result per guide is in `feed.json → sources`. A guide that fails keeps its last good data instead of wiping it.

## Calendars (subscribe once, updates by itself)

- All live sport: `https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/calendar.ics`
- One sport: `https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/calendars/<sport>.ics` (football, basketball, rugby, cricket, tennis, f1, …)

Google Calendar → *Other calendars → From URL*; Outlook → *Add calendar → Subscribe from web*; iPhone/Mac → *Add Subscription Calendar* (or open the `webcal://` version of the link). The apps' **Add to calendar** button offers these links too.

## Adding a broadcaster announcement by hand

Edit [`manual.json`](manual.json) (not `feed.json`, which is rebuilt automatically):

```json
{ "date": "2026-11-12", "teams": ["Cameroon", "Namibia"], "channels": ["cp-sport-3"], "source": "CANAL+ graphic" }
```

`date` is the match day in East Africa Time. Team names can be in English or French. Channel IDs are in [CHANNEL-IDS.md](CHANNEL-IDS.md). Saving `manual.json` starts a rebuild straight away. Past dates are ignored automatically.
