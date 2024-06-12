/* 7) new Notification */
const section7 = () => {
  const templateHTML = `
    <div class='notification-wrapper'>
      new Notification!
      <button id="noti-button-js">Click</button>
      <h6>Notification.permission: <span class="noti-perm"></span></h6>
    </div>
    `;

  const main = () => {
    const notiButton = document.querySelector('#noti-button-js');
    const notiPerm = document.querySelector('.noti-perm');

    // 1) Get permission state
    if ('Notification' in window) {
      notiPerm.innerText = Notification.permission; // default, granted, denied
    } else {
      notiPerm.innerText = 'Not supported';
    }

    // 2) Get permission state dynamically
    navigator.permissions.query({ name: 'notifications' }).then((perm) => {
      // notiPerm.innerText = perm.state; // prompt, granted, denied
      perm.onchange = () => (notiPerm.innerText = perm.state);
      // perm.onchange = (e) => (notiPerm.innerText = e.target.state);
    });
    notiButton.addEventListener('click', notifyMe);
  };

  return { templateHTML, main };
};

function notifyMe() {
  if (!('Notification' in window)) {
    alert('Notification is not supported.');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification('New Message!-1'); // send a message
    console.log(notification);
  } else if (Notification.permission !== 'denied') {
    alert('Permission has been requested.');
    Notification.requestPermission().then((permission) => {
      // console.log(permission); // default, granted, denied
      if (permission === 'granted') {
        alert('Permission granted now!');
        const notification = new Notification('New Message!-2'); // send a message
        console.log(notification);
      }
    });
  } else {
    alert('Notification: denied');
  }
}

export { section7 };

// console.log(new Notification('New Message!-1'));
/* Notification {
actions: []
badge: ""
body: ""
data: null
dir: "auto"
icon: ""
image: ""
lang: ""
onclick: null
onclose: null
onerror: null
onshow: null
renotify: false
requireInteraction: false
silent: false
tag: ""
timestamp: 1718092023803
title: "New Message!-1"
vibrate: []
} */
