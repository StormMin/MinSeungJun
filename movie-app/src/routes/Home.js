import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import load from "../Css/loading.module.css";
import Image from "./idot.png";
import styles from "../Css/App.module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={load.body}>
          <span className={load.king}>Director-MinStorm</span>
          <span className={load.shit}></span>
          <img src={Image} width="75%" />
        </div>
      ) : (
        <div>
          <h1 className={styles.rainbow}>Welcome To Min's Movie park!</h1>
          <h2 className={styles.sub}>Today's Movie</h2>
          <hr width="95%" color="red"></hr>

          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
