/* 7) new Notification */
const section7 = () => {
  setTimeout(() => {
    const notiButton = document.querySelector('#noti-button-js');
    const notiPerm = document.querySelector('.noti-perm');
    notiPerm.innerText = Notification.permission;
    navigator.permissions.query({ name: 'notifications' }).then((perm) => {
      // notiPerm.innerText = perm.state;
      perm.onchange = () => (notiPerm.innerText = perm.state);
    });
    notiButton.addEventListener('click', notifyMe);
  }, 0);

  return `
    <div>
      new Notification!
      <button id="noti-button-js">Click</button>
      <h6>Notification.permission: <span class="noti-perm"></span></h6>
    </div>
    `;
};

function notifyMe() {
  if (!('Notification' in window)) {
    alert('Notification is not supported.');
    // ...
  } else if (Notification.permission === 'granted') {
    const notification = new Notification('New Message!-1');
    // ...
  } else if (Notification.permission !== 'denied') {
    alert('Request permission now');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        alert('Now permission has been granted!');
        const notification = new Notification('New Message!-2');
      }
    });
  } else {
    alert('Notification: denied');
  }
}

export { section7 };
