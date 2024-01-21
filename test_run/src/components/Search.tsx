import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setIntput] = useState<any[]>([]);
  const navigate = useNavigate();

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted: " + input);
    navigate("/search/" + input);
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          Risky Reels
        </NavLink>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setIntput(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={submitHandler}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Search;
