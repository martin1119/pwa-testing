// CACHE STORAGE
if (window.caches) {
  //cache support
  //caches.open('test2'); //read, write and also create if doesnt exists yet
  //caches.keys().then(console.log);
  //caches.has('test1').then(console.log);
  //caches.delete('test1').then(console.log);
  //caches.open('pwa-v1.1').then((cache) => {
  //cache.add('/index.html'); // add request
  //cache.addAll(['/index.html', '/style.css', 'main2.js']);
  //cache.delete('/style.css');
  /* cache.match('/index.html').then((res) => {
      res.text().then(console.log); //prints entire index html
    }); */
  //cache.put('index.html', new Response('My own html')); //we overwrote line 12 and html from index.html is now only text: My own html
  //cache.keys().then(console.log); //all request objects
  // });
}

// CACHING IN THE SERVICE WORKER
/* if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('/sw3.js')
    .then((reg) => {})
    .catch(console.log);
} */

// NATIVE APPS FEATURES
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('/sw4.js')
    .then((reg) => {})
    .catch(console.log);
}
