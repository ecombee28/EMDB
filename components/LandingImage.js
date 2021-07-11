import landingStyles from "../styles/LandingImage.module.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ImagePaths from "./ImagePaths";

const LandingImage = ({ movie }) => {
  return (
    <>
      <div className={landingStyles.wrapper}>
        <img
          src={`${ImagePaths.original}${movie.backdrop_path}`}
          className={landingStyles.image}
        />
      </div>
      <div className={landingStyles.blackout}>
        <div className={landingStyles.movie_info}>
          <p className={landingStyles.title}>{movie.title}</p>

          <Link href="/movie/[id]" as={`/movie/${movie.id}`}>
            <button className={landingStyles.btn_more_info}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className={landingStyles.icon}
              />
              More Info
            </button>
          </Link>

          <div
            className={`${landingStyles.plot_wrapper} ${landingStyles.wrap}`}
          >
            <p className={landingStyles.plot}>{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingImage;
