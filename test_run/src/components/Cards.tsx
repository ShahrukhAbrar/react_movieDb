import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Cards = () => {
  const [Movies, setMovies] = useState<any[]>([]);

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
          <NavLink
            to={"/movieDetail/" + MovieName.TITLE}
            className="card card-page3"
            style={{ width: "18rem" }}
          >
            <img
              src={MovieName.POSTER_URL}
              className="card-image-page3"
              alt="..."
            />
            <div className="card-content-page3">
              <h5 className="card-text-p3">{MovieName.TITLE}</h5>
              <p className="card-text-p3 subtext">
                {"Rating: " + MovieName.RATING}
                <br />
                {"Score: ⭐" + MovieName.MOVIE_SCORE}
              </p>
              <a className="find-out wishlist-btn">
                <i className="bi bi-bookmark-fill"></i>
              </a>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Cards;
