import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Searched() {
  let params = useParams();

  const [searchedMovie, setSearchedMovie] = useState<any[]>([]);

  useEffect(() => {
    console.log(params.searched);
    getSearchedMovie(params.searched);
    //console.log(Genre)
  }, [params.searched]);

  const getSearchedMovie = async (name: string | undefined) => {
    try {
      const searchData = await fetch(`http://localhost:3000/search?q=${name}`);
      const searchedMovieJson = await searchData.json();

      setSearchedMovie(searchedMovieJson);
      console.log(searchedMovieJson);
      //console.log(Genre)
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  };

  return (
    <>
      <div className="wrapper">
        {searchedMovie.map((Movie) => (
          <div className="card" style={{ width: "18rem" }}>
            <img src={Movie.POSTER_URL} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{Movie.TITLE}</h5>
              <p className="card-text">{"Rating: " + Movie.RATING}</p>
              <a href="#" className="btn btn-primary">
                More on
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Searched;
