import React from "react";
import Link from "next/link";
import Movies from "../components/Movies";
import style from "../styles/WatchList.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";

export default function Watchlist({ movies }) {
  const userId = Cookies.get("id");

  return (
    <div className={style.main_container}>
      <h1 className={style.header}>My list</h1>
      {movies.map((m) => console.log(m.name))}
      {userId ? (
        movies.length > 0 ? (
          <div className={style.movie_container}>
            {movies.map((m, i) => (
              <Movies key={i} id={m.movie_id} type={m.media_type} />
            ))}
          </div>
        ) : (
          <div className={style.empty_list}>
            <FontAwesomeIcon icon={faPlus} className={style.icons} />
            You haven't added any titles to your list yet
            <br />
            Add your favorite movies or tv shows to your WatchList
          </div>
        )
      ) : (
        <div>
          <h1 className={style.empty_list}>
            <span>
              You have to be signed in to see your WatchList.
              <br />
              <Link href="/login">
                <p className={style.link}>Sign In</p>
              </Link>
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const fetchMovies = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/movies`,
      {
        userId: req.cookies.id,
      }
    );

    const movies = await fetchMovies.data.Movies;

    return {
      props: {
        movies: movies,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
