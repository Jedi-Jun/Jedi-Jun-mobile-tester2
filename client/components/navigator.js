/* 3) Navigator */
const section3 = () => `
  <div class='navigator-wrapper'>
    <h5>navigator.userAgentData</h5>
    <ol class='navigator-list-wrapper'>
      ${createListA()}
    </ol>
    <div class='navigator-title-wrapper'>
      <h5>navigator</h5>
      <button id='alert-button-js' click={foo}>🔔</button>
    </div>
    <ol class='navigator-list-wrapper'>
      ${createListB()}
    </ol>
  </div>
`;

const createListA = () => {
  const targetAttributes = ['brands', 'mobile', 'platform'];
  let HTMLString = '';

  targetAttributes.forEach((attribute) => {
    if (Array.isArray(navigator.userAgentData[attribute])) {
      const brands = navigator.userAgentData[attribute].map(
        (ele) => `${ele.brand}(ver.${ele.version})`
      );
      HTMLString += `<li>${attribute}: ${brands.join(', ')}</li>`;
    } else {
      HTMLString += `<li>${attribute}: ${navigator.userAgentData[attribute]}</li>`;
    }
  });
  return HTMLString;
};

const createListB = () => {
  setTimeout(() => {
    const alertIcon = document.querySelector('#alert-button-js');
    alertIcon.addEventListener('click', onClick);
    function onClick() {
      const _navigator = {};
      for (const key in navigator) {
        _navigator[key] = navigator[key];
      }
      alert(JSON.stringify(_navigator, null, 2));
    }
  }, 100);

  const targetAttributes = [
    'appCodeName',
    'appName',
    'appVersion',
    'userAgent',
    'language',
    'vendor',
    'vendorSub',
  ];
  let HTMLString = '';

  targetAttributes.forEach((attribute) => {
    HTMLString += `<li>${attribute}: ${navigator[attribute]}</li>`;
  });
  return HTMLString;
};

export { section3 };
