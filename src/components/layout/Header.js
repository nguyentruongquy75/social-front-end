import React from "react";

import Logo from "../logo/Logo";
import Search from "../search/Search";
import HeaderGroup from "./HeaderGroup";
import UserControl from "../userControl/UserControl";
import Wrapper from "./Wrapper";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Wrapper className={styles["header__container"]}>
        <HeaderGroup className={styles["header__group"]}>
          <Logo />
          <Search />
        </HeaderGroup>
        <HeaderGroup className={styles["header__group"]}>
          <UserControl />
        </HeaderGroup>
      </Wrapper>
    </header>
  );
}
