const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.get('/users', (request, response) => {
  response.send('Hello user!');
})

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

let port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});

