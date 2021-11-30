import React from "react";
import Button from "../ui/Button";

import styles from "./SearchInput.module.css";

export default function SearchInput() {
  return (
    <div className={styles["search-input"]}>
      <input type="text" placeholder="Search" />
      <Button>
        <i className="fas fa-search"></i>
      </Button>
    </div>
  );
}
