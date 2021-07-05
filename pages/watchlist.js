import React from "react";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";
import Link from "next/link";
import { selectMovies } from "../slices/userSlice";
import Movies from "../components/Movies";
import style from "../styles/WatchList.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Watchlist = () => {
  const userId = useSelector(selectId);
  const movies = useSelector(selectMovies);

  return (
    <div>
      <h1 className={style.header}>My list</h1>
      {userId ? (
        movies.length > 0 ? (
          <div className={style.movie_container}>
            {movies.map((m, i) => (
              <Movies key={i} id={m.movie_id} type={m.media_type} />
            ))}
          </div>
        ) : (
          <h1 className={style.empty_list}>
            <FontAwesomeIcon icon={faPlus} className={style.icons} />
            <br />
            You haven't added any titles to your list yet
            <br />
            Add your favorite movies or tv shows to your WatchList
          </h1>
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
};

export default Watchlist;
