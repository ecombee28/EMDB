import axios from "axios";
import Cookies from "js-cookie";

const useAddMovie = async (movieId, type, name) => {
  const id = Cookies.get("id");
  var response = "";

  try {
    const fetchData = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/addmovies`,
      {
        userId: id,
        movieId: movieId,
        type: type,
        name: name,
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

export default useAddMovie;
