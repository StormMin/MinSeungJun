import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "./dongdong.jpg";
import styles from "../Css/Detail.module.css";
import AD from "./ad.png";
import Random from "./Kingdom";
import { Link } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.all}>
      <h1 className={styles.rainbow}>{movies.title}</h1>
      <div className={styles.container}>
        <span className={styles.nav}>
          <img src={movies.medium_cover_image} width="100%" />
        </span>
        <span className={styles.content}>
          {movies.yt_trailer_code === "" ? (
            <div>
              <h2>NO Trailer</h2>
              <img src={Image} width="40%" />
            </div>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movies.yt_trailer_code}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </span>
        <span className={styles.aside}>
          <h3>
            Runtime: {movies.runtime} min <br />
            개봉년도: {movies.year}
            <br /> Rating: {movies.rating}
          </h3>
          {movies.hasOwnProperty("genres") ? (
            <ul>
              <h3>genres</h3>
              {movies.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          ) : null}
          <ol className="styles.chos">
            <h3>Another Movie</h3>
            <Random />
            <Random />
            <Random />
          </ol>
        </span>
      </div>
      <div className={styles.footer}>
        <span>Are you Watching This?</span>
        <br />
        <span>Click me!!!</span> <br />
        <a href="https://toptoon.com/">
          <img src={AD} width="30%" />
        </a>
        <p className={styles.zip}>
          <Link to={`/MinSeungJun`}>Home</Link>
        </p>
      </div>
    </div>
  );
}
export default Detail;
