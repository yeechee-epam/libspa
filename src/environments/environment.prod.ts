export const environment = {
  production: true,
  auth0: {
    domain: 'dev-xkl6rfiq0rmh5wfz.us.auth0.com',
    clientId: 'sSJ9KgcTdDvkEAQHeksoqzxuxSjblDNS',
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      audience: 'https://api.library-cru.xyz',
      redirect_uri: 'https://library-cru.xyz/callback',
    },
    errorPath: '/callback'
  },
  api: {
    serverUrl: 'https://api.library-cru.xyz',
  },
};
