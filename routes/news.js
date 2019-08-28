const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/', async (req, res) => {
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

router.post('/create', async (req, res) => {
  try {
    const data = { news_date: req.body.news_date, title: req.body.title, text: req.body.text,
       imgFileName: req.body.imgFileName }

    const client = await pool.connect()
    const result = await client.query("INSERT INTO news(news_date, title, text, imgFileName) values($1, $2, $3, $4)", 
    [data.news_date, data.title, data.text, data.imgFileName]);
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    client.release();
    console.error(err);
    res.send("Error " + err);
  }
})

router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect()
    const result = await client.query("DELETE FROM news WHERE id=($id)", [id]);
    const results = { 'results': (result) ? result.rowCount : null};
    res.send(results);
    client.release();
  } catch (err) {
    client.release();
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM news WHERE id = ($1);", [id]);
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    client.release();
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/newsadd', async (req, res) => {
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
    client.release();
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/newsdel', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("DELETE FROM news;");
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    client.release();
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = router;
