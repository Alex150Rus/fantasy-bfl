const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


router.get('/teamadd', async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.post('/create', async (req, res) => {
  try {
    const data = { team : req.body.team}

    const client = await pool.connect()
    const result = await client.query("INSERT INTO teams(team) values($1) RETURNING id", 
    [req.body.team]);

    const results = { 'teamId': (result) ? result.rows[0].id : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.post('/delete', async (req, res) => {
  try {
    const id = req.body.id;
    const client = await pool.connect()
    const result = await client.query("DELETE FROM teams WHERE id=($1)", [id]);
    const results = { 'team': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.put('/:id', async (req, res) => {
  const result =[];
  try {
    const id = req.params.id;
    const team =  req.body.team;
    const client = await pool.connect()
    const result = await client.query("UPDATE teams SET team=($1) WHERE id = ($2);",
    [team, id]);

    const results = { 'team': (result) ? result.rowCount : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = router;
