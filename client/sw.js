console.log('sw.js has been loaded.');

self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push received.', data);
  self.registration.showNotification(data.title, {
    body: data.desc || `Test-body(${Math.random().toFixed(2)})`,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png',
    // vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'dm',
  });
});

//
self.addEventListener('notificationclick', function (event) {
  // console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      console.log(allClients);

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
    })()
  );
});

//
self.addEventListener('install', event => {
  //service worker is installed.
  console.log('installed');

  // 제어중인 서비스 워커가 존재해도 대기 상태를 건너뛴다
  // self.skipWaiting();
});

self.addEventListener('activate', event => {
  //service worker is activated
  console.log('activated');

  // 새로고침 없어도 활성화 즉시 클라이언트를 제어한다
  // self.clients.clamin();
});

self.addEventListener('fetch', event => {
  //service worker intercepted a fetch call
  // console.log('intercepted a http request', ev.request);
});

self.addEventListener('message', event => {
  //message from webpage
  // console.log(event);
});
