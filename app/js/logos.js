/* Logo packs. Drop files into web/logos/teams/ and web/logos/competitions/ and map them here
 * (key = slug of the name as it appears in the schedule, e.g. "manchester-city").
 * Without a logo the app draws a clean monogram crest / text badge, so nothing breaks.
 * Plugins and feeds can also extend these maps at runtime. */
(function (A) {
  'use strict';
  A.TEAM_LOGOS = Object.assign({
    // 'manchester-city': 'logos/teams/manchester-city.png',
  }, A.TEAM_LOGOS || {});
  A.COMP_LOGOS = Object.assign({}, A.COMP_LOGOS || {});   // exact slug → logo overrides (feeds/plugins)
  /* Competition logos, matched on the competition name. Anchored so that e.g. "Uganda Premier League",
   * "Saudi Pro League", "CAF Champions League" and "Women's FA Cup" do NOT pick up the wrong logo. */
  A.INDIVIDUAL = /^(tennis|boxing|mma|ufc|golf|wwe|cycling|athletics|f1|motogp|other)$/;
  A.COMP_RULES = [
    /* 2.1.6: short names used by the live guides */
    [/^(epl|pl)$|^premier league$/i, 'logos/competitions/premier-league.png'],
    /* 2.2.1 */
    [/^mls\b|major league soccer|^leagues cup/i, { light: 'logos/competitions/mls-on-light.png', dark: 'logos/competitions/mls-on-dark.png' }],
    [/afc asian cup|^asian cup/i, { light: 'logos/competitions/afc-asian-cup.png', dark: 'logos/competitions/afc-asian-cup-on-dark.png' }],
    [/^nwsl\b|national women'?s soccer league/i, 'logos/competitions/w2-nwsl.webp'],
    [/^aflw\b|^afl women/i, 'logos/competitions/w2-aflw.webp'],
    [/uefa (european )?u-?19|under-19 championship/i, { light: 'logos/competitions/w2-uefa-u19.webp', dark: 'logos/competitions/w2-uefa-u19-on-dark.webp' }],
    [/^(cfb|college football|ncaa football)\b/i, 'logos/competitions/w2-college-football.webp'],
    [/major league table tennis|^mltt\b/i, 'logos/competitions/w2-mltt.webp'],
    [/^ferrari challenge/i, { light: 'logos/competitions/w2-ferrari-challenge.webp', dark: 'logos/competitions/w2-ferrari-challenge-on-dark.webp' }],
    [/^sailgp\b/i, 'logos/competitions/w2-sailgp.webp'],
    [/^(lpb|liga portuguesa de basquetebol|liga betclic basket)/i, 'logos/competitions/w2-lpb.webp'],
    [/monday night (football|kickoff)|^nfl\b/i, 'logos/competitions/nfl.png'],
    [/^efl$|^(sky bet )?championship$|^efl championship/i, 'logos/competitions/wiki-efl-championship.png'],
    [/^(mf pro|misfits)/i, {"light": "logos/competitions/misfits-boxing.png", "dark": "logos/competitions/misfits-boxing-on-dark.png"}],
    [/^basketball champions league|^bcl\b/i, {"light": "logos/competitions/wiki-basketball-champions-league.png", "dark": "logos/competitions/wiki-basketball-champions-league-on-dark.png"}],
    [/^(liga acb|liga endesa)/i, {"light": "logos/competitions/wiki-liga-acb.png", "dark": "logos/competitions/wiki-liga-acb-on-dark.png"}],
    [/^ncaa (men'?s )?basketball/i, {"light": "logos/competitions/wiki-ncaa-basketball.png", "dark": "logos/competitions/wiki-ncaa-basketball.png"}],
    [/^super league basketball/i, {"light": "logos/competitions/wiki-super-league-basketball.png", "dark": "logos/competitions/wiki-super-league-basketball-on-dark.png"}],
    [/^international cricket|^icc\b/i, {"light": "logos/competitions/wiki-international-cricket.png", "dark": "logos/competitions/wiki-icc-on-dark.png"}],
    [/tour de france/i, {"light": "logos/competitions/wiki-tour-de-france.png", "dark": "logos/competitions/wiki-tour-de-france-on-dark.png"}],
    [/^2\.? ?bundesliga/i, {"light": "logos/competitions/wiki-2-bundesliga.png", "dark": "logos/competitions/wiki-2-bundesliga.png"}],
    [/^afc women'?s champions league/i, {"light": "logos/competitions/wiki-afc-women-s-champions-league.png", "dark": "logos/competitions/wiki-afc-women-s-champions-league.png"}],
    [/carling (black label )?knockout/i, {"light": "logos/competitions/wiki-carling-knockout.png", "dark": "logos/competitions/wiki-carling-knockout.png"}],
    [/^dfb-?pokal/i, {"light": "logos/competitions/wiki-dfb-pokal.png", "dark": "logos/competitions/wiki-dfb-pokal.png"}],
    [/^(efl|sky bet) championship/i, {"light": "logos/competitions/wiki-efl-championship.png", "dark": "logos/competitions/wiki-efl-championship.png"}],
    [/^(efl )?league two/i, {"light": "logos/competitions/wiki-efl-league-two.png", "dark": "logos/competitions/wiki-efl-league-two.png"}],
    [/^ligue 2/i, {"light": "logos/competitions/wiki-ligue-2.png", "dark": "logos/competitions/wiki-ligue-2.png"}],
    [/^(vanarama |enterprise )?national league/i, {"light": "logos/competitions/wiki-national-league.png", "dark": "logos/competitions/wiki-national-league-on-dark.png"}],
    [/^saudi pro league|^roshn/i, {"light": "logos/competitions/wiki-saudi-pro-league.png", "dark": "logos/competitions/wiki-saudi-pro-league.png"}],
    [/^scottish premiership|^spfl/i, {"light": "logos/competitions/wiki-scottish-premiership.png", "dark": "logos/competitions/wiki-scottish-premiership.png"}],
    [/^s[uü]per lig/i, {"light": "logos/competitions/wiki-super-lig.png", "dark": "logos/competitions/wiki-super-lig-on-dark.png"}],
    [/^asian tour/i, {"light": "logos/competitions/wiki-asian-tour.png", "dark": "logos/competitions/wiki-asian-tour.png"}],
    [/^sunshine tour/i, {"light": "logos/competitions/wiki-sunshine-tour.png", "dark": "logos/competitions/wiki-sunshine-tour.png"}],
    [/french handball|starligue|lnh/i, {"light": "logos/competitions/wiki-french-handball.png", "dark": "logos/competitions/wiki-french-handball.png"}],
    [/premier padel/i, {"light": "logos/competitions/wiki-premier-padel.png", "dark": "logos/competitions/wiki-premier-padel.png"}],
    [/world triathlon/i, {"light": "logos/competitions/wiki-world-triathlon.png", "dark": "logos/competitions/wiki-world-triathlon.png"}],
    [/^aew\b|all elite wrestling/i, {"light": "logos/competitions/wiki-aew.png", "dark": "logos/competitions/wiki-aew.png"}],
    [/^matchroom/i, {"light": "logos/competitions/wiki-matchroom-boxing.png", "dark": "logos/competitions/wiki-matchroom-boxing.png"}],
    [/^one (championship|friday fights)/i, {"light": "logos/competitions/wiki-one-championship.png", "dark": "logos/competitions/wiki-one-championship-on-dark.png"}],
    [/laliga hypermotion|segunda divisi/i, {"light": "logos/competitions/wiki-laliga-hypermotion.png", "dark": "logos/competitions/wiki-laliga-hypermotion.png"}],
    [/girabola/i, {"light": "logos/competitions/wiki-girabola.png", "dark": "logos/competitions/wiki-girabola.png"}],
    [/riyadh season/i, {"light": "logos/competitions/wiki-riyadh-season.png", "dark": "logos/competitions/wiki-riyadh-season.png"}],
    [/(women'?s )?big bash|\bw?bbl\b/i, 'logos/competitions/bbl.png'],
    [/pro ?20/i, 'logos/competitions/pro20-cup.png'],
    [/^nations championship/i, 'logos/competitions/nations-championship.png'],
    [/afcon.*qualif|africa cup of nations.*qualif/i, 'logos/competitions/afcon-qualifiers.png'],
    [/caf women'?s champions league/i, 'logos/competitions/caf-womens-champions-league.png'],
    [/uefa women'?s champions league|^uwcl/i, { light: 'logos/competitions/champions-league-on-light.png', dark: 'logos/competitions/champions-league-on-dark.png' }],
    [/^dp world tour/i, { light: 'logos/competitions/dp-world-tour-on-light.png', dark: 'logos/competitions/dp-world-tour-on-dark.png' }],
    [/^(indian premier league|ipl)\b/i, { light: 'logos/competitions/ipl-on-light.png', dark: 'logos/competitions/ipl-on-dark.png' }],
    [/^(women'?s premier league|wpl)\b/i, { light: 'logos/competitions/wpl-on-light.png', dark: 'logos/competitions/wpl-on-dark.png' }],
    [/^ufc\b/i, 'logos/competitions/ufc.png'],
    [/^pfl africa\b/i, { light: 'logos/competitions/pfl-africa-on-light.png', dark: 'logos/competitions/pfl-africa-on-dark.png' }],
    [/^(pfl|professional fighters league)\b/i, { light: 'logos/competitions/pfl-on-light.png', dark: 'logos/competitions/pfl-on-dark.png' }],
    [/^wwe\b/i, { light: 'logos/competitions/wwe-on-light.png', dark: 'logos/competitions/wwe-on-dark.png' }],
    [/^wbc\b|world boxing council/i, { light: 'logos/competitions/wbc-on-light.png', dark: 'logos/competitions/wbc-on-dark.png' }],
    [/^(icc )?women'?s t20 world cup\b/i, { light: 'logos/competitions/womens-t20-world-cup-on-light.png', dark: 'logos/competitions/womens-t20-world-cup-on-dark.png' }],
    [/^(icc )?(men'?s )?t20 world cup\b|^icc t20\b/i, { light: 'logos/competitions/t20-world-cup-on-light.png', dark: 'logos/competitions/t20-world-cup-on-dark.png' }],
    [/^(icc )?(men'?s )?cricket world cup\b|^icc world cup\b/i, { light: 'logos/competitions/cricket-world-cup-on-light.png', dark: 'logos/competitions/cricket-world-cup-on-dark.png' }],
    [/^(tata )?(ipl|indian premier league)\b/i, 'logos/competitions/ipl.png'],
    [/^(tata )?(wpl|women'?s premier league)\b/i, { light: 'logos/competitions/wpl-on-light.png', dark: 'logos/competitions/wpl-on-dark.png' }],
    [/^(formula ?1|f1)\b(?! ?tv)/i, 'logos/competitions/f1.png'],
    [/^australian open\b/i, 'logos/competitions/australian-open.png'],
    [/^(roland[- ]garros|french open)\b/i, 'logos/competitions/roland-garros.png'],
    [/^(wimbledon|the championships)\b/i, 'logos/competitions/wimbledon.png'],
    [/^us open\b(?!.*golf)/i, { light: 'logos/competitions/us-open-on-light.png', dark: 'logos/competitions/us-open-on-dark.png' }],
    [/^atp\b/i, { light: 'logos/competitions/atp-on-light.png', dark: 'logos/competitions/atp-on-dark.png' }],
    [/^wta\b/i, { light: 'logos/competitions/wta-on-light.png', dark: 'logos/competitions/wta-on-dark.png' }],
    [/^pga tour champions\b|^champions tour\b/i, { light: 'logos/competitions/pga-tour-champions-on-light.png', dark: 'logos/competitions/pga-tour-champions-on-dark.png' }],
    [/^pga tour canada\b/i, 'logos/competitions/pga-tour-canada.png'],
    [/^pga tour latino/i, 'logos/competitions/pga-tour-latinoamerica.png'],
    [/^pga tour\b/i, 'logos/competitions/pga-tour.png'],
    [/^lpga\b/i, 'logos/competitions/lpga.png'],
    [/^dp world tour\b/i, { light: 'logos/competitions/dp-world-tour-on-light.png', dark: 'logos/competitions/dp-world-tour-on-dark.png' }],
    [/^korn ferry\b/i, { light: 'logos/competitions/korn-ferry-tour-on-light.png', dark: 'logos/competitions/korn-ferry-tour-on-dark.png' }],
    [/^liv( golf)?\b/i, { light: 'logos/competitions/liv-golf-on-light.png', dark: 'logos/competitions/liv-golf-on-dark.png' }],
    [/^apga\b/i, { light: 'logos/competitions/apga-on-light.png', dark: 'logos/competitions/apga-on-dark.png' }],
    [/^(startimes )?uganda premier league\b|^upl\b/i, 'logos/competitions/uganda-premier-league.png'],
    [/^caf women'?s champions league\b/i, 'logos/competitions/caf-womens-champions-league.png'],
    [/^(total ?energies )?caf champions league\b/i, { light: 'logos/competitions/caf-champions-league-on-light.png', dark: 'logos/competitions/caf-champions-league-on-dark.png' }],
    [/^(total ?energies )?caf confederation cup\b/i, { light: 'logos/competitions/caf-confederation-cup-on-light.png', dark: 'logos/competitions/caf-confederation-cup-on-dark.png' }],
    [/^(barclays )?women'?s super league\b|^wsl\b/i, 'logos/competitions/womens-super-league.png'],
    [/^(united rugby championship|urc)\b/i, { light: 'logos/competitions/urc-on-light.png', dark: 'logos/competitions/urc-on-dark.png' }],
    [/^(epcr )?challenge cup\b/i, { light: 'logos/competitions/challenge-cup-on-light.png', dark: 'logos/competitions/challenge-cup-on-dark.png' }],
    [/^(investec )?champions cup\b/i, { light: 'logos/competitions/champions-cup-on-light.png', dark: 'logos/competitions/champions-cup-on-dark.png' }],
    [/^(gallagher )?premiership( rugby)?\b/i, 'logos/competitions/premiership-rugby.png'],
    [/^top ?14\b/i, 'logos/competitions/top-14.png'],
    [/^(dhl )?super rugby\b/i, 'logos/competitions/super-rugby.png'],
    [/^(english )?premier league\b/i, 'logos/competitions/premier-league.png'],
    [/^la ?liga\b(?!.*hypermotion)/i, 'logos/competitions/laliga.png'],
    [/^serie a\b/i, { light: 'logos/competitions/serie-a-on-light.png', dark: 'logos/competitions/serie-a-on-dark.png' }],
    [/^bundesliga\b/i, { light: 'logos/competitions/bundesliga-on-light.png', dark: 'logos/competitions/bundesliga-on-dark.png' }],
    [/^ligue 1\b/i, { light: 'logos/competitions/ligue-1-on-light.png', dark: 'logos/competitions/ligue-1-on-dark.png' }],
    [/^eredivisie\b/i, { light: 'logos/competitions/eredivisie-on-light.png', dark: 'logos/competitions/eredivisie-on-dark.png' }],
    [/^(liga portugal|primeira liga)\b/i, { light: 'logos/competitions/liga-portugal-on-light.png', dark: 'logos/competitions/liga-portugal-on-dark.png' }],
    [/^(jupiler |belgian )?pro league\b/i, 'logos/competitions/pro-league.png'],
    [/^(uefa )?champions league\b/i, { light: 'logos/competitions/champions-league-on-light.png', dark: 'logos/competitions/champions-league-on-dark.png' }],
    [/^uefa super ?cup\b/i, { light: 'logos/competitions/super-cup-on-light.png', dark: 'logos/competitions/super-cup-on-dark.png' }],
    [/^(uefa )?europa league\b/i, { light: 'logos/competitions/europa-league-on-light.png', dark: 'logos/competitions/europa-league-on-dark.png' }],
    [/carabao|^efl cup|^league cup/i, 'logos/competitions/carabao-cup.png'],
    [/^(the )?(emirates )?fa cup\b/i, 'logos/competitions/fa-cup.png'],
    [/^(uefa )?nations league\b/i, { light: 'logos/competitions/nations-league-on-light.png', dark: 'logos/competitions/nations-league-on-dark.png' }],
    [/afcon|africa cup of nations/i, { light: 'logos/competitions/afcon-on-light.png', dark: 'logos/competitions/afcon-on-dark.png' }],
    [/^nba\b/i, 'logos/competitions/nba.png'],
    [/^nfl\b/i, 'logos/competitions/nfl.png'],
    [/^mlb\b/i, 'logos/competitions/mlb.png'],
    [/^nhl\b/i, 'logos/competitions/nhl.png'],
    [/^motogp\b/i, { light: 'logos/competitions/motogp-on-light.png', dark: 'logos/competitions/motogp-on-dark.png' }],
    [/^(fia )?(wec|world endurance)\b|le mans/i, { light: 'logos/competitions/wec-on-light.png', dark: 'logos/competitions/wec-on-dark.png' }],
    [/^(fia )?(wrc|world rally)\b/i, { light: 'logos/competitions/wrc-on-light.png', dark: 'logos/competitions/wrc-on-dark.png' }],
    [/^lpb\b|liga portuguesa de basquetebol/i, { light: 'logos/competitions/wiki-lpb.png', dark: 'logos/competitions/wiki-lpb.png' }],
    [/^nwsl/i, { light: 'logos/competitions/wiki-nwsl.png', dark: 'logos/competitions/wiki-nwsl.png' }],
    [/^aflw|afl women/i, { light: 'logos/competitions/wiki-aflw.png', dark: 'logos/competitions/wiki-aflw.png' }],
    [/^icc\b|icc .*(trophy|cup|championship)|nations trophy/i, { light: 'logos/competitions/wiki-icc.png', dark: 'logos/competitions/wiki-icc-on-dark.png' }],
    [/t100/i, { light: 'logos/competitions/wiki-t100.png', dark: 'logos/competitions/wiki-t100.png' }],
    [/world skate/i, { light: 'logos/competitions/wiki-world-skate.png', dark: 'logos/competitions/wiki-world-skate.png' }],
    [/total chess/i, { light: 'logos/competitions/wiki-total-chess.png', dark: 'logos/competitions/wiki-total-chess.png' }],
    [/freestyle (friday|chess)/i, { light: 'logos/competitions/wiki-freestyle-chess.png', dark: 'logos/competitions/wiki-freestyle-chess.png' }],
    [/diski|betway premiership|^psl\b/i, { light: 'logos/competitions/wiki-psl.png', dark: 'logos/competitions/wiki-psl.png' }],
    [/^rws\b|rajadamnern/i, { light: 'logos/competitions/wiki-rws.png', dark: 'logos/competitions/wiki-rws.png' }],
    [/^e1\b|e1 series/i, { light: 'logos/competitions/badge-e1.png', dark: 'logos/competitions/badge-e1.png' }],
    [/wtcs|world triathlon/i, { light: 'logos/competitions/badge-wtcs.png', dark: 'logos/competitions/badge-wtcs.png' }],
    [/oceanman/i, { light: 'logos/competitions/badge-oceanman.png', dark: 'logos/competitions/badge-oceanman.png' }],
    [/legends cup/i, { light: 'logos/competitions/badge-legends-cup.png', dark: 'logos/competitions/badge-legends-cup.png' }],
    [/^sbp$/i, { light: 'logos/competitions/badge-sbp.png', dark: 'logos/competitions/badge-sbp.png' }],
    [/^boxing$|^boxe$/i, { light: 'logos/competitions/sport-boxing.png', dark: 'logos/competitions/sport-boxing.png' }],
    [/^tennis$|^t[ée]nis$/i, { light: 'logos/competitions/sport-tennis.png', dark: 'logos/competitions/sport-tennis.png' }],
    [/^football$|^futebol$|^soccer$/i, { light: 'logos/competitions/sport-football.png', dark: 'logos/competitions/sport-football.png' }],
    [/^handball$/i, { light: 'logos/competitions/sport-handball.png', dark: 'logos/competitions/sport-handball.png' }],
    [/euroleague/i, { light: 'logos/competitions/badge-euroleague.png', dark: 'logos/competitions/badge-euroleague.png' }],
    [/sudamericana/i, { light: 'logos/competitions/badge-sudamericana.png', dark: 'logos/competitions/badge-sudamericana.png' }],
    [/rugby league world cup|^rlwc/i, { light: 'logos/competitions/badge-rlwc.png', dark: 'logos/competitions/badge-rlwc.png' }],
    [/^(efl |sky bet )?league one$|english league.*league one/i, { light: 'logos/competitions/badge-league-one.png', dark: 'logos/competitions/badge-league-one.png' }],
    [/^motor ?sports?$/i, { light: 'logos/competitions/sport-motorsport.png', dark: 'logos/competitions/sport-motorsport.png' }],
    [/^cricket$/i, { light: 'logos/competitions/sport-cricket.png', dark: 'logos/competitions/sport-cricket.png' }],
  ];
  /* Live guides use short or messy league names ("PL", "ERE", "Ligue1", "PGA Austin Champs D2").
   * One clean name per league: the Leagues tab, filters and logos then line up. */
  A.COMP_ALIASES = [
    [/^(epl|pl)$/i, 'Premier League'], [/^ere$/i, 'Eredivisie'], [/^tsl$/i, 'Süper Lig'], [/^ligue ?1$/i, 'Ligue 1'], [/^ligue ?2$/i, 'Ligue 2'],
    [/^efl$/i, 'EFL Championship'], [/^cfb$/i, 'College Football'], [/^lpb$/i, 'Liga Portuguesa de Basquetebol'],
    [/^atp ?250$/i, 'ATP 250'], [/^atp ?500$/i, 'ATP 500'], [/^dp world$/i, 'DP World Tour'],
    [/^nfl ?- ?national football league$/i, 'NFL'], [/^uefa champions league ?- ?\(women\)$/i, "UEFA Women's Champions League"],
    [/^english league ?- ?(league one|league two|championship)$/i, (m) => m[1].replace(/\b\w/g, (c) => c.toUpperCase())],
    [/^spanish league ?- ?segunda division$/i, 'LaLiga Hypermotion'], [/^spanish league ?- ?(la ?liga|primera division)$/i, 'LaLiga'],
    [/^uim e1 world championship.*$/i, 'E1 Series'], [/^legends cup\b.*$/i, 'Legends Cup'],
    [/^wwe ?- ?(raw|smackdown|nxt)\b.*$/i, (m) => 'WWE ' + m[1].replace(/^smackdown$/i, 'SmackDown').replace(/^raw$/i, 'Raw').toUpperCase().replace('SMACKDOWN', 'SmackDown').replace('RAW', 'Raw')],
    /* golf: "PGA Austin Champs D2" → "PGA Tour · Austin Champs" (the day stays in the listing) */
    [/^pga champions (.+?)\s+d\d$/i, (m) => 'PGA Tour Champions · ' + m[1]], [/^lpga (.+?)\s+d\d$/i, (m) => 'LPGA Tour · ' + m[1].replace(/^the /i, 'The ')],
    [/^pga (.+?)\s+d\d$/i, (m) => 'PGA Tour · ' + m[1]], [/^(asian tour|sunshine tour|dp world tour|korn ferry tour|liv golf) (.+?)\s+d\d$/i, (m) => m[1].replace(/\b\w/g, (c) => c.toUpperCase()).replace('Dp ', 'DP ').replace('Liv ', 'LIV ') + ' · ' + m[2]],
  ];
  A.canonComp = (comp) => {
    const c = String(comp || '').trim();
    for (const [re, to] of A.COMP_ALIASES) { const m = re.exec(c); if (m) return typeof to === 'function' ? to(m) : to; }
    return c;
  };
  A.compLogo = (comp, bg = 'light') => {
    const name = String(comp || '').split('·')[0].trim();
    const remote = (A.COMP_LOGOS_REMOTE || []).find(([re]) => re.test(name));   // logos added over the air (feed.json "compLogos")
    const hit = (remote && remote[1]) || A.COMP_LOGOS[A.slug(name)] || (A.COMP_RULES.find(([re]) => re.test(name)) || [])[1];
    if (!hit) return null; return typeof hit === 'string' ? hit : hit[bg] || hit.light;
  };
  /* bundled schedule + the live feed on GitHub (updates reach every installed app without a reinstall) */
  A.LIVE_FEED = 'https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/feed.json';
  A.DEFAULT_FEEDS = A.DEFAULT_FEEDS || ['data/schedule.json', A.LIVE_FEED];

  /* ---------- team registry & badge lookup ---------- */
  const index = new Map();
  /* one name can belong to teams in several sports (Toulouse FC / Stade Toulousain, Leicester City / Tigers …) */
  const put = (k, t) => { const l = index.get(k) || []; if (l.indexOf(t) < 0) l.push(t); index.set(k, l); };
  /* North-American leagues: guides use nicknames ("Pistons", "Golden Knights"), so index those too */
  const NICK = /^(NBA|NFL|NHL|MLB|WNBA|MLS)$/;
  A.addTeam = (t) => {
    if (!t || !t.id) return; put(t.id, t); (t.aliases || []).forEach((a) => put(a, t));
    if ((t.comps || []).some((c) => NICK.test(c)) && t.name) {
      const w = t.name.split(' '); if (w.length > 1) { put(A.slug(w.slice(-1).join(' ')), t); if (w.length > 2) put(A.slug(w.slice(-2).join(' ')), t); }
    }
  };
  const STRIP = new Set(['fc', 'afc', 'cf', 'sc', 'cd', 'ud', 'rcd', 'sv', 'vfl', 'tsg', 'fk', 'sk', 'the', 'club', 'calcio', 'rfc', 'rugby']);
  const pick = (l, sport) => !l ? null : sport && sport !== 'other' ? l.find((t) => A.teamSport(t) === sport) || l.find((t) => t.flag) || null : l[0];
  A.findTeam = (name, sport) => {
    let s = A.slug(name); let hit = pick(index.get(s), sport); if (hit) return hit;
    const parts = s.split('-');
    while (parts.length > 1 && STRIP.has(parts[0])) parts.shift();
    while (parts.length > 1 && STRIP.has(parts[parts.length - 1])) parts.pop();
    return pick(index.get(parts.join('-')), sport);
  };
  /* -> { src, flag } for a background ('light' | 'dark'), or null */
  /* sport of a registry team, from its competitions */
  const US = { NBA: 'basketball', NFL: 'nfl', MLB: 'mlb', NHL: 'hockey' };
  A.teamSport = (t) => t.sport || (t.comps || []).map((c) => US[c]).find(Boolean) || 'football';
  /* sport (optional): only return a badge for a team of that sport – Toulouse rugby ≠ Toulouse FC */
  A.teamLogo = (name, bg = 'light', sport) => {
    const manual = A.TEAM_LOGOS[A.slug(name)]; if (manual) return { src: typeof manual === 'string' ? manual : manual[bg] || manual.light };
    const t = A.findTeam(name, sport);
    if (!t) {   // national sides of any sport or age group: "Germany U21", "Pakistan Women", "Sri Lanka" (cricket) → circle flag
      const base = A.slug(String(name).replace(/\s+(u-?\d{2}|women|w|xi|a|legends|olympic|amateur)$/i, '').replace(/^(team )/i, ''));
      const iso = A.COUNTRY_FLAG && A.COUNTRY_FLAG[base]; return iso ? { src: `logos/teams/flags/${iso}.svg`, flag: true } : null;
    }
    const src = (t.logos && t.logos[bg]) || t.logo || (t.logos && t.logos.light); return src ? { src, flag: !!t.flag, team: t } : null;
  };
})(window.ASBH);
