/* 7) new Notification */
const section7 = () => {
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

const onClick = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      //
    } else if (permission === 'denied') {
      //
    } else {
      // 'default'
    }

    const options = {
      body: `New message arrived! [${new Date().getMilliseconds()}]`,
      data: { title: 'chatApp' },
      // icon: 'nasa.svg',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png',
      tag: 'dm',
    };

    const notification = new Notification('Cocoa Talk', options);
    // console.log(permission); // default, granted, denied
    // console.log(Notification.permission); // default, granted, denied
    // console.log(notification);

    notification.onclick = function () {
      console.log('noti-onclick');
      // window.open('https://www.example.com/messages', '_blank');
    };

    notification.onclose = function () {
      console.log('noti-onclose');
    };

    notification.onerror = function () {
      console.log('noti-onerror');
    };

    notification.onshow = function () {
      console.log('noti-onshow');
      /* setTimeout(function () {
        console.log('5초 후 알림 자동 닫힘');
        notification.close();
      }, 5000); */
    };
  });
};

export { section7 };
