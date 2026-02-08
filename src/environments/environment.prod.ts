export const environment = {
  production: true,
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
