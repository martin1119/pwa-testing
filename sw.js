// Service Worker
// self === this SW (every SW has his own ID e.g. #651)

/* self.addEventListener('install', (e) => {
  let installPromise = new Promise((res) => {
    setTimeout(res, 3000);
  });

  // tasks for the install event
  e.waitUntil(installPromise);
});

self.addEventListener('activate', (e) => {
  console.log('new');
});
 */

//self.addEventListener('fetch', (e) => {
/* if (e.request.url.endsWith('style.css')) {
    e.respondWith(fetch("/style2.css"))
  } */
/* if (e.request.url.endsWith('/greet')) {
    let headers = new Headers({ 'Content-Type': 'text/html' });
    let customRes = new Response('<h1>Hello world</h1>', {
      headers: headers,
    });
    e.respondWith(customRes);
  } */
/*  if (e.request.url.endsWith('/camera_feed.html')) {
    e.respondWith(
      fetch(e.request).then((res) => {
        if (res.ok) return res;

        return new Response('camera feed not available');
      })
    );
  } */
//});

/* self.addEventListener('install', (e) => {
  e.waitUntil(
    new Promise((res) => {
      setTimeout(res, 5000);
    })
  );
}); */

/*self.addEventListener('message', (e) => {
  /*  if (e.data === 'update_self') {
    console.log('sw updating');
    self.skipWaiting();
  } */
// respond to all clients (all chrome tabs)
/*self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      if (e.source.id === client.id) {
        client.postMessage(' private hello from sw');
      }
    });
  });
});*/

// send notification on push

/* self.addEventListener('push', (e) => {
  let n = self.registration.showNotification('A notification from the SW');
  e.waitUntil(n);
});
 */
