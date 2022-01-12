import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import load from "../Css/loading.module.css";
import Image from "./idot.png";
import styles from "../Css/App.module.css";

function Home() {
  const sort = ["download_count", "like_count", "title", "year", "date_added"];
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const rating = [
    "8.0",
    "8.1",
    "8.2",
    "8.3",
    "8.4",
    "8.5",
    "8.6",
    "8.7",
    "8.8",
    "8.9",
    "9.0",
  ];
  const index = Math.floor(Math.random() * 4);
  const rat = Math.floor(Math.random() * 10);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating[rat]}&sort_by=${sort[index]}&limit=20`
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
          <span className={load.king}>MinStorm</span>
          <span className={load.shit}></span>
          <img src={Image} width="75%" />
        </div>
      ) : (
        <div className={styles.scroll}>
          <h1 className={styles.rainbow}>Welcome To Min's Movie park!</h1>
          <h2 className={styles.sub}>Today's Movie</h2>
          <hr width="120%" color="red"></hr>

          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
