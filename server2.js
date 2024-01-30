var express = require("express");
const cors = require("cors");
const sql = require("mssql");
const app = express();

app.use(cors());

const config = {
  server: "DESKTOP-PFJUO84",
  database: "filmSorted",
  user: "afnan",
  password: "1234",
  port: 1433,
  options: {
    trustedConnection: false,
    trustServerCertificate: true,
  },
};

app.get("/", (req, res, next) => {
  res.send("Server is Up!!");
});

//Genre Filter Query
app.get("/genre", async (req, res, next) => {
  const genreTerm = req.query.q;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`exec movie_genres'${genreTerm}'`);

    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/authenticateLogin", async (req, res, next) => {
  const username = req.query.q;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`
        SELECT COUNT(*) as isPresent FROM users WHERE username = '${username}'`);

    res.send(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).send("Internal Server Error");
  }
});

//searching Query
app.get("/search", async (req, res, next) => {
  const searchTerm = req.query.q;

  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`
        exec search'${searchTerm}'`);

    res.send(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).send("Internal Server Error");
  }
});

//MoreON query
app.get('/movieDetail', async (req, res, next) => {
  const detail = req.query.q;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('title', sql.NVarChar, detail)
      .query(`
        exec movie_details @title
      `);

    res.send(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/wishlist', async (req, res, next) => {
  const mid = req.query.q;
  const uid = req.query.u;
  console.log(mid)
  console.log(uid)

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('uid', sql.NVarChar, uid)
      .input('mid', sql.Int, mid)
      .query(`
        exec wishlisted @uid, @mid
      `);

    res.send(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Server Error');
  }
});
//remove wishlist query
app.get('/unwishlist', async (req, res, next) => {
  const mid = req.query.q;
  const uid = req.query.u;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('uid', sql.NVarChar, uid)
      .input('mid', sql.Int, mid)
      .query(`
        exec unwishlisted @uid, @mid
      `);

    res.send(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).send('Internal Server Error');
  }
});

//retrieve watchlist/wishlist aik hi baat hai lmaooooo
app.get("/retrieveUserWatchlist", async (req, res, next) => {
  const username = req.query.q;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input("username", sql.NVarChar, username)
      .query(`
          select * from movies m inner join wishlist w on w.movie_id = m.id where w.username = @username
      `);

    res.send(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).send("Internal Server Error");
  }
});

//returns all movies details FROM DBMS
app.get("/movies", async (req, res, next) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`exec movie_cards`);

    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//register query
app.get("/register", async (req, res, next) => {
  const uname = req.query.q;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input("uname", sql.NVarChar, uname)
      .query(`
        exec registerUser2 @uname
      `);

    res.send(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
