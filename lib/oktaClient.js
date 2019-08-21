const okta = require('@okta/okta-sdk-nodejs');
 
const client = new okta.Client({
  orgUrl: 'https://dev-823877.okta.com',
  token: '00YzZbeoLJWYdiZKBCxVUAwnUe9L0njaFKHeb0y9ZP'
});
 
module.exports = client;