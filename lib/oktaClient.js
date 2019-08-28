const okta = require('@okta/okta-sdk-nodejs');

const {token, org_url} = require('./../config')
 
const client = new okta.Client({
  orgUrl: org_url,
  token: token,
});
 
module.exports = client;