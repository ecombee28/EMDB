import React, { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectId } from "../slices/userSlice";
import { selectUserName } from "../slices/userSlice";
import { loginUser } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { setMovies } from "../slices/userSlice";
import Username from "../components/UserName";

const Nav = () => {
  const [show, setShow] = useState(false);
  const id = useSelector(selectId);
  const username = useSelector(selectUserName);

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
    const localMovies = JSON.parse(localStorage.getItem("movies"));

    const restoreData = async () => {
      if (localId) {
        dispatch(setUserId(localId));
        dispatch(loginUser(localUserName));

        if (localMovies) {
          localMovies.map((m) => {
            dispatch(setMovies(m));
          });
        }
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

        <Link href="/movielist">
          <li className={navStyles.nav_links}>
            {<FontAwesomeIcon icon={faPlus} className={navStyles.icons} />}
            <p className={navStyles.nav_text}>Watch List</p>
          </li>
        </Link>

        {id ? (
          <Username id={id} username={username} />
        ) : (
          <Link href="/login">
            <li className={navStyles.nav_links}>
              <p className={navStyles.nav_text}>Sign In/Sign Up</p>
            </li>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Nav;
