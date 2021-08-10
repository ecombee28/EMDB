import React, { useState, useEffect } from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import RatingsLogo from "../../../components/RatingsLogo";
import Cast from "../../../components/Cast";
import Trailer from "../../../components/Trailer";
import ImagePaths from "../../../components/ImagePaths";
import AddMovie from "../../../components/AddMovies";
import Cookies from "js-cookie";
import Recommended from "../../../components/List";
import {
  getDetails,
  getTrailer,
  getRecommended,
  getCredits,
  getMovieCount,
  getImdbRatings,
} from "../../../lib/api";

const movieInfo = ({ countNumber, movie, trailer, recommended, cast }) => {
  const id = Cookies.get("id");
  const [showTrailer, setShowTrailer] = useState(false);
  const [imdb, setImdb] = useState([]);
  const [movieRatings, setMovieRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const imdb = await getImdbRatings(movie.imdb_id);

      await setImdb(imdb);
      await setMovieRatings(imdb.Ratings);
    };

    fetchData();
  }, [movie]);

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

  return (
    <>
      <Head>
        <title>{`${movie.title}/EMDB`}</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      {showTrailer && (
        <div
          className={`${movieInfoStyle.trailer} ${
            !showTrailer && movieInfoStyle.hide
          }`}
        >
          <span
            id="closeVideo"
            className={movieInfoStyle.close}
            onClick={() => setShowTrailer(!showTrailer)}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={movieInfoStyle.close}
            />
          </span>
          <Trailer trailer={trailer} />
        </div>
      )}

      <div className={movieInfoStyle.backdrop}>
        <img
          src={`${ImagePaths.original}${movie.backdrop_path}`}
          className={movieInfoStyle.img}
        />
      </div>

      <div className={movieInfoStyle.movie_info_wrapper}>
        <h1 className={movieInfoStyle.title}>{movie.title}</h1>
        <div className={movieInfoStyle.trailer_wrapper}>
          <button
            className={movieInfoStyle.trailer_button}
            onClick={() => setShowTrailer(!showTrailer)}
          >
            <FontAwesomeIcon icon={faPlay} className={movieInfoStyle.icon} />
            Trailer
          </button>
          {id && (
            <div className={movieInfoStyle.add_movie}>
              <AddMovie
                movie_id={movie.id}
                media_type={"movie"}
                name={movie.title}
                count={countNumber}
                imagePath={movie.backdrop_path}
              />
            </div>
          )}
        </div>

        <div className={movieInfoStyle.movie_info}>
          <li className={movieInfoStyle.rated}>{imdb.Rated}</li>
          <li className={movieInfoStyle.year}>{getYear()}</li>
          <li
            className={movieInfoStyle.runtime}
          >{`${movie.runtime} minutes`}</li>
          <li className={movieInfoStyle.genre}>{getGenre()}</li>
        </div>
        <div className={movieInfoStyle.movie_ratings_wrapper}>
          {imdb.Response !== "False" &&
            movieRatings.map((logo, i) => (
              <RatingsLogo key={i} source={logo.Source} value={logo.Value} />
            ))}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>

        <div className={movieInfoStyle.cast_wrapper}>
          {cast.map((list, i) => (
            <Cast key={i} castMember={list} />
          ))}
        </div>

        <div className={movieInfoStyle.recommended}>
          {recommended.total_results > 0 && (
            <Recommended
              key={recommended.results.id}
              movies={recommended.results}
              title="Recommended"
              id={1}
              type="movie"
            />
          )}
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

export async function getServerSideProps(context) {
  const id = context.req.cookies.id;

  const countNumber = await getMovieCount(id, context.params.id);
  const movie = await getDetails("movie", context.params.id);
  const trailer = await getTrailer("movie", context.params.id);
  const recommended = await getRecommended("movie", context.params.id);
  const cast = await getCredits("movie", context.params.id);

  return {
    props: { countNumber, movie, trailer, recommended, cast },
  };
}

export default movieInfo;
