/* 9) PAW, Progressive Web Apps */

let deferredPrompt = null;

const section10 = () => {
  const templateHTML = `
    <div class="pwa-wrapper">
      <div class="pwa-header-wrapper">
        <div>Progressive Web Apps</div>
        <button id="install-button-js">Install PWA</button>
      </div>
      <div class="pwa-body-wrapper">
        <h6>iOS: <span class="device-name"></span></h6>
        <h6><code>navigator.userAgent</code>: <span class="useragent"></span></h6>
      </div>
      <div class="pwa-bottom-wrapper">
        <label for="appBadge"><code>navigator.setAppBadge(contents):</code></label>
        <div>
          <input type="number" id="appBadge" min="0"/>
          <button id="badgeSet-button-js" disabled>Set</button>
        </div>
        <code class="appBadge-reference">(contents: integer >= 0)</code>
      </div>
    </div>
  `;

  const main = () => {
    const installAppButton = document.querySelector('#install-button-js');
    const deviceName = document.querySelector('.device-name');
    const useragent = document.querySelector('.useragent');
    const appBadge = document.querySelector('#appBadge');
    const badgeSetButton = document.querySelector('#badgeSet-button-js');

    installAppButton.addEventListener('click', installWebApp);
    appBadge.addEventListener('focus', (event) => onFocusAppBadge(event, badgeSetButton));
    appBadge.addEventListener('input', (event) => onInputAppBadge(event, badgeSetButton));
    badgeSetButton.addEventListener('click', () => setBadge(appBadge));

    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    const highlightedWords = ['iPad', 'iPhone', 'iPod', 'Windows', 'Android'];

    deviceName.innerText = String(isDeviceIOS);
    useragent.innerHTML = highlightWord(highlightedWords);
  };

  return { templateHTML, main };
};

const onFocusAppBadge = (event, badgeSetButton) => {
  event.target.value = '';
  event.target.style.width = '4ch';
  badgeSetButton.disabled = true;
};

const onInputAppBadge = (event, badgeSetButton) => {
  const unread = event.target.value;
  if (unread.length > 2) {
    event.target.style.width = `${unread.length + 2}ch`;
  }
  if (unread.length !== 0 && typeof Number(unread) === 'number') {
    badgeSetButton.disabled = false;
  }
  if (unread.length === 0) {
    badgeSetButton.disabled = true;
  }
};

const setBadge = (appBadge) => {
  if (appBadge.value === '') return;
  const unread = Number(appBadge.value);
  if (!String(unread) || typeof unread !== 'number' || unread < 0) {
    alert('0 이상의 숫자만 입력해 주세요.');
    appBadge.focus();
  } else if (unread % 1 !== 0) {
    alert('소수점은 입력이 불가합니다.');
    appBadge.focus();
  } else {
    navigator.setAppBadge(unread).then(() => alert(`AppBadge=${unread}`));
  }
};

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // installButton.hidden = true;
  // installButton.removeAttribute('hidden');
});

const installWebApp = async () => {
  if (!deferredPrompt) {
    alert('beforeinstallprompt is NOT supported.');
  }
  const { outcome } = await deferredPrompt.prompt();
  // const { outcome } = await deferredPrompt.userChoice;
};

const highlightWord = (words) => {
  const userAgentString = window.navigator.userAgent;
  let _userAgent = userAgentString.slice(0);

  if (!userAgentString) return 'Not available';
  words.forEach((word) => {
    _userAgent = _userAgent.replaceAll(
      word,
      `<span class="useragent-highlight">${word}</span>`
    );
  });

  return _userAgent;
};

export { section10 };
