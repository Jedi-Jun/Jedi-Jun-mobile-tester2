import { section1 } from './components/home.js';
import { section2 } from './components/pointer.js';
import { section3 } from './components/navigator.js';
import { section4, abortController } from './components/ip.js';
import { section5 } from './components/visibilitychange.js';
import { section6 } from './components/visualViewport.js';
import { section7 } from './components/notification.js';
import { section8 } from './components/push.js';
import { section9 } from './components/permission.js';

const appMain = document.querySelector('.app-main');
const navButtons = document.querySelectorAll('.nav');
const HTMLTemplates = {
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8,
  section9,
};

window.addEventListener('load', () => {
  // Set dynamic 100vh for Mobile Browser
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

navButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    selectedButtonEffect(button);
    const section = button.dataset.id;
    appMain.innerHTML = await HTMLTemplates[section]();
    if (section !== 'section4') abortController?.abort();
  });
});

function selectedButtonEffect(target) {
  navButtons.forEach((btn) => (btn.style.textShadow = 'none'));
  target.style.textShadow = '1px 0px 0px black';
}
