import React, { useState, useEffect } from "react";
import {
  faHome,
  faSearch,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import style from "../styles/Bottom.module.css";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const BottomNav = () => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = Cookie.get("id");
    const user = Cookie.get("username");

    setId(id);
    setUsername(user);
  });

  const logout = () => {
    Cookie.remove("id");
    Cookie.remove("username");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div>
      <nav className={style.nav}>
        <Link href="/">
          <div className={style.nav_link_container}>
            <FontAwesomeIcon icon={faHome} className={style.icons} />
            <li className={style.nav_links}>Home</li>
          </div>
        </Link>
        <Link href="/search">
          <div className={style.nav_link_container}>
            <FontAwesomeIcon icon={faSearch} className={style.icons} />
            <li className={style.nav_links}>Search</li>
          </div>
        </Link>
        <Link href="/watchlist">
          <div className={style.nav_link_container}>
            <FontAwesomeIcon icon={faPlus} className={style.icons} />
            <li className={style.nav_links}>Watch List</li>
          </div>
        </Link>
        <div className={style.nav_link_container}>
          <FontAwesomeIcon icon={faUser} className={style.icons} />
          {id ? (
            <li className={style.username} onClick={logout}>
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
