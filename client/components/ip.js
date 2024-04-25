const appMain = document.querySelector('.app-main');
let abortController = null;

/* 4) IP address */
const section4 = (data = null) => {
  if (!data) {
    getIpInfo();
    return `<div>Loading...</div>`;
  } else {
    return `<ol class='navigator-wrapper'>${data}</ol>`;
  }
};

const getIpInfo = async () => {
  const URL = 'https://home.dongrim.site/api/v1/ip';

  abortController = new AbortController();
  const signal = abortController.signal;

  fetch(URL, { signal })
    .then((res) => res.json())
    .then((data) => {
      const result = createList(data);
      appMain.innerHTML = section4(result);
    }); // .catch(err => console.log(err));
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
