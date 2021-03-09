import React, { useState } from "react";
import recStyle from "../styles/Recommended.module.css";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Recommended = ({ movies }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  let length = 1780;

  const slideRight = () => {
    const element = document.getElementById("row");
    const ttl = element.scrollWidth - element.clientWidth;

    element.scrollLeft += length;

    //console.log("right element:" + element.scrollLeft + " ttl:" + ttl);

    if (parseInt(element.scrollLeft, 10) == ttl) {
      setRightEnd(true);
    } else {
      setRightEnd(false);
      setLeftEnd(false);
    }
  };

  const slideLeft = () => {
    const element = document.getElementById("row");
    element.scrollLeft -= length;

    //console.log("left element:" + element.scrollLeft + " ttl:" + ttl);

    if (parseInt(element.scrollLeft, 10) == 0) {
      setLeftEnd(true);
    } else {
      setLeftEnd(false);
      setRightEnd(false);
    }
  };

  return (
    <section className={recStyle.rec_wrapper}>
      <h1 className={recStyle.title}>Recommended Movies</h1>
      <div
        className={`${recStyle.right_arrow} ${
          rightEnd ? recStyle.hide : recStyle.show
        }`}
        onClick={() => slideRight()}
      >
        {
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            className={recStyle.right_arrow_icon}
          />
        }
      </div>

      <div id="row" className={recStyle.row}>
        {movies.map((movies) => (
          <Link href="/movie/[id]" as={`/movie/${movies.id}`}>
            <img
              src={`${imagePath}${movies.poster_path}`}
              alt=""
              className={recStyle.posters}
            />
          </Link>
        ))}
      </div>
      <div
        className={`${recStyle.left_arrow} ${
          leftEnd ? recStyle.hide : recStyle.show
        }`}
        onClick={() => slideLeft()}
      >
        {
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            className={recStyle.left_arrow_icon}
          />
        }
      </div>
    </section>
  );
};

export default Recommended;
