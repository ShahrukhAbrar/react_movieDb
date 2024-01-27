import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "./Skeleton";
import MovieCard from "./MovieCard";

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
              <MovieCard Movie={MovieName} />
          ))}
        </div>
      )}
    </>
  );
};

export default Cards;
