import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Detail.module.css";
function Random() {
  const [chos, setchos] = useState([]);
  const getRandom = Math.floor(Math.random() * 35000);
  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${getRandom}`
      )
    ).json();
    setchos(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <li>
      <a
        className={styles.ac}
        href={`http://localhost:3000/movie/${getRandom}`}
      >
        {chos.title}
      </a>
    </li>
  );
}
export default Random;
