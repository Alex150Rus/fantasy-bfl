const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const teams = require('./routes/teams');
const news = require('./routes/news');
const results = require('./routes/results');
const leagueTable = require('./routes/league-table');
const cloudinary = require('./routes/cloudinary')

app.use(bodyParser.json());
//обязательно ограничивать домены
app.use(cors({origin: true}));

app.use('/users', users);
app.use('/teams', teams);
app.use('/news', news);
app.use('/results', results);
app.use('/league-table', leagueTable);
express.createServer().use('/cloudinary', cloudinary);


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
console.log(`server running at: http://localhost:${port}/`);
app.listen(port);

