const logtoEndpoint = process.env.LOGTO_ENDPOINT;
const tokenEndpoint = process.env.TOKEN_ENDPOINT!;
const applicationId = process.env.APPLICATION_ID;
const applicationSecret = process.env.APPLICATION_SECRET;
const tenantId = process.env.TENANT_ID;

export async function fetchAccessToken() {
  return await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${applicationId}:${applicationSecret}`).toString(
        'base64'
      )}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      resource: `https://${tenantId}.logto.app/api`,
      scope: 'all',
    }).toString(),
  });
};

export async function fillUserData(userdata: any) {
  const { userid, username, name, avatar } = userdata

  return await fetch(`${logtoEndpoint}/api/users/${userid}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name, "username": username,
      "avatar": avatar,
    })
  });
}


export async function deleteUser(userId: string) {
  console.log(await ((await fetch(`${logtoEndpoint}/api/users/${userId}`, {
    method:"DELETE",
    headers: {
      "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
    },
  })).json()))
}
export async function getUsers() {
  return (await ((await fetch(`${logtoEndpoint}/api/users`, {
    headers: {
      "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
    },
  })).json()))
}
// (async () => {
//   const s = await getUsers()
//   s.forEach(async (e) => {
//     console.log(e);
//     await deleteUser(e.id)
//   });
// })()
// console.log(await (await fetchAccessToken()).json());



export { logtoEndpoint }

