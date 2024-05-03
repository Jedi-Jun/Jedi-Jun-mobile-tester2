/* 8) Push message */
let onChangeRegiColor;

const section8 = () => {
  setTimeout(() => {
    const regiSign = document.querySelector('.regi-sign');
    const getRegiButton = document.querySelector('#getregi-button-js');
    const regiButton = document.querySelector('#rigi-button-js');
    const unRegiButton = document.querySelector('#unregi-button-js');
    const pushButton = document.querySelector('#push-button-js');
    const pushSW = document.querySelector('.push-sw');
    const pushPM = document.querySelector('.push-pm');
    const pushPerm = document.querySelector('.push-perm');
    const permButton = document.querySelector('#perm-button-js');

    getRegiButton.addEventListener('click', getRegistration);
    regiButton.addEventListener('click', register);
    unRegiButton.addEventListener('click', unRegister);
    pushButton.addEventListener('click', pushMessage);
    pushSW.innerText = String('serviceWorker' in navigator);
    pushPM.innerText = String('PushManager' in window);
    permButton.addEventListener('click', requestPermission);

    onChangeRegiColor = (registration) => {
      regiSign.style.backgroundColor = registration ? 'chartreuse' : 'orangered';
      regiSign.style.visibility = 'visible';
    };
    navigator.serviceWorker
      .getRegistration()
      .then((registration) => onChangeRegiColor(registration));
    navigator.permissions.query({ name: 'notifications' }).then((perm) => {
      pushPerm.innerText = perm.state; // prompt, granted, denied
      perm.onchange = () => (pushPerm.innerText = perm.state);
    });
  }, 100);

  return `
    <div class="push-wrapper">
      <div class="push-header-wrapper">
        <div>Push Message</div>
        <div class="push-header-regi">
          <span>ServiceWorker Registration</span>
          <div class="regi-sign"></div>
        </div>
        <div>
          <button id="getregi-button-js">Get Regi</button>
          <button id="rigi-button-js">Register</button>
          <button id="unregi-button-js">Unregister</button>
          <button id="push-button-js">Push</button>
        </div>
      </div>
      <div class="push-body-wrapper">
        <h6>'serviceWorker' in navigator: <span class="push-sw"></span></h6>
        <h6>'PushManager' in window: <span class="push-pm"></span></h6>
        <h6>Notification.permission: <span class="push-perm"></span></h6>
        <h6>Request Permission: <button id="perm-button-js">Req</button></h6>
      </div>
    </div>
    `;
};

// 1) Get Registration
const getRegistration = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    const _registration = {};
    for (const key in registration) {
      _registration[key] = registration[key];
    }
    alert(JSON.stringify(_registration, null, 2));
    console.log(registration);
  } else {
    alert('Registration is not found');
  }
};

// 2) Register Push Message
const register = async () => {
  const VAPID_PUBLIC_KEY =
    'BJXGncHzL9SJTyOJZ4tlKbIdQvdu-4CnM0QuNuEijHKpkY5zm_xLne3GzszaGfDbmr4ixBCMZXbNJXDjN55GUXI';

  if ('serviceWorker' in navigator) {
    // 2-1) Register ServiceWorker
    console.log('1) Registering sw.js');
    navigator.serviceWorker
      .register('sw.js', {
        // scope: '/',
        scope: '/client/',
      })
      .then((registration) => onChangeRegiColor(registration));
  }

  // 2-2) Subscribe Push Notification
  navigator.serviceWorker.ready.then(async (registration) => {
    console.log('2) ServiceWorker is ready');
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    };

    // 2-3) Request permission of Notification
    const subscription = await registration.pushManager.subscribe(subscribeOptions);
    // registration.showNotification('New Message');  // push a message
    // console.log(subscription);

    console.log('3) Subscription is made by pushManager');

    // 2-4) Send a subscription to the server
    console.log('4) Send the subscription to the server');
    fetch('http://localhost:4010/subscribe', {
      // await fetch('https://app.dongrim.site/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      // credentials: 'include', // include, same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => alert(result.message));
  });
};

// 3) Unregister
const unRegister = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.unregister().then((boolean) => {
      onChangeRegiColor(!boolean);
    });
  } else {
    alert('Registration is not found');
  }
};

// 4) Push a message
const pushMessage = () => {
  fetch('http://localhost:4010/push');
};

// 5) Request permission of Notification
const requestPermission = () => {
  Notification.requestPermission().then((perm) => {
    console.log(`Permission: ${perm}`); // default, granted, denied
  });
};

export { section8 };
