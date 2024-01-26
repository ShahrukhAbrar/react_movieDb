import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "./Skeleton";

const Cards = () => {
  const [Movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovs();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      {loading ? (
        <div className="wrapper">{Movies.map(() => (<Skeleton />))}</div>
      ) : (
        <div className="wrapper">
          {Movies.map((MovieName) => (
              <NavLink
                to={"/movieDetail/" + MovieName.title}
                className="card card-page3"
                style={{ width: "18rem" }}
              >
                <img
                  src={MovieName.poster_url}
                  className="card-image-page3"
                  alt="..."
                />
                <div className="card-content-page3">
                  <h5 className="card-text-p3">{MovieName.title}</h5>
                  <p className="card-text-p3 subtext">
                    {"Rating: " + MovieName.rating}
                    <br />
                    {"Score: ⭐" + MovieName.score}
                  </p>
                  <a className="find-out wishlist-btn">
                    <i className="bi bi-bookmark-fill"></i>
                  </a>
                </div>
              </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Cards;
