import React from "react";
import Button from "../ui/Button";

import styles from "./Search.module.css";

export default function Search() {
  return (
    <div>
      <div className={styles["search-input"]}>
        <input type="text" placeholder="Search" />
        <Button>
          <i className="fas fa-search"></i>
        </Button>

        <div className={styles["search__result"]}>
          <ul>
            <li>
              <a className={styles["search__result-item"]} href="#">
                <div className={styles["search__result-item__img"]}>
                  <img
                    src="https://images.unsplash.com/photo-1638280987803-f533dba99cab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>

                <div className={styles["search__result-item__info"]}>
                  <h4>Anna Kim</h4>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
