import Cookies from "js-cookie";
import { addMovieToWatchList } from "../pages/api/api";

const useAddMovie = async (movieId, type, name, imagePath) => {
  const id = Cookies.get("id");
  const addMovie = await addMovieToWatchList(
    id,
    movieId,
    type,
    name,
    imagePath
  );

  if (addMovie.Movie_added === "Successful") {
    return addMovie.Movie_added;
  } else {
    return addMovie.Movie_added;
  }
};

export default useAddMovie;
