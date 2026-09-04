/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "test-logo.png",
    "revision": "25ea77e8ac488d8e45ec4f493390b982"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "logo-transparent.png",
    "revision": "ad21aed1b5cd03a03a1c1d4dd2b69d1a"
  }, {
    "url": "logo-gold.png",
    "revision": "ad21aed1b5cd03a03a1c1d4dd2b69d1a"
  }, {
    "url": "logo-512.png",
    "revision": "ad21aed1b5cd03a03a1c1d4dd2b69d1a"
  }, {
    "url": "logo-192.png",
    "revision": "3e0e43d399b51be624d2db551773b9b5"
  }, {
    "url": "index.html",
    "revision": "d05fd56222acbdbf0ad33afd15ed600e"
  }, {
    "url": "google0431289f12df47e8.html",
    "revision": "975000054868f25195dde7b23d567f30"
  }, {
    "url": "golarys-play-store-icon-512.png",
    "revision": "ad21aed1b5cd03a03a1c1d4dd2b69d1a"
  }, {
    "url": "golarys-icon-transparent.png",
    "revision": "f4e3fbf9fd3229774c590f4ab38ae5ab"
  }, {
    "url": "golarys-icon-1024.png",
    "revision": "10ff0324a9ce10507b4b5214353f798f"
  }, {
    "url": "favicon.png",
    "revision": "33fcc3734a80688bd9b3c766373cf751"
  }, {
    "url": "assets/index-CsW8W7oH.css",
    "revision": null
  }, {
    "url": "assets/index-CcNmOO28.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
