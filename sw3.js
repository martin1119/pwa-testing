const pwaCache = 'pwa-cache-3';

const staticCache = [
  '/',
  'index.html',
  '/fetch.JPG',
  '/style.css',
  '/main2.js',
  '/car.jpg',
];

// SW fetch handler with different caching strategies
self.addEventListener('fetch', (e) => {
  // 1. cache only. Static assets - app shell
  //e.respondWith(caches.match(e.request)); // on the next reload all the
  // sources (staticCache) will be served from cache
  // caveat ! if a request get removed from the cache --> it fails (user
  // and the operating system can clear caches! )

  // 2. Cache with network fallback
  /* e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) return;
      //if item was not found
      return fetch(e.request).then((newRes) => {
        caches.open(pwaCache).then((cache) => cache.put(e.request, newRes));
        return newRes.clone();
      });
    })
  ); */

  // 3. Network with cache fallback (if at all possible, serve the latest
  //version of the resource, but if not possible, go to the cache as a
  //fallback). As soon as the network becomes available again --> the resources
  // updated over the network and the cache version along with it
  /*  e.respondWith(
    fetch(e.request)
      .then((res) => {
        caches.open(pwaCache).then((cache) => cache.put(e.request, res));
        return res.clone();
      })
      .catch((err) => caches.match(e.request))
  ); */

  // 4. Cache with network update (we go to the cache --> server that to the
  // user immediately and then update the cache in the background. So on the
  // next reload, the cache content is up to date)
  // when performance is the most important but it can be wasteful in terms
  // of data cost
  /*  e.respondWith(
    caches.open(pwaCache).then((cache) => {
      return cache.match(e.request).then((res) => {
        let updatedRes = fetch(e.request).then((newRes) => {
          cache.put(e.request, newRes.clone());
          return newRes;
        });
        return res || updatedRes;
      });
    })
  ); */

  // 5. Cache & Network Race (absolute performance and reliability)
  // we have to dispatch (fetch) a network request at the same time as the
  // cache request and then identify the first one to finish
  let firstResponse = new Promise((resolve, reject) => {
    // Track rejections - if it's the first rejection wait, but it's the
    // second rejection then reject first response altogether as we then have
    // nothing left to wait for
    let firstRejectionReceived = false;
    let rejectOnce = () => {
      if (firstRejectionReceived) {
        // if true --> this ist the 2nd rejection
        // to display also in offline mode
        if (e.request.url.match('car.jpg')) {
          resolve(caches.match('/fetch.JPG'));
        } else {
          reject('no response reseived ');
        }

        reject('no response reseived');
      } else {
        firstRejectionReceived = true;
      }
    };

    // try network
    fetch(e.request)
      .then((res) => {
        // check res ok
        res.ok ? resolve(res) : rejectOnce();
      })
      .catch(rejectOnce);
    // try (at the exact same time) to match the request to the cache
    caches
      .match(e.request)
      .then((res) => {
        res ? resolve(res) : rejectOnce();
      })
      .catch(rejectOnce);
  });
  e.respondWith(firstResponse);
});

// SW install and cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(pwaCache).then((cache) => cache.addAll(staticCache)));
});

// SW activate and cache cleanup
self.addEventListener('activate', (e) => {
  let cacheCleaned = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== pwaCache) return caches.delete(key);
    });
  });
  e.waitUntil(cacheCleaned);
});
