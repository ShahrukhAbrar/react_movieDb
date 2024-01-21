var express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();

app.use(cors());

const config = {
  server: 'DESKTOP-PFJUO84',
  database: 'MovDB',
  user: 'afnan',
  password: '1234',
  port:1433,
  options: {
    trustedConnection: false,
    trustServerCertificate: true,
  }
}



/* GET users listing. */
/*API Call functions start here :: DO NOT MODIFY WITHOUT DISCUSSION:: WILL BREAK THE SYSTEM */
app.get('/', (req, res, next) => {
    res.send('respond with a resource');
});
app.get('/genre', async (req, res, next) => {
  const genreTerm = req.query.q;
  console.log(genreTerm)

  if (!genreTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  let pool = await sql.connect(config)

  let result = await pool.request().query('SELECT * from GENRE');

  res.send(result.recordset);
})

app.get('/actors', async (req, res, next) => {
    let pool = await sql.connect(config)

    let result = await pool.request().query('SELECT * from Actors');

    res.send(result);
});

app.get('/movie', async (req, res, next) => {
  let pool = await sql.connect(config)

  let result = await pool.request().query('SELECT * from MOVIE');

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
