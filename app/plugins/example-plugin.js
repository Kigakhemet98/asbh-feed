/* Example third-party plugin. Host this file anywhere (e.g. GitHub Pages) and add its URL
 * in Settings › Plugins › Load plugin. It must call ASBH.plugins.register(). */
(function (A) {
  'use strict';
  A.plugins.register({
    id: 'example-azam-local', name: 'Example: local league on Azam Sports', version: '0.1.0',
    description: 'Shows how a plugin adds channels and events (and how to patch channel changes).',
    init(A) {
      // add a sport, a team crest or an export style here if you like
    },
    async source() {
      // Fetch your own JSON here, e.g. const r = await fetch('https://example.org/azam.json');
      return {
        channels: [],              // e.g. [{ id:'azam-6', provider:'azam', name:'Azam Sports 6', short:'Sports 6' }]
        events: [],                // e.g. [{ start:'2026-11-12T13:00:00Z', duration:120, sport:'football', comp:'NBC Premier League', detail:'Simba v Yanga', channels:['azam-1'] }]
        overrides: []              // e.g. [{ id:'<event id>', channels:['azam-2'] }]  or  { id, cancelled:true }
      };
    }
  });
})(window.ASBH);
