import React, { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
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
      </nav>
    </header>
  );
};

export default Nav;
