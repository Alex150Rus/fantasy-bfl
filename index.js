const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const users = require('./routes/users')
const teams = require('./routes/teams')
const news = require('./routes/news')
const leagueTable = require('./routes/league-table')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//обязательно ограничивать домены
app.use(cors({origin: true}));



app.use('/users', users);
app.use('/teams', teams);
app.use('/news', news);
app.use('/league-table', leagueTable);


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

