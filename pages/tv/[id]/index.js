import React from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recommended from "../../../components/Recommended";
import Head from "next/head";
import Trailer from "../../../components/Trailer";
import ImagePaths from "../../../components/ImagePaths";

const TvInfo = ({ movie, trailer, recommended }) => {
  const inProduction = movie.in_production;
  const firstYear = new Date(movie.first_air_date).getFullYear();
  const lastYear = new Date(movie.last_air_date).getFullYear();

  const getTrailerLink = () => {
    if (trailer.results.length === 0) {
      return " ";
    } else {
      return `https://www.youtube.com/embed/${trailer.results[0].key}`;
    }
  };

  const showTrailer = () => {
    const doc = document.getElementById("trailer");
    doc.style.display = "block";
  };

  const getGenre = () => {
    let genre = "";

    movie.genres.map((genreMap) => {
      genre += genreMap.name + ", ";
    });

    return genre.substring(0, genre.length - 2);
  };

  return (
    <div>
      <Head>
        <title>{`${movie.name}/EMDB`}</title>
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
        <h1 className={movieInfoStyle.title}>{movie.name}</h1>
        <button className={movieInfoStyle.trailer_button} onClick={showTrailer}>
          <FontAwesomeIcon icon={faPlay} className={movieInfoStyle.icon} />
          Trailer
        </button>
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
        <div className={movieInfoStyle.recommended}>
          <Recommended type="tv" item={recommended.results} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${context.params.id}?api_key=0f2af5a67e7fbe4db3bc573d65f3724b`
  );
  const movie = await res.json();

  const res3 = await fetch(
    `https://api.themoviedb.org/3/tv/${context.params.id}/videos?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-U`
  );
  const trailer = await res3.json();

  const res4 = await fetch(
    `https://api.themoviedb.org/3/tv/${context.params.id}/recommendations?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&with_original_language=en&language=en-US&page=1`
  );
  const recommended = await res4.json();

  return {
    props: { movie, trailer, recommended },
  };
};

export default TvInfo;
