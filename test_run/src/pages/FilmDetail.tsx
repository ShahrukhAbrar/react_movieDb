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
    <div className="detail-card">
      <div className="detail-card-content">
        <h1 className="detail-card-text">Your Name</h1>
        <h3 className="detail-card-text overview">Overview:</h3>
        <p className="detail-card-text overview-text">
          High schoolers Mitsuha and Taki are complete strangers living separate
          lives. But one night, they suddenly switch places. Mitsuha wakes up in
          Taki’s body, and he in hers. This bizarre occurrence continues to
          happen randomly, and the two must adjust their lives around each
          other.
        </p>
        <p className="detail-card-text film-attributes">
          Score:
          ⭐8.5&emsp;&emsp;&emsp;08/26/2016&emsp;&emsp;&emsp;Romance&emsp;&emsp;&emsp;126
          min&emsp;&emsp;PG-13
        </p>
        <a className="find-out detail-card-btn">Watch</a>
      </div>
      <img
        src="https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg"
        className="detail-image"
      ></img>
    </div>
  );
}

export default FilmDetail;
