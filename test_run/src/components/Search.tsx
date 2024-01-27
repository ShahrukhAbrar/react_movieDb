import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setIntput] = useState<string>("");
  const navigate = useNavigate();

  const submitHandler = () => {
    console.log("Submitted: " + input);
    navigate("/search/" + input);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand brand" to={"/"}>
        <i className="bi bi-database-check"> </i>
          filmSorted
        </NavLink>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setIntput(e.target.value);
              submitHandler();
            }}
          />
        </form>
      </div>
    </nav>
  );
};

export default Search;
