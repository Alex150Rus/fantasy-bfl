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
      ('2019-03-18', '"Barabas United" решил воспользоваться тем, что у "Легиона" не было Калинина, и сделал неплохой задел перед ответкой - 6:0.',
       'А вот "Термотрон" здорово закусился с "ТЧМ-45". "Железнодорожники" ушли от поражения благодаря отличному удару Лучина. 4:4 и перед ответкой ни у кого нет преимущества. 
       "Компьютер Гарант" и "Fokinka United" с осторожностью подошли к 1 матчу. Сильней оказались футболисты "Fokinka United" 3:2. 
       "Силовику" понравился сценарий 1/4 финала и они решили также с +9 закончить и первый матч 1/2 финала. Пострадала "Арома" 11:2. 
       Самый крутой матч выходных выдали "СОШ №54" и "Десна". По-переменно лидируя в счете в 2 мяча, победу за пару секунд до конца "Десне" принес точный удар Шильчикова 6:5. 
       "Молодость" и "Teamsport24" 40 минут играли в не совсем веселый футбол, по 2 раза наказав друг друга. Но за 10 минут до конца "Молодость" забила 3, а вот "Teamsport24" - 0. 5:2 и +3 задел перед второй игрой у "Молодости".
       ', 'news_img_3'),
      ('2019-03-11', 'Силовику" не удалось арестовать "Жемчужину". "Жемчужина" сильней 4:2.',
       '"Десна" и "ШПЛ" разошлись миром 5:5.
       Одержавший две победы на старте "Металлург" ничего не с мог поделать с "Без Будущего". Победа черных 7:3.
       "Милсон" одерживает вторую победу в двух матчах Весеннего. На этот раз дятьковцы разобрались с "Икарусом". 
       В ответной игре "Великолепная пятерка" и "СОШ №54" поиграли в свое удовольствие, в итоге 11:3 и дальше идут "школьники".
       Казалось, что ответная игра "Без Будущего" и "Десны" будет менее результативной. Но это только казалось. Вновь куча голов, и вновь победа "Десны", на этот раз 12:10.
       А вот "Teamsport24" и "Альтаир" выдали по-настоящему аккуратную игру. Но вновь сильней оказались футболисты "Teamsport24" 2:1.',
       'news_img_4'),
       ('2019-03-05', 'В первом четвертьфинальном матче между "Альтаиром" и "Teamsport24" завершился победой последних 6:3.',
       '"Десна" и "ШПЛ" разошлись миром 5:5.
       Но зная эти команды, смело можно сказать, что преимущество в 3 мяча - это не гарантия прохода в полуфинал. Да и у "Альтаира" в первом матче не хватало несколько игроков основы.
      "Великолепная пятерка" подарила зрителям отличную интригу в матче с "СОШ №54" ведя после перерыва 3:1. Но глубина состава сыграла свою роль. 10 полевых у "СОШ №54" дожали уставших шестерых полевых у "Пятерки" в последние 10 минут. 7:3 победа 2-кратных чемпионов БФЛ. Но, мы уверены, что во втором матче "Пятерка" отбывать номер не будет.
      "Десна" - "Без Будущего" 12:9. Совсем уже не характерный счет для плей-офф. Зато зрителей порадовали. +3 для "Десны" при таком обилии голов это ничто. Ждем зарубу во втором матче.
      18 минут "Метеор" играл на равных с "Молодостью", но дальше такая же история как и с "Великолепной пятеркой". Длина скамейки и ее уровень позволяет "Молодости" добиться комфортного преимущества - 11:2.
      ',
      'news_img_5')
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

