import React, { useState } from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import Image from "next/image";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecommendedMovies from "../../../components/RecommendedMovies";
import Head from "next/head";

const movieInfo = ({ movie, movie2, trailer, recommended }) => {
  const [showMe, setShowMe] = useState(false);
  let trailerLink;
  trailer.results.length === 0
    ? (trailerLink = " ")
    : (trailerLink = trailer.results[0].key);
  const youTubeLink = "https://www.youtube.com/embed/" + trailerLink;
  const imagePath = "https://image.tmdb.org/t/p/original";

  function toggle() {
    const doc = document.getElementById("trailer");
    const containerElement = document.getElementById("trailer");
    const iframe_tag = containerElement.querySelector("iframe");
    // const video_tag = containerElement.querySelector('video');
    const iframeSrc = iframe_tag.src;

    !showMe
      ? ((doc.style.display = "none"), (iframe_tag.src = iframeSrc))
      : (doc.style.display = "block");
    setShowMe(!showMe);
  }

  function showTrailer() {
    const doc = document.getElementById("trailer");
    doc.style.display = "block";
  }

  return (
    <>
      <Head>
        <title>{`${movie.title}/EMDB`}</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <div id="trailer" className={movieInfoStyle.trailer}>
        <span id="closeVideo" className={movieInfoStyle.close} onClick={toggle}>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={movieInfoStyle.close}
          />
        </span>
        <iframe
          id="ytVideo"
          width="100%"
          height="100%"
          src={youTubeLink}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
        ></iframe>
      </div>
      <img
        src={`${imagePath}${movie.backdrop_path}`}
        className={movieInfoStyle.backdrop}
      />
      <div className={movieInfoStyle.blackout}></div>
      <div className={movieInfoStyle.movie_info_wrapper}>
        <h1 className={movieInfoStyle.title}>{movie.title}</h1>
        <button className={movieInfoStyle.trailer_button} onClick={showTrailer}>
          <FontAwesomeIcon icon={faPlay} className={movieInfoStyle.icon} />
          Trailer
        </button>
        <div className={movieInfoStyle.movie_info}>
          <li className={movieInfoStyle.rated}>{movie2.Rated}</li>
          <li className={movieInfoStyle.year}>{movie2.Year}</li>
          <li className={movieInfoStyle.runtime}>{movie2.Runtime}</li>
          <li className={movieInfoStyle.genre}>{movie2.Genre}</li>
        </div>
        <div className={movieInfoStyle.movie_ratings_wrapper}>
          {movie2.Ratings.map((rating) =>
            rating.Source === "Internet Movie Database" ? (
              <div className={movieInfoStyle.wrap}>
                <img
                  src="/imdb.png"
                  alt="IMDB logo"
                  className={movieInfoStyle.rating_logo}
                />
                <p className={movieInfoStyle.rating}>{rating.Value}</p>
              </div>
            ) : rating.Source === "Metacritic" ? (
              <div className={movieInfoStyle.wrap}>
                <img
                  src="/Metacritic.svg"
                  alt="meta logo"
                  className={movieInfoStyle.rating_logo}
                />
                <p className={movieInfoStyle.rating}>{rating.Value}</p>
              </div>
            ) : (
              ""
            )
          )}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>
        <div className={movieInfoStyle.recommended}>
          <RecommendedMovies movies={recommended.results} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=0f2af5a67e7fbe4db3bc573d65f3724b`
  );
  const movie = await res.json();

  const res2 = await fetch(
    `https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=ed47902e&plot=full`
  );
  const movie2 = await res2.json();

  const res3 = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}/videos?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-U`
  );
  const trailer = await res3.json();

  const res4 = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}/recommendations?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&with_original_language=en&language=en-US&page=1`
  );
  const recommended = await res4.json();

  return {
    props: { movie, movie2, trailer, recommended },
  };
};

export default movieInfo;
