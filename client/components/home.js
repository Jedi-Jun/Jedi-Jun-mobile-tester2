const appMain = document.querySelector('.app-main');

/* 1) Home */
const section1 = () => {
  setTimeout(getGeoLocation, 0);
  return `
    <h1><a href="https://ipinfo.io">Dongrim</a></h1>
    <table class="geo-wrapper">
      <tr>
        <th>Lat:</th>
        <td class="geo geo-lat" data-id="lat"></td>
      </tr>
      <tr>
        <th>Long:</th>
        <td class="geo get-long" data-id="long"></td>
      </tr>
    </table>
    <h6 class="geo-perm">geolocation permission: </h6>
  `;
};

const getGeoLocation = () => {
  const coords = document.querySelectorAll('.geo');
  const onSuccess = (pos) => {
    const geo = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };
    coords.forEach((ele) => {
      ele.innerText = geo[ele.dataset.id];
    });
  };
  const onError = (err) => {
    console.error(err);
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  // geolocation permissionStatus
  const geoPermission = document.querySelector('.geo-perm');
  navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
    geoPermission.innerText = `geolocation permission: ${permissionStatus.state}`;
    permissionStatus.onchange = () => {
      geoPermission.innerText = `geolocation permission: ${permissionStatus.state}`;
    };
  });
};

window.addEventListener('load', () => {
  // Initial load `Home` template with Geo values
  appMain.innerHTML = section1();
});

export { section1 };
