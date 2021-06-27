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
      {user_id && <AddMovie id={item.id} media_type={type} />}
      <Link href={`/${type}/[id]`} as={`/${type}/${item.id}`}>
        <img
          src={`${imagePath}${item.poster_path}`}
          alt=""
          className={style.posters}
        />
      </Link>
    </div>
  );
};

export default MoviePoster;
