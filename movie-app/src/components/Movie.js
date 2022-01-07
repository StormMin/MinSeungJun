import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Movie({ movie }) {
  return (
    <div key={movie.id}>
      <img src={movie.medium_cover_image} alt="" />
      <h2>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      </h2>
      <p>{movie.summary}</p>
      {movie.hasOwnProperty("genres") ? (
        <ul>
          {movie.genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
Movie.propTypes = {
  movie: PropTypes.node.isRequired,
};
export default Movie;