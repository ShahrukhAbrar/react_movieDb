import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DescNav from "../components/DescNav";
import MovieCard from "../components/MovieCard";

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
      <DescNav description={"Searched: " + params.searched} />
      <div className="wrapper">
        {searchedMovie.map((Movie) => (
          <MovieCard Movie={Movie} />
        ))}
      </div>
    </>
  );
}

export default Searched;
