import MovieList from "../components/MovieList";
import Requests from "../components/Requests";
import LandingImage from "../components/LandingImage";
import TvList from "../components/TvList";
import Head from "next/head";

export default function Home({
  movies,
  popularMovies,
  topRatedMovies,
  bestMovies,
  bestTv,
}) {
  const mystyle = {
    width: "100%",
    position: "absolute",
    top: "84vh",
  };

  return (
    <div>
      <Head>
        <title>EMDB</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <LandingImage />
      <section style={mystyle}>
        <MovieList movies={movies.results} title="Trending" id={1} />
        <TvList movies={bestTv.results} title="Trending Tv Shows" id={2} />
        <MovieList movies={popularMovies.results} title="Popular" id={3} />
        <TvList
          movies={topRatedMovies.results}
          title="Trending on Netflix"
          id={4}
        />
        <MovieList
          movies={bestMovies.results}
          title="Top Rated Movies"
          id={5}
        />
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(Requests.fetchTrending);
  const movies = await res.json();

  const res2 = await fetch(Requests.fetchPopularMovie);
  const popularMovies = await res2.json();

  const res3 = await fetch(Requests.fetchTrendingOnNetflix);
  const topRatedMovies = await res3.json();

  const res4 = await fetch(Requests.fetchTopRatedMovies);
  const bestMovies = await res4.json();

  const res5 = await fetch(Requests.fetchPopularTv);
  const bestTv = await res5.json();

  return {
    props: {
      movies,
      popularMovies,
      topRatedMovies,
      bestMovies,
      bestTv,
    },
  };
};
