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
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  return (
    <header className={`${navStyles.header} ${show && navStyles.header_black}`}>
      <div className={navStyles.left_half}>
        <div className={navStyles.logo_wrapper}>
          <Link href="/">
            <p className={navStyles.logo}>EMDB</p>
          </Link>
        </div>
      </div>
      <div className={navStyles.right_half}>
        <nav className={navStyles.header_nav}>
          <div className={navStyles.nav_links}>
            {<FontAwesomeIcon icon={faHome} className={navStyles.icons} />}
            <Link href="/">
              <p className={navStyles.nav_links_text}>Home</p>
            </Link>
          </div>
          <div className={navStyles.nav_links}>
            {<FontAwesomeIcon icon={faSearch} className={navStyles.icons} />}
            <Link href="/search">
              <p className={navStyles.nav_links_text}>Search</p>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
