import React from "react";
import style from "../styles/LogoutConformation.module.css";

const LogoutConformation = () => {
  return (
    <div className={style.black_out}>
      <div className={style.logout_conformation}>
        <p className={style.text}>Are you sure that you want to logout?</p>
      </div>
    </div>
  );
};

export default LogoutConformation;
