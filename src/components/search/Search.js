import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_user } from "../../config";
import Spinner from "../spinner/Spinner";
import Button from "../ui/Button";

import styles from "./Search.module.css";

export default function Search(props) {
  const location = useLocation();
  const inputRef = useRef();
  const modalRef = useRef();
  const [isDisplaySearchModal, setIsDisplaySearchModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState("initial");

  const inputChangeHandler = (e) => setInputValue(e.target.value);
  const resultClickHandler = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  const displaySearchModal = () => setIsDisplaySearchModal(true);
  const hideSearchModal = () => setIsDisplaySearchModal(false);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      hideSearchModal();
    }
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

  // blur input when change link
  useEffect(() => {
    if (status !== "initial") {
      hideSearchModal();
    }
  }, [location.pathname]);

  // click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  // display search modal on mobile
  useEffect(() => {
    if (window.innerWidth <= 500) {
      isDisplaySearchModal && (document.body.style.overflow = "hidden");
      !isDisplaySearchModal && (document.body.style.overflow = null);
    }
  }, [isDisplaySearchModal]);

  return (
    <>
      <Button
        onClick={displaySearchModal}
        className={`${styles["search__button"]} ${
          props.className ? props.className : ""
        }`}
      >
        <i className="fas fa-search"></i>
      </Button>
      {isDisplaySearchModal && (
        <div ref={modalRef} className={styles["search__modal"]}>
          <div className={styles["search-input"]}>
            <Button onClick={hideSearchModal} className={styles.back}>
              <i className="fas fa-arrow-left"></i>
            </Button>
            <input
              onChange={inputChangeHandler}
              type="text"
              value={inputValue}
              placeholder="Search"
              ref={inputRef}
            />
          </div>
          <div
            onMouseDown={resultClickHandler}
            className={styles["search__result"]}
          >
            <h4>Kết quả tìm kiếm</h4>
            <ul>
              {status === "loading" && (
                <div className={styles.loading}>
                  <Spinner />
                </div>
              )}

              {status === "finished" && result.length === 0 && (
                <div className={styles["message"]}>Không có kết quả nào</div>
              )}

              {status === "finished" &&
                result.slice(0, 8).map((item) => (
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
      )}
    </>
  );
}
