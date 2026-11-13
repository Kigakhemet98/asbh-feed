/* Listing clean-up shared by the apps and the GitHub feed job (scripts/clean.js there is a copy).
 * Guides abbreviate: SuperSport's Portuguese Máximo channels write "LI: MCI v FUL", "ALE v HOL";
 * others write "B'mouth", "V'Real", "England 1st ODI", "Lions vs Patriots (Munich Game)".
 * A.cleanEvent(ev) turns these into the real competition, sport and team names, so logos, flags and
 * duplicate-merging all work. It never invents a match: unknown codes are left as they are. */
(function (A) {
  'use strict';
  const slug = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ø/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ---- sport from the competition / title (the guide's own category is sometimes wrong) ---- */
  const SPORT_FIX = [
    [/handball|starligue|\blnh\b|\behf\b/i, 'handball'],
    [/\baflw?\b|aussie rules|australian football league/i, 'afl'],
    [/padel/i, 'padel'],
    [/le mans|\bwec\b|\belms\b|endurance/i, 'wec'],
    [/\bwrc\b|rally/i, 'wrc'], [/nascar/i, 'nascar'], [/superbike|\bwsbk\b/i, 'superbikes'], [/supercars/i, 'supercars'],
    [/^nfl\b|american football|college football|\bncaa ?f/i, 'nfl'],
    [/^nba\b|euroleague|basketball|basquetebol|\bacb\b|\bbal\b/i, 'basketball'],
    [/one friday fights|muay thai|kickboxing|\bone championship|\bone fight night/i, 'mma'],
    [/^ufc\b/i, 'ufc'], [/volleyball|voleibol/i, 'volleyball'], [/netball/i, 'netball']
  ];

  /* ---- competition names ---- */
  const COMP_FIX = [
    [/^LI$/, 'Premier League'], [/^LE$/, 'LaLiga'], [/^LA$/, 'Serie A'], [/^LF$/, 'Ligue 1'], [/^BL$/, 'Bundesliga'],
    [/^Starligue$|^LNH/i, 'French Handball · Starligue']
  ];

  /* ---- team codes, by competition (club codes clash with country codes: ANG = Angers in Ligue 1, Angola elsewhere) ---- */
  const CLUB_CODES = {
    'dstv diski challenge': { AMA: 'AmaZulu', SUN: 'Mamelodi Sundowns', MSFC: 'Mamelodi Sundowns', RBFC: 'Richards Bay FC', RB: 'Richards Bay FC', PIR: 'Orlando Pirates', OP: 'Orlando Pirates', DC: 'Durban City', GA: 'Golden Arrows', CHI: 'Chippa United', CU: 'Chippa United', MG: 'Magesi', MAG: 'Magesi', PC: 'Polokwane City FC', STF: 'Stellenbosch', STE: 'Stellenbosch', KC: 'Kaizer Chiefs', KCFC: 'Kaizer Chiefs', SEK: 'Sekhukhune', TSG: 'TS Galaxy FC', MAR: 'Marumo Gallants', SIW: 'Siwelele', OC: 'Orbit College' },
    'betway premiership': { AMA: 'AmaZulu', SUN: 'Mamelodi Sundowns', MSFC: 'Mamelodi Sundowns', RBFC: 'Richards Bay FC', RB: 'Richards Bay FC', PIR: 'Orlando Pirates', OP: 'Orlando Pirates', DC: 'Durban City', GA: 'Golden Arrows', CHI: 'Chippa United', CU: 'Chippa United', MG: 'Magesi', MAG: 'Magesi', PC: 'Polokwane City FC', STF: 'Stellenbosch', STE: 'Stellenbosch', KC: 'Kaizer Chiefs', KCFC: 'Kaizer Chiefs', SEK: 'Sekhukhune', TSG: 'TS Galaxy FC', MAR: 'Marumo Gallants', SIW: 'Siwelele', OC: 'Orbit College' },
    'premier league': { ARS: 'Arsenal', AVL: 'Aston Villa', BOU: 'Bournemouth', BRE: 'Brentford', BRI: 'Brighton', BHA: 'Brighton', BUR: 'Burnley', CHE: 'Chelsea', CRY: 'Crystal Palace', EVE: 'Everton', FUL: 'Fulham',
      HUL: 'Hull City', IPS: 'Ipswich Town', LEE: 'Leeds United', LEI: 'Leicester City', LIV: 'Liverpool', MCI: 'Manchester City', MUN: 'Manchester United', NEW: 'Newcastle United', NFO: 'Nottingham Forest', NOT: 'Nottingham Forest',
      SOU: 'Southampton', SUN: 'Sunderland', TOT: 'Tottenham Hotspur', WHU: 'West Ham United', WOL: 'Wolverhampton Wanderers', COV: 'Coventry City', MID: 'Middlesbrough', NOR: 'Norwich City', SHU: 'Sheffield United', WBA: 'West Bromwich Albion' },
    'serie a': { ATA: 'Atalanta', BOL: 'Bologna', CAG: 'Cagliari', COM: 'Como', CRE: 'Cremonese', FIO: 'Fiorentina', FRO: 'Frosinone', GEN: 'Genoa', INT: 'Inter', JUV: 'Juventus', LAZ: 'Lazio', LEC: 'Lecce', MIL: 'AC Milan',
      NAP: 'Napoli', PAR: 'Parma', PIS: 'Pisa', ROM: 'Roma', SAS: 'Sassuolo', TOR: 'Torino', UDI: 'Udinese', VEN: 'Venezia', VER: 'Hellas Verona', PAL: 'Palermo', SPE: 'Spezia', MON: 'Monza', EMP: 'Empoli', SAL: 'Salernitana' },
    'ligue 1': { ANG: 'Angers', AUX: 'Auxerre', BRE: 'Brest', HAC: 'Le Havre', LEN: 'Lens', LIL: 'Lille', LOR: 'Lorient', LYO: 'Lyon', OL: 'Lyon', MAR: 'Marseille', OM: 'Marseille', MET: 'Metz', MON: 'Monaco', NAN: 'Nantes', NIC: 'Nice',
      PAR: 'Paris Saint-Germain', PSG: 'Paris Saint-Germain', PFC: 'Paris FC', REN: 'Rennes', STR: 'Strasbourg', TOU: 'Toulouse', TRO: 'Troyes', SET: 'Saint-Étienne', ASSE: 'Saint-Étienne', MTP: 'Montpellier', REI: 'Reims' },
    'laliga': { ALA: 'Alaves', ATH: 'Athletic Club', ATM: 'Atletico Madrid', BAR: 'Barcelona', BET: 'Real Betis', CEL: 'Celta Vigo', ELC: 'Elche', ESP: 'Espanyol', GET: 'Getafe', GIR: 'Girona', LEV: 'Levante', MLL: 'Mallorca',
      OSA: 'Osasuna', OVI: 'Real Oviedo', RAY: 'Rayo Vallecano', RMA: 'Real Madrid', RSO: 'Real Sociedad', SEV: 'Sevilla', VAL: 'Valencia', VIL: 'Villarreal', RAC: 'Racing Santander', DEP: 'Deportivo La Coruna', MAL: 'Malaga' },
    'nba': { ATL: 'Atlanta Hawks', BOS: 'Boston Celtics', BKN: 'Brooklyn Nets', CHA: 'Charlotte Hornets', CHI: 'Chicago Bulls', CLE: 'Cleveland Cavaliers', DAL: 'Dallas Mavericks', DEN: 'Denver Nuggets', DET: 'Detroit Pistons',
      GSW: 'Golden State Warriors', HOU: 'Houston Rockets', IND: 'Indiana Pacers', LAC: 'LA Clippers', LAL: 'Los Angeles Lakers', MEM: 'Memphis Grizzlies', MIA: 'Miami Heat', MIL: 'Milwaukee Bucks', MIN: 'Minnesota Timberwolves',
      NOP: 'New Orleans Pelicans', NYK: 'New York Knicks', OKC: 'Oklahoma City Thunder', ORL: 'Orlando Magic', PHI: 'Philadelphia 76ers', PHX: 'Phoenix Suns', POR: 'Portland Trail Blazers', SAC: 'Sacramento Kings',
      SAS: 'San Antonio Spurs', TOR: 'Toronto Raptors', UTA: 'Utah Jazz', WAS: 'Washington Wizards' }
  };
  const clubTable = (comp) => { const c = String(comp || '').toLowerCase(); return Object.keys(CLUB_CODES).find((k) => c === k || c.startsWith(k + ' ')) || null; };

  /* Portuguese (SuperSport Máximo) and English / FIFA country codes */
  const PT = { ALE: 'Germany', HOL: 'Netherlands', CAZ: 'Kazakhstan', MOL: 'Moldova', ESL: 'Slovenia', ESQ: 'Slovakia', GAL: 'Wales', DIN: 'Denmark', KOS: 'Kosovo', CHI: 'Cyprus', MON: 'Montenegro', SUI: 'Switzerland', SUE: 'Sweden',
    ING: 'England', ESC: 'Scotland', IRN: 'Northern Ireland', RIR: 'Republic of Ireland', LET: 'Latvia', LIT: 'Lithuania', UCR: 'Ukraine', HUN: 'Hungary', ROM: 'Romania', BUL: 'Bulgaria', GEO: 'Georgia', ARM: 'Armenia', AZE: 'Azerbaijan',
    AND: 'Andorra', MAL: 'Malta', GIB: 'Gibraltar', FER: 'Faroe Islands', LIE: 'Liechtenstein', SMA: 'San Marino', ALB: 'Albania', MAC: 'North Macedonia', BOS: 'Bosnia and Herzegovina', BIE: 'Belarus', ISR: 'Israel', AUS: 'Austria',
    RCH: 'Czechia', CHE: 'Czechia', GRE: 'Greece', ISL: 'Iceland', NOR: 'Norway', FIN: 'Finland', LUX: 'Luxembourg', EST: 'Estonia', SER: 'Serbia', TUR: 'Turkey', CRO: 'Croatia', POL: 'Poland', BEL: 'Belgium', FRA: 'France',
    ITA: 'Italy', ESP: 'Spain', POR: 'Portugal', SLO: 'Slovenia', SVK: 'Slovakia', SVN: 'Slovenia', NED: 'Netherlands', GER: 'Germany', DEN: 'Denmark', WAL: 'Wales', SCO: 'Scotland', ENG: 'England', SUÍ: 'Switzerland' };
  const CRICKET = { THA: 'Thailand', PNG: 'Papua New Guinea', UAE: 'UAE', NEP: 'Nepal', HK: 'Hong Kong', HKG: 'Hong Kong', NAM: 'Namibia', ZIM: 'Zimbabwe', SCO: 'Scotland', IRE: 'Ireland', NED: 'Netherlands',
    USA: 'USA', CAN: 'Canada', OMA: 'Oman', KEN: 'Kenya', UGA: 'Uganda', SL: 'Sri Lanka', SRI: 'Sri Lanka', PAK: 'Pakistan', IND: 'India', BAN: 'Bangladesh', AFG: 'Afghanistan', AUS: 'Australia', ENG: 'England', NZ: 'New Zealand',
    SA: 'South Africa', RSA: 'South Africa', WI: 'West Indies', BER: 'Bermuda', JER: 'Jersey', ITA: 'Italy', GER: 'Germany', SGP: 'Singapore', MAS: 'Malaysia', INA: 'Indonesia', TAN: 'Tanzania', NGR: 'Nigeria', RWA: 'Rwanda' };
  const NATIONAL = /nations league|afcon|africa cup|qualif|friendl|world cup|euro\b|euros|copa am|cosafa|cecafa|\bchan\b|asian cup|gold cup|\bu-?\d\d\b|olymp|international|^football$/i;

  /* short club names some guides use */
  const SHORT = { 'a-villa': 'Aston Villa', 'b-mouth': 'Bournemouth', 'bmouth': 'Bournemouth', 'n-forest': 'Nottingham Forest', 'nott-m-forest': 'Nottingham Forest', 'sund-land': 'Sunderland', 'sundland': 'Sunderland',
    'c-vigo': 'Celta Vigo', 'r-madrid': 'Real Madrid', 'v-real': 'Villarreal', 'vreal': 'Villarreal', 'sociedad': 'Real Sociedad', 'r-sociedad': 'Real Sociedad', 'bilbao': 'Athletic Club', 'a-bilbao': 'Athletic Club',
    'a-madrid': 'Atletico Madrid', 'atl-madrid': 'Atletico Madrid', 'man-utd': 'Manchester United', 'man-city': 'Manchester City', 'wolves': 'Wolverhampton Wanderers', 'west-ham': 'West Ham United', 'spurs': 'Tottenham Hotspur',
    'l-a-lakers': 'Los Angeles Lakers', 'la-lakers': 'Los Angeles Lakers', 'saint': 'Saint-Raphaël', 'paris-sg': 'Paris Saint-Germain' };

  const F1_PT = [[/treino livre (\d)/i, 'Practice $1'], [/qualifica[cç][aã]o sprint/i, 'Sprint Qualifying'], [/qualifica[cç][aã]o/i, 'Qualifying'], [/corrida sprint/i, 'Sprint'], [/corrida/i, 'Race'], [/grande pr[eé]mio/i, 'Grand Prix']];

  /* titles that are shows, not live sport */
  A.SHOW_RE = /mundo da bola|team talks|fantasy premier league|prima tecla|\bmagazine\b|highlights|preview show|review show|the f1 show/i;

  A.cleanEvent = (ev) => {
    if (!ev) return ev;
    let comp = String(ev.comp || '').trim(); let detail = String(ev.detail || '').trim();
    for (const [re, v] of COMP_FIX) if (re.test(comp)) { comp = v; break; }
    /* "Legends Cup '26 Arsenal v Harambee" arrives with no separator: the year tag splits competition and match */
    if (/ v(s\.?)? /i.test(comp) || comp === detail) { const m = /^(.*?)\s+'?(\d{2}|\d{4}(?:\/\d{2,4})?)\s+(.+ v(?:s\.?)? .+)$/i.exec(detail); if (m) { comp = m[1].trim(); detail = m[3].trim(); } }
    /* generic categories that hide the real event */
    if (/^boxing$/i.test(comp) && /one friday fights/i.test(detail)) { comp = 'ONE Friday Fights'; detail = detail.replace(/^one friday fights\s*/i, '') || 'ONE Friday Fights'; }
    if (/^padel$/i.test(comp) && /premier padel/i.test(detail)) { comp = 'Premier Padel'; detail = detail.replace(/^premier padel\s*[-·:]?\s*/i, '') || 'Day sessions'; }
    if (/^tennis$/i.test(comp) && /atp finals|nitto/i.test(detail)) { comp = 'ATP Finals'; }
    if (/^tennis$|^atp finals$/i.test(comp)) detail = detail.replace(/^M(\d)\b\s*-?\s*(nitto atp finals.*)?$/i, 'Match $1');
    if (ev.sport === 'f1' || /formula 1|^f1\b/i.test(comp)) for (const [re, v] of F1_PT) detail = detail.replace(re, v);
    /* sport */
    let sport = ev.sport || 'other';
    /* the competition decides; the title only when the competition is a bare category ("Handball", "Boxing") */
    const generic = !comp || /^(football|soccer|sport|sports|other|boxing|tennis|handball|padel|basketball|motorsport)$/i.test(comp);
    const hay = generic ? comp + ' ' + detail : comp;
    for (const [re, v] of SPORT_FIX) if (re.test(hay)) { if (!(v === 'basketball' && sport === 'nfl')) sport = v; break; }
    /* teams */
    let home = ev.home, away = ev.away; let us = false;
    if (!home && detail) {
      const at = / @ /.exec(detail);
      if (at) { us = true; away = detail.slice(0, at.index).trim(); home = detail.slice(at.index + 3).trim(); }
      else { const m = / v(?:s\.?)? /i.exec(detail); if (m) { home = detail.slice(0, m.index).trim(); away = detail.slice(m.index + m[0].length).trim(); } }
    }
    if (home && away) {
      const table = CLUB_CODES[clubTable(comp)] || (sport === 'basketball' && /nba/i.test(comp) ? CLUB_CODES.nba : null);
      const nat = !table && NATIONAL.test(comp);
      let stage = '';
      const fix = (t) => {
        let x = String(t).trim();
        const p = /\s*\(([^)]*)\)\s*$/.exec(x); if (p && /\s/.test(p[1])) { stage = stage || p[1]; x = x.slice(0, p.index); }                // "Patriots (Munich Game)"
        const cs = /\s+((?:\d(?:st|nd|rd|th)\s+)?(?:odi|t20i?|test|youth odi)(?:\s+d\d)?)$/i.exec(x); if (cs) { stage = stage || cs[1].replace(/\bd(\d)\b/i, 'Day $1'); x = x.slice(0, cs.index); }  // "England 1st ODI"
        x = x.replace(/(\D)\d+-$/, '$1').trim();                                                                             // "Giants2-"
        const cp = slug(comp); const sx = slug(x); if (cp && sx.startsWith(cp + '-')) x = x.slice(x.toLowerCase().indexOf(comp.toLowerCase()) + comp.length).replace(/^\s*'?\d{2}\s*/, '').trim() || x;   // "Legends Cup '26 Arsenal"
        const code = /^[A-ZÍ]{2,4}$/.test(x) ? x : null;
        if (code && table && table[code]) return table[code];
        if (code && nat && PT[code]) return PT[code];
        if (code && sport === 'cricket' && CRICKET[code]) return CRICKET[code];
        return (sport === 'football' && SHORT[slug(x)]) || (sport === 'basketball' && /^l-?a-lakers$/.test(slug(x)) ? 'Los Angeles Lakers' : x);
      };
      const h = fix(home), a = fix(away);
      if (h !== home || a !== away || stage) {
        detail = us ? `${a} @ ${h}` : `${h} v ${a}`;
        if (stage && !comp.toLowerCase().includes(stage.toLowerCase())) comp = `${comp} · ${stage}`;
      }
      home = h; away = a;
    }
    return Object.assign(ev, { comp, detail, sport, home, away });
  };
  if (typeof module !== 'undefined') module.exports = A;
})(typeof window !== 'undefined' ? (window.ASBH = window.ASBH || {}) : (globalThis.ASBH = globalThis.ASBH || {}));
