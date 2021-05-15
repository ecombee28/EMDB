import Link from "next/link";
import articleStyles from "../styles/Movie.module.css";

const MoviePoster = ({ type, item }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  return (
    <div>
      <Link href={`/${type}/[id]`} as={`/${type}/${item.id}`}>
        <img
          src={`${imagePath}${item.poster_path}`}
          alt=""
          className={articleStyles.posters}
        />
      </Link>
    </div>
  );
};

export default MoviePoster;
