import landingStyles from "../styles/LandingImage.module.css";
import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Request from "../components/Requests";
import axios from "axios";
import ImagePaths from "./ImagePaths";

const LandingImage = () => {
  const [movies, setMovies] = useState({});

  /* When the app renders useEffect is called
   * setMovies randomly selects a movie from the
   * results of the API call
   */

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(Request.fetchPopularMovie);

      setMovies(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div
        className={landingStyles.wrapper}
        style={{
          backgroundImage: `url("${ImagePaths.original}${movies.backdrop_path}")`,
        }}
      ></div>
      <div className={landingStyles.blackout}></div>

      <div className={landingStyles.movie_info}>
        <p className={landingStyles.title}>{movies.title}</p>

        <Link href="/movie/[id]" as={`/movie/${movies.id}`}>
          <button className={landingStyles.btn_more_info}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={landingStyles.icon}
            />
            More Info
          </button>
        </Link>

        <div className={`${landingStyles.plot_wrapper} ${landingStyles.wrap}`}>
          <p className={landingStyles.plot}>{movies.overview}</p>
        </div>
      </div>
    </>
  );
};

export default LandingImage;
