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
    const result = await client.query("SELECT id, team_id, team, games_played, wins, draws, looses, goales_scored, goales_missed, points FROM league_table lt INNER JOIN teams ON teams.id = lt.team_id ORDER BY points DESC;");
    const results = { 'league table': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.post('/create', async (req, res) => {
  try {
    const data = { team_id : req.body.team_id, games_played : req.body.games_played, wins : req.body.wins, draws : req.body.draws,
      looses : req.body.looses, goales_scored : req.body.goales_scored, goales_missed : req.body.goales_missed, points : req.body.points}

    const client = await pool.connect()
    const result = await client.query("INSERT INTO league_table(team_id, games_played, wins, draws, looses, goales_scored, goales_missed, points) values($1, $2, $3, $4, $5, $6, $7, $8)", 
    [req.body.team_id, req.body.games_played, req.body.wins, req.body.draws, req.body.looses, req.body.goales_scored, req.body.goales_missed,  req.body.points]);
    const results = { 'results': (result) ? result.rows : null};
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
    const result = await client.query("DELETE FROM league_table WHERE team_id=($1)", [id]);
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM laegue_table WHERE id = ($1);", [id]);
    const results = { 'results': (result) ? result.rows : null};
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
    const data = { team_id : req.body.team_id, games_played : req.body.games_played, wins : req.body.wins, draws : req.body.draws,
      looses : req.body.looses, goales_scored : req.body.goales_scored, goales_missed : req.body.goales_missed, points : req.body.points }
    const client = await pool.connect()
    const result = await client.query("UPDATE league_table SET team_id = ($1), games_played = ($2), wins = ($3), draws = ($4), looses = ($5), goales_scored = ($6), goales_missed = ($7), points = ($8)) WHERE id = ($9);",
    [req.body.team_id, req.body.games_played, req.body.wins, req.body.draws, req.body.looses, req.body.goales_scored, req.body.goales_missed,  req.body.points, req.params.id]);

    const results = { 'results': (result) ? result.rowCount : null};
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
