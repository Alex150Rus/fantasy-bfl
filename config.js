const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  token: process.env.TOKEN,
  org_url: process.env.ORG_URL, 
  db_url: process.env.DATABASE_URL,
}