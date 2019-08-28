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
    client.release();
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
    client.release();
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = router;
