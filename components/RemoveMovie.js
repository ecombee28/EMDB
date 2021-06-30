import React from "react";
import style from "../styles/RemoveMovie.module.css";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";
import { selectMovies } from "../slices/userSlice";
import axios from "axios";
import { resetMovies } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RemoveMovie = ({ movieId }) => {
  const user_id = useSelector(selectId);
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  console.log(user_id);

  const remove = async () => {
    axios
      .delete(`https://combeecreations.com/emdbapi/public/api/deletemovies`, {
        movieId: movieId,
        userId: user_id,
      })
      .then((response) => {
        if (response.data.Movie_Deleted === "Successfully") {
          console.log(response.data);
        } else {
          console.log(response.data.Movie_Deleted);
        }
      });
  };
  return (
    <div>
      <div className={style.movie_container}>
        {
          <FontAwesomeIcon
            icon={faTimes}
            className={style.icons}
            onClick={remove}
          />
        }
        <span className={style.tooltiptext}>{`Remove from list`}</span>
      </div>
    </div>
  );
};

export default RemoveMovie;
