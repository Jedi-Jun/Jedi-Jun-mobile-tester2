/* 8) Push message */
const section8 = () => {
  setTimeout(() => {
    const pushButton = document.querySelector('#push-button-js');
    const pushSW = document.querySelector('.push-sw');
    const pushPM = document.querySelector('.push-pm');
    const pushPerm = document.querySelector('.push-perm');
    const permButton = document.querySelector('#perm-button-js');

    pushButton.addEventListener('click', pushMessage);
    pushSW.innerText = String('serviceWorker' in navigator);
    pushPM.innerText = String('PushManager' in window);
    permButton.addEventListener('click', requestPermission);

    console.log('Notification permission:', Notification.permission);
    navigator.permissions.query({ name: 'notifications' }).then((perm) => {
      pushPerm.innerText = perm.state; // prompt, granted, denied
      perm.onchange = () => (pushPerm.innerText = perm.state);
    });
  }, 100);

  return `
    <div class="push-wrapper">
      <div class="push-header-wrapper">Push Message! <button id="push-button-js">Push</button></div>
      <div class="push-body-wrapper">
        <h6>'serviceWorker' in navigator: <span class="push-sw"></span></h6>
        <h6>'PushManager' in window: <span class="push-pm"></span></h6>
        <h6>Notification.permission: <span class="push-perm"></span></h6>
        <h6>Request Permission: <button id="perm-button-js">Req</button></h6>
      </div>
    </div>
    `;
};

// 1) Request permission of Notification
const requestPermission = () => {
  Notification.requestPermission().then((perm) => {
    console.log(`Permission: ${perm}`); // default, granted, denied
  });
};

// 2) Send Push Message
const pushMessage = () => {
  const VAPID_PUBLIC_KEY =
    'BJXGncHzL9SJTyOJZ4tlKbIdQvdu-4CnM0QuNuEijHKpkY5zm_xLne3GzszaGfDbmr4ixBCMZXbNJXDjN55GUXI';

  if ('serviceWorker' in navigator) {
    // 1) Register ServiceWorker
    console.log('1) Registering sw.js');
    navigator.serviceWorker.register('sw.js', {
      // scope: '/',
      scope: '/client/',
    });
  }

  // 2) Subscribe Push Notification
  navigator.serviceWorker.ready.then(async (registration) => {
    console.log('2) ServiceWorker is ready');
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    };

    // 3) Request permission of Notification
    const subscription = await registration.pushManager.subscribe(subscribeOptions);
    // registration.showNotification('Vibration Sample');
    // console.log(subscription);

    console.log('3) Subscription is made by pushManager');

    // 4) Send a subscription to the server
    console.log('4) Send a subscription to the server');
    fetch('http://localhost:4010/subscribe', {
      // await fetch('https://app.dongrim.site/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      // credentials: 'include', // include, same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export { section8 };
