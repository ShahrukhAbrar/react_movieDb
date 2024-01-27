import Category from "./Category.tsx";
import Home from "./Home.tsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Searched from "./Searched.tsx";
import FilmDetail from "./FilmDetail.tsx";
import Search from "../components/Search.tsx";
import GenreBar from "../components/GenresBar.tsx";
import { useEffect } from "react";
import Dashboard from "./Dashboard.tsx";

function Pages() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  },[])

  return (
    <>
      <Search />
      <GenreBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:type" element={<Category />} />
        <Route path="/search/:searched" element={<Searched />} />
        <Route path="/movieDetail/:detail" element={<FilmDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Pages;
