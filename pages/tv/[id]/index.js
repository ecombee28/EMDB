import React from "react";
import movieInfoStyle from "../../../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recommended from "../../../components/List";
import Head from "next/head";
import axios from "axios";
import Trailer from "../../../components/Trailer";
import ImagePaths from "../../../components/ImagePaths";
import Cast from "../../../components/Cast";
import AddMovie from "../../../components/AddMovies";
import Cookies from "js-cookie";

const TvInfo = ({
  countNumber,
  movie,
  trailer,
  recommended,
  castMembersArray,
}) => {
  const inProduction = movie.in_production;
  const firstYear = new Date(movie.first_air_date).getFullYear();
  const lastYear = new Date(movie.last_air_date).getFullYear();
  const id = Cookies.get("id");

  const getTrailerLink = () => {
    if (trailer.results.length === 0) {
      return " ";
    } else {
      return `https://www.youtube.com/embed/${trailer.results[0].key}`;
    }
  };

  const showTrailer = () => {
    const doc = document.getElementById("trailer");
    doc.style.display = "block";
  };

  const getGenre = () => {
    let genre = "";

    movie.genres.map((genreMap) => {
      genre += genreMap.name + ", ";
    });

    return genre.substring(0, genre.length - 2);
  };

  /**This function is called by the
   * addMovie component. It adds a movie to
   * the database and to global movie variable
   */
  const addMovie = () => {
    try {
      axios.post(`https://combeecreations.com/emdbapi/public/api/addmovies`, {
        userId: id,
        movieId: movie.id,
        type: "tv",
        name: movie.name,
      });

      //dispatch(setMovies({ movie_id: movie.id, media_type: "movie" }));
    } catch (err) {
      console.log(err);
    }
  };
  /**This function is called by the
   * addMovie component. It deletes a movie from the
   * the database. It also removes it from the
   * global movie variable and localstorage
   */
  const removeMovie = async () => {
    try {
      const fetchData = await axios.post(
        `https://combeecreations.com/emdbapi/public/api/deletemovies`,
        {
          movieId: movie.id,
          userId: id,
        }
      );

      const res = await fetchData;

      if (res.data.Movie_Deleted !== "Successfully") {
        console.log(res.data.movies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const createCastArray = () => {
  //   if (cast.cast.length > 6) {
  //     for (let i = 0; i < 6; i++) {
  //       castMembersArray[i] = cast.cast[i];
  //     }
  //   } else if (cast.cast.length > 1 && cast.cast.length <= 6) {
  //     cast.cast.map((item, i) => {
  //       castMembersArray[i] = item;
  //     });
  //   } else if (cast.cast.length == 1) {
  //     castMembersArray.push(cast.cast);
  //   }
  // };

  // createCastArray();

  return (
    <div>
      <Head>
        <title>{`${movie.name}/EMDB`}</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <Trailer trailer={getTrailerLink()} />
      <img
        src={`${ImagePaths.original}${movie.backdrop_path}`}
        className={movieInfoStyle.backdrop}
      />
      <div className={movieInfoStyle.blackout}></div>
      <div className={movieInfoStyle.movie_info_wrapper}>
        <h1 className={movieInfoStyle.title}>{movie.name}</h1>
        <div className={movieInfoStyle.trailer_wrapper}>
          <button
            className={movieInfoStyle.trailer_button}
            onClick={showTrailer}
          >
            <FontAwesomeIcon icon={faPlay} className={movieInfoStyle.icon} />
            Trailer
          </button>
          {id && (
            <div className={movieInfoStyle.add_movie}>
              <AddMovie
                movie_id={movie.id}
                media_type={"tv"}
                addMovie={addMovie}
                removeMovie={removeMovie}
                count={countNumber}
              />
            </div>
          )}
        </div>
        <div className={movieInfoStyle.movie_info}>
          <li className={movieInfoStyle.year}>
            {inProduction
              ? firstYear + "-"
              : firstYear === lastYear
              ? firstYear
              : firstYear + "-" + lastYear}
          </li>
          <li
            className={movieInfoStyle.episodes}
          >{`${movie.number_of_episodes} episodes`}</li>
          <li className={movieInfoStyle.genre}>{getGenre()}</li>
        </div>
        <div className={movieInfoStyle.movie_ratings_wrapper}>
          {inProduction ? (
            <div>
              <p className={movieInfoStyle.logo_text}>Streaming on: </p>
              <a href={movie.homepage} target={`_blank`}>
                <img
                  className={`${movieInfoStyle.logo}  ${
                    movie.networks[0].name === "Netflix" ||
                    movie.networks[0].name === "The CW"
                      ? movieInfoStyle.non_filter
                      : ""
                  }`}
                  src={`${ImagePaths.w500}${movie.networks[0].logo_path}`}
                  alt=""
                ></img>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={`${movieInfoStyle.plot_wrapper}`}>
          <p className={movieInfoStyle.plot}> {movie.overview}</p>
        </div>

        <div className={movieInfoStyle.cast_wrapper}>
          {castMembersArray.map((list) => (
            <Cast castMember={list} />
          ))}
        </div>

        <div className={movieInfoStyle.recommended}>
          {recommended.total_results > 0 && (
            <Recommended
              movies={recommended.results}
              title="Recommended"
              id={1}
              type="tv"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.req.cookies.id;
  var castMembersArray = [];

  try {
    const fetchData = await axios.get(
      `https://combeecreations.com/emdbapi/public/api/user/${id}/movie/${context.params.id}`
    );

    const countNumber = await fetchData.data;

    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${context.params.id}?api_key=0f2af5a67e7fbe4db3bc573d65f3724b`
    );
    const movie = await res.json();

    const res2 = await fetch(
      `https://api.themoviedb.org/3/tv/${context.params.id}/videos?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-U`
    );
    const trailer = await res2.json();

    const res3 = await fetch(
      `https://api.themoviedb.org/3/tv/${context.params.id}/recommendations?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&with_original_language=en&language=en-US&page=1`
    );
    const recommended = await res3.json();

    const res4 = await fetch(
      `https://api.themoviedb.org/3/tv/${context.params.id}/credits?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-US`
    );
    const cast = await res4.json();

    if (cast.cast.length > 6) {
      for (let i = 0; i < 6; i++) {
        castMembersArray[i] = cast.cast[i];
      }
    } else if (cast.cast.length > 1 && cast.cast.length <= 6) {
      cast.cast.map((item, i) => {
        castMembersArray[i] = item;
      });
    } else if (cast.cast.length == 1) {
      castMembersArray.push(cast.cast[0]);
    }

    return {
      props: { countNumber, movie, trailer, recommended, castMembersArray },
    };
  } catch (error) {
    console.log(error);
  }
};

export default TvInfo;
