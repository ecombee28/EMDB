import React from "react";
import style from "../styles/Cast.module.css";

const Cast = ({ castMember }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  //const blankImage = "";
  const castImage = imagePath + castMember.profile_path;
  return (
    <div className={style.cast_node_wrapper}>
      <div className={style.image_wrapper}>
        <img
          className={style.cast__img}
          src={castImage}
          alt="/blank-profile-picture.png"
        />
      </div>
      <div className={style.info_wrapper}>
        <p className={style.actor_name}>{castMember.name}</p>
        <p className={style.character_name}>{castMember.character}</p>
      </div>
    </div>
  );
};

export default Cast;
