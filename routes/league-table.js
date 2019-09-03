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
    const result = await client.query("SELECT team_id, team, games_played, wins, draws, looses, goales_scored, goales_missed, points FROM league_table lt INNER JOIN teams ON teams.id = lt.team_id ORDER BY points DESC;");
    const results = { 'league table': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/league-table/insert', async (req, res) => {
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


module.exports = router;
