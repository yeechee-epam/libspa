export const environment = {
  production: true,
  auth0: {
    domain: '',
    clientId: '',
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      audience: '',
      redirect_uri: '',
    },
    errorPath: '/callback'
  },
  api: {
    serverUrl: '',
  },
};
