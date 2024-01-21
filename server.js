var express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();

app.use(cors());

const config = {
  server: 'DESKTOP-FKQO1VC',
  database: 'dbms',
  user: 'shahrukh',
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
app.get('/genre/:genreName', async (req, res, next) => {
  const { genreName } = req.params;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('GenreName', sql.VarChar, genreName)
      .query(
        `SELECT m.title, m.poster_url, m.rating, m.movie_score FROM movie m
         INNER JOIN movie_genre mg ON m.MOVIE_ID = mg.MOVIE_ID
         INNER JOIN genre g ON mg.GENRE_ID = g.GENRE_ID
         WHERE g.GENRE_NAME = @GenreName`
      );

    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//searching Query
app.get('/search/:searchterm', async (req, res, next) => {
  const { searchterm } = req.params;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('searchterm', sql.VarChar, `%${searchterm}%`)
      .query(`
        SELECT TITLE, POSTER_URL, RATING, MOVIE_SCORE 
        FROM MOVIE 
        WHERE TITLE LIKE @searchterm`
      );

    res.send(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Server Error');
  }
});

//MoreON query
app.get('/movie/:searchterm', async (req, res, next) => {
  const { searchterm } = req.params;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('searchterm', sql.VarChar, searchterm)
      .query(`
        SELECT * FROM MOVIE
        WHERE TITLE = @searchterm
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
        `SELECT TITLE, RATING, POSTER_URL, MOVIE_SCORE FROM MOVIE`
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
