const { Pool } = require ('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})




//считаем данные из системной таблицы, в которой хранятся имена всех таблиц. $1 - в массиве параметров под нулевым индексом.
const sql = `SELECT * FROM news`;

pool.query(sql)
  .then(res => {
    const {rows} = res;
    console.table(rows);
  })
  .catch (err =>{
    console.log(err);
  })
  .finally(() => {
    pool.end();
  });