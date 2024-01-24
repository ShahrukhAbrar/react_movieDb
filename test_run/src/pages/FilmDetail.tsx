import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FilmDetail() {
  let params = useParams();

  const [film, setFilm] = useState<any[]>([]);

  useEffect(() => {
    getCategory(params.detail);
  }, [params.detail]);

  const getCategory = async (name: string | undefined) => {
    try {
      const filmData = await fetch(
        `http://localhost:3000/movieDetail?q=${name}`
      );
      const filmJson = await filmData.json();

      setFilm(filmJson);
      console.log(filmJson);
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  };

  return (
    <>
      {film.map((movie) => (
        <div className="detail-card">
          <div className="detail-card-content">
            <h1 className="detail-card-text">{movie.TITLE}</h1>
            <h3 className="detail-card-text overview">Overview:</h3>
            <p className="detail-card-text overview-text">
              {movie.OVERVIEW}
              <br></br>
              <br></br>
              <span className="film-attributes">
                Score: ⭐{movie.MOVIE_SCORE}
                &emsp;&emsp;&emsp;{movie.RELEASE_DATE.split("T")[0]}&emsp;&emsp;&emsp;Romance&emsp;&emsp;&emsp;
                {movie.RUNTIME}&emsp;&emsp;{movie.RATING}
              </span>
            </p>
            <a className="find-out detail-card-btn">Watch</a>
          </div>
          <img
            src="https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg"
            className="detail-image"
          ></img>
        </div>
      ))}
    </>
  );
}

export default FilmDetail;
