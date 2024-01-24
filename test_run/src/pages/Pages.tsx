import Category from "./Category.tsx";
import Home from "./Home.tsx";
import { Routes, Route } from "react-router-dom";
import Searched from "./Searched.tsx";
import FilmDetail from "./FilmDetail.tsx";
import Search from "../components/Search.tsx";
import GenreBar from "../components/GenresBar.tsx";

function Pages() {
  return (
    <>
      <Search />
      <GenreBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:type" element={<Category />} />
        <Route path="/search/:searched" element={<Searched />} />
        <Route path="/movieDetail/:detail" element={<FilmDetail />} />
      </Routes>
    </>
  );
}

export default Pages;
