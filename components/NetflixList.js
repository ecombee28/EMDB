import movieStyles from "../styles/Movie.module.css";
import MoviePoster from "./MoviePoster";
import Request from "./Requests";

const MovieList = ({ movies, title }) => {
  return (
    <div className={movieStyles.row}>
      <h2 className={movieStyles.title}>{title}</h2>
      <div className={movieStyles.row_inline_posters}>
        {movies.map((movie) =>
          movie.original_language === "en" && movie.vote_count > 50 ? (
            <MoviePoster key={movie.id} movies={movie} />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};
export const getStaticProps = async () => {
  const API_KEY = "0f2af5a67e7fbe4db3bc573d65f3724b";

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_original_language=en`
  );

  const movies = await res.json();

  return {
    props: {
      movies,
    },
  };
};

export default MovieList;
