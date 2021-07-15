import axios from "axios";
import Cookies from "js-cookie";

const useRemoveMovie = async (movieId) => {
  var response = "";
  const id = Cookies.get("id");

  try {
    const fetchData = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/deletemovies`,
      {
        movieId: movieId,
        userId: id,
      }
    );

    if (fetchData.data.Movie_added === "Successful") {
      response = "Success";
    } else {
      response = "failed";
    }

    return response;
  } catch (err) {
    throw error(err);
  }
};

export default useRemoveMovie;
