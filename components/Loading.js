import React from "react";
import Loader from "react-loader-spinner";
import style from "../styles/Loading.module.css";
import Head from "next/head";

const Loading = () => {
  <Head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
  </Head>;
  return (
    <div className={style.main_wrapper}>
      <div className={style.spinner_wrapper}>
        <p className={style.title}>Loading</p>
        <Loader
          type="ThreeDots"
          color="#fff"
          height="70"
          width="70"
          className={style.loader}
        />
      </div>
    </div>
  );
};

export default Loading;
