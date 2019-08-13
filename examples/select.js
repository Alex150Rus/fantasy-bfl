const { Pool } = require ('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');

//считаем данные из системной таблицы, в которой хранятся имена всех таблиц. $1 - в массиве параметров под нулевым индексом.
const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1`;

pool.query(sql, ['marqus'], (err,res)=>{
  if (err) {
    throw err
  }
  console.dir({res});
  //вывести табличку с полями
  console.table(res.fields);
  //вывести табличку которую прочитали
  console.table(res.rows);
  pool.end();
})