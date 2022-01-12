import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../Css/Movie.module.css";
function Movie({ movie }) {
  return (
    <div key={movie.id} className={styles.body}>
      <img src={movie.medium_cover_image} alt="" className={styles.img} />
      <div className={styles.p}>
        <span className={styles.index}>
          <h2 className={styles.title}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </h2>
          <div className={styles.realsummary}>
            {movie.summary.length > 235
              ? `${movie.summary.slice(0, 235)}...`
              : movie.summary}
          </div>
          <div className={styles.summary}>
            {movie.summary.length > 100
              ? `${movie.summary.slice(0, 100)}...`
              : movie.summary}
          </div>
        </span>
        {movie.hasOwnProperty("genres") ? (
          <ol className={styles.list}>
            <h2 className={styles.genres}>Genres</h2>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ol>
        ) : null}
      </div>
    </div>
  );
}
Movie.propTypes = {
  movie: PropTypes.node.isRequired,
};
export default Movie;
