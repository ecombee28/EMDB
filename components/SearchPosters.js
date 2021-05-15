import searchStyles from "../styles/Search.module.css";
import Link from "next/link";

const SearchPosters = ({ movies }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movies.map((movies) =>
        movies.original_language === "en" && movies.vote_count > 300 ? (
          movies.media_type === "movie" ? (
            <Link href="/movie/[id]" as={`/movie/${movies.id}`} key={movies.id}>
              <div className={searchStyles.search_posters}>
                <img
                  src={`${imagePath}${movies.poster_path}`}
                  alt=""
                  className={searchStyles.posters}
                  key={movies.id}
                />
              </div>
            </Link>
          ) : (
            <Link href="/tv/[id]" as={`/tv/${movies.id}`} key={movies.id}>
              <div className={searchStyles.search_posters}>
                <img
                  src={`${imagePath}${movies.poster_path}`}
                  alt=""
                  className={searchStyles.posters}
                  key={movies.id}
                />
              </div>
            </Link>
          )
        ) : (
          ""
        )
      )}
    </>
  );
};

export default SearchPosters;
