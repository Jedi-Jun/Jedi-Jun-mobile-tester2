const section9 = async () => {
  const permissionList = await getPermissions();
  return `
    <h4>Permissions</h4>
    <table class="perm-wrapper">
      ${permissionList}
    </table>
  `;
};

const getPermissions = async () => {
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

  return HTMLString;
};

export { section9 };
