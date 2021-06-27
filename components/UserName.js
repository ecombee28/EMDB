import React from "react";
import style from "../styles/Username.module.css";

const UserName = ({ id, username }) => {
  return (
    <div>
      <p className={style.p}>{username}</p>
    </div>
  );
};

export default UserName;
