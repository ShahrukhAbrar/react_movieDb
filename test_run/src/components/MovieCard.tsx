import { ReactElement, JSXElementConstructor, ReactNode } from "react"
import { NavLink } from "react-router-dom"

function MovieCard(props: { Movie: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; poster_url: string | undefined; rating: string; score: string } }) {
  return (
    <>
    <NavLink
            to={"/movieDetail/" + props.Movie.title}
            className="card card-page3"
            style={{ width: "18rem" }}
          >
            <img
              src={props.Movie.poster_url}
              className="card-image-page3"
              alt="..."
            />
            <div className="card-content-page3">
              <h5 className="card-text-p3">{props.Movie.title}</h5>
              <p className="card-text-p3 subtext">
                {"Rating: " + props.Movie.rating}
                <br />
                {"Score: ⭐" + props.Movie.score}
              </p>

            </div>
          </NavLink>
    </>
  )
}

export default MovieCard