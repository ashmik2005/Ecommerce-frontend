export default {

  oidc: {
    clientId: '0oa92d7locGsAM3ib5d7', // identifier of client app
    issuer: 'https://dev-83677328.okta.com/oauth2/default', // issuer of tokens, URL that will be used when authorizing with okta authorizing server
    redirectUri: 'http://localhost:4200/login/callback', // once the user logs in, send them here..
    scopes: ['openid', 'profile', 'email'] // Scopes provide access to information about a user
  }

}
