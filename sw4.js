const pwaCache = 'pwa-cache-4-2';

const staticCache = [
  '/',
  'index.html',
  'page2.html',
  '/style.css',
  '/main2.js',
  '/car.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(pwaCache).then((cache) => {
      cache.addAll(staticCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  let cacheCleaned = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== pwaCache) return caches.delete(key);
    });
  });
  e.waitUntil(cacheCleaned);
});

self.addEventListener('fetch', (e) => {
  // cache with network fallback
  let res = caches.match(e.request).then((res) => {
    // check if cache has response
    if (res) return res;

    // fallback to network
    return fetch(e.request).then((fetchRes) => {
      // cache fetched response
      caches.open(pwaCache).then((cache) => cache.put(e.request, fetchRes));

      // return clone of fetched response
      return fetchRes.clone();
    });
  });
  e.respondWith(res);
});
