import Link from "next/link";
import articleStyles from "../styles/Movie.module.css";

const TvPoster = ({ movies }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  return (
    <div>
      <Link href="/tv/[id]" as={`/tv/${movies.id}`}>
        <img
          src={`${imagePath}${movies.poster_path}`}
          alt=""
          className={articleStyles.posters}
        />
      </Link>
    </div>
  );
};

export default TvPoster;
