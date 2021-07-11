import React, { useState, useEffect } from "react";
import style from "../styles/AddMovie.module.css";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";

export default function AddMovies({ movie_id, addMovie, removeMovie }) {
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const [icon, setIcon] = useState(faPlus);
  const id = Cookies.get("id");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchData = await axios.get(
        `https://combeecreations.com/emdbapi/public/api/user/${id}/movie/${movie_id}`
      );

      const countNumber = await fetchData.data;

      if (countNumber[0].count === 1) {
        setIcon(faCheck);
        setSelected(true);
        setLoading(false);
      } else {
        setIcon(faPlus);
        setSelected(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [movie_id]);

  const handleMovie = () => {
    setLoading(true);
    if (!selected) {
      addMovie();
      setLoading(false);
      setIcon(faCheck);
    } else {
      removeMovie();
      setTimeout(() => {
        setLoading(false);
        setIcon(faPlus);
      }, 3000);
    }
  };

  return (
    <div>
      <div className={style.movie_container}>
        {loading ? (
          <img src="/loading.gif" alt="" className={style.loader} />
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className={style.icons}
            onClick={handleMovie}
          />
        )}
        <span className={style.tooltiptext}>{`${
          selected ? "Remove from list" : `Add to watch list`
        }`}</span>
      </div>
    </div>
  );
}
