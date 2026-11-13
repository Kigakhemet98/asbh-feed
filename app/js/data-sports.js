/* Sports catalogue. "group" drives the sport menu; colour is used for chips and poster accents. */
(function (A) {
  'use strict';
  A.SPORTS = [
    { id: 'football', name: 'Football', group: 'Team sports', color: '#1f9d55' },
    { id: 'basketball', name: 'Basketball', group: 'Team sports', color: '#e8590c' },
    { id: 'netball', name: 'Netball', group: 'Team sports', color: '#d6336c' },
    { id: 'rugby', name: 'Rugby', group: 'Team sports', color: '#5c940d' },
    { id: 'cricket', name: 'Cricket', group: 'Team sports', color: '#2b8a3e' },
    { id: 'nfl', name: 'American Football (NFL)', group: 'Team sports', color: '#013369' },
    { id: 'mlb', name: 'Baseball (MLB)', group: 'Team sports', color: '#c92a2a' },
    { id: 'hockey', name: 'Hockey', group: 'Team sports', color: '#1864ab' },
    { id: 'volleyball', name: 'Volleyball', group: 'Team sports', color: '#f59f00' },
    { id: 'handball', name: 'Handball', group: 'Team sports', color: '#1c7ed6' },
    { id: 'afl', name: 'Aussie Rules', group: 'Team sports', color: '#c92a2a' },
    { id: 'padel', name: 'Padel', group: 'Individual', color: '#0ca678' },
    { id: 'f1', name: 'Formula 1', group: 'Motorsport', color: '#e10600' },
    { id: 'motogp', name: 'MotoGP', group: 'Motorsport', color: '#c4161c' },
    { id: 'wec', name: 'WEC (Endurance)', group: 'Motorsport', color: '#0b7285' },
    { id: 'wrc', name: 'WRC (Rally)', group: 'Motorsport', color: '#364fc7' },
    { id: 'nascar', name: 'NASCAR', group: 'Motorsport', color: '#fab005' },
    { id: 'supercars', name: 'Supercars Championship', group: 'Motorsport', color: '#7048e8' },
    { id: 'superbikes', name: 'Superbikes (WorldSBK)', group: 'Motorsport', color: '#495057' },
    { id: 'tennis', name: 'Tennis', group: 'Individual', color: '#94d82d' },
    { id: 'golf', name: 'Golf', group: 'Individual', color: '#2f9e44' },
    { id: 'athletics', name: 'Athletics', group: 'Individual', color: '#f76707' },
    { id: 'cycling', name: 'Cycling', group: 'Individual', color: '#fcc419' },
    { id: 'aquatics', name: 'Aquatics', group: 'Individual', color: '#1c7ed6' },
    { id: 'ufc', name: 'UFC', group: 'Combat', color: '#d00000' },
    { id: 'mma', name: 'MMA', group: 'Combat', color: '#862e9c' },
    { id: 'boxing', name: 'Boxing', group: 'Combat', color: '#a61e4d' },
    { id: 'wwe', name: 'Wrestling (WWE)', group: 'Combat', color: '#343a40' },
    { id: 'other', name: 'Other', group: 'Other', color: '#868e96' }
  ];
  A.sport = (id) => A.SPORTS.find((s) => s.id === id) || A.SPORTS[A.SPORTS.length - 1];

  /* Programme status codes, as used by SuperSport's media schedule */
  A.STATUS = { L: 'Live', D: 'Delayed', P: 'Premiere / first run', R: 'Repeat', H: 'Highlights' };
})(window.ASBH);
