import React from "react";
import Head from "next/head";
import collectionStyle from "../../styles/Collections.module.css";
import Collection from "../../components/Collection";
import Requests from "../../components/Requests";

export default function Home({ movies }) {
  return (
    <div>
      <Head>
        <title>Star Wars Collection/EMDB</title>
        <meta name="keywords" content="web dev" />
      </Head>
      <div className={collectionStyle.video_wrapper}>
        <img src="/starwars.jpg" className={collectionStyle.image} />
      </div>

      <div className={collectionStyle.wrapper}>
        <div className={collectionStyle.collection_wrapper}>
          {movies.parts.map((m) => (
            <Collection movies={m} key={m.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(Requests.fetchStarWarsMovies);
  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
};
