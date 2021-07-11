const API_KEY = "0f2af5a67e7fbe4db3bc573d65f3724b";

const FetchMovies = () => {
  async function getMarvel(page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=500&with_companies=420&with_original_language=en`
    );

    return (movie = await res.json());
  }
};

export default FetchMovies;
