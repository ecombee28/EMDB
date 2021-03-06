import Head from "next/head";
import collectionStyle from "../../styles/Collections.module.css";
import Collection from "../../components/Collection";
import Requests from "../../components/Requests";

export default function Home({ movies }) {
  const style = {
    backgroundImage: 'url("/star_background.jpg")',
  };
  return (
    <div>
      <Head>
        <title>Star Wars Collection/EMDB</title>
        <meta name="keywords" content="web dev" />
      </Head>
      <div className={collectionStyle.video_wrapper} style={style}></div>
      <div className={collectionStyle.search_results}>
        <Collection movies={movies.parts} />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(Requests.fetchStarWarsMovies);
  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
};
