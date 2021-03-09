import React, { useState } from "react";
import Link from "next/link";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faSitemap } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecommendedTv from "../../../components/RocommendedTvshows";
import Head from "next/head";

const TvInfo = ({ movie, trailer, recommended }) => {
  const [showMe, setShowMe] = useState(false);
  let trailerLink;
  trailer.results.length === 0
    ? (trailerLink = " ")
    : (trailerLink = trailer.results[0].key);
  const youTubeLink = "https://www.youtube.com/embed/" + trailerLink;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const logoPath = "https://image.tmdb.org/t/p/w500";
  const inProduction = movie.in_production;
  const startDate = new Date(movie.first_air_date);
  const endDate = new Date(movie.last_air_date);

  const firstYear = startDate.getFullYear();
  const lastYear = endDate.getFullYear();

  function toggle() {
    const doc = document.getElementById("trailer");
    const containerElement = document.getElementById("trailer");
    const iframe_tag = containerElement.querySelector("iframe");
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
        <title>{`${movie.name}/EMDB`}</title>
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

          <li className={movieInfoStyle.genre}>
            {movie.genres.map((genres) => genres.name + "  ")}
          </li>
        </div>
        <div className={movieInfoStyle.movie_ratings_wrapper}>
          {inProduction ? (
            <>
              {" "}
              <p className={movieInfoStyle.logo_text}>Streaming on: </p>
              <Link href={movie.homepage} target={`_blank`}>
                <img
                  className={`${movieInfoStyle.logo}  ${
                    movie.networks[0].name === "Netflix" ||
                    movie.networks[0].name === "The CW"
                      ? movieInfoStyle.non_filter
                      : ""
                  }`}
                  src={`${logoPath}${movie.networks[0].logo_path}`}
                  alt=""
                ></img>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>
        <div className={movieInfoStyle.recommended}>
          <RecommendedTv movies={recommended.results} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  console.log(context);
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
