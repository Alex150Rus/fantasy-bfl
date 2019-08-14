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
    const result = await client.query("INSERT INTO news(news_date, title, text) VALUES (2019-08-14, 'Краснодар разгромил Порту', 'Краснодар одержал неожиданную победу в Португалии и вышел в следующий раунд ЛЧ');");
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

