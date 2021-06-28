import React from "react";
import {
  faHome,
  faSearch,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import style from "../styles/Bottom.module.css";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";
import { selectUserName } from "../slices/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logOutUser } from "../slices/userSlice";

const BottomNav = () => {
  const id = useSelector(selectId);
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);

  const logout = () => {
    dispatch(logOutUser());
    router.push("/");
  };

  return (
    <div>
      <nav className={style.nav}>
        <Link href="/">
          <div className={style.nav_link_container}>
            {<FontAwesomeIcon icon={faHome} className={style.icons} />}
            <li className={style.nav_links}>Home</li>
          </div>
        </Link>
        <Link href="/search">
          <div className={style.nav_link_container}>
            {<FontAwesomeIcon icon={faSearch} className={style.icons} />}
            <li className={style.nav_links}>Search</li>
          </div>
        </Link>
        <Link href="/watchlist">
          <div className={style.nav_link_container}>
            {<FontAwesomeIcon icon={faPlus} className={style.icons} />}
            <li className={style.nav_links}>Watch List</li>
          </div>
        </Link>
        <div className={style.nav_link_container}>
          {
            <FontAwesomeIcon
              icon={faUser}
              className={style.icons}
              style={id && { color: "#ff0000" }}
            />
          }
          {id ? (
            <li className={style.nav_links} onClick={logout}>
              {username}
            </li>
          ) : (
            <Link href="/login">
              <li className={style.nav_links}>Sign In</li>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
