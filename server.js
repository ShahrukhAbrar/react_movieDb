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

app.get('/', (req, res, next) => {
    res.send('Server is Up!!');
});

//Genre Filter Query
app.get('/genre', async (req, res, next) => {
  const genreTerm = req.query.q;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(
        `SELECT m.title, m.poster_url, m.rating FROM movie m
         INNER JOIN movie_genre mg ON m.MOVIE_ID = mg.MOVIE_ID
         INNER JOIN genre g ON mg.GENRE_ID = g.GENRE_ID
         WHERE g.GENRE_NAME = '${genreTerm}'`
      );

    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//searching Query
app.get('/search', async (req, res, next) => {
  const searchTerm = req.query.q;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(`
        SELECT TITLE, POSTER_URL, RATING
        FROM MOVIE 
        WHERE TITLE LIKE '%${searchTerm}%'`
      );

    res.send(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Server Error');
  }
});

//MoreON query
app.get('/movieDetail', async (req, res, next) => {
  detail = req.query.q

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(`
        SELECT * FROM MOVIE
        WHERE MOVIE_ID = ${detail}
        `
      );

    res.send(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Server Error');
  }
});

//returns all movies details FROM DBMS
app.get('/movies', async (req, res, next) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query(
        `SELECT MOVIE_ID,TITLE, RATING, POSTER_URL FROM MOVIE`
      );

    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
