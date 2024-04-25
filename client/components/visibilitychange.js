/* 5) visibilitychange + focus + blur */
const section5 = () => `
<ol class='vis-wrapper'>
  <p>=== Start to tab! ===</p>
  <div class='vis-bottom'></div>
</ol>
`;

const events = [
  {
    name: 'visibilitychange',
    message: `visibilitychange: ${document.visibilityState}`,
  },
  { name: 'focus', message: 'Focus: user came in.' },
  { name: 'blur', message: 'Blur: user went out.' },
];

events.forEach((event) => {
  window.addEventListener(event.name, () => createList(event.name, event.message));
});

const createList = (eventName, text) => {
  const vis_wrapper = document.querySelector('.vis-wrapper');
  const vis_bottom = document.querySelector('.vis-bottom');
  if (!vis_wrapper) return;

  function insertVisibilitychangeTime() {
    const getVisibilityState = document.hidden ? 'h' : 'v';
    const div = document.createElement('div');
    div.classList.add('vis-time-wrapper');
    const hr1 = document.createElement('hr');
    const hr2 = document.createElement('hr');
    const span = document.createElement('span');
    span.classList.add('vis-time');
    const options = {
      timeZone: 'Asia/Seoul',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const time = new Intl.DateTimeFormat('en-US', options).format();
    span.innerText = `${time}(${getVisibilityState})`;
    div.append(hr1, span, hr2);
    vis_wrapper.insertBefore(div, vis_bottom);
  }

  const li = document.createElement('li');
  if (eventName === 'visibilitychange' && document.hidden) {
    insertVisibilitychangeTime();
    li.innerText = 'visibilityState: hidden';
  } else if (eventName === 'visibilitychange' && !document.hidden) {
    li.innerText = 'visibilityState: visible';
    insertVisibilitychangeTime();
  } else {
    li.innerText = text;
  }
  vis_wrapper.insertBefore(li, vis_bottom);
  vis_bottom.scrollIntoView(false);
};

export { section5 };
