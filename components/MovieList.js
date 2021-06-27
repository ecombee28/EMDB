import React, { useState, useEffect } from "react";
import axios from "axios";
import { setMovies } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const MovieList = ({ id }) => {
  const [movies, setMovies] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        axios
          .post(`https://combeecreations.com/emdbapi/public/api/movies`, {
            userId: id,
          })
          .then((response) => {
            setMovies(response.data.Movies);
            dispatch(setMovies(movies));
          });
      } catch (err) {}
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default MovieList;
