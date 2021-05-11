import React from "react";
import movieInfoStyle from "../styles/MovieInfo.module.css";

const RatingsLogo = ({ source, value }) => {
  const getRating = () => {
    let rating = value.substring(0, 2);

    if (rating > 50) {
      return "/good-rotton.png";
    } else {
      return "/bad-rotton.png";
    }
  };
  return (
    <div className={movieInfoStyle.wrap}>
      <img
        src={
          source === "Internet Movie Database"
            ? "/imdb.png"
            : source === "Rotten Tomatoes"
            ? getRating()
            : source === "Metacritic"
            ? "/Metacritic.svg"
            : ""
        }
        className={movieInfoStyle.rating_logo}
      />
      <p className={movieInfoStyle.rating}>{value}</p>
    </div>
  );
};

export default RatingsLogo;
