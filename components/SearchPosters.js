import searchStyles from "../styles/Search.module.css";
import Link from "next/link";

const SearchPosters = ({ movies, title }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movies.length > 0 ? (
        movies.map(
          (movies) =>
            movies.vote_count > 300 && (
              <Link
                href={`/${movies.media_type}/[id]`}
                as={`/${movies.media_type}/${movies.id}`}
                key={movies.id}
              >
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
        )
      ) : (
        <div className={searchStyles.no_results}>
          <p>{`Could not find title:  ${title}`}</p>
        </div>
      )}
    </>
  );
};

export default SearchPosters;

{
  /* <Link href={`/${movies.media_type}/[id]`} as={`/${movies.media_type}/${movies.id}`} key={movies.id}>
              <div className={searchStyles.search_posters}>
                <img
                  src={`${imagePath}${movies.poster_path}`}
                  alt=""
                  className={searchStyles.posters}
                  key={movies.id}
                />
              </div>
            </Link> */
}
