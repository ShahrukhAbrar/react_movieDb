import { useEffect } from "react";
import { useState } from "react";

const Cards = () => {
  const [Movies, setMovies] = useState<any[]>([]);//re evaluate <any> if it doesnt work the next time :: for afnan

  useEffect(() => {
    getMovs();
  }, []);
  const getMovs = async () => {
    try {
      // await async "fetchBooks()" function
      const books = await fetch("http://localhost:3000/movie");
      const booksJson = await books.json();
      setMovies(booksJson);
      console.log(booksJson)
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  };

  return (
    <>
      <div className="wrapper">
        {Movies.map((MovieName) => (
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={MovieName.POSTER_URL}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{MovieName.TITLE}</h5>
              <p className="card-text">{"Rating: "+MovieName.RATING}</p>
              <a href="#" className="btn btn-primary">
                More on
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
