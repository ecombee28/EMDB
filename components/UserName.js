import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import { setAvatarId } from "../slices/userSlice";
import { setMovies } from "../slices/userSlice";
import { logOutUser } from "../slices/userSlice";
import style from "../styles/Username.module.css";

const UserName = ({ id, username }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOutUser());
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
