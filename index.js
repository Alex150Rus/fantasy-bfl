const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
//обязательно ограничивать домены
app.use(cors({origin: ['https://intense-plains-62231.herokuapp.com/']}));


app.get('/users', (request, response) => {
  response.json('Hello user!');
})

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get('/newsadd', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      `INSERT INTO news(news_date, title, text) 
      VALUES 
      ('2019-08-14', 'Локомотив близок к лёгкой группе в ЛЧ. Свежая таблица коэффициентов УЕФА', 'Москвичам помог массовый вылет фаворитов из Лиги чемпионов. У России есть прекрасный шанс проявить себя в главном турнире Европы.'),
      ('2019-08-14', 'Новый соперник Краснодара слабее Порту. Но обыграть греков сложно', 'Главное, что нужно знать об Олимпиакосе — команде, которая стоит на пути Краснодара в групповой раунд ЛЧ.'),
      ('2019-08-14', 'Зе Луиш едва не лишил Краснодар победы. Похоже, он терпеть не может этот клуб', 'Забил им чуть ли не больше всех. Ну и ладно!'),
      ('2019-08-14', '22 пенальти в Копенгагене. Упрямее оказались сербы', 'Двум игрокам пришлось выходить к 11-метровой отметке по два раза. Об этом и другом – в обзоре новостей дня.')
      ;`);
    const results = { 'results': (result) ? result.rows : null};
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/teamadd', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      `INSERT INTO teams(team) 
      VALUES
      ('Дормаш'),
      ('Икарус'),
      ('Милсон'),
      ('Силовик'),
      ('Металлург'),
      ('Citizens'),
      ('Old School'),
      ('Русичи'),
      ('Десна'),
      ('Ротор'),
      ('Янг Бойз'),
      ('Рубин'),
      ('ШПЛ'),
      ('800 ударов'),
      ('Легион'),
      ('Жемчужина '),
      ('Десна Выг'),
      ('Беседь'),
      ('Сокол'),
      ('Теннисисты'),
      ('Черная фурия'),
      ('Без Будущего'),
      ('Сокол'),
      ('Good Game')
      ;`);
    const results = { 'results': (result) ? result.rows : null};
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/news', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM news;");
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/teams', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM teams;");
    const results = { 'teams': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/newsdel', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("DELETE FROM news;");
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

