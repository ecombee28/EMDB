import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import style from "../styles/Username.module.css";
import Cookie from "js-cookie";

const UserName = ({ username }) => {
  const router = useRouter();

  const logout = () => {
    Cookie.remove("id");
    Cookie.remove("username");
    Cookie.remove("movies");
    router.push("/");
  };
  return (
    <div>
      <div className={style.container}>
        <p className={style.p}>{username}</p>
        <p className={style.logout} onClick={logout}>
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default UserName;
