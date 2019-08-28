const okta = require('@okta/okta-sdk-nodejs');
 
const client = new okta.Client({
  orgUrl: process.env.orgUrl,
  token: process.env.token,
});
 
module.exports = client;