# asbh-feed

The live data feed for **African Sports Broadcast Hub**, the Windows and Android apps. It is non-commercial and has no ads.

The apps (2.1.8 and later) download [`feed.json`](feed.json) every time they refresh (about every 15 minutes), so changes reach every installed app over the air, with no reinstall.

## What's new in 2.2.3 (13 Nov 2026)

- SuperSport's landing page is now **DStv Stream – [dstv.stream](https://dstv.stream/#/)** (DStv and SuperSport.com stay as extra links).

## What's new in 2.2.2 (13 Nov 2026)

- **Sport 24 & Sport 24 Extra** (live sport on airlines and cruise ships) – new broadcaster; its 10-day live schedule is read every run.
- **Channel numbers:** SuperSport as *Rest of Africa · South Africa* (e.g. Rugby DStv 231 · 211; LaLiga DStv 224 · 204), CANAL+ SPORT 1–5 = 11–15, beIN SPORTS MENA (1–9, XTRA 41–49, MAX 701–706, English 21–22, French 26–27).
- **Logos:** French handball, AFL/AFLW, NWSL, college football, Liga ACB, LPB clubs; U21/women's national sides (flags); ICC (dark mode), Total Chess, Freestyle Friday, E1, WTCS, OCEANMAN, T100, World Skate, Legends Cup, Boxing and more; Beta Sports and Sporty TV.
- Guide shorthand ("LI: MCI v FUL", Diski club codes, "Ottowa") is expanded the same way in the feed and in the apps.

## Broadcasters, rights and where to watch

Generated from the apps' own data (`web/js/data-channels.js`). **Watch** links go to the broadcaster's stream or decoder page. SuperSport numbers read *Rest of Africa · South Africa* (e.g. SuperSport Rugby **DStv 231 · 211**).

### SuperSport
*DStv · GOtv · DStv Stream · channel numbers: Rest of Africa · South Africa*

- **Watch:** [DStv Stream](https://dstv.stream/#/) · [DStv](https://www.dstv.com) · [SuperSport](https://supersport.com)
- **Channels:** SuperSport WWE (DStv 128 · ROA 226) · SuperSport Events (DStv 199) · SuperSport Extra 2 (DStv 217 · South Africa only) · SuperSport Blitz (DStv 220 · 200) · SuperSport Grandstand (DStv 221 · 201) · SuperSport Football Plus (DStv 222 · 206) · SuperSport Premier League (DStv 223 · 203) · SuperSport LaLiga (DStv 224 · 204) · SuperSport Football (DStv 225 · 205) · SuperSport KickOff (DStv 227 · 207) · SuperSport Africa (DStv 228 · 208) · SuperSport Action (DStv 229 · 209) · SuperSport Extra (DStv 230 · 210) · SuperSport Rugby (DStv 231 · 211) · SuperSport Cricket (DStv 232 · 212) · SuperSport Golf (DStv 233 · 213) · SuperSport Tennis (DStv 234 · 214) · SuperSport Motorsport (DStv 235 · 215) · SuperSport Máximo 1 (DStv 241 · Angola/Moz 601) · SuperSport Máximo 2 (DStv 242 · Angola/Moz 602) · SuperSport Swahili (DStv / GOtv East Africa) · SuperSport AWSN (DStv Stream 244) · SuperSport Stream 245 (DStv Stream 245) · SuperSport Stream 246 (DStv Stream 246) · SuperSport Stream 247 (DStv Stream 247) · SuperSport Stream 248 (DStv Stream 248) · SuperSport Stream 950 (DStv Stream 950) · SuperSport Stream 951 (DStv Stream 951) · SuperSport Stream 952 (DStv Stream 952)
- **Rights tracked:** AFCON PAMOJA 2027 qualifiers – channel TBA; ATP & WTA tennis – SuperSport Tennis; Premier League – SuperSport Premier League; LaLiga (every match) – SuperSport LaLiga
- Everything SuperSport marks LIVE in its own guide (football, rugby, cricket, golf, motorsport, WWE, schools sport and more) is added automatically.

### CANAL+ Afrique
*CANAL+ · myCANAL Afrique*

- **Watch:** [CANAL+ Afrique](https://www.canalplus-afrique.com) · [myCANAL Afrique](https://www.canalplus.com/)
- **Channels:** CANAL+ SPORT 1 (CANAL+ 11) · CANAL+ SPORT 2 (CANAL+ 12) · CANAL+ SPORT 3 (CANAL+ 13) · CANAL+ SPORT 4 (CANAL+ 14) · CANAL+ SPORT 5 (CANAL+ 15)
- **Rights tracked:** AFCON PAMOJA 2027 qualifiers (French) – CANAL+ Sport (chaîne à confirmer); ATP tennis – CANAL+ SPORT 5; WTA tennis – CANAL+ SPORT 5; UEFA Champions League – CANAL+ SPORT 2; Premier League – CANAL+ SPORT 3; LaLiga – CANAL+ SPORT 4; Ligue 1 – CANAL+ SPORT 1; Bundesliga – CANAL+ SPORT 1; NBA – CANAL+ SPORT 4; Formula 1 – CANAL+ SPORT 4; MotoGP – CANAL+ SPORT 1; Top 14 – CANAL+ SPORT 1
- CANAL+ SPORT 1–5 (channels 11–15 on CANAL+ Afrique). Its guide blocks automated reads, so matches come from announcements.

### StarTimes
*StarTimes ON · DTT · DTH*

- **Watch:** [StarTimes](https://www.startimestv.com) · [StarTimes ON](https://m.startimestv.com/browser/live)
- **Channels:** StarTimes Sports Focus (DTH 240 · DTT 256) · StarTimes Sports Arena (DTH 241 · DTT 257) · StarTimes Sports Life (DTH 243 · DTT 253) · StarTimes Beta Sports (DTH 244 · Nigeria) · StarTimes World Football (DTH 245 · DTT 260) · StarTimes Sports Premium (DTH 246 · DTT 259)
- **Rights tracked:** LaLiga – StarTimes Sports Premium; Bundesliga – StarTimes World Football; Carabao Cup – StarTimes World Football; Saudi Pro League – StarTimes Sports Premium; Uganda Premier League – Sanyuka Prime; AEW Wrestling – StarTimes Sports Arena; AFC Asian Cup – channel TBA
- StarTimes slots are confirmed automatically when they line up with a real kick-off. Beta Sports (DTH 244) is Nigeria only.

### Azam Sports
*Azam TV · Azam TV Max*

- **Watch:** [Azam TV](https://azamtv.com) · [Azam TV Max](https://web.azamtvmax.com)
- **Channels:** Azam Sports 1 HD · Azam Sports 2 HD · Azam Sports 3 HD · Azam Sports 4 HD · Azam Sports 5 HD
- **Rights tracked:** LaLiga – Azam Sports 4 HD; Bundesliga – Azam Sports 2 HD; Serie A – Azam Sports 3 HD; Carabao Cup – Azam Sports 1 HD; Women's Super League – Azam Sports 1 HD; CAF Women's Champions League – Azam Sports 1 HD; AFCON 2027 Qualifiers – Azam Sports 2 HD; AFC Asian Cup – channel TBA
- Live matches from the Azam TV Max guide (titles marked LIVE).

### ZBC (Zanzibar)
*On Azam TV*

- **Watch:** [Azam TV (ZBC)](https://azamtv.com)
- **Channels:** ZBC 2
- ZBC 2 shows selected Azam football in Zanzibar.

### Free-to-air (national TV)
*Selected matches*

- **Watch:** —
- **Channels:** Sanyuka Prime (DTT 251 · DTH 238) · SABC Sport · Botswana TV · RTI · RTNC · CRTV · SNRT Arryadia · ON Time Sports · RBA
- National broadcasters (e.g. Sanyuka Prime in Uganda).

### beIN SPORTS MENA
*beIN · TOD*

- **Watch:** [beIN SPORTS MENA](https://www.beinsports.com/en-mena/) · [TOD](https://www.tod.tv) · [beIN SPORTS CONNECT](https://connect.beinsports.com)
- **Channels:** beIN SPORTS 1 (beIN 1) · beIN SPORTS 2 (beIN 2) · beIN SPORTS 3 (beIN 3) · beIN SPORTS 4 (beIN 4) · beIN SPORTS 5 (beIN 5) · beIN SPORTS 6 (beIN 6) · beIN SPORTS 7 (beIN 7) · beIN SPORTS 8 (beIN 8) · beIN SPORTS 9 (beIN 9) · beIN SPORTS 10 (beIN 10) · beIN SPORTS News (beIN 10) · beIN SPORTS (beIN 11) · beIN 4K (beIN 14) · beIN SPORTS English 1 (beIN 21) · beIN SPORTS English 2 (beIN 22) · beIN SPORTS French 1 (beIN 26) · beIN SPORTS French 2 (beIN 27) · beIN SPORTS XTRA 1 (beIN 41) · beIN SPORTS XTRA 2 (beIN 42) · beIN SPORTS XTRA 3 (beIN 43) · beIN SPORTS XTRA 4 (beIN 44) · beIN SPORTS XTRA 5 (beIN 45) · beIN SPORTS XTRA 6 (beIN 46) · beIN SPORTS XTRA 7 (beIN 47) · beIN SPORTS XTRA 8 (beIN 48) · beIN SPORTS XTRA 9 (beIN 49) · beIN SPORTS AFC · beIN SPORTS AFC 1 · beIN SPORTS AFC 2 · beIN SPORTS AFC 3 · beIN SPORTS AFC 4 · beIN SPORTS AFC 5 · beIN SPORTS AFC 6 · beIN NBA · beIN SPORTS MAX 1 (beIN 701) · beIN SPORTS MAX 2 (beIN 702) · beIN SPORTS MAX 3 (beIN 703) · beIN SPORTS MAX 4 (beIN 704) · beIN SPORTS MAX 5 (beIN 705) · beIN SPORTS MAX 6 (beIN 706)
- **Rights tracked:** Premier League – beIN SPORTS 1, beIN SPORTS English 1, beIN 4K; AFCON PAMOJA 2027 qualifiers – channel TBA; AFC Asian Cup – channel TBA; ATP tennis – channel TBA; LaLiga – beIN SPORTS 1, beIN SPORTS English 1; Carabao Cup – beIN SPORTS 1, beIN SPORTS English 1; Formula 1 – beIN SPORTS 8, beIN SPORTS English 1, beIN 4K; MotoGP – beIN SPORTS 8, beIN SPORTS English 1; NBA – beIN SPORTS 7, beIN SPORTS English 1; NFL – beIN SPORTS 8, beIN SPORTS English 2
- Everything beIN marks live in its MENA guide.

### ESPN Africa
*DStv · StarSat · Disney+ (SA)*

- **Watch:** [ESPN Africa](https://africa.espn.com) · [Disney+](https://www.disneyplus.com/en-za) · [DStv](https://www.dstv.com)
- **Channels:** ESPN (DStv 218) · ESPN 2 (DStv 219)
- **Rights tracked:** Top 14 – ESPN, ESPN 2; Japan Rugby League One – ESPN, ESPN 2; Saudi Pro League – ESPN, ESPN 2; NBA – ESPN, ESPN 2; NFL – ESPN, ESPN 2; MLB (selected games, Pan-Africa) – ESPN, ESPN 2

### New World Sport
*NW TV · my.t (Mauritius)*

- **Watch:** [New World Sport (my.t)](https://www.myt.mu/home/new-world-sport-guide) · [New World TV app (Android)](https://play.google.com/store/apps/details?id=com.newworldtvapp) · [New World TV app (iPhone)](https://apps.apple.com/app/id1250251639)
- **Channels:** NW Sport 1 · NW Sport 2 · NW Sport 3 · NW Sport 4 · NW Sport 5 · NW Sport 6 · NW Sport 7
- Everything in the New World Sport live-events guide (my.t, Mauritius).

### Sporty TV
*Sporty app (video only)*

- **Watch:** [Sporty TV](https://sporty.com/)
- **Channels:** Sporty TV
- Live video in the Sporty app.

### ZAP
*Angola · Moçambique · Cabo Verde*

- **Watch:** [ZAP](https://www.zap.co.ao)
- **Channels:** Z Sports (ZAP 21) · Z Sports 2 (ZAP 22) · Z Sports LaLiga (ZAP 23)
- **Rights tracked:** LaLiga – Z Sports LaLiga; Bundesliga & DFB-Pokal – Z Sports 2; Serie A & Coppa Italia – Z Sports 2; Girabola – Z Sports; FIFA World Cup 2026 – Z Sports; African MMA Championship (FAMMA) – Z Sports, Z Sports 2; Basketball – Z Sports

### DAZN
*Streaming (Africa)*

- **Watch:** [DAZN](https://www.dazn.com)
- **Channels:** DAZN
- Streaming; DAZN events and NFL Game Pass.

### NBA League Pass
*Direct-to-consumer streaming* · streaming

- **Watch:** [NBA League Pass](https://www.nba.com/watch/league-pass-stream)
- **Channels:** NBA League Pass

### F1 TV
*Direct-to-consumer streaming* · streaming

- **Watch:** [F1 TV](https://f1tv.formula1.com)
- **Channels:** F1 TV

### MotoGP VideoPass
*Direct-to-consumer streaming* · streaming

- **Watch:** [MotoGP VideoPass](https://www.motogp.com/en/videopass)
- **Channels:** MotoGP VideoPass

### Apple TV
*Streaming · every MLS match, Friday Night Baseball (in 100+ countries)* · streaming

- **Watch:** [Apple TV](https://tv.apple.com) · [MLS – how to watch](https://www.mlssoccer.com/how-to-watch/)
- **Channels:** Apple TV
- Every MLS match (MLS Season Pass is included in Apple TV) and MLB Friday Night Baseball.

### beIN SPORTS France
*Madagascar · Mauritius · Réunion · Mayotte*

- **Watch:** [beIN SPORTS France](https://www.beinsports.com/france/)
- Indian Ocean islands; AFC Asian Cup rights (channel to be announced).

### Sport 24
*Live sport on airlines and cruise ships · Sport 24 & Sport 24 Extra (Emirates, Qatar Airways, Turkish Airlines, Etihad, Saudia, British Airways and more)*

- **Watch:** [Where to watch](https://sport24live.com/watch/) · [Schedule](https://sport24live.com/schedule/) · [Rights](https://sport24live.com/about/)
- **Channels:** Sport 24 (In flight · At sea) · Sport 24 Extra (In flight · At sea)
- In-flight and at-sea only (no home TV in Africa). Rights (sport24live.com/about): UEFA Champions League, Europa League, Conference League, Nations League, Premier League, Ligue 1, Saudi Pro League, Women's Super League, Copa Libertadores, AFC Asian Cup, FIFA World Cup 26; Australian Open, Roland-Garros, Wimbledon, US Open, ATP Masters 1000 & ATP Finals; the Masters, The Open, PGA Tour, DP World Tour, LIV Golf, Ryder Cup; NFL, NBA, NHL; ICC Men's T20 World Cup, the Ashes, BBL; Rugby League World Cup, NRL, SVNS, Champions Cup; F1, MotoGP, SailGP, EuroLeague, BWF, AFL, horse racing majors. Live slots come from its 10-day schedule.

### NFL Game Pass
*Direct-to-consumer streaming (DAZN)* · streaming

- **Watch:** [NFL Game Pass](https://www.dazn.com)
- **Channels:** NFL Game Pass

## How it updates itself

A GitHub job ([`.github/workflows/update-feed.yml`](.github/workflows/update-feed.yml)) runs **every 3 hours**. It reads the broadcasters' own live TV guides, keeps **live sport only** for the **next 10 days**, and rebuilds `feed.json` and the calendar files. Kick-off changes and new channel confirmations are picked up on the next run.

| Guide | How live sport is recognised | Status |
|---|---|---|
| SuperSport – supersport.com/tv-guide | the guide's own "live" flag | ✅ |
| beIN SPORTS MENA – beinsports.com/en-mena/tv-guide | the guide's own "live" flag | ✅ |
| New World Sport – myt.mu/home/new-world-sport-guide | the guide lists only live events | ✅ |
| Azam TV Max – web.azamtvmax.com/tv-guide | "LIVE" in the programme title | ✅ (Azam publishes one day at a time) |
| StarTimes – m.startimestv.com | no live flag: a slot counts only if it starts within 30 minutes of the real kick-off (so replays never count) | ✅ |
| Sport 24 / Sport 24 Extra – sport24live.com/schedule (airlines & cruise ships) | the schedule's own live flag | ✅ |
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
