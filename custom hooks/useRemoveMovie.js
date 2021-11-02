import Cookies from "js-cookie";
import { removeMovieToWatchList } from "../pages/api/api";

const useRemoveMovie = async (movieId) => {
  const id = Cookies.get("id");

  const removeMovie = await removeMovieToWatchList(movieId, id);
  if (removeMovie.Movie_Deleted === "Successfully") {
    return "Success";
  } else {
    return "Failed";
  }

  //return response;
};

export default useRemoveMovie;
