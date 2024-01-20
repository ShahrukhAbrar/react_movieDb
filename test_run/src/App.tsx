import Search from "./components/Search";
import GenreBar from "./components/GenresBar";
import "./App.css";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Search />
        <GenreBar />
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default App;
