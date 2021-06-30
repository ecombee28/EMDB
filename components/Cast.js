import React from "react";
import style from "../styles/Cast.module.css";
import Link from "next/link";
import ImagePaths from "./ImagePaths";

const Cast = ({ castMember }) => {
  const castImage = ImagePaths.w500 + castMember.profile_path;
  const blankImage = "/blank-profile-picture.png";
  console.log(castMember);

  return (
    <Link href="/person/[id]" as={`/person/${castMember.id}`}>
      <div className={style.cast_node_wrapper}>
        <div className={style.image_wrapper}>
          <img
            className={style.cast__img}
            src={castMember.profile_path === null ? blankImage : castImage}
            alt="No Image"
          />
        </div>
        <div className={style.info_wrapper}>
          <p className={style.actor_name}>{castMember.name}</p>
          <p className={style.character_name}>{castMember.character}</p>
        </div>
      </div>
    </Link>
  );
};

export default Cast;
