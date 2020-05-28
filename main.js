if (navigator.serviceWorker) {
  // === if("serviceWorker in navigator")
  // Register the SW
  navigator.serviceWorker
    //.register('/sw.js', { scope: '/posts' })
    .register('/sw.js')
    .then((registration) => {
      /* registration.onupdatefound = () => {
        console.log('new sw found');
        let newSW = registration.installing;
        newSW.onstatechange = () => {
          console.log(newSW.state);
        };
      }; */
      /*  registration.onupdatefound = () => {
        let newSW = registration.installing;
        if (confirm('app update found')) {
          registration.active.postMessage('update_self');
          newSW.postMessage('update_self');
        }
      }; */
      if (registration.active) {
        registration.active.postMessage('respond to this');
      }
    })
    .catch(console.log);
  navigator.serviceWorker.addEventListener('message', (e) => {
    console.log(e.data);
  });
}

// get camera feed
/* fetch('camera_feed.html')
  .then((res) => {
    return res.text();
  })
  .then((html) => {
    document.getElementById('camera').innerHTML = html;
  });
 */

if (window.Notification) {
  showNotification = () => {
    // console.log('a new notification');

    let notificationOptions = {
      body: 'Some notification info',
      icon: '/car.jpg',
    };

    let n = new Notification('my new Notification.', notificationOptions);
    n.onclick = () => {
      console.log('notification clicked');
    };
  };

  if (Notification.permission === 'granted') {
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }
}
