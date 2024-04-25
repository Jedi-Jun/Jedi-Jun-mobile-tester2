/* 3) Navigator */
const section3 = () => `
  <div class='navigator-wrapper'>
    <h5>navigator.userAgentData</h5>
    <ol class='navigator-list-wrapper'>
      ${createListA()}
    </ol>
    <h5>navigator</h5>
    <ol class='navigator-list-wrapper'>
      ${createListB()}
    </ol>
  </div>
`;

const createListA = () => {
  const targetAttributes = ['brands', 'mobile', 'platform'];
  let HTMLString = '';

  targetAttributes.forEach(attribute => {
    if (Array.isArray(navigator.userAgentData[attribute])) {
      const brands = navigator.userAgentData[attribute].map(
        ele => `${ele.brand}(ver.${ele.version})`
      );
      HTMLString += `<li>${attribute}: ${brands.join(', ')}</li>`;
    } else {
      HTMLString += `<li>${attribute}: ${navigator.userAgentData[attribute]}</li>`;
    }
  });
  return HTMLString;
};

const createListB = () => {
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

  targetAttributes.forEach(attribute => {
    HTMLString += `<li>${attribute}: ${navigator[attribute]}</li>`;
  });
  return HTMLString;
};

export { section3 };
