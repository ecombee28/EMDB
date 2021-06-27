import React, { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";
import { selectUserName } from "../slices/userSlice";
import { selectAvatarId } from "../slices/userSlice";
import { loginUser } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import { setAvatarId } from "../slices/userSlice";
import AvatarImg from "./AvatarImg";
import { useDispatch } from "react-redux";
import { setMovies } from "../slices/userSlice";

const Nav = () => {
  const [show, setShow] = useState(false);
  const id = useSelector(selectId);
  const username = useSelector(selectUserName);
  const avatarId = useSelector(selectAvatarId);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  //This takes the state from local storage and populates the state in our redux
  useEffect(() => {
    const localId = localStorage.getItem("id");
    const localUserName = localStorage.getItem("username");
    const localAvatar = localStorage.getItem("avatar");
    const localMovies = JSON.parse(localStorage.getItem("movies"));
    console.log(localMovies);

    const restoreData = async () => {
      if (localId) {
        dispatch(setUserId(localId));
        dispatch(loginUser(localUserName));
        dispatch(setAvatarId(localAvatar));

        localMovies.map((m) => {
          dispatch(setMovies(m));
        });
      }
    };

    restoreData();
  }, []);

  return (
    <header className={`${navStyles.header} ${show && navStyles.header_black}`}>
      <nav className={navStyles.nav_list}>
        <Link href="/">
          <li className={navStyles.logo}>EMDB</li>
        </Link>

        <Link href="/">
          <li className={navStyles.nav_links}>
            {<FontAwesomeIcon icon={faHome} className={navStyles.icons} />}
            <p className={navStyles.nav_text}>Home</p>
          </li>
        </Link>

        <Link href="/search">
          <li className={navStyles.nav_links}>
            {<FontAwesomeIcon icon={faSearch} className={navStyles.icons} />}
            <p className={navStyles.nav_text}>Search</p>
          </li>
        </Link>

        <Link href="/login">
          <li className={navStyles.nav_links}>
            <p className={navStyles.nav_text}>
              {id ? <AvatarImg id={avatarId} /> : `Sign In/Sign Up`}
            </p>
          </li>
        </Link>
      </nav>
    </header>
  );
};

export default Nav;
