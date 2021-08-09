import React, { useState } from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import axios from "axios";
import RatingsLogo from "../../../components/RatingsLogo";
import Cast from "../../../components/Cast";
import Trailer from "../../../components/Trailer";
import ImagePaths from "../../../components/ImagePaths";
import AddMovie from "../../../components/AddMovies";
import Cookies from "js-cookie";
import Recommended from "../../../components/List";

const movieInfo = ({
  countNumber,
  movie,
  trailer,
  recommended,
  imdb,
  castMembersArray,
}) => {
  const id = Cookies.get("id");
  const [showTrailer, setShowTrailer] = useState(false);

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
            imdb.Ratings.map((logo, i) => (
              <RatingsLogo key={i} source={logo.Source} value={logo.Value} />
            ))}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>

        <div className={movieInfoStyle.cast_wrapper}>
          {castMembersArray.map((list, i) => (
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
  var castMembersArray = [];
  const id = context.req.cookies.id;

  try {
    const fetchData = await axios.get(
      `https://combeecreations.com/emdbapi/public/api/user/${id}/movie/${context.params.id}`
    );

    const countNumber = await fetchData.data;

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&append_to_response=release_dates`
    );
    const movie = await res.json();

    const res3 = await fetch(
      `https://api.themoviedb.org/3/movie/${context.params.id}/videos?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-US`
    );
    const trailerResults = await res3.json();

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

    if (cast.cast.length > 6) {
      for (let i = 0; i < 6; i++) {
        castMembersArray[i] = cast.cast[i];
      }
    } else if (cast.cast.length > 1 && cast.cast.length <= 6) {
      cast.cast.map((item, i) => {
        castMembersArray[i] = item;
      });
    } else if (cast.cast.length == 1) {
      castMembersArray.push(cast.cast[0]);
    }

    const trailer = await trailerResults.results.filter((t) => {
      return t.type === "Trailer" && t.site === "YouTube";
    });

    return {
      props: {
        countNumber,
        movie,
        trailer,
        recommended,
        imdb,
        castMembersArray,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default movieInfo;
