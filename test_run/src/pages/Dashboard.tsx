import { useEffect, useState } from "react";
import DescNav from "../components/DescNav";
import MovieCard from "../components/MovieCard";

function Dashboard() {
    const [wsMovies, setWSmovies] = useState<any[]>([]);


    useEffect(() => {
        const loginItemLS = JSON.parse(localStorage.getItem("loginKey") || JSON.stringify(""));
        console.log("from ls: "+loginItemLS)
        loadWatchlist(loginItemLS);
    }, []);

    const loadWatchlist = async (input: any) => {
        try {
            const filmData = await fetch(
              `http://localhost:3000/retrieveUserWatchlist?q=${input}`
            );
            const filmJson = await filmData.json()
            console.log(filmJson)   
            setWSmovies(filmJson);
          } catch (err) {
            console.log("Error occured when fetching movies");
          }
    }

  return (
    <>
      <DescNav description="Watchlist" />
      <div className="wrapper">
        {wsMovies.map((wsMovie) => (
          <MovieCard Movie={wsMovie} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
