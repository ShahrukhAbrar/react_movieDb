import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { easeOut, motion, spring } from "framer-motion";

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
          <div className="detail-card detail-card-gradient"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: [0,.79,.18,1], type: spring }}
            className="detail-card-content"
          >
            <motion.h1
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "50%" }}
              transition={{ duration: 0.45, ease: easeOut, type: spring }}
              className="detail-card-text dc-title"
            >
              {movie.title}
            </motion.h1>
            <motion.h3
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.6, ease: [0,.79,.18,1]}}
              className="detail-card-text overview"
            >
              Overview:
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.45, ease: [0,.79,.18,1]}}
              className="detail-card-text overview-text"
            >
              {movie.overview}
              <br></br>
              <br></br>
              <span className="film-attributes">
                Score: ⭐{movie.score}
                &emsp;&emsp;&emsp;{movie.release_date.split("T")[0]}
                &emsp;&emsp;&emsp;Romance&emsp;&emsp;&emsp;
                {movie.runtime}&emsp;&emsp;{movie.rating}
              </span>
              <br />
              <span className="film-attributes">{"Cast: "+movie.actor_names}</span>
            </motion.p>
            <a className="find-out detail-card-btn" href={movie.trailer_url}>Watch Trailer</a>
          </motion.div>
          
          <img
            src={movie.banner_url}
            className="detail-image"
          ></img>
        </div>
      ))}
    </>
  );
}

export default FilmDetail;
