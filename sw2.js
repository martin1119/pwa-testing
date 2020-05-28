const pwaCache = 'pwa-cache-2';

self.addEventListener('install', (e) => {
  let cacheReady = caches.open(pwaCache).then((cache) => {
    console.log('new cache ready');
    //return cache.add('/'); // return promise so we can have the
    //install event wait for it to finish
    return cache.addAll(['/', 'style.css', 'car.jpg', 'main2.js']);
  });
  e.waitUntil(cacheReady);
});

// activate - clean up an old cache
self.addEventListener('activate', (e) => {
  let cacheCleaned = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== pwaCache) return caches.delete(key);
    });
  });
  e.waitUntil(cacheCleaned);
});

self.addEventListener('fetch', (e) => {
  // skip the remote fetch
  if (!e.request.url.match('http://127.0.0.1:5500/')) return;

  // serve local fetch from cache
  let newRes = caches.open(pwaCache).then((cache) => {
    return cache.match(e.request).then((res) => {
      //check if res was found in cache
      if (res) {
        console.log('serving ' + res.url + ' from cache');
        return res;
      }
      // fetch on behalf client and cache
      // if response was not found --> fetch the original request
      return fetch(e.request).then((fetchRes) => {
        // if we used add --> it would result in another fetch
        // for the request being added (but we already fetched
        // that request on line 37! and we have already response
        // ready (fetchRes))
        cache.put(e.request, fetchRes.clone());
        return fetchRes;
      });
    });
  });
  e.respondWith(newRes);
});
