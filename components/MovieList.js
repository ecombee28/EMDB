import React, { useState } from "react";
import movieStyles from "../styles/Movie.module.css";
import MoviePoster from "./MoviePoster";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieList = ({ movies, title, id }) => {
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  let length = 1780;

  const slideRight = () => {
    const element = document.getElementById(`${id}`);
    const ttl = element.scrollWidth - element.clientWidth;

    element.scrollLeft += length;

    if (element.scrollLeft == ttl) {
      setRightEnd(true);
    } else {
      setRightEnd(false);
      setLeftEnd(false);
    }
  };

  const slideLeft = () => {
    const element = document.getElementById(`${id}`);
    element.scrollLeft -= length;

    if (element.scrollLeft == 0) {
      setLeftEnd(true);
    } else {
      setLeftEnd(false);
      setRightEnd(false);
    }
  };

  return (
    <>
      <div className={movieStyles.row}>
        <h2 className={movieStyles.title}>{title}</h2>

        <div
          className={` ${movieStyles.left_arrow} ${
            leftEnd ? movieStyles.hide : movieStyles.show
          }`}
        >
          {
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className={movieStyles.left_arrow_icon}
              onClick={() => slideLeft({ id })}
            />
          }
        </div>
        <div id={`${id}`} className={movieStyles.row_posters}>
          {movies.map((movie) => (
            <MoviePoster key={movie.id} movies={movie} />
          ))}
        </div>

        <div
          className={` ${movieStyles.right_arrow} ${
            rightEnd ? movieStyles.hide : movieStyles.show
          }`}
        >
          {
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className={movieStyles.right_arrow_icon}
              onClick={() => slideRight({ id })}
            />
          }
        </div>
      </div>
    </>
  );
};

export default MovieList;
