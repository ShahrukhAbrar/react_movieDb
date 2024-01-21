import { useParams } from "react-router-dom";
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
          <div className="card" style={{ width: "18rem" }}>
            <img src={Movie.poster_url} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{Movie.title}</h5>
              <p className="card-text">{"Rating: " + Movie.rating}</p>
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

export default Category;
