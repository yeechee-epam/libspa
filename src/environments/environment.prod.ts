export const environment = {
  production: true,
  frontendUrl: 'https://library-cru.xyz',
  
  auth0: {
    domain: 'undefined',
    clientId: 'undefined',
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      audience: 'undefined',
      redirect_uri: 'undefined',
    },
    errorPath: '/callback'
  },
  api: {
    serverUrl: 'undefined',
  },
};
