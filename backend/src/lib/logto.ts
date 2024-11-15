const logtoEndpoint = process.env.LOGTO_ENDPOINT;
const tokenEndpoint = process.env.TOKEN_ENDPOINT!;
const applicationId = process.env.APPLICATION_ID;
const applicationSecret = process.env.APPLICATION_SECRET;
const tenantId = process.env.TENANT_ID;

export async function fetchAccessToken(){
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

export {logtoEndpoint}