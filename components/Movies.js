import Link from "next/link";
import style from "../styles/MovieComponent.module.css";
import ImagePath from "../components/ImagePaths";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Movies = ({ movie }) => {
  const image = ImagePath.w500;

  return (
    <div className={style.movie_container}>
      {movie.length > 0 ? (
        movie.map((m) => (
          <Link
            href={`/${m.media_type}/[id]`}
            as={`/${m.media_type}/${m.movie_id}`}
          >
            <div className={style.image_container}>
              <img
                key={m.id}
                src={`${image}${m.image_path}`}
                alt="d"
                className={style.img}
              />
              <div className={style.name_container}>{m.name}</div>
            </div>
          </Link>
        ))
      ) : (
        <div className={style.empty_list}>
          <FontAwesomeIcon icon={faPlus} className={style.icons} />
          You haven't added any titles to your list yet
          <br />
          Add your favorite movies or tv shows to your WatchList
        </div>
      )}
    </div>
  );
};

export default Movies;
