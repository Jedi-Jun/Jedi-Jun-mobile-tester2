/* 2) Pointer */
const section2 = () => {
  const templateHTML = `
  <div class="app-section2">
    <div class="app-header">
      <div class="item wrapper-title"></div>
    </div>
    <div class="app-content">
      <div class="item wrapper-pointer">
        <span> pointer: </span>
      </div>
      <div class="item wrapper-hover">
        <span> hover: </span>
      </div>
      <div class="item wrapper-any-pointer">
        <span> any-pointer: </span>
      </div>
      <div class="item wrapper-any-hover">
        <span> any-hover: </span>
      </div>
    </div>
    <div class="app-content-others">
      <span>display-mode: <code class="display-mode"></code></span>
      <span>document.referrer:</span>
      <code class="referrer" id="referrer-js"></code>
    </div>
  </div>`;

  const main = () => {
    const referrer = document.querySelector('#referrer-js');
    const documentReferrer = document.referrer;
    documentReferrer && referrer.append(`"${documentReferrer}"`);
  };

  return { templateHTML, main };
};

export { section2 };
