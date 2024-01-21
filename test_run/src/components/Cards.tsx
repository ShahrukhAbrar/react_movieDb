import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Cards = () => {
  const [Movies, setMovies] = useState<any[]>([]); //re evaluate <any> if it doesnt work the next time :: for afnan

  useEffect(() => {
    getMovs();
  }, []);
  const getMovs = async () => {
    try {
      // await async "fetchBooks()" function
      const books = await fetch("http://localhost:3000/movies");
      const booksJson = await books.json();
      setMovies(booksJson);
      console.log(booksJson);
      console.log(Movies);
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  };

  return (
    <>
      <div className="wrapper">
        {Movies.map((MovieName) => (
          <div className="card-page3" style={{ width: "18rem" }}>
            <img
              src={MovieName.POSTER_URL}
              className="card-image-page3"
              alt="..."
            />
            <div className="card-content-page3">
              <h5 className="card-text-p3">{MovieName.TITLE}</h5>
              <p className="card-text-p3 subtext">{"Rating: " + MovieName.RATING}</p>
              <NavLink to={'/movieDetail/'+MovieName.MOVIE_ID} className="find-out">
                Find out more
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
