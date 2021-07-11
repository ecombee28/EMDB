import React from "react";
import Link from "next/link";
import collectionStyle from "../styles/Collections.module.css";
import ImagePath from "../components/ImagePaths";

const Collection = ({ movies }) => {
  return (
    <>
      <Link href="/movie/[id]" as={`/movie/${movies.id}`}>
        <img
          src={`${ImagePath.w500}${movies.poster_path}`}
          className={collectionStyle.posters}
          key={movies.id}
        />
      </Link>
    </>
  );
};

export default Collection;
