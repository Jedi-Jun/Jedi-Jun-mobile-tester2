/* 4) IP address */
let abortController = null;

const section4 = (data = null) => {
  /* if (!data) {
    getIpInfo();
    return `<div class='ip-wrapper'>Loading...</div>`;
  } else {
    return `<ol class='ip-wrapper'>${data}</ol>`;
  } */

  const templateHTML = `
    <div class='ip-wrapper'>
      <ol class='ip-list' id='ip-list-js'></ol>
    </div>
  `;

  const main = () => {
    const ipListElement = document.querySelector('#ip-list-js');
    getIpInfo(ipListElement);
  };

  return { templateHTML, main };
};

const getIpInfo = async (ipListElement) => {
  const URL = 'https://home.dongrim.site/api/v1/ip';

  abortController = new AbortController();
  const signal = abortController.signal;

  fetch(URL, { signal })
    .then((res) => res.json())
    .then((data) => {
      const listHTML = createList(data);
      ipListElement.innerHTML = listHTML;
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
      document.querySelector('button[data-id=section1]').click();
    });
};

const createList = (data) => {
  if (!data) return null;

  let HTMLString = '';
  for (const key in data) {
    HTMLString += `<li>${key}: ${data[key]}</li>`;
  }
  return HTMLString;
};

export { section4, abortController };
