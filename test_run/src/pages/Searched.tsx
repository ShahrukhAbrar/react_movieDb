import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

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
          <div className="card card-page3" style={{ width: "18rem" }}>
            <img src={Movie.POSTER_URL} className="card-image-page3" alt="..." />
            <div className="card-content-page3">
              <h5 className="card-text-p3">{Movie.TITLE}</h5>
              <p className="card-text-p3 subtext">{"Rating: " + Movie.RATING}</p>
              <NavLink to={"/movieDetail/" + Movie.TITLE} className="find-out">
                More on
              </NavLink>
              <a className="find-out wishlist-btn">
                <i className="bi bi-bookmark-fill"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Searched;
