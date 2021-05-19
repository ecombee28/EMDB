import React from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recommended from "../../../components/Recommended";
import Head from "next/head";
import RatingsLogo from "../../../components/RatingsLogo";
import Cast from "../../../components/Cast";
import Trailer from "../../../components/Trailer";
import ImagePaths from "../../../components/ImagePaths";

const movieInfo = ({ movie, trailer, recommended, imdb, cast }) => {
  var castMembersArray = [];

  const getTrailerLink = () => {
    if (trailer.results.length === 0) {
      return " ";
    } else {
      return `https://www.youtube.com/embed/${trailer.results[0].key}`;
    }
  };

  // getRating fetches the movie rating from the API
  const getRating = () => {
    let movieRatingArr, movieRating;

    movieRatingArr = movie.release_dates.results.filter(
      (list) => list.iso_3166_1 === "US"
    );

    movieRatingArr[0].release_dates.map((rating) => {
      rating.certification === ""
        ? (movieRating = "N/A")
        : (movieRating = rating.certification);
    });

    return movieRating;
  };

  // getGenre retrieves and returns a string of genres fetch
  // from the API
  const getGenre = () => {
    let genre = "";
    let newGenre;

    movie.genres.map((genreMap) => {
      genre += genreMap.name + ", ";
    });

    newGenre = genre.substring(0, genre.length - 2);

    return newGenre;
  };

  // getYear returns just the year of the release date that the API returns
  const getYear = () => {
    let year, d;

    d = new Date(movie.release_date);
    year = d.getFullYear();

    return year;
  };

  const showTrailer = () => {
    const doc = document.getElementById("trailer");
    doc.style.display = "block";
  };

  const createCastArray = () => {
    if (cast.cast.length > 0) {
      for (let i = 0; i < 6; i++) {
        castMembersArray[i] = cast.cast[i];
      }
    }
  };

  createCastArray();

  return (
    <>
      <Head>
        <title>{`${movie.title}/EMDB`}</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <Trailer trailer={getTrailerLink()} />
      <img
        src={`${ImagePaths.original}${movie.backdrop_path}`}
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
        </div>
        <div className={movieInfoStyle.movie_ratings_wrapper}>
          {imdb.Response !== "False" &&
            imdb.Ratings.map((logo, i) => (
              <RatingsLogo key={i} source={logo.Source} value={logo.Value} />
            ))}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>

        <div className={movieInfoStyle.cast_wrapper}>
          {castMembersArray.map((list) => (
            <Cast castMember={list} />
          ))}
        </div>

        <div className={movieInfoStyle.recommended}>
          <Recommended type="movie" item={recommended.results} />
        </div>
      </div>
    </>
  );
};

/**
 *
 * @param {*} context
 * @returns
 * getServerSideProps makes all the API calls when the app is loaded.
 * All results from the API calls are collected and sent to movieInfo as props
 */

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

  const res5 = await fetch(
    `https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=ed47902e&plot=full`
  );
  const imdb = await res5.json();

  const res6 = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}/credits?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-US`
  );
  const cast = await res6.json();

  return {
    props: { movie, trailer, recommended, imdb, cast },
  };
};

export default movieInfo;
