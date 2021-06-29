import MovieList from "../components/List";
import Requests from "../components/Requests";
import LandingImage from "../components/LandingImage";
import TvList from "../components/List";
import Head from "next/head";

export default function Home({
  movies,
  popularMovies,
  topRatedMovies,
  bestMovies,
  bestTv,
  action,
  comedies,
  romance,
  randomMovie,
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
      <LandingImage movie={randomMovie} />
      <section style={mystyle}>
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
          movies={topRatedMovies.results}
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

export const getStaticProps = async () => {
  try {
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

    const res6 = await fetch(Requests.fetchActionMovies);
    const action = await res6.json();

    const res7 = await fetch(Requests.fetchComedyMovies);
    const comedies = await res7.json();

    const res8 = await fetch(Requests.fetchRomanceMovies);
    const romance = await res8.json();

    const randomMovie =
      movies.results[Math.floor(Math.random() * movies.results.length - 1)];

    return {
      props: {
        movies,
        popularMovies,
        topRatedMovies,
        bestMovies,
        bestTv,
        action,
        comedies,
        romance,
        randomMovie,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
