import Head from "next/head";
import React, { useState } from "react";
import SearchPosters from "../components/SearchPosters";
import searchStyles from "../styles/Search.module.css";
import Link from "next/link";

const search = () => {
  const [movies, setMovies] = useState(false);
  const [div, setDiv] = useState(false);
  const [search, setSearch] = useState();

  let i = 0;

  const check = async (event) => {
    let query = event.target.value;
    const explore = document.getElementById("explore");
    const search_results = document.getElementById("search_results");
    const title = document.getElementById("title");

    if (query.length >= 1) {
      explore.style.display = "none";
      title.style.display = "none";
      let done = false;
      setSearch(query);

      let movie;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&with_original_language=en&language=en-US&query=${query}&page=1&include_adult=false`
        );

        movie = await res.json();
        setMovies(movie.results);
      } catch (err) {
        console.log(err);
      }

      setDiv(true);
    } else {
      explore.style.display = "flex";
      title.style.display = "block";
      setDiv(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Search/EMDB</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>

      <div className={searchStyles.search_bar}>
        <input
          type="text"
          id="input"
          placeholder="Search by movie or show title"
          className={searchStyles.input}
          onKeyUp={check}
          autoComplete="off"
        />
      </div>

      {div === true ? (
        <>
          <h1
            id="search_title"
            className={`${searchStyles.title} ${searchStyles.title_container}`}
          >
            {`Search Results for: ${search}`}
          </h1>

          <main id="search_results" className={searchStyles.search_results}>
            <SearchPosters movies={movies} />
          </main>
        </>
      ) : (
        ""
      )}

      <h1
        id="title"
        className={`${searchStyles.title} ${searchStyles.title_container}`}
      >
        Explore
      </h1>
      <main id="explore" className={searchStyles.explore_results}>
        <Link href={"/disney"}>
          <div
            className={`${searchStyles.search_posters} ${searchStyles.explore_posters} ${searchStyles.disney}`}
          >
            <img src="/pixar.png" alt="" className={searchStyles.explore_img} />
            <p className={searchStyles.explore_text}>Movie Collection</p>
          </div>
        </Link>
        <Link href={"/marvel"}>
          <div
            className={`${searchStyles.search_posters} ${searchStyles.explore_posters} ${searchStyles.marvel}`}
          >
            <img
              src="/marvel.png"
              alt=""
              className={searchStyles.explore_img}
            />
            <p className={searchStyles.explore_text}>Movie Collection</p>
          </div>
        </Link>
        <Link href={"/dc"}>
          <div
            className={`${searchStyles.search_posters} ${searchStyles.explore_posters} ${searchStyles.dc}`}
          >
            <img
              src="/dc.png"
              alt=""
              className={`${searchStyles.explore_img} ${searchStyles.dc_img}`}
            />
            <p className={searchStyles.explore_text}>Movie Collection</p>
          </div>
        </Link>
        <Link href={"/starwars"}>
          <div
            className={`${searchStyles.search_posters} ${searchStyles.explore_posters} ${searchStyles.starwars}`}
          >
            <img
              src="/starwars.png"
              alt=""
              className={searchStyles.explore_img}
            />
            <p className={searchStyles.explore_text}>Movie Collection</p>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default search;
