// * promise autopatch for dynamic import
import 'promise-polyfill';

// * -------------------------------- async load app, wait for polyfill check

import loadApp from './app-loader';

// * -------------------------------- polyfill check then load app

if (
  'fetch' in window &&
  'Intl' in window &&
  'URL' in window &&
  'Map' in window &&
  'forEach' in NodeList.prototype &&
  'startsWith' in String.prototype &&
  'endsWith' in String.prototype &&
  'includes' in String.prototype &&
  'includes' in Array.prototype &&
  'assign' in Object &&
  'entries' in Object &&
  'keys' in Object
) {
  loadApp();
} else {
  import(
    /* webpackChunkName: "src/polyfill-loader" */
    './polyfill-loader'
  ).then(() => {
    loadApp();
  });
}
