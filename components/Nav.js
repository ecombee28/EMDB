import React, { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Username from "../components/UserName";
import Cookie from "js-cookie";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setId(Cookie.get("id"));
    setUsername(Cookie.get("username"));
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  return (
    <>
      <p className={navStyles.mobile_logo}>EMDB</p>
      <header
        className={`${navStyles.header} ${show && navStyles.header_black}`}
      >
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

          <Link href="/watchlist">
            <li className={navStyles.nav_links}>
              {<FontAwesomeIcon icon={faPlus} className={navStyles.icons} />}
              <p className={navStyles.nav_text}>Watch List</p>
            </li>
          </Link>

          {id ? (
            <Username username={username} />
          ) : (
            <Link href="/login">
              <li className={navStyles.nav_links}>
                <p className={navStyles.nav_text}>Sign In/Sign Up</p>
              </li>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
