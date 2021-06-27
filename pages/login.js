import React, { useEffect, useState } from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import { setAvatarId } from "../slices/userSlice";
import { setMovies } from "../slices/userSlice";
import MovieList from "../components/MovieList";

const login = () => {
  // const [userInfo, setUserInfo] = useState({
  //   id: null,
  //   username: null,
  //   avatarImg: null,
  // });
  const [userNameInput, setUserNameInput] = useState("");
  const [password, setPassword] = useState("");
  const [userInput, setUserInput] = useState(true);
  const [passInput, setPassInput] = useState(true);
  const [formValid, setFormValid] = useState(false);
  // const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  // const [movies, setMovies] = useState({});

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
    if (userNameInput.length > 0) {
      setUserInput(true);
      console.log("user passed " + formValid);
    } else if (userNameInput.length == 0) {
      setUserInput(false);
      setUserError("Enter in a valid username");
      console.log("user false " + formValid);
    }

    if (password.length > 0) {
      setPassInput(true);
      console.log("pass true " + formValid);
    } else if (password.length == 0) {
      setPassInput(false);
      setPassError("Enter in a valid password");
      console.log("pass false " + formValid);
    }
  };

  const signIn = () => {
    handleValidation();

    if (userInput && passInput) {
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
              });
          } else {
            localStorage.setItem(
              "error_message",
              JSON.stringify(response.data.error_message)
            );
            setError(!error);

            setTimeout(() => {
              setUserNameInput("");
              setPassword("");
            }, 3000);
          }
        });
    }

    const addUser = (id, username, avatar, movies) => {
      dispatch(setUserId(id));
      dispatch(loginUser(username));
      dispatch(setAvatarId(avatar));

      movies.map((m) => {
        dispatch(setMovies(m));
      });
    };
  };

  return (
    <div>
      <div className={style.main_container}> </div>
      <div className={style.login_container}>
        <div className={style.login_wrapper}>
          <h2 className={style.title}>Sign In</h2>
          <div className={style.input_wrapper}>
            <span>
              <label>Username</label>
              <label className={style.error}>
                {!userInput ? userError : ""}
              </label>
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
          <div className={style.input_wrapper}>
            <span>
              <label>Password</label>
              <label className={style.error}>
                {!passInput ? passError : null}
              </label>
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
          <button className={style.submit_btn} onClick={signIn}>
            Sign In
          </button>
          <div className={style.signup_wrapper}>
            <p className={style.signup_txt}>
              New to EMDB?
              <a href="#" className={style.signup}>
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
