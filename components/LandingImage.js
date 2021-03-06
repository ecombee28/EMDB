import landingStyles from "../styles/LandingImage.module.css";
import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Request from "../components/Requests";
import axios from "axios";

const LandingImage = () => {
  const [movies, setMovies] = useState({});

  const backImagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(Request.fetchPopularMovie);

      setMovies(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div
        className={landingStyles.wrapper}
        style={{
          backgroundImage: `url("${backImagePath}${movies.backdrop_path}")`,
        }}
      ></div>
      <div className={landingStyles.blackout}></div>

      <div className={landingStyles.movie_info}>
        <p className={landingStyles.title}>{movies.title}</p>

        <Link href="/movie/[id]" as={`/movie/${movies.id}`}>
          <button className={landingStyles.trailer}>
            More Info
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className={landingStyles.icon}
            />
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
