import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import collectionStyle from "../../styles/Collections.module.css";
import Collection from "../../components/Collection";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCrt, setPageCrt] = useState(1);
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  const API_KEY = "0f2af5a67e7fbe4db3bc573d65f3724b";

  const goRight = () => {
    if (page + 1 === pageCrt) {
      setPage(page + 1);
      setRightEnd(true);
      setLeftEnd(false);
    } else {
      setPage(page + 1);
      setRightEnd(false);
      setLeftEnd(false);
    }
  };
  const goLeft = () => {
    if (page - 1 !== 1) {
      setPage(page - 1);
      setLeftEnd(false);
      setRightEnd(false);
    } else {
      setPage(1);
      setLeftEnd(true);
      setRightEnd(false);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=500&with_companies=2&with_original_language=en`
      );
      setMovies(res.data.results);
      setPageCrt(res.data.total_pages);
    };

    fetchMovies();
  }, [page]);

  const style = {
    backgroundImage: 'url("/disney_background.jpg")',
  };

  return (
    <div>
      <Head>
        <title>Disney Pixar Collection/EMDB</title>
        <meta name="keywords" content="web dev" />
      </Head>

      <div className={collectionStyle.video_wrapper}>
        <img src="/disney.jpg" className={collectionStyle.image} />
      </div>

      <div className={collectionStyle.wrapper}>
        <div className={collectionStyle.arrow_wrapper}>
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            className={`${collectionStyle.left_arrow} ${
              leftEnd ? collectionStyle.hide : collectionStyle.show
            }`}
            onClick={goLeft}
          />
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className={`${collectionStyle.right_arrow} ${
              rightEnd ? collectionStyle.hide : collectionStyle.show
            }`}
            onClick={goRight}
          />
        </div>
        <div className={collectionStyle.collection_wrapper}>
          {movies.map((m, i) => (
            <Collection movies={m} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
