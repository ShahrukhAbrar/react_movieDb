import { useEffect } from "react";
import { useState } from "react";

const Cards = () => {
  const MovieNames = [{ name: "haha" }, { name: "hehe" }];
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
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
    console.log(Movies);
    console.log(MovieNames);
  };

  return (
    <>
      <div className="wrapper">
        {Movies.map((MovieName) => (
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{MovieName.Title}</h5>
              <p className="card-text">Gwens Betrayal and cool graphics!</p>
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
