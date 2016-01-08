"use npm";
"use latest";

const _ = require('lodash');
const adal = require('adal-node');
const request = require('request');

const authenticate = (tenantId, clientId, servicePrincipalPassword, cb) => {
  const context = new adal.AuthenticationContext(`https://login.windows.net/${tenantId}`);
  context.acquireTokenWithClientCredentials(`https://management.azure.com/`, clientId, servicePrincipalPassword, (err, res) => {
    if (err) {
      return cb(err);
    }

    return cb(null, res.accessToken);
  });
}

module.exports = (ctx, done) => {
  let settings = ['AD_CLIENT_ID', 'AD_SERVICE_PRINCIPAL_PASSWORD', 'AD_TENANT_ID', 'AZURE_SUBSCRIPTION_ID'];
  let missing_settings = settings.filter((setting) => !ctx.data[setting]);
  if (missing_settings.length) {
    return done({ message: 'Missing settings: ' + missing_settings.join(', ') });
  }

  authenticate(ctx.data.AD_TENANT_ID, ctx.data.AD_CLIENT_ID, ctx.data.AD_SERVICE_PRINCIPAL_PASSWORD, (err, accessToken) => {
    if (err) {
      return done({
        message: 'Error authenticating.',
        err: err
      });
    }

    const options = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true,
      url: `https://management.azure.com/subscriptions/${ctx.data.AZURE_SUBSCRIPTION_ID}/resources?api-version=2015-01-01`
    };

    request.get(options, (err, res, body) => {
      if (err) {
        return done({ err: err });
      }

      if (res.statusCode !== 200) {
        return done({
          message: 'Error loading resoruces',
          status: res.statusCode,
          error: body
        });
      }

      // This contains all of your resources.
      return done(null, _.take(body.value, 5));
    });
  });
};
