import Link from "next/link";
import articleStyles from "../styles/Movie.module.css";

const MoviePoster = ({ movies }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  return (
    <div>
      <Link href="/movie/[id]" as={`/movie/${movies.id}`}>
        <img
          src={`${imagePath}${movies.poster_path}`}
          alt=""
          className={articleStyles.posters}
        />
      </Link>
    </div>
  );
};

export default MoviePoster;
