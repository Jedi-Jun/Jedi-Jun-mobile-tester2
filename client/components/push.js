/* 8) Push message */
const section8 = () => {
  const onClick = () => {
    const VAPID_PUBLIC_KEY =
      'BJXGncHzL9SJTyOJZ4tlKbIdQvdu-4CnM0QuNuEijHKpkY5zm_xLne3GzszaGfDbmr4ixBCMZXbNJXDjN55GUXI';

    if ('serviceWorker' in navigator) {
      // 1) Register Service Worker
      console.log('Registering SW...');
      navigator.serviceWorker.register('sw.js', {
        // scope: '/',
        scope: '/client/',
      });
      console.log('SW registered successful.');

      handlePushMessage();
    }

    function handlePushMessage() {
      // 2) Register Push
      navigator.serviceWorker.ready.then(async registration => {
        console.log('Registering Push...');
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: VAPID_PUBLIC_KEY,
        };
        const subscription = await registration.pushManager.subscribe(
          subscribeOptions
        );
        console.log('Push registered successful.');

        // 3) Send Push Notification
        console.log('Push Notification Sending...');
        await fetch('http://localhost:4000/subscribe', {
          // await fetch('https://app.dongrim.site/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      console.log('Push Notification Sent successfully!');
    }
  };

  setTimeout(() => {
    const pushButton = document.querySelector('#push-button-js');
    const pushSW = document.querySelector('.push-sw');
    const pushPM = document.querySelector('.push-pm');
    const pushPerm = document.querySelector('.push-perm');
    const permButton = document.querySelector('#perm-button-js');

    pushButton.addEventListener('click', onClick);
    pushSW.innerText = String('serviceWorker' in navigator);
    pushPM.innerText = String('PushManager' in window);
    permButton.addEventListener('click', async () => {
      await Notification.requestPermission();
    });

    // console.log(Notification.permission);
    navigator.permissions.query({ name: 'notifications' }).then(perm => {
      pushPerm.innerText = perm.state;
      perm.onchange = () => (pushPerm.innerText = perm.state);
    });
  }, 50);

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

export { section8 };
