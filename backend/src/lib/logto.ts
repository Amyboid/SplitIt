const logtoEndpoint = process.env.LOGTO_ENDPOINT;
const tokenEndpoint = process.env.TOKEN_ENDPOINT!;
const applicationId = process.env.APPLICATION_ID;
const applicationSecret = process.env.APPLICATION_SECRET;
const tenantId = process.env.TENANT_ID;


export async function fetchAccessToken() {
  // time left in seconds
  const timeLeft = ((Date.now() - parseInt(process.env.ACCESS_TOKEN_TIMESTAMP!)) / 1000);

  // if time left is greater than 2 min stored token is returned
  // otherwise a new token is fetched, set and returned

  if (timeLeft > 120) return process.env.ACCESS_TOKEN;

  process.env.ACCESS_TOKEN = (await (await fetch(tokenEndpoint, {
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
  })).json()).access_token;
  process.env.ACCESS_TOKEN_TIMESTAMP = (Date.now()).toString();

  return process.env.ACCESS_TOKEN;
}


export async function getUsers() {
  return (await ((await fetch(`${logtoEndpoint}/api/users`, {
    headers: {
      "Authorization": `Bearer ${await fetchAccessToken()}`
    },
  })).json()))
}


export async function deleteUser(userId: string) {
  console.log(await ((await fetch(`${logtoEndpoint}/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${await fetchAccessToken()}`
    },
  })).json()))
}


export async function deleteUsers(_confirmationString: "YES") {
  const users = await getUsers();
  users.forEach(async (user: any) => {
    await deleteUser(user.id)
    console.log("\x1b[38;5;197m[WARN] Deleted User:\x1b[0m", user);
  });
}


export async function fillUserData(userdata: any) {
  const { userid, username, name, avatar } = userdata

  return await fetch(`${logtoEndpoint}/api/users/${userid}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${await fetchAccessToken()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name, "username": username,
      "avatar": avatar,
    })
  });
}


export { logtoEndpoint }

