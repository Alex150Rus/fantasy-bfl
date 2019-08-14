const { Pool } = require ('pg');

const pool = new Pool({
  connectionString: 'postgres://$(Alex150Rus@outlook.com)',
  ssl: true
});

(async () =>{

//считаем данные из системной таблицы, в которой хранятся имена всех таблиц.
const sql = `SELECT * FROM news`;

const {rows} = await pool.query(sql);
  console.log(rows);
  pool.end();
})();