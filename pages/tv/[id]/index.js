import React, { useState } from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recommended from "../../../components/List";
import Head from "next/head";
import axios from "axios";
import Trailer from "../../../components/Trailer";
import ImagePaths from "../../../components/ImagePaths";
import Cast from "../../../components/Cast";
import AddMovie from "../../../components/AddMovies";
import Cookies from "js-cookie";
import {
  getDetails,
  getTrailer,
  getRecommended,
  getCredits,
  getMovieCount,
} from "../../api/api";

const TvInfo = ({ countNumber, movie, trailer, recommended, cast }) => {
  const inProduction = movie.in_production;
  const firstYear = new Date(movie.first_air_date).getFullYear();
  const lastYear = new Date(movie.last_air_date).getFullYear();
  const id = Cookies.get("id");
  const [showTrailer, setShowTrailer] = useState(false);

  const getGenre = () => {
    let genre = "";

    movie.genres.map((genreMap) => {
      genre += genreMap.name + ", ";
    });

    return genre.substring(0, genre.length - 2);
  };

  console.log(cast);

  return (
    <div>
      <Head>
        <title>{`${movie.name}/EMDB`}</title>
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
      <img
        src={`${ImagePaths.original}${movie.backdrop_path}`}
        className={movieInfoStyle.backdrop}
      />

      <div className={movieInfoStyle.movie_info_wrapper}>
        <h1 className={movieInfoStyle.title}>{movie.name}</h1>
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
                media_type={"tv"}
                name={movie.name}
                count={countNumber}
                imagePath={movie.backdrop_path}
              />
            </div>
          )}
        </div>
        <div className={movieInfoStyle.movie_info}>
          <li className={movieInfoStyle.year}>
            {inProduction
              ? firstYear + "-"
              : firstYear === lastYear
              ? firstYear
              : firstYear + "-" + lastYear}
          </li>
          <li
            className={movieInfoStyle.episodes}
          >{`${movie.number_of_episodes} episodes`}</li>
          <li className={movieInfoStyle.genre}>{getGenre()}</li>
        </div>
        <div className={movieInfoStyle.movie_ratings_wrapper}>
          {inProduction ? (
            <div>
              <p className={movieInfoStyle.logo_text}>Streaming on: </p>
              <a href={movie.homepage} target={`_blank`}>
                <img
                  className={`${movieInfoStyle.logo}  ${
                    movie.networks[0].name === "Netflix" ||
                    movie.networks[0].name === "The CW"
                      ? movieInfoStyle.non_filter
                      : ""
                  }`}
                  src={`${ImagePaths.w500}${movie.networks[0].logo_path}`}
                  alt=""
                ></img>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>

        <div className={movieInfoStyle.cast_wrapper}>
          {cast.slice(0, 6).map((list) => (
            <Cast castMember={list} />
          ))}
        </div>

        <div className={movieInfoStyle.recommended}>
          {recommended.total_results > 0 && (
            <Recommended
              movies={recommended.results}
              title="Recommended"
              id={1}
              type="tv"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.req.cookies.id;

  const countNumber = await getMovieCount(id, context.params.id);
  const movie = await getDetails("tv", context.params.id);
  const trailer = await getTrailer("tv", context.params.id);
  const recommended = await getRecommended("tv", context.params.id);
  const cast = await getCredits("tv", context.params.id);

  return {
    props: { countNumber, movie, trailer, recommended, cast },
  };
};

export default TvInfo;
