const section9 = () => {
  const templateHTML = `
    <h4>Permissions</h4>
    <table class="perm-wrapper" id='perm-list-js'></table>
  `;

  const main = () => {
    const permListElement = document.querySelector('#perm-list-js');
    getPermissions(permListElement);
  };

  return { templateHTML, main };
};

const getPermissions = async (permListElement) => {
  const permissions = [
    'geolocation',
    'notifications',
    'push',
    'camera',
    'microphone',
    'gyroscope',
    'accelerometer',
    'magnetometer',
    'persistent-storage',
    'accessibility-events',
    'ambient-light-sensor',
    'background-sync',
    'clipboard-read',
    'clipboard-write',
    'local-fonts',
    'midi',
    'payment-handler',
    'screen-wake-lock',
    'storage-access',
    'top-level-storage-access',
    'window-management',
  ];
  let HTMLString = '';

  for (const permission of permissions) {
    const result = await getPermission(permission);
    HTMLString += result;
  }

  async function getPermission(permission) {
    let th = '';
    let td = '';
    let state = '';
    try {
      const result = await navigator.permissions.query({ name: permission });
      th = permission;
      td = result.state;
      state = result.state;
    } catch (error) {
      th = permission;
      td = '(not supported)';
    } finally {
      return `
        <tr>
          <th class="perm ${state}">${th}</th>
          <td class="perm ${state}">${td}</td>
        </tr>`;
    }
  }

  permListElement.innerHTML = HTMLString;
};

export { section9 };
