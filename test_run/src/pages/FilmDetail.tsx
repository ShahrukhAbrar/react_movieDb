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
      const filmData = await fetch(`http://localhost:3000/movieDetail?q=${name}`);
      const filmJson = await filmData.json();

      setFilm(filmJson);
      console.log(filmJson);
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  };


  return (
    <div>
      {film.map((f) => (<p>{f.TITLE}</p>))}
    </div>
  )
}

export default FilmDetail