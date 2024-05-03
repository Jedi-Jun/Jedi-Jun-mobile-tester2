console.log('sw.js has been loaded.');

self.addEventListener('push', (event) => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.desc || `Test-body(${Math.random().toFixed(2)})`,
      // icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png',
      icon: 'nasa.svg',
      badge: 'cocoa2.svg',
      tag: 'dm',
      // image
      // actions
      // renotify
      // vibrate: [200, 100, 200, 100, 200, 100, 200],
    })
  );
  console.log('Push Notification received.', data);
});

self.addEventListener('notificationclick', (event) => {
  console.log('Noti-Tag: ', event.notification.tag);
  event.notification.close();

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      // console.log(allClients);

      let targetClient;
      for (const client of allClients) {
        const url = new URL(client.url);
        // if (url.hostname === 'test.dongrim.site') {
        if (url.pathname === '/client/') {
          client.focus();
          targetClient = client;
          break;
        }
      }

      if (!targetClient) {
        // targetClient = await clients.openWindow('/');
        targetClient = await clients.openWindow('/client/');
      }

      // Post Message
      // The message is received in the "message" event on navigator.serviceWorker.
      targetClient.postMessage({
        msg: 'PostMessage',
        url: 'url',
      });
      /* navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(event.data.msg, event.data.url);
      }); */
    })()
  );
});

self.addEventListener('install', (event) => {
  // service worker is installed.
  console.log('installed');

  // 제어중인 서비스 워커가 존재해도 대기 상태를 건너뛴다
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // service worker is activated
  console.log('activated');

  // 새로고침 없어도 활성화 즉시 클라이언트를 제어한다
  // self.clients.clamin();
});

/* self.addEventListener('fetch', (event) => {
  // service worker intercepted a fetch call
  // console.log('intercepted a http request', event.request);
}); */

self.addEventListener('message', (event) => {
  // message from webpage
  console.log('message');
});

self.addEventListener('notificationclose', (event) => {
  console.log('notificationclose');
});

self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('pushsubscriptionchange');
});
