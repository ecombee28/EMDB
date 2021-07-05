import Link from "next/link";
import style from "../styles/Movie.module.css";
import AddMovie from "../components/AddMovies";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";

const MoviePoster = ({ type, item }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const user_id = useSelector(selectId);

  return (
    <div className={style.poster_container}>
      <Link href={`/${type}/[id]`} as={`/${type}/${item.id}`}>
        <div className={style.poster_container}>
          <img
            src={`${imagePath}${item.poster_path}`}
            alt=""
            className={style.posters}
          />
        </div>
      </Link>
    </div>
  );
};

export default MoviePoster;
