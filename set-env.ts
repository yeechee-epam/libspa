const { writeFile, existsSync, mkdirSync } = require('fs');
const { promisify } = require('util');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const writeFilePromisified = promisify(writeFile);

const targetPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
  production: false,
  auth0: {
    domain: '${process.env['AUTH0_DOMAIN']}',
    clientId: '${process.env['AUTH0_CLIENT_ID']}',
    useRefreshTokens: true,//used to get new access token in background without user interaction when access token expires
    cacheLocation: 'localstorage',
    
    authorizationParams: {
    audience: '${process.env['AUTH0_AUDIENCE']}',
      redirect_uri: '${process.env['AUTH0_CALLBACK_URL']}',
      
      
    },
    errorPath: '/callback',
    // useRefreshTokens: true,
    // cacheLocation: 'localstorage'
  },
  api: {
    serverUrl: '${process.env['API_SERVER_URL']}',
  },
};
`;

(async () => {
  try {
    await ensureDirectoryExistence(targetPath)
    await writeFilePromisified(targetPath, envConfigFile);
  } catch (err) {
    console.error(err);
    throw err;
  }
})();

function ensureDirectoryExistence(filePath: string) {
  var dirname = path.dirname(filePath);
  if (existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  mkdirSync(dirname);
  return;
}