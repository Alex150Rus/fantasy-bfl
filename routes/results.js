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
    const result = await client.query("SELECT results.id, date, time, teams_1.team as home, teams_2.team as guest, homeTeamGoals, guestTeamGoals FROM results INNER JOIN teams AS teams_1 ON (teams_1.id = results.guestTeamId) INNER JOIN teams AS teams_2 ON (teams_2.id = results.homeTeamId);");
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
    const data = { date: req.body.date, time: req.body.time, homeTeamId: req.body.homeTeamId, guestTeamId: req.body.guestTeamId, homeTeamGoals: req.body.homeTeamGoals, guestTeamGoals: req.body.guestTeamGoals }
    const client = await pool.connect()
    const result = await client.query("INSERT INTO results(date, time, homeTeamId, guestTeamId, homeTeamGoals, guestTeamGoals) values($1, $2, $3, $4, $5, $6)", 
    [data.date, data.time, data.homeTeamId, data.guestTeamId, data.homeTeamGoals, data.guestTeamGoals]);
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
    const result = await client.query("DELETE FROM results WHERE id=($1)", [id]);
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/bd', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM results;");
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
    const result = await client.query("SELECT * FROM results WHERE id = ($1);", [id]);
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
    const data = { date: req.body.date, time: req.body.time, homeTeamId: req.body.homeTeamId, guestTeamId: req.body.guestTeamId, homeTeamGoals: req.body.homeTeamGoals, guestTeamGoals: req.body.guestTeamGoals }
    const client = await pool.connect()
    const result = await client.query("UPDATE results SET date=($1), time=($2), homeTeamId=($3), guestTeamId=($4), homeTeamGoals=($5), guestTeamGoals=($6) WHERE id = ($7);",
    [data.date, data.time, data.homeTeamId, data.guestTeamId, data.homeTeamGoals, data.guestTeamGoals, id]);

    const results = { 'results': (result) ? result.rowCount : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.get('/bd', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM results;");
    const results = { 'results': (result) ? result.rows : null};
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = router;
