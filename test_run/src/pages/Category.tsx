import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Category() {
  let params = useParams();

  const [Genre, setGenre] = useState<any[]>([]);

  useEffect(() => {
    //console.log(params.type)
    getCategory(params.type);
    //console.log(Genre)
  }, [params.type]);

  const getCategory = async (name: string | undefined) => {
    try {
      const genreData = await fetch(`http://localhost:3000/genre?q=${name}`);
      const genreMovie = await genreData.json();

      setGenre(genreMovie);
      console.log(genreMovie);
      //console.log(Genre)
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  };

  return (
    <>
      <div className="wrapper">
        {Genre.map((Movie) => (
          <NavLink
            to={"/movieDetail/" + Movie.title}
            className="card card-page3"
            style={{ width: "18rem" }}
          >
            <img
              src={Movie.poster_url}
              className="card-image-page3"
              alt="..."
            />
            <div className="card-content-page3">
              <h5 className="card-text-p3">{Movie.title}</h5>
              <p className="card-text-p3 subtext">
                {"Rating: " + Movie.rating}
                <br />
                {"Score: ⭐" + Movie.movie_score}
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
}

export default Category;
