/* 9) PAW, Progressive Web Apps */

let installPrompt = null;

const section10 = () => {
  const templateHTML = `
    <div class="push-wrapper">
      <div class="push-header-wrapper">
        <div>Progressive Web Apps</div>
        <button id="install-button-js">Install</button>
      </div>
      <div class="push-body-wrapper">
        <h6>iOS: <span class="device-name"></span></h6>
        <h6><code>navigator.userAgent</code>: <span class="useragent"></span></h6>
      </div>
    </div>
  `;

  const main = () => {
    const installAppButton = document.querySelector('#install-button-js');
    const deviceName = document.querySelector('.device-name');
    const useragent = document.querySelector('.useragent');

    installAppButton.addEventListener('click', installApp);

    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    const highlightedWords = ['iPad', 'iPhone', 'iPod', 'Windows', 'Android'];

    deviceName.innerText = String(isDeviceIOS);
    useragent.innerHTML = highlightWord(highlightedWords);
  };

  return { templateHTML, main };
};

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  // installButton.hidden = true;
  // installButton.removeAttribute('hidden');
});

const installApp = async () => {
  if (!installPrompt) {
    alert('beforeinstallprompt is not supported');
  }
  const { outcome } = await installPrompt.prompt();
  // const { outcome } = await installPrompt.userChoice;
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
