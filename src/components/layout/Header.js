import React, { useEffect } from "react";

import Logo from "../logo/Logo";
import Search from "../search/Search";
import HeaderGroup from "./HeaderGroup";
import UserControl from "../userControl/UserControl";
import Wrapper from "./Wrapper";

import styles from "./Header.module.css";
import TabletNav from "./TabletNav";
import MobileNav from "./MobileNav";
import Setting from "../userControl/Setting";
import { Link } from "react-router-dom";

let lastScrollY = 0;

export default function Header() {
  const handleScroll = (e) => {
    if (lastScrollY - window.pageYOffset > 0) {
      const headerTop = document.querySelector(
        `.${styles["header__top-mobile"]}`
      );

      headerTop.style.height = null;
      headerTop.style.padding = null;
    } else {
      const headerTop = document.querySelector(
        `.${styles["header__top-mobile"]}`
      );

      // headerTop.style.display = "none";
      headerTop.style.height = 0;
      headerTop.style.padding = 0;
      headerTop.style.overflow = "hidden";
    }
    lastScrollY = window.pageYOffset;
  };

  useEffect(() => {
    if (window.innerWidth <= 500) {
      document.addEventListener("scroll", handleScroll);

      return () => document.removeEventListener("scroll", handleScroll);
    }
  });

  return (
    <header className={styles.header}>
      <Wrapper className={styles["header__container"]}>
        <HeaderGroup
          className={`${styles["header__group"]} ${styles["header__top-mobile"]}`}
        >
          <Logo />
          <Search className={styles["search__mobile"]} />
          <div className={styles["user__mobile"]}>
            <Link to="/profile">
              <i className="far fa-user-circle"></i>
            </Link>
          </div>
          <div className={styles["setting__mobile"]}>
            <Setting />
          </div>
        </HeaderGroup>
        <HeaderGroup className={styles["nav__mobile"]}>
          <MobileNav />
        </HeaderGroup>
        <HeaderGroup
          className={`${styles["header__group"]} ${styles["nav__tablet"]}`}
        >
          <TabletNav />
        </HeaderGroup>
        <HeaderGroup
          className={`${styles["header__group"]} ${styles["hide__mobile"]}`}
        >
          <UserControl />
        </HeaderGroup>
      </Wrapper>
    </header>
  );
}
