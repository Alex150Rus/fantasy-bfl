const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
//обязательно ограничивать домены
app.use(cors({origin: true}));


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
      `INSERT INTO news(news_date, title, text, imgFileName) 
      VALUES 
      ('2019-02-04', 'Классика БФЛ! Финал "Молодость" - "СОШ №54".', 'Первый тайм сумасшедший накал. "Школьники" повели 2:0 к 10-ой минуте, но на перерыв ушли при 2:2. А второй тайм начался по такому же сценарию. Снова 2 гола за 10 минут. И снова в последней пятиминутке зрители увидели еще 2 гола, но они были забиты игроками "СОШ №54". 6:2 и есть третий титул чемпиона БФЛ!', 'news_img_1'),
      ('2019-03-25', 'Финал Большого Кубка выдался шикарным', '"Fokinka United" оказалась сильней "Без Будущего" 4:3 в финале Большого Кубка.
      "Old School" собрались на игру с "Ротором" неплохим по количеству составом и победили 8:3.
      "Янг Бойз" 2 ничьих в трех матчах маловато. Решили оформить еще одну с "800ударов" - 3:3.
      "У "Янг Бойз" 3 ничьих, а у нас две? Пфф" - с таким девизом вышли на матч игроки "Сокол Брянск" с "Русичами". Как итог 4:4, отметим что соколы отыгрались с 1:4.
      А "Десна Выгоничи" вышли на матч с "Дормашом" с девизом "Сокол Брянск" камбэчит с 1:4? Пфф". "Красные" уступая 0:3, выиграли 5:4.
      "Citizens" обрушили град ударов по воротам "Рубина", но цели достигли только 6. Но это не помешало выиграть 6:2.
      ', 'news_img_2')
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

app.get('/league-table', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT team_id, team, games_played, wins, draws, looses, goales_scored, goales_missed, points FROM league_table lt INNER JOIN teams ON teams.id = lt.team_id;");
    const results = { 'league table': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/league-table/insert', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      `INSERT INTO league_table(team_id, games_played, wins, draws, looses, goales_scored, goales_missed, points) 
      VALUES
      (1, 0, 0, 0, 0, 0, 0, 0),
      (2, 0, 0, 0, 0, 0, 0, 0),
      (3, 0, 0, 0, 0, 0, 0, 0),
      (4, 0, 0, 0, 0, 0, 0, 0),
      (5, 0, 0, 0, 0, 0, 0, 0),
      (6, 0, 0, 0, 0, 0, 0, 0),
      (7, 0, 0, 0, 0, 0, 0, 0),
      (8, 0, 0, 0, 0, 0, 0, 0),
      (9, 0, 0, 0, 0, 0, 0, 0),
      (10, 0, 0, 0, 0, 0, 0, 0),
      (11, 0, 0, 0, 0, 0, 0, 0),
      (12, 0, 0, 0, 0, 0, 0, 0),
      (13, 0, 0, 0, 0, 0, 0, 0),
      (14, 0, 0, 0, 0, 0, 0, 0),
      (15, 0, 0, 0, 0, 0, 0, 0),
      (16, 0, 0, 0, 0, 0, 0, 0),
      (17, 0, 0, 0, 0, 0, 0, 0),
      (18, 0, 0, 0, 0, 0, 0, 0),
      (19, 0, 0, 0, 0, 0, 0, 0),
      (20, 0, 0, 0, 0, 0, 0, 0),
      (21, 0, 0, 0, 0, 0, 0, 0),
      (22, 0, 0, 0, 0, 0, 0, 0),
      (23, 0, 0, 0, 0, 0, 0, 0),
      (24, 0, 0, 0, 0, 0, 0, 0)
      ;`);
    const results = { 'league table': (result) ? result.rows : null};
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

