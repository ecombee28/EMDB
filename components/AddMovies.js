import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";
import { selectMovies } from "../slices/userSlice";
import axios from "axios";
import style from "../styles/AddMovie.module.css";
import { setMovies } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddMovies = ({ id, media_type }) => {
  const [selected, setSelected] = useState(false);
  const user_id = useSelector(selectId);
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMovies = async () => {
      const foundMovie = movies.find((t) => t.movie_id == id);
      foundMovie && setSelected(true);
    };

    checkMovies();
  }, [id]);

  const addMovie = () => {
    const foundMovie = movies.find((t) => t.movie_id == id);

    if (!foundMovie) {
      try {
        axios.post(`https://combeecreations.com/emdbapi/public/api/addmovies`, {
          userId: user_id,
          movieId: id,
          type: media_type,
        });

        dispatch(setMovies({ movie_id: id, media_type: media_type }));
        setSelected(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const icon = selected ? faCheck : faPlus;

  return (
    <div>
      <div className={style.movie_container} onClick={addMovie}>
        {<FontAwesomeIcon icon={icon} className={style.icons} />}
        <span className={style.tooltiptext}>{`${
          selected ? "Added to list" : `Add to watch list`
        }`}</span>
      </div>
    </div>
  );
};

export default React.memo(AddMovies);
