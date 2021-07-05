import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMovies } from "../slices/userSlice";
import style from "../styles/AddMovie.module.css";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddMovies = ({ movie_id, addMovie, removeMovie }) => {
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(faPlus);
  const movies = useSelector(selectMovies);

  console.log(movie_id);

  useEffect(() => {
    const checkMovies = async () => {
      const foundMovie = movies.find((t) => t.movie_id === movie_id);
      if (foundMovie) {
        setIcon(faCheck);
        setSelected(true);
      } else {
        setIcon(faPlus);
        setSelected(false);
      }
    };

    checkMovies();
  });

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
};

export default AddMovies;
