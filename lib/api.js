import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getDetails(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`
    );

    return fetchData.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getTrailer(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const trailer = await fetchData.data.results.filter((t) => {
      return t.type === "Trailer" && t.site === "YouTube";
    });

    return trailer;
  } catch (error) {}
}

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getRecommended(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${TMDB_API_KEY}&with_original_language=en&language=en-US&page=1`
    );
    return fetchData.data;
  } catch (error) {}
}

/**
 *
 * @param {*} type
 * @param {*} id
 * @returns
 */
export async function getCredits(type, id) {
  try {
    const fetchData = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    if (fetchData.data.cast.length > 6) {
      return fetchData.data.cast.slice(0, 6);
    } else if (
      fetchData.data.cast.length >= 1 &&
      fetchData.data.cast.length <= 6
    ) {
      return fetchData.data.cast.slice(0, fetchData.data.cast.length);
    }
  } catch (error) {}
}

/**
 *
 * @param {*} type
 * @param {*} userId
 * @param {*} movieId
 * @returns
 */
export async function getMovieCount(userId, movieId) {
  try {
    const fetchData = await axios.get(
      `https://combeecreations.com/emdbapi/public/api/user/${userId}/movie/${movieId}`
    );
    return fetchData.data;
  } catch (error) {}
}

/**
 *
 * @param {*} id
 * @returns
 */

export async function getImdbRatings(id) {
  try {
    const fetchData = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=ed47902e`
    );
    return fetchData.data;
  } catch (error) {}
}

/**
 *
 * @param {*} id
 * @param {*} movieId
 * @param {*} type
 * @param {*} name
 * @param {*} imagePath
 * @returns
 */
export async function addMovieToWatchList(id, movieId, type, name, imagePath) {
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
    return fetchData.data;
  } catch (error) {}
}

/**
 *
 * @param {*} movieId
 * @param {*} id
 * @returns
 */
export async function removeMovieToWatchList(movieId, id) {
  try {
    const fetchData = await axios.post(
      `https://combeecreations.com/emdbapi/public/api/deletemovies`,
      {
        movieId: movieId,
        userId: id,
      }
    );
    return fetchData.data;
  } catch (error) {}
}
