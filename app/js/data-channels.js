/* Broadcasters & channels available in Africa.
 * Add/rename channels here or ship them in a feed's "channels" array / a plugin.
 * logo: path inside web/logos/channels/ (PNG/SVG). Missing logos fall back to a text badge. */
(function (A) {
  'use strict';
  A.REGIONS = {
    east: 'East Africa', south: 'Southern Africa', west: 'West Africa & Nigeria',
    franco: 'Francophone Africa', luso: 'Lusophone (Angola · Mozambique)',
    mena: 'North Africa / MENA (beIN SPORTS)', indian: 'Indian Ocean (MU · RE · MG)'
  };

  A.PROVIDERS = [
    { id: 'supersport', abbr: 'SS', name: 'SuperSport', note: 'DStv · GOtv · DStv Stream · channel numbers: Rest of Africa · South Africa', bg: '#000000', fg: '#ffffff', regions: ['east', 'south', 'west', 'luso'], guide: 'https://wsd.supersport.com/media/ms_schedule.asp', url: 'https://dstv.stream/#/', links: [{label: "DStv Stream", url: "https://dstv.stream/#/"}, {label: "DStv", url: "https://www.dstv.com"}, {label: "SuperSport", url: "https://supersport.com"}] },
    { id: 'canalplus', abbr: 'C+', name: 'CANAL+ Afrique', note: 'CANAL+ · myCANAL Afrique', bg: '#000000', fg: '#ffffff', regions: ['franco', 'indian', 'east'], guide: 'https://www.canalplus.com/ci/programme-tv/', url: 'https://www.canalplus-afrique.com', links: [{label: "CANAL+ Afrique", url: "https://www.canalplus-afrique.com"}, {label: "myCANAL Afrique", url: "https://www.canalplus.com/"}] },
    { id: 'startimes', abbr: 'ST', name: 'StarTimes', note: 'StarTimes ON · DTT · DTH', bg: '#ffffff', fg: '#1b1b1b', accent: '#f39200', regions: ['east', 'west', 'south', 'franco'], guide: 'https://www.startimestv.com/tv_guide', url: 'https://www.startimestv.com', links: [{label: "StarTimes", url: "https://www.startimestv.com"}, {label: "StarTimes ON", url: "https://m.startimestv.com/browser/live"}] },
    { id: 'azam', name: 'Azam Sports', note: 'Azam TV · Azam TV Max', bg: '#1a1408', fg: '#f5b800', regions: ['east', 'south'], guide: 'https://www.azamtv.com/program-guide', url: 'https://azamtv.com', links: [{label: "Azam TV", url: "https://azamtv.com"}, {label: "Azam TV Max", url: "https://web.azamtvmax.com"}] },
    { id: 'zbc', name: 'ZBC (Zanzibar)', note: 'On Azam TV', bg: '#1b8a3c', fg: '#ffffff', regions: ['east'], url: 'https://azamtv.com', links: [{label: "Azam TV (ZBC)", url: "https://azamtv.com"}] },
    { id: 'fta', name: 'Free-to-air (national TV)', note: 'Selected matches', bg: '#2b2b2b', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'mena'] },
    { id: 'bein', abbr: 'beIN', name: 'beIN SPORTS MENA', note: 'beIN · TOD', bg: '#5b2c8f', fg: '#ffffff', regions: ['mena'], guide: 'https://www.beinsports.com/en-mena/tv-guide', url: 'https://www.beinsports.com/en-mena/', links: [{label: "beIN SPORTS MENA", url: "https://www.beinsports.com/en-mena/"}, {label: "TOD", url: "https://www.tod.tv"}] },
    { id: 'espn', name: 'ESPN Africa', note: 'Flagship on DStv, no longer DStv-exclusive · also on GOtv, Azam TV, StarTimes, Zuku, ZAP and Disney+ (South Africa)', bg: '#ffffff', fg: '#d00000', regions: ['east', 'south', 'west', 'luso'], url: 'https://africa.espn.com', links: [{ label: 'ESPN Africa', url: 'https://africa.espn.com' }, { label: 'DStv Stream', url: 'https://dstv.stream/#/' }, { label: 'GOtv', url: 'https://www.gotvafrica.com' }, { label: 'Azam TV Max', url: 'https://web.azamtvmax.com' }, { label: 'StarTimes ON', url: 'https://m.startimestv.com/browser/live' }, { label: 'Zuku', url: 'https://zuku.co.ke' }, { label: 'ZAP', url: 'https://www.zap.co.ao' }, { label: 'Disney+ (South Africa)', url: 'https://www.disneyplus.com/en-za' }] },
    { id: 'nws', abbr: 'NW', name: 'New World Sport', note: 'NW TV · my.t (Mauritius)', bg: '#e8383d', fg: '#ffffff', regions: ['indian'], guide: 'https://www.myt.mu/home/new-world-sport-guide', url: 'https://www.myt.mu/home/new-world-sport-guide', links: [{label: "New World Sport (my.t)", url: "https://www.myt.mu/home/new-world-sport-guide"}, {label: "New World TV app (Android)", url: "https://play.google.com/store/apps/details?id=com.newworldtvapp"}, {label: "New World TV app (iPhone)", url: "https://apps.apple.com/app/id1250251639"}] },
    { id: 'sportytv', name: 'Sporty TV', note: 'SportyTV channel on DStv & GOtv (since 10 June 2026) · Sporty app', bg: '#0b0b0b', fg: '#39e46b', regions: ['east', 'south', 'west'], guide: 'https://sporty.com/', url: 'https://www.dstv.com/en-ke/news/146550/sportytv-is-now-live-on-dstv-watch-live-sports-for-less/', links: [{ label: 'SportyTV on DStv', url: 'https://www.dstv.com/en-ke/news/146550/sportytv-is-now-live-on-dstv-watch-live-sports-for-less/' }, { label: 'DStv Stream', url: 'https://dstv.stream/#/' }, { label: 'Sporty', url: 'https://sporty.com/' }] },
    { id: 'zap', name: 'ZAP', note: 'Angola · Moçambique · Cabo Verde', bg: '#0091d5', fg: '#ffffff', regions: ['luso'], guide: 'https://www.zap.co.ao/tv/guia-tv', url: 'https://www.zap.co.ao', links: [{label: "ZAP", url: "https://www.zap.co.ao"}] },
    { id: 'dazn', name: 'DAZN', note: 'Streaming (Africa)', bg: '#0c161c', fg: '#f7ff1a', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], guide: 'https://www.dazn.com/en-UG/schedule', url: 'https://www.dazn.com' },
    { id: 'nba', name: 'NBA League Pass', note: 'Direct-to-consumer streaming', stream: true, bg: '#1d428a', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], guide: 'https://global.nba.com/broadcaster-schedule/', url: 'https://www.nba.com/watch/league-pass-stream' },
    { id: 'f1tv', name: 'F1 TV', note: 'Direct-to-consumer streaming', stream: true, bg: '#e10600', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], url: 'https://f1tv.formula1.com' },
    { id: 'videopass', name: 'MotoGP VideoPass', note: 'Direct-to-consumer streaming', stream: true, bg: '#111111', fg: '#e30613', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], url: 'https://www.motogp.com/en/videopass' },
    { id: 'appletv', name: 'Apple TV', note: 'Streaming · every MLS match, Friday Night Baseball (in 100+ countries)', stream: true, bg: '#000000', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], url: 'https://tv.apple.com', links: [{ label: 'Apple TV', url: 'https://tv.apple.com' }, { label: 'MLS – how to watch', url: 'https://www.mlssoccer.com/how-to-watch/' }] },
    { id: 'beinfr', abbr: 'beIN', name: 'beIN SPORTS France', note: 'Madagascar · Mauritius · Réunion · Mayotte', bg: '#5b2c8f', fg: '#ffffff', regions: ['indian'], url: 'https://www.beinsports.com/france/' },
    { id: 'sport24', abbr: '24', name: 'Sport 24', note: 'Live sport on airlines and cruise ships · Sport 24 & Sport 24 Extra (Emirates, Qatar Airways, Turkish Airlines, Etihad, Saudia, British Airways and more)', bg: '#0a0a0a', fg: '#f5e400', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], guide: 'https://sport24live.com/schedule/', url: 'https://sport24live.com/watch/', links: [{ label: 'Where to watch', url: 'https://sport24live.com/watch/' }, { label: 'Schedule', url: 'https://sport24live.com/schedule/' }, { label: 'Rights', url: 'https://sport24live.com/about/' }] },
    { id: 'zuku', name: 'Zuku TV', note: 'Satellite pay-TV · Kenya & East Africa (Wananchi Group) · sports: ESPN, ESPN 2, Punch TV, SportyTV, Liverpool TV', bg: '#ffffff', fg: '#1a1a1a', accent: '#6cb33f', regions: ['east'], url: 'https://zuku.co.ke', links: [{ label: 'Zuku TV', url: 'https://zuku.co.ke' }, { label: 'Channel list', url: 'https://zuku.co.ke/channel-list/' }] },
    { id: 'primevideo', name: 'Prime Video', note: 'Streaming · NBA games in South Africa and North Africa / Middle East (NBA on Prime, 11-year global deal from 2025-26)', bg: '#0f171e', fg: '#ffffff', accent: '#1a98ff', regions: ['south', 'mena'], stream: true, url: 'https://www.primevideo.com', links: [{ label: 'Prime Video', url: 'https://www.primevideo.com' }, { label: 'NBA schedule (South Africa)', url: 'https://www.nba.com/schedule?cal=all&region=40' }, { label: 'NBA schedule (Middle East & North Africa)', url: 'https://www.nba.com/schedule?cal=all&region=25' }] },
    { id: 'gamepass', name: 'NFL Game Pass', note: 'Direct-to-consumer streaming (DAZN)', stream: true, bg: '#013369', fg: '#ffffff', regions: ['east', 'south', 'west', 'franco', 'luso', 'mena', 'indian'], url: 'https://www.dazn.com' }
  ];

  const L = (f) => 'logos/channels/' + f;
  /* DStv numbers (Wikipedia "SuperSport" channel list, Nov 2026): shown as "DStv <Rest of Africa> · <South Africa>",
     the same way SuperSport LaLiga reads "DStv 224 · 204". One number = the same on both feeds (or one feed only). */
  const SS_PAIR = { events: [199, 199], blitz: [220, 200], grandstand: [221, 201], 'premier-league': [223, 203], laliga: [224, 204], football: [225, 205],
    'football-plus': [222, 206], kickoff: [227, 207], africa: [228, 208], action: [229, 209], 'extra-1': [230, 210], rugby: [231, 211], cricket: [232, 212],
    golf: [233, 213], tennis: [234, 214], motorsport: [235, 215], 'extra-2': [null, 217], wwe: [128, 128], 'maximo-1': [241, 241], 'maximo-2': [242, 242] };
  /* MultiChoice "New DStv & GOtv Package Channel List – November 2026" (packages from 5 Nov 2026).
     GOtv (DTT sheet, Uganda numbering 3xx; Kenya uses the same channels in the 5xx range – confirmed on gotvafrica.com/en-ke: Blitz 560, KickOff 561, Africa 562, LaLiga 563, Swahili 570):
     channel → [GOtv number, lowest GOtv package]  (Easy < Starter < Select < Sports) */
  A.SS_GOTV = { blitz: ['360', 'Easy'], kickoff: ['361', 'Starter'], africa: ['362', 'Easy'], laliga: ['363', 'Starter'], 'premier-league': ['364', 'Sports'],
    football: ['365', 'Select'], 'football-plus': ['366', 'Sports'], action: ['367', 'Sports'], 'extra-1': ['368', 'Sports'], wwe: ['369', 'Select'], swahili: ['370', 'Sports'] };
  /* DStv (DTH sheet): channel → lowest DStv package  (Starter < Select < Sports < Ultimate) */
  A.SS_DSTV_PKG = { events: 'Sports', swahili: 'Sports', 'extra-2': 'Ultimate', blitz: 'Starter', grandstand: 'Ultimate', 'football-plus': 'Sports', 'premier-league': 'Sports',
    laliga: 'Starter', football: 'Select', wwe: 'Select', kickoff: 'Starter', africa: 'Starter', action: 'Sports', 'extra-1': 'Ultimate', rugby: 'Ultimate', cricket: 'Ultimate',
    golf: 'Ultimate', tennis: 'Ultimate', motorsport: 'Ultimate', 'maximo-1': 'Ultimate', 'maximo-2': 'Ultimate' };
  const SS_NUM = Object.fromEntries(Object.entries(SS_PAIR).map(([k, [r, z]]) => [k, r || z]));
  const SS_LABEL = Object.fromEntries(Object.entries(SS_PAIR).map(([k, [r, z]]) => [k, !r ? `DStv ${z} · South Africa only` : r === z ? `DStv ${r}` : `DStv ${r} · ${z}`]));
  SS_LABEL['maximo-1'] = 'DStv 241 · Angola/Moz 601'; SS_LABEL['maximo-2'] = 'DStv 242 · Angola/Moz 602'; SS_LABEL.wwe = 'DStv 128 · ROA 226';
  /* SuperSport: every channel has English and Portuguese audio, except SuperSport Swahili (Kenya, Uganda, Tanzania only). */
  const ss = (id, name) => id === 'swahili'
    ? { id: 'ss-' + id, provider: 'supersport', name: 'SuperSport ' + name, short: name, logo: L('ss-' + id + '.png'), langs: ['sw'], regions: ['east'], countries: 'East Africa – Kenya · Uganda · Tanzania', num: 'DStv 216', no: 216 }
    : { id: 'ss-' + id, provider: 'supersport', name: 'SuperSport ' + name, short: name, logo: L('ss-' + id + '.png'), langs: ['en', 'pt'], num: SS_LABEL[id] || (SS_NUM[id] && 'DStv ' + SS_NUM[id]), no: SS_NUM[id] };
  A.CHANNELS = [
    ss('premier-league', 'Premier League'), ss('football', 'Football'), ss('football-plus', 'Football Plus'), ss('laliga', 'LaLiga'),
    ss('kickoff', 'KickOff'), ss('action', 'Action'), ss('blitz', 'Blitz'), ss('africa', 'Africa'), ss('swahili', 'Swahili'),
    ss('extra-1', 'Extra'), ss('extra-2', 'Extra 2'), ss('events', 'Events'), ss('grandstand', 'Grandstand'),
    ss('rugby', 'Rugby'), ss('cricket', 'Cricket'), ss('golf', 'Golf'), ss('tennis', 'Tennis'), ss('motorsport', 'Motorsport'),
    ss('wwe', 'WWE'), ss('maximo-1', 'Máximo 1'), ss('maximo-2', 'Máximo 2'),

    ...[1, 2, 3, 4, 5].map((n) => ({ id: 'cp-sport-' + n, provider: 'canalplus', name: 'CANAL+ SPORT ' + n, short: 'Sport ' + n, num: 'CANAL+ ' + (10 + n), no: 10 + n, logo: L(`cplus-sport-${n}.svg`) })),


    { id: 'st-world-football', provider: 'startimes', name: 'StarTimes World Football', short: 'World Football', wide: true, num: 'DTH 245 · DTT 260', no: 245, logos: { light: L('st-world-football-on-light.png'), dark: L('st-world-football-on-dark.png') } },
    { id: 'st-sports-premium', provider: 'startimes', name: 'StarTimes Sports Premium', short: 'Sports Premium', wide: true, num: 'DTH 246 · DTT 259', no: 246, logos: { light: L('st-sports-premium-on-light.png'), dark: L('st-sports-premium-on-dark.png') } },
    { id: 'st-sports-arena', provider: 'startimes', name: 'StarTimes Sports Arena', short: 'Sports Arena', wide: true, num: 'DTH 241 · DTT 257', no: 241, logos: { light: L('st-sports-arena-on-light.png'), dark: L('st-sports-arena-on-dark.png') } },
    { id: 'st-sports-life', provider: 'startimes', name: 'StarTimes Sports Life', short: 'Sports Life', wide: true, num: 'DTH 243 · DTT 253', no: 243, logos: { light: L('st-sports-life-on-light.png'), dark: L('st-sports-life-on-dark.png') } },
    { id: 'st-sports-focus', provider: 'startimes', name: 'StarTimes Sports Focus', short: 'Sports Focus', wide: true, num: 'DTH 240 · DTT 256', no: 240, logos: { light: L('st-sports-focus-on-light.png'), dark: L('st-sports-focus-on-dark.png') } },
    { id: 'st-beta', provider: 'startimes', name: 'StarTimes Beta Sports', short: 'Beta Sports', wide: true, num: 'DTH 244 · Nigeria', no: 244, countries: 'Nigeria', logos: { light: L('st-beta-on-light.png'), dark: L('st-beta-on-dark.png') } },
    { id: 'st-sanyuka', provider: 'fta', name: 'Sanyuka Prime', short: 'Sanyuka', num: 'DTT 251 · DTH 238', logo: L('st-sanyuka.png') },

    ...[1, 2, 3, 4, 5].map((n) => ({ id: 'azam-' + n, provider: 'azam', name: 'Azam Sports ' + n + ' HD', short: 'Sports ' + n, num: 'Azam TV ' + (110 + n), no: 110 + n, logo: L(`azam-sports-${n}.png`) })),
    { id: 'bein-sports', provider: 'bein', num: 'beIN 11', no: 11,  name: 'beIN SPORTS', short: 'Sports', logo: L('bein-sports.png') },
    { id: 'ss-tbc', provider: 'supersport', name: 'SuperSport (channel TBA)', short: 'SuperSport', langs: ['en', 'pt'], logo: L('ss-supersport.png') },
    { id: 'cp-tbc', provider: 'canalplus', name: 'CANAL+ Sport (chaîne à confirmer)', short: 'Sport', langs: ['fr'], logos: { light: L('canalplus-on-light.png'), dark: L('canalplus-on-dark.png') } },
    { id: 'bein-tbc', provider: 'bein', name: 'beIN SPORTS (channel TBA)', short: 'SPORTS', logo: L('bein-sports.png') },
    { id: 'st-tbc', provider: 'startimes', name: 'StarTimes Sports (channel TBA)', short: 'Sports', logo: L('startimes-star.png') },
    { id: 'azam-tbc', provider: 'azam', name: 'Azam Sports (channel TBA)', short: 'Sports', logo: L('azam-generic.png') },
    ...[['sabc', 'SABC Sport', 'South Africa'], ['btv', 'Botswana TV', 'Botswana'], ['rti', 'RTI', "Côte d'Ivoire"], ['rtnc', 'RTNC', 'DR Congo'], ['crtv', 'CRTV', 'Cameroon'],
        ['snrt', 'SNRT Arryadia', 'Morocco'], ['ontime', 'ON Time Sports', 'Egypt'], ['rba', 'RBA', 'Rwanda']]
      .map(([id, name, c]) => ({ id: 'fta-' + id, provider: 'fta', name, short: name, countries: c, logo: {"sabc": "logos/channels/fta-sabc.png", "btv": "logos/channels/fta-btv.png", "rtnc": "logos/channels/fta-rtnc.png", "crtv": "logos/channels/fta-crtv.png", "snrt": "logos/channels/fta-snrt.png", "rti": "logos/channels/fta-rti.png", "rba": "logos/channels/fta-rba.png"}[id] || null })),
    { id: 'zsports-1', provider: 'zap', name: 'Z Sports', short: 'Z Sports', num: 'ZAP 21', no: 21, langs: ['pt'], wide: true, logos: { light: L('zsports-1-on-light.png'), dark: L('zsports-1-on-dark.png') } },
    { id: 'zsports-2', provider: 'zap', name: 'Z Sports 2', short: 'Z Sports 2', num: 'ZAP 22', no: 22, langs: ['pt'], wide: true, logos: { light: L('zsports-2-on-light.png'), dark: L('zsports-2-on-dark.png') } },
    { id: 'zsports-laliga', provider: 'zap', name: 'Z Sports LaLiga', short: 'Z Sports LaLiga', num: 'ZAP 23', no: 23, langs: ['pt'], wide: true, logos: { light: L('zsports-laliga-on-light.png'), dark: L('zsports-laliga-on-dark.png') } },
    { id: 'zbc2', provider: 'zbc', name: 'ZBC 2', short: 'ZBC 2', logos: { light: L('zbc2-on-light.png'), dark: L('zbc2-on-dark.png') } },
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({ id: 'bein-' + n, provider: 'bein', num: 'beIN ' + n, no: n, name: 'beIN SPORTS ' + n, short: 'Sports ' + n, logo: L(`bein-${n}.png`) })),
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ id: 'bein-xtra-' + n, provider: 'bein', num: 'beIN ' + (40 + n), no: 40 + n, name: 'beIN SPORTS XTRA ' + n, short: 'Xtra ' + n, logo: L(`bein-xtra-${n}.png`) })),
    ...[1, 2, 3, 4, 5, 6].map((n) => ({ id: 'bein-max-' + n, provider: 'bein', num: 'beIN ' + (700 + n), no: 700 + n, name: 'beIN SPORTS MAX ' + n, short: 'Max ' + n, logo: L(`bein-max-${n}.png`) })),
    ...[1, 2].map((n) => ({ id: 'bein-english-' + n, provider: 'bein', num: 'beIN ' + (20 + n), no: 20 + n, name: 'beIN SPORTS English ' + n, short: 'English ' + n, logo: L(`bein-english-${n}.png`) })),
    ...[1, 2].map((n) => ({ id: 'bein-french-' + n, provider: 'bein', num: 'beIN ' + (25 + n), no: 25 + n, name: 'beIN SPORTS French ' + n, short: 'French ' + n, logo: L(`bein-french-${n}.png`) })),
    { id: 'bein-afc', provider: 'bein', name: 'beIN SPORTS AFC', short: 'AFC', logo: L('bein-afc.png') },
    ...[1, 2, 3, 4, 5, 6].map((n) => ({ id: 'bein-afc-' + n, provider: 'bein', name: 'beIN SPORTS AFC ' + n, short: 'AFC ' + n, logo: L(`bein-afc-${n}.png`) })),
    { id: 'bein-nba', provider: 'bein', name: 'beIN NBA', short: 'NBA', logo: L('bein-nba.png') },
    { id: 'bein-4k', provider: 'bein', num: 'beIN 14', no: 14,  name: 'beIN 4K', short: '4K', logo: L('bein-4k.png') },
    { id: 'bein-news', provider: 'bein', num: 'beIN 10', no: 10,  name: 'beIN SPORTS News', short: 'News', logo: L('bein-news.png') },
    { id: 'espn', provider: 'espn', name: 'ESPN', short: 'ESPN', num: 'DStv 218 · Azam 120 · StarTimes 248 · Zuku 712 · ZAP 31', no: 218, gotv: ['556 (Kenya) · 356 (Uganda)', 'GOtv Starter and up'], logo: L('espn-africa.png') },
    { id: 'espn2', provider: 'espn', name: 'ESPN 2', short: 'ESPN 2', num: 'DStv 219 · Azam 121 · StarTimes 249 · Zuku 713 · ZAP 32', no: 219, gotv: ['357 (Uganda)', 'GOtv Sports'], logo: L('espn2-africa.png') },
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({ id: 'nws-' + n, provider: 'nws', name: 'NW Sport ' + n, short: 'Sport ' + n, logo: L(`nws-sport-${n}.png`) })),
    { id: 's24', provider: 'sport24', name: 'Sport 24', short: 'Sport 24', wide: true, num: 'In flight · At sea', logos: { light: L('sport24-on-light.png'), dark: L('sport24-on-dark.png') } },
    { id: 's24-extra', provider: 'sport24', name: 'Sport 24 Extra', short: 'Sport 24 Extra', wide: true, num: 'In flight · At sea', logos: { light: L('sport24-extra-on-light.png'), dark: L('sport24-extra-on-dark.png') } },
    { id: 'zuku-punch', provider: 'zuku', name: 'Punch TV', short: 'Punch TV', wide: true, num: 'Zuku 714', no: 714, pkg: 'Zuku Smart and up', logos: { light: L('zuku-punch-tv-on-light.png'), dark: L('zuku-punch-tv-on-dark.png') } },
    { id: 'zuku-lfctv', provider: 'zuku', name: 'Liverpool TV', short: 'LFC TV', num: 'Zuku 721', no: 721, pkg: 'Zuku Premium', logo: L('zuku-lfctv.png') },
    { id: 'prime-video', provider: 'primevideo', name: 'Prime Video', short: 'Prime Video', wide: true, num: 'Streaming · South Africa, North Africa & Middle East', logos: { light: L('prime-video-on-light.png'), dark: L('prime-video-on-dark.png') } },
    { id: 'sportytv', provider: 'sportytv', name: 'SportyTV', short: 'SportyTV', logo: L('sportytv.png'), num: 'DStv 237 · 236 · Zuku 720', no: 237, countries: 'South Africa · Nigeria · Kenya · Ghana', gotv: ['558 (Kenya) · 58 (Nigeria) · 36 (Ghana)', 'GOtv Starter and up'] },
    { id: 'dazn', provider: 'dazn', name: 'DAZN', short: 'DAZN', logos: { light: L('dazn-on-light.png'), dark: L('dazn-on-dark.png') } },
    { id: 'apple-tv', provider: 'appletv', name: 'Apple TV', short: 'Apple TV', wide: true, logos: { light: L('apple-tv-on-light.png'), dark: L('apple-tv-on-dark.png') } },
    { id: 'beinfr-tbc', provider: 'beinfr', name: 'beIN SPORTS France (channel TBA)', short: 'France', logo: L('bein-sports.png') },
    { id: 'nba-lp', provider: 'nba', name: 'NBA League Pass', short: 'League Pass', wide: true, logos: { light: L('nba-league-pass-on-light.png'), dark: L('nba-league-pass-on-dark.png') } },
    { id: 'f1tv', provider: 'f1tv', name: 'F1 TV', short: 'F1 TV', wide: true, logos: { light: L('f1tv-on-light.png'), dark: L('f1tv-on-dark.png') } },
    { id: 'videopass', provider: 'videopass', name: 'MotoGP VideoPass', short: 'VideoPass', wide: true, logos: { light: L('motogp-videopass-on-light.png'), dark: L('motogp-videopass-on-dark.png') } },
    { id: 'gamepass', provider: 'gamepass', name: 'NFL Game Pass', short: 'Game Pass', wide: true, logos: { light: L('nfl-gamepass-on-light.png'), dark: L('nfl-gamepass-on-dark.png') } },
    /* SuperSport OTT feeds – DStv Stream only (no satellite). 244 = AWSN (24/7 women's sport, since 1 Aug 2025);
     * 245–248 and 950–952 carry overflow live events that have no linear channel. */
    { id: 'awsn', provider: 'supersport', name: 'SuperSport AWSN', short: 'AWSN 244', num: 'DStv Stream 244', no: 244, streamOnly: true, wide: true, logo: L('ss-stream-244.png'), langs: ['en'] },
    ...['245', '246', '247', '248', '950', '951', '952'].map((n) => ({ id: 'ss-stream-' + n, provider: 'supersport', name: 'SuperSport Stream ' + n, short: n, num: 'DStv Stream ' + n, no: +n, streamOnly: true, wide: true, logo: L('ss-stream-' + n + '.png'), langs: ['en'] })),
  ];
  /* sort keys for lists: channel number where known, otherwise the broadcaster's own order (beIN 1–10, then XTRA, MAX …) */
  A.CHANNELS.forEach((c) => {
    if (c.no != null) return;
    const id = c.id; let m;
    if (/-tbc$/.test(id)) c.no = 9999;
    else if ((m = /^bein-(\d+)$/.exec(id))) c.no = +m[1];
    else if ((m = /^bein-xtra-(\d+)$/.exec(id))) c.no = 100 + +m[1];
    else if ((m = /^bein-max-(\d+)$/.exec(id))) c.no = 200 + +m[1];
    else if ((m = /^bein-english-(\d+)$/.exec(id))) c.no = 300 + +m[1];
    else if ((m = /^bein-french-(\d+)$/.exec(id))) c.no = 400 + +m[1];
    else if ((m = /^bein-afc-?(\d*)$/.exec(id))) c.no = 500 + (+m[1] || 0);
    else if ((m = /-(\d+)$/.exec(id))) c.no = +m[1];
    else c.no = { 'bein-nba': 600, 'bein-4k': 601, 'bein-news': 602, 'bein-sports': 650 }[id] || 1000;
  });
  { const pi = (c) => { const i = A.PROVIDERS.findIndex((p) => p.id === c.provider); return i < 0 ? 99 : i; };
    A.CHANNELS.sort((a, b) => pi(a) - pi(b) || a.no - b.no); }   // filters and lists follow channel numbers
  A.channelsOf = (pid) => A.CHANNELS.filter((c) => c.provider === pid && !/-tbc$/.test(c.id)).sort((a, b) => a.no - b.no || a.name.localeCompare(b.name));

  /* Logo for a background. A channel can have one `logo`, or `logos: { light, dark }` where
   * `light` is the version made for light backgrounds (dark ink) and `dark` the one for dark backgrounds (white ink).
   * To swap a logo, just replace the file; to add variants, add a `logos` entry. */
  A.logoFor = (ch, bg = 'light') => (ch.logos && (ch.logos[bg] || ch.logos.light || ch.logos.dark)) || ch.logo || null;
  A.hasLogo = (ch) => !!(ch.logo || ch.logos);

  /* beIN SPORTS MENA (North Africa & Middle East) – which channels carry which competitions.
   * Taken from beIN's own match posters (the channel tiles at the bottom left). The exact channel can change
   * per match, so `main` is the usual line-up. beIN CONNECT is a platform (see A.PLATFORMS). */
  A.BEIN_MENA = [
    { label: 'Premier League', sport: 'football', comp: /^(english )?premier league\b/i, main: ['bein-1', 'bein-english-1', 'bein-4k'], also: ['bein-2', 'bein-3'] },
    { label: 'AFCON PAMOJA 2027 qualifiers', sport: 'football', comp: /afcon|africa cup of nations/i, main: ['bein-tbc'] },
    { label: 'AFC Asian Cup', sport: 'football', comp: /afc asian cup|^asian cup/i, main: ['bein-tbc'] },
    { label: 'ATP tennis', sport: 'tennis', comp: /^atp\b/i, main: ['bein-tbc'] },
    { label: 'LaLiga', sport: 'football', comp: /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i, main: ['bein-1', 'bein-english-1'], also: ['bein-2'] },
    { label: 'Carabao Cup', sport: 'football', comp: /carabao|efl cup|league cup/i, main: ['bein-1', 'bein-english-1'], also: ['bein-4'] },
    { label: 'Formula 1', sport: 'f1', comp: /formula ?1|\bF1\b/i, main: ['bein-8', 'bein-english-1', 'bein-4k'], also: ['bein-english-2'] },
    { label: 'MotoGP', sport: 'motogp', comp: /motogp/i, main: ['bein-8', 'bein-english-1'], also: ['bein-9'] },
    { label: 'NBA', sport: 'basketball', comp: /\bNBA\b/i, main: ['bein-7', 'bein-english-1'] },
    { label: 'NFL', sport: 'nfl', comp: /\bNFL\b/i, main: ['bein-8', 'bein-english-2'] }
  ];
  /* Azam TV (Tanzania · Uganda · Kenya · Malawi · Rwanda · Zimbabwe …) – from Azam's own match posters.
   * Azam TV Max (the app) streams every Azam Sports channel. */
  A.AZAM = [
    { label: 'LaLiga', sport: 'football', comp: /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i, main: ['azam-4'] },
    { label: 'Bundesliga', sport: 'football', comp: /^bundesliga/i, main: ['azam-2'] },
    { label: 'Serie A', sport: 'football', comp: /serie a/i, main: ['azam-3'] },
    { label: 'Carabao Cup', sport: 'football', comp: /carabao|efl cup|league cup/i, main: ['azam-1'], also: ['azam-2', 'azam-4', 'azam-5', 'zbc2'] },
    { label: "Women's Super League", sport: 'football', comp: /women'?s super league|\bwsl\b/i, main: ['azam-1'], also: ['azam-2'] },
    { label: "CAF Women's Champions League", sport: 'football', comp: /caf women/i, main: ['azam-1'], also: ['azam-5', 'zbc2'] },
    { label: 'AFCON 2027 Qualifiers', sport: 'football', comp: /afcon|africa cup of nations/i, main: ['azam-2'] },
    { label: 'AFC Asian Cup', sport: 'football', comp: /afc asian cup|^asian cup/i, main: ['azam-tbc'] }
  ];
  /* StarTimes (Kenya · Uganda · Tanzania · Nigeria …) – from StarTimes' own posters. StarTimes ON (app) streams them all. */
  A.STARTIMES = [
    { label: 'LaLiga', sport: 'football', comp: /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i, main: ['st-sports-premium'], also: ['st-sports-life'] },
    { label: 'Bundesliga', sport: 'football', comp: /^bundesliga/i, main: ['st-world-football'], also: ['st-sports-arena', 'st-sports-focus'] },
    { label: 'Carabao Cup', sport: 'football', comp: /carabao|efl cup|league cup/i, main: ['st-world-football'], also: ['st-sports-premium', 'st-sports-arena', 'st-sports-focus'] },
    { label: 'Saudi Pro League', sport: 'football', comp: /saudi|roshn/i, main: ['st-sports-premium'], also: ['st-sports-life'] },
    { label: 'Uganda Premier League', sport: 'football', comp: /uganda premier/i, main: ['st-sanyuka'] },
    { label: 'AEW Wrestling', sport: 'wwe', comp: /\baew\b/i, main: ['st-sports-arena'] },
    { label: 'AFC Asian Cup', sport: 'football', comp: /afc asian cup|^asian cup/i, main: ['st-tbc'] }
  ];
  /* ESPN Africa (sub-Saharan Africa; English). Top 14: 4 live matches a week + 6 play-off games (deal announced 16 Apr 2026). */
  A.ESPN = [
    { label: 'Top 14', sport: 'rugby', comp: /^top ?14\b/i, main: ['espn', 'espn2'] },
    { label: 'Japan Rugby League One', sport: 'rugby', comp: /league one|japan rugby/i, main: ['espn', 'espn2'] },
    { label: 'Saudi Pro League', sport: 'football', comp: /saudi|roshn/i, main: ['espn', 'espn2'] },
    { label: 'NBA', sport: 'basketball', comp: /^nba\b/i, main: ['espn', 'espn2'] },
    { label: 'NFL', sport: 'nfl', comp: /^nfl\b/i, main: ['espn', 'espn2'] },
    { label: 'MLB (selected games, Pan-Africa)', sport: 'mlb', comp: /^mlb\b|major league baseball|world series/i, main: ['espn', 'espn2'] }
  ];
  /* CANAL+ Afrique (CANAL+ SPORT 1–5, French; some matches in English) – from CANAL+ "À voir cette semaine" posters. */
  /* Exact channels a broadcaster has announced for single fixtures. Matched on both teams and the EAT date;
   * the listed channels replace that broadcaster's "TBA" placeholder. Hosted feeds can add more ("assignments": [...]). */
  A.FIXTURE_CHANNELS = [
    // CANAL+ Afrique · AFCON 2027 qualifiers, group stage matchday 3 (Thursday 12 November 2026)
    { date: '2026-11-12', teams: ['DR Congo', 'Sierra Leone'], channels: ['cp-sport-1'] },
    { date: '2026-11-12', teams: ['Senegal', 'Sudan'], channels: ['cp-sport-1'] },
    { date: '2026-11-12', teams: ["Côte d'Ivoire", 'Gambia'], channels: ['cp-sport-2'] },
    { date: '2026-11-12', teams: ['Cameroon', 'Namibia'], channels: ['cp-sport-3'] },
    { date: '2026-11-12', teams: ['Benin', 'Central African Republic'], channels: ['cp-sport-4'] },
  ];
  A.CANALPLUS = [
    { label: 'AFCON PAMOJA 2027 qualifiers (French)', sport: 'football', comp: /afcon|africa cup of nations/i, main: ['cp-tbc'] },
    { label: 'ATP tennis', sport: 'tennis', comp: /^atp\b/i, main: ['cp-sport-5'] },
    { label: 'WTA tennis', sport: 'tennis', comp: /^wta\b/i, main: ['cp-sport-5'] },
    { label: 'UEFA Champions League', sport: 'football', comp: /^(uefa )?champions league\b/i, main: ['cp-sport-2'], also: ['cp-sport-1', 'cp-sport-3', 'cp-sport-4', 'cp-sport-5'] },
    { label: 'Premier League', sport: 'football', comp: /^(english )?premier league\b/i, main: ['cp-sport-3'], also: ['cp-sport-4'] },
    { label: 'LaLiga', sport: 'football', comp: /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i, main: ['cp-sport-4'], also: ['cp-sport-3'] },
    { label: 'Ligue 1', sport: 'football', comp: /^ligue 1\b/i, main: ['cp-sport-1'], also: ['cp-sport-2'] },
    { label: 'Bundesliga', sport: 'football', comp: /^bundesliga\b/i, main: ['cp-sport-1'], also: ['cp-sport-2'] },
    { label: 'NBA', sport: 'basketball', comp: /^nba\b/i, main: ['cp-sport-4'] },
    { label: 'Formula 1', sport: 'f1', comp: /formula ?1|\bF1\b/i, main: ['cp-sport-4'], also: ['cp-sport-1', 'cp-sport-2'] },
    { label: 'MotoGP', sport: 'motogp', comp: /^motogp/i, main: ['cp-sport-1'], also: ['cp-sport-4'] },
    { label: 'Top 14', sport: 'rugby', comp: /^top ?14\b/i, main: ['cp-sport-1'] }
  ];
  /* ZAP (Angola · Mozambique) – Z Sports channels, from Wikipedia "Z Sports – List of channels" */
  A.ZAP = [
    { label: 'LaLiga', sport: 'football', comp: /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i, main: ['zsports-laliga'], auto: true },
    { label: 'Bundesliga & DFB-Pokal', sport: 'football', comp: /^(bundesliga|dfb-pokal)/i, main: ['zsports-2'], auto: true },
    { label: 'Serie A & Coppa Italia', sport: 'football', comp: /^(serie a|coppa italia)\b/i, main: ['zsports-2'], auto: true },
    { label: 'Girabola', sport: 'football', comp: /girabola/i, main: ['zsports-1'], auto: true },
    { label: 'FIFA World Cup 2026', sport: 'football', comp: /fifa world cup/i, main: ['zsports-1'], auto: true },
    { label: 'African MMA Championship (FAMMA)', sport: 'mma', comp: /famma|african mma/i, main: ['zsports-1', 'zsports-2'], auto: true },
    { label: 'Basketball', sport: 'basketball', comp: /^(bai basket|angola)/i, main: ['zsports-1'] }
  ];
  /* SuperSport (DStv · GOtv · DStv Stream) – from DStv posters. */
  A.SUPERSPORT = [
    { label: 'AFCON PAMOJA 2027 qualifiers', sport: 'football', comp: /afcon|africa cup of nations/i, main: ['ss-tbc'] },
    { label: 'ATP & WTA tennis', sport: 'tennis', comp: /^(atp|wta)\b/i, main: ['ss-tennis'], also: ['ss-grandstand'] },
    { label: 'Premier League', sport: 'football', comp: /^(english )?premier league\b/i, main: ['ss-premier-league'] },
    { label: 'LaLiga (every match)', sport: 'football', comp: /^la ?liga\b(?!.*(hypermotion|2\b|f\b|women))/i, main: ['ss-laliga'], also: ['ss-maximo-1'] }
  ];
  /* "F1 · MotoGP · NFL" for a channel, used in the channel picker */
  A.sportsFor = (chId) => {
    const ch = A.channel(chId); const map = ch.provider === 'bein' ? A.BEIN_MENA : ch.provider === 'azam' || ch.provider === 'zbc' ? A.AZAM : ch.provider === 'startimes' ? A.STARTIMES : ch.provider === 'espn' ? A.ESPN : ch.provider === 'canalplus' ? A.CANALPLUS : ch.provider === 'supersport' ? A.SUPERSPORT : ch.provider === 'zap' ? A.ZAP : null;
    if (!map) return [];
    return map.filter((r) => r.main.concat(r.also || []).indexOf(chId) >= 0).map((r) => r.label);
  };
  A.beinSportsFor = A.sportsFor;

  /* PLATFORMS – not channels: pay-TV platforms (kind 'tv': DStv, CANAL+) and streaming apps (kind 'stream'). A platform carries the linear channels of one or more broadcasters,
   * so it is worked out from a match's channels and shown as "Stream on", never listed as a channel. */
  A.PLATFORMS = [
    { id: 'dstv', name: 'DStv', kind: 'tv', providers: ['supersport', 'espn', 'awsn', 'sportytv'], logos: { light: L('dstv-on-light.png'), dark: L('dstv-on-dark.png') }, regions: ['east', 'south', 'west', 'luso'], url: 'https://www.dstv.com' },
    { id: 'canalplus-platform', name: 'CANAL+', kind: 'tv', providers: ['canalplus'], logos: { light: L('canalplus-on-light.png'), dark: L('canalplus-on-dark.png') }, regions: ['franco', 'indian', 'east'], url: 'https://www.canalplus-afrique.com' },
    { id: 'disney-plus', name: 'Disney+', kind: 'stream', providers: ['espn'], logos: { light: L('disney-plus-on-light.png'), dark: L('disney-plus-on-dark.png') }, regions: ['south'], countries: 'South Africa', url: 'https://www.disneyplus.com/en-za' },
    { id: 'dstv-stream', name: 'DStv Stream', kind: 'stream', providers: ['supersport', 'espn', 'awsn', 'sportytv'], logos: { light: L('dstv-stream-on-light.png'), dark: L('dstv-stream-on-dark.png') }, regions: ['east', 'south', 'west', 'luso'], url: 'https://dstv.stream/#/' },
    { id: 'azam-max', name: 'Azam TV Max', kind: 'stream', providers: ['azam', 'zbc'], logo: L('azam-max.png'), regions: ['east', 'south'], url: 'https://web.azamtvmax.com' },
    { id: 'startimes-on', name: 'StarTimes ON', kind: 'stream', providers: ['startimes'], logos: { light: L('startimes-on-on-light.png'), dark: L('startimes-on-on-dark.png') }, regions: ['east', 'west', 'south', 'franco'], url: 'https://m.startimestv.com/browser/live' },
    { id: 'bein-connect', name: 'beIN SPORTS CONNECT', kind: 'stream', providers: ['bein'], logos: { light: L('bein-connect-on-light.svg'), dark: L('bein-connect-on-dark.svg') }, regions: ['mena'], url: 'https://connect.beinsports.com' },
    { id: 'zuku-tv', name: 'Zuku', kind: 'tv', providers: ['zuku', 'espn', 'sportytv'], logos: { light: L('zuku-on-light.png'), dark: L('zuku-on-dark.png') }, regions: ['east'], countries: 'Kenya · Uganda · Tanzania', url: 'https://zuku.co.ke' },
    { id: 'prime-video', name: 'Prime Video', kind: 'stream', providers: ['primevideo'], logos: { light: L('prime-video-on-light.png'), dark: L('prime-video-on-dark.png') }, regions: ['south', 'mena'], countries: 'South Africa · North Africa · Middle East', url: 'https://www.primevideo.com' },
  ];
  A.streamingPlatform = (id) => A.PLATFORMS.find((p) => p.id === id);
  /* platforms that stream at least one of these channels */
  A.platformsFor = (channels) => A.PLATFORMS.filter((p) => channels.some((c) => { const ch = A.channel(c);
    return p.providers.indexOf(ch.provider) >= 0 && !(ch.streamOnly && p.kind === 'tv'); })).map((p) => p.id);
  A.addPlatforms = (list = []) => list.forEach((p) => { if (p && p.id && Array.isArray(p.providers || [])) { const i = A.PLATFORMS.findIndex((y) => y.id === p.id); if (i < 0) A.PLATFORMS.push(Object.assign({ providers: [] }, p)); else A.PLATFORMS[i] = Object.assign({}, A.PLATFORMS[i], p); } });

  A.provider = (id) => A.PROVIDERS.find((p) => p.id === id) || { id, name: id, bg: '#333', fg: '#fff', regions: [] };
  A.channel = (id) => A.CHANNELS.find((c) => c.id === id) || { id, provider: 'other', name: id, short: id };
  /* Feeds/plugins can add channels or providers at runtime */
  /* add new entries, or update an existing one (feed entries change names, numbers, links and logos over the air) */
  const upsert = (arr, x) => { if (!x || !x.id) return; const i = arr.findIndex((y) => y.id === x.id); if (i < 0) arr.push(x); else arr[i] = Object.assign({}, arr[i], x); };
  /* a bundled (offline) logo wins over the same logo hosted on GitHub for older app versions */
  const local = (c) => c && ((c.logo && !/^https?:/.test(c.logo)) || (c.logos && c.logos.light && !/^https?:/.test(c.logos.light)));
  A.addChannels = (list = []) => list.forEach((c) => { if (!c || !c.id) return; const old = A.CHANNELS.find((y) => y.id === c.id);
    if (old && local(old)) { c = Object.assign({}, c); delete c.logo; delete c.logos; } upsert(A.CHANNELS, c); });
  /* broadcaster landing pages (provider.url + provider.links); feed entries can add or change them over the air */
  A.providerLinks = (pid) => { const p = A.provider(pid); if (!p) return []; const l = (p.links || []).filter((x) => x && x.url);
    return l.length ? l : p.url ? [{ label: p.name, url: p.url }] : []; };
  A.addProviders = (list = []) => list.forEach((p) => upsert(A.PROVIDERS, p));
})(window.ASBH);
