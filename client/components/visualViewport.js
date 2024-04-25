const appMain = document.querySelector('.app-main');

/* 6) window.visualViewport & innerHeight */
const section6 = () => `
<div class='visual-wrapper'>
  <div class='visual-header'>
    header
  </div>
  <div class='visual-content'>
    <div class='visual-content-innerHeight'>
      <div>
        <span>window.innerHeight</span>
        <code>window\n.addEventListener\n('resize', cb);</code>
      </div>
      <p></p>
      </div>
      <div class='visual-content-visualViewport'>
      <div>
        <span>window.visualViewport.height</span>
        <code>window.visualViewport\n.addEventListener\n('resize', cb);</code>
      </div>
      <p></p>
    </div>
  </div>
  <input />
</div>
`;

// Get visualViewport & innerHeight by resize
window.addEventListener('resize', innerHeight);
window.visualViewport.addEventListener('resize', visualViewport);

function innerHeight() {
  const innerHeightElement = document.querySelector('.visual-content-innerHeight');
  if (!innerHeightElement) return;
  innerHeightElement.children[1].innerHTML = `
    <span>innerWidth: ${window.innerWidth}</span>
    <span>innerHeight: ${window.innerHeight}</span>
    `;
}

function visualViewport() {
  const visualViewportElement = document.querySelector('.visual-content-visualViewport');
  if (!visualViewportElement) return;
  const _ = (value) => {
    if (typeof value !== 'number' || Number.isInteger(value)) return value;
    return Number.parseFloat(value).toFixed(2);
  };
  visualViewportElement.children[1].innerHTML = `
      <span>width: ${_(window.visualViewport.width)}</span>
      <span>height: ${_(window.visualViewport.height)}</span>
      <span>offsetLeft: ${_(window.visualViewport.offsetLeft)}</span>
      <span>offsetTop: ${_(window.visualViewport.offsetTop)}</span>
      <span>onresize: ${_(window.visualViewport.onresize)}</span>
      <span>onscroll: ${_(window.visualViewport.onscroll)}</span>
      <span>pageLeft: ${_(window.visualViewport.pageLeft)}</span>
      <span>pageTop: ${_(window.visualViewport.pageTop)}</span>
      <span>scale: ${_(window.visualViewport.scale)}</span>
    `;
}

appMain.addEventListener('click', () => {
  const visualWrapper = document.querySelector('.visual-wrapper');
  if (visualWrapper) {
    innerHeight();
    visualViewport();
  }
});

export { section6 };
