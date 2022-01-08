import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../Css/Movie.module.css";
function Movie({ movie }) {
  return (
    <div key={movie.id} className={styles.body}>
      <img src={movie.medium_cover_image} alt="" />
      <div className={styles.p}>
        <h2 className={styles.title}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h2>
        {movie.summary.length > 235
          ? `${movie.summary.slice(0, 235)}...`
          : movie.summary}
      </div>
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
