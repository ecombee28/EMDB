import React, { useState } from "react";
import movieInfoStyle from "../styles/MovieInfo.module.css";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trailer = ({ trailer }) => {
  const [showMe, setShowMe] = useState(false);
  let trailerLink;

  trailer.results.length === 0
    ? (trailerLink = " ")
    : (trailerLink = trailer.results[0].key);

  const youTubeLink = "https://www.youtube.com/embed/" + trailerLink;

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

  return (
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
  );
};

export default Trailer;
