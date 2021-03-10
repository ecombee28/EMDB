import React, { useState } from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecommendedMovies from "../../../components/RecommendedMovies";
import Head from "next/head";

const movieInfo = ({ movie, trailer, recommended }) => {
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

  function getRating() {
    let movieRating;
    const releaseDates = movie.release_dates.results;

    movie.release_dates.results.map((movieMap) => {
      movieMap.iso_3166_1 === "US"
        ? movieMap.release_dates[0].certification.length < 1
          ? (movieRating = "N/A")
          : (movieRating = movieMap.release_dates[0].certification)
        : "N/A";
    });

    return movieRating;
  }
  function getGenre() {
    let genre = "";
    let newGenre;

    movie.genres.map((genreMap) => {
      genre += genreMap.name + ", ";
    });

    newGenre = genre.substring(0, genre.length - 2);

    return newGenre;
  }
  function getYear() {
    let year, d;

    d = new Date(movie.release_date);
    year = d.getFullYear();

    return year;
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
          <li className={movieInfoStyle.rated}>{getRating()}</li>
          <li className={movieInfoStyle.year}>{getYear()}</li>
          <li
            className={movieInfoStyle.runtime}
          >{`${movie.runtime} minutes`}</li>
          <li className={movieInfoStyle.genre}>{getGenre()}</li>
          {console.log(movie.title)}
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
    `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&append_to_response=release_dates`
  );
  const movie = await res.json();

  const res3 = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}/videos?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-U`
  );
  const trailer = await res3.json();

  const res4 = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}/recommendations?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&with_original_language=en&language=en-US&page=1`
  );
  const recommended = await res4.json();

  return {
    props: { movie, trailer, recommended },
  };
};

export default movieInfo;
