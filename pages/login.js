import React, { useState } from "react";
import style from "../styles/Login.module.css";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const login = () => {
  const [signUp, setSignUp] = useState(false);

  const changeModule = (model) => {
    model === "login" ? setSignUp(false) : setSignUp(true);
  };

  return (
    <div>
      <div className={style.main_container}>
        {!signUp ? (
          <Login changeView={changeModule} />
        ) : (
          <SignUp changeView={changeModule} />
        )}
      </div>
    </div>
  );
};

export default login;
