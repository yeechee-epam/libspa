const { writeFile } = require('fs');
const path = require('path');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  auth0: {
    domain: '${process.env.AUTH0_DOMAIN}',
    clientId: '${process.env.AUTH0_CLIENT_ID}',
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      audience: '${process.env.AUTH0_AUDIENCE}',
      redirect_uri: '${process.env.AUTH0_CALLBACK_URL}',
    },
    errorPath: '/callback'
  },
  api: {
    serverUrl: '${process.env.API_SERVER_URL}',
  },
};
`;

writeFile(targetPath, envConfigFile, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
