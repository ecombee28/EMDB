import Link from "next/link";
import style from "../styles/MovieComponent.module.css";
import ImagePath from "../components/ImagePaths";

const Movies = ({ id, type, imagePath, name }) => {
  const image = ImagePath.w500 + imagePath;

  return (
    <div>
      <Link href={`/${type}/[id]`} as={`/${type}/${id}`}>
        <div className={style.image_container}>
          <img src={image} alt="d" className={style.img} />
          <div className={style.name_container}>{name}</div>
        </div>
      </Link>
    </div>
  );
};

export default Movies;
