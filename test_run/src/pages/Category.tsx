import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


function Category() {
  let params = useParams();

  const [Category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    //console.log(params.type)
    getCategory(params.type);
    //console.log(category)
  }, [params.type]);

  const getCategory =async (name) => {
    try {
      const genreData = await fetch(`http://localhost:3000/genre?q=${name}`)
      const genreMovie = await genreData.json()

      setCategory(genreMovie)
      console.log(Category)
    } catch (err) {
      console.log("Error occured when fetching movies");
    }
  }

  return (
    <div>Category</div>
  )
}

export default Category