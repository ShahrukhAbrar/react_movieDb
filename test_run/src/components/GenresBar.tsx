import { NavLink, useNavigate } from "react-router-dom";

const GenreBar = () => {
  const Genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
  ];
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/dashboard");
  };

  const logoutHandler = () => {
    localStorage.removeItem('loginKey');
    location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Genres
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {Genres.map((genre) => (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"/genre/" + genre}
                  >
                    {genre}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <button className="dashboard-btn" onClick={submitHandler}><i className="bi bi-person-fill"></i>Dashboard</button>
          <button className="dashboard-btn" onClick={logoutHandler}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default GenreBar;
