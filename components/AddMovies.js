import React, { useState, useEffect } from "react";
import style from "../styles/AddMovie.module.css";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddMovie from "./useAddMovie";
import useRemoveMovie from "./useRemoveMovie";

export default function AddMovies({ movie_id, media_type, name, count }) {
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(faPlus);

  useEffect(() => {
    const fetchData = async () => {
      if (count[0].count === 1) {
        setIcon(faCheck);
        setSelected(true);
      } else {
        setIcon(faPlus);
      }
    };

    fetchData();
  }, [movie_id]);

  const handleMovie = () => {
    setLoading(true);
    if (!selected) {
      const { response } = useAddMovie(movie_id, media_type, name);

      setLoading(false);
      setIcon(faCheck);
      setSelected(true);
    } else {
      const { response } = useRemoveMovie(movie_id);

      setTimeout(() => {
        setLoading(false);
        setIcon(faPlus);
        setSelected(false);
      }, 2000);
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
