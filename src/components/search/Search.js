import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_user } from "../../config";
import Spinner from "../spinner/Spinner";
import Button from "../ui/Button";

import styles from "./Search.module.css";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState("initial");

  const inputChangeHandler = (e) => setInputValue(e.target.value);
  const resultClickHandler = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const id = setTimeout(async () => {
        try {
          setStatus("loading");
          const response = await fetch(`${API_user}?name=${inputValue}`);
          const result = await response.json();

          setResult(result);
        } catch (error) {
          console.log(error);
        } finally {
          setStatus("finished");
        }
      }, 500);

      return () => clearTimeout(id);
    }
  }, [inputValue]);

  return (
    <div>
      <div className={styles["search-input"]}>
        <input
          onChange={inputChangeHandler}
          type="text"
          value={inputValue}
          placeholder="Search"
        />
        <Button>
          <i className="fas fa-search"></i>
        </Button>

        <div
          onMouseDown={resultClickHandler}
          className={styles["search__result"]}
        >
          <ul>
            {status === "loading" && (
              <div className={styles.loading}>
                <Spinner />
              </div>
            )}

            {status === "finished" &&
              result.slice(0, 5).map((item) => (
                <li key={item._id}>
                  <Link
                    className={styles["search__result-item"]}
                    to={`/${item._id}/profile/`}
                  >
                    <div className={styles["search__result-item__img"]}>
                      <img src={item.avatar} alt={item.fullName} />
                    </div>

                    <div className={styles["search__result-item__info"]}>
                      <h4>{item.fullName}</h4>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
