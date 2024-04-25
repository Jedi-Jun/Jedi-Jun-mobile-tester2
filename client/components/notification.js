/* 7) new Notification */
const section7 = () => {
  const onClick = () => {
    Notification.requestPermission().then(perm => {
      const options = {
        body: `New message arrived! [${new Date().getMilliseconds()}]`,
        data: { title: 'chatApp' },
        // icon: 'nasa.svg',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png',
        tag: 'dm',
      };
      const notification = new Notification('Cocoa Talk', options);
      console.log(perm);
      console.log(notification);

      if (perm === 'granted') {
        notification.addEventListener('click', e => console.log(e));
      } else if (perm === 'denied') {
        notification.addEventListener('error', e => console.log(e));
      } else {
        // 'default'
      }
    });
  };
  setTimeout(() => {
    const notiButton = document.querySelector('#noti-button-js');
    notiButton.addEventListener('click', onClick);
  }, 100);
  return `
    <div>
      new Notification!
      <button id="noti-button-js">Click</button>
    </div>
    `;
};

export { section7 };
