/* Bundled optional plugins. Each one is off or on via Settings › Plugins.
 * Copy plugins/example-plugin.js to write your own. */
(function (A) {
  'use strict';
  A.plugins.register({
    id: 'hide-finished', name: 'Hide finished broadcasts', version: '1.0.0',
    description: 'Removes broadcasts that ended more than 30 minutes ago.',
    transform: (events) => events.filter((e) => new Date(e.end) > new Date(+A.now() - 30 * 60000))
  });
  // Off by default: switch on in Settings
  const s = A.store.get('settings', {});
  if (!s.__seenHideFinished) { s.disabledPlugins = [...new Set([...(s.disabledPlugins || []), 'hide-finished'])]; s.__seenHideFinished = true; A.store.set('settings', s); }
})(window.ASBH);
