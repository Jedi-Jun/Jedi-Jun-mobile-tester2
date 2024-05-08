/* 3) Navigator */
const section3 = () => {
  const templateHTML = `
    <div class='navigator-wrapper'>
      <h5>navigator.userAgentData</h5>
      <ol class='navigator-list' id='navigator-a-list-js'></ol>
      <div class='navigator-title-wrapper'>
        <h5>navigator</h5>
        <button id='alert-button-js' click={foo}>🔔</button>
      </div>
      <ol class='navigator-list' id='navigator-b-list-js'></ol>
    </div>
  `;

  const main = () => {
    createListA();
    createListB();
  };

  return { templateHTML, main };
};

const createListA = () => {
  const listA = document.querySelector('#navigator-a-list-js');

  if ('userAgentData' in navigator) {
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

    listA.innerHTML = HTMLString;
  } else {
    alert('navigator.userAgentData is not supported');
  }
};

const createListB = () => {
  const listB = document.querySelector('#navigator-b-list-js');
  const alertIcon = document.querySelector('#alert-button-js');
  const alertNavigator = () => {
    const _navigator = {};
    for (const key in navigator) {
      _navigator[key] = navigator[key];
    }
    alert(JSON.stringify(_navigator, null, 2));
  };
  alertIcon.addEventListener('click', alertNavigator);

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

  listB.innerHTML = HTMLString;
};

export { section3 };
