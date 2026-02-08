export const environment = {
  production: false,
  auth0: {
    domain: '',
    clientId: '',
    useRefreshTokens: true,//used to get new access token in background without user interaction when access token expires
    cacheLocation: 'localstorage',
    
    authorizationParams: {
    audience: '',
      redirect_uri: '',
      
      
    },
    errorPath: '/callback',
    // useRefreshTokens: true,
    // cacheLocation: 'localstorage'
  },
  api: {
    serverUrl: '',
  },
};
