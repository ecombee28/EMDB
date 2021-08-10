import React, { useState, useEffect } from "react";
import Link from "next/link";
import Movies from "../components/Movies";
import style from "../styles/WatchList.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../components/Loading";

export default function Watchlist() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = Cookies.get("id");

  useEffect(() => {
    setLoading(true);
    const getMovies = async () => {
      try {
        await axios
          .post(`https://combeecreations.com/emdbapi/public/api/movies`, {
            userId: userId,
          })
          .then((res) => {
            setMovies(res.data.Movies);
          });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={style.main_container}>
      <h1 className={style.header}>My list</h1>

      {userId ? (
        loading ? (
          <Loading />
        ) : (
          <Movies movie={movies} />
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
