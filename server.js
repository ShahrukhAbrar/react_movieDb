var express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();

app.use(cors());

const config = {
  server: 'DESKTOP-PFJUO84',
  database: 'moviedb',
  user: 'afnan',
  password: '1234',
  port:1433,
  options: {
    trustedConnection: false,
    trustServerCertificate: true,
  }
}



/* GET users listing. */
app.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

app.get('/actors', async (req, res, next) => {
    let pool = await sql.connect(config)

    let result = await pool.request().query('SELECT * from Actors');

    res.send(result);
});

app.get('/movie', async (req, res, next) => {
  let pool = await sql.connect(config)

  let result = await pool.request().query('SELECT * from Movies');

  res.send(result.recordset);
});

app.get('/cast', async (req, res, next) => {
  let pool = await sql.connect(config)

  let result = await pool.request().query('SELECT * from Cast');

  res.send(result);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
