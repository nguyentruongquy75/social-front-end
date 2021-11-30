import React from "react";

import styles from "./Main.module.css";
import Wrapper from "./Wrapper";

export default function Main(props) {
  return (
    <main className={styles.main}>
      <Wrapper className={styles["main__container"]}>{props.children}</Wrapper>
    </main>
  );
}
