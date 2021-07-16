import axios from "axios";
import Cookies from "js-cookie";

const useAddMovie = async (movieId, type, name, imagePath) => {
  const id = Cookies.get("id");

  try {
    const fetchData = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/addmovies`,
      {
        userId: id,
        movieId: movieId,
        type: type,
        name: name,
        imagePath: imagePath,
      }
    );

    if (fetchData.data.Movie_added === "Successful") {
      return { response: console.log(fetchData.data.Movie_added) };
    } else {
      return { response: console.log(fetchData.data.Movie_added) };
    }
  } catch (err) {
    console.log(err);
  }
};

export default useAddMovie;
