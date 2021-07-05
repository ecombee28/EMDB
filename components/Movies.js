import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import style from "../styles/MovieComponent.module.css";

const Movies = ({ id, type }) => {
  const [movieImg, setMovieImg] = useState("");

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const API_KEY = "0f2af5a67e7fbe4db3bc573d65f3724b";

  useEffect(() => {
    const fetchImg = async () => {
      try {
        let res;
        if (type === "movie") {
          const fetchMovie = await axios(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
          );
          res = await fetchMovie.data.backdrop_path;
        } else {
          const fetchTv = await axios(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
          );
          res = await fetchTv.data.backdrop_path;
        }

        setMovieImg(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImg();
  }, []);

  return (
    <div>
      <Link href={`/${type}/[id]`} as={`/${type}/${id}`}>
        <div className={style.image_container}>
          <img src={`${imagePath}${movieImg}`} alt="d" className={style.img} />
        </div>
      </Link>
    </div>
  );
};

export default Movies;
