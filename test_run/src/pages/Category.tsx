import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DescNav from "../components/DescNav";
import MovieCard from "../components/MovieCard";

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
      <DescNav description={params.type} />
      <div className="wrapper">
        {Genre.map((Movie) => (
          <MovieCard Movie={Movie} />
        ))}
      </div>
    </>
  );
}

export default Category;
