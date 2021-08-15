import React from "react";
import MovieList from "../components/List";
import LandingImage from "../components/LandingImage";
import TvList from "../components/List";
import Head from "next/head";
import style from "../styles/MainPage.module.css";
import {
  getTrending,
  getPopular,
  getTrendingOnNetflix,
  getPopularTv,
  getActionMovies,
  getComedyMovies,
  getRomanceMovies,
  getTopRatedMovies,
} from "../pages/api/api";

export default function Home({
  movies,
  popularMovies,
  trendingOnNetflix,
  bestMovies,
  bestTv,
  action,
  comedies,
  romance,
  randomMovie,
}) {
  return (
    <div>
      <Head>
        <title>EMDB</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <LandingImage movie={randomMovie} />
      <section className={style.main_container}>
        <MovieList
          movies={movies.results}
          title="Trending"
          id={1}
          type="movie"
        />
        <TvList
          movies={bestTv.results}
          title="Trending Tv Shows"
          id={2}
          type="tv"
        />
        <MovieList
          movies={popularMovies.results}
          title="Popular"
          id={3}
          type="movie"
        />
        <TvList
          movies={trendingOnNetflix.results}
          title="Trending on Netflix"
          id={4}
          type="tv"
        />
        <MovieList movies={action.results} title="Action" id={5} type="movie" />
        <MovieList
          movies={comedies.results}
          title="Comedies"
          id={6}
          type="movie"
        />
        <MovieList
          movies={romance.results}
          title="Romance"
          id={7}
          type="movie"
        />
        <MovieList
          movies={bestMovies.results}
          title="Top Rated Movies"
          id={8}
          type="movie"
        />
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const movies = await getTrending();
  const popularMovies = await getPopular();
  const trendingOnNetflix = await getTrendingOnNetflix();
  const bestTv = await getPopularTv();
  const action = await getActionMovies();
  const comedies = await getComedyMovies();
  const romance = await getRomanceMovies();
  const bestMovies = await getTopRatedMovies();

  const randomMovie =
    movies.results[Math.floor(Math.random() * movies.results.length - 1)];

  return {
    props: {
      movies,
      popularMovies,
      trendingOnNetflix,
      bestMovies,
      bestTv,
      action,
      comedies,
      romance,
      randomMovie,
    },
  };
};
