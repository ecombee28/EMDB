import React, { useEffect, useState } from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import Head from "next/head";
import Cookies from "js-cookie";

const login = ({ changeView }) => {
  const [userNameInput, setUserNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [userInput, setUserInput] = useState(true);
  const [passInput, setPassInput] = useState(false);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const updateName = (e) => {
    userNameInput.length <= 12
      ? setUserNameInput(e.target.value)
      : console.log("error");
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleValidation = () => {
    const uLen = userNameInput.length;
    const pLen = password.length;
    let userValPass = false;
    let passValPass = false;

    if (uLen > 3) {
      userValPass = true;
      setUserInput(true);
    } else {
      userValPass = false;
      setUserInput(false);
      if (uLen >= 0 && uLen <= 3) {
        setUserError("Username must be at least 4 characters");
      }
    }

    if (pLen > 5) {
      passValPass = true;
      setPassInput(true);
    } else {
      passValPass = false;
      setPassInput(false);
      if (pLen >= 0 && pLen <= 5) {
        setPassError("Password must be at least 5 characters");
      }
    }

    if (userValPass && passValPass) {
      signIn();
    }
  };

  const signIn = () => {
    setLoading(true);
    axios
      .post(`https://combeecreations.com/emdbapi/public/api/login`, {
        username: userNameInput,
        password: password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          axios
            .post(`https://combeecreations.com/emdbapi/public/api/movies`, {
              userId: response.data.id,
            })
            .then((res) => {
              addUser(
                response.data.id,
                response.data.user,
                response.data.avatar_img,
                res.data.Movies
              );

              router.push("/");
              setLoading(false);
            });
        } else {
          localStorage.setItem(
            "error_message",
            JSON.stringify(response.data.error_message)
          );
          setError(true);
          setPassword("");
          setLoading(false);

          setTimeout(() => {
            setError(false);
          }, 4000);
        }
      });

    const addUser = (id, username, avatar, movies) => {
      dispatch(setUserId(id));
      dispatch(loginUser(username));
      Cookies.set("movies", JSON.stringify(movies));

      // if (movies) {
      //   movies.map((m) => {
      //     dispatch(setMovies(m));
      //   });
      // }
    };
  };

  return (
    <div>
      <Head>
        <title>Sign In/EMDB</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <div className={style.main_container}> </div>

      <div className={style.login_container}>
        <div className={style.login_wrapper}>
          <h2 className={style.title}>Sign In</h2>
          <p className={style.error}>{!userInput ? userError : ""}</p>
          <div className={style.input_wrapper}>
            <span>
              <label>Username</label>
              <label className={style.error}></label>
            </span>
            <input
              type="text"
              name="username"
              value={userNameInput}
              required
              className={style.input}
              onChange={updateName}
            />
          </div>
          <p className={style.error}>{!passInput ? passError : null}</p>
          <div className={style.input_wrapper}>
            <span>
              <label>Password</label>
              <label className={style.error}></label>
            </span>
            <input
              type="password"
              name="username"
              required
              value={password}
              className={style.input}
              onChange={updatePassword}
            />
          </div>
          <label className={`${style.invalid_login}`}>
            {error ? JSON.parse(localStorage.getItem("error_message")) : null}
          </label>
          <button className={style.submit_btn} onClick={handleValidation}>
            Sign In
            {loading && (
              <img src="/loading.gif" alt="" className={style.loader} />
            )}
          </button>
          <div className={style.signup_wrapper}>
            <p className={style.signup_txt}>
              New to EMDB?
              <a
                href=""
                className={style.signup}
                onClick={() => changeView("signup")}
              >
                Sign Up Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
