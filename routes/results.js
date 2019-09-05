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
    const result = await client.query("SELECT results.id, date, weekday, time, year, team as guestTeam, team as homeTeamId, homeTeamGoals, guestTeamGoals FROM results INNER JOIN teams ON (teams.id = results.guestTeamId or teams.id = results.homeTeamId);");
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
    const data = { date: req.body.date, weekday: req.body.weekday, time: req.body.time, year: req.body.year, homeTeamId: req.body.homeTeamId, guestTeamId: req.body.guestTeamId, homeTeamGoals: req.body.homeTeamGoals, guestTeamGoals: req.body.guestTeamGoals }
    const client = await pool.connect()
    const result = await client.query("INSERT INTO results(date, weekday, time, year, homeTeamId, guestTeamId, homeTeamGoals, guestTeamGoals) values($1, $2, $3, $4, $5, $6, $7, $8)", 
    [data.date, data.weekday, data.time, data.year, data.homeTeamId, data.guestTeamId, data.homeTeamGoals, data.guestTeamGoals]);
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
    const data = { date: req.body.date, weekday: req.body.weekday, time: req.body.time, year: req.body.year, homeTeamId: req.body.homeTeamId, guestTeamId: req.body.guestTeamId, homeTeamGoals: req.body.homeTeamGoals, guestTeamGoals: req.body.guestTeamGoals }
    const client = await pool.connect()
    const result = await client.query("UPDATE results SET date=($1), weekday=($2), time=($3), year=($4), homeTeamId=($5), guestTeamId=($6), homeTeamGoals=($7), guestTeamGoals=($8) WHERE id = ($9);",
    [data.date, data.weekday, data.time, data.year, data.homeTeamId, data.guestTeamId, data.homeTeamGoals, data.guestTeamGoals, id]);

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
