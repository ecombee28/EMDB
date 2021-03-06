import React, { useState } from "react";
import Link from "next/link";
import collectionStyle from "../styles/Collections.module.css";

const Collection = ({ movies }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movies.map((movies) => (
        <Link href="/movie/[id]" as={`/movie/${movies.id}`}>
          <div className={collectionStyle.posters} key={movies.id}>
            <img
              src={`${imagePath}${movies.poster_path}`}
              className={collectionStyle.img}
              key={movies.id}
            />
          </div>
        </Link>
      ))}
    </>
  );
};

export default Collection;
