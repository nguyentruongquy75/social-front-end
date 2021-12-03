import React, { useState, useRef, useEffect } from "react";

import styles from "./FormInput.module.css";

export default function FormInput(props) {
  const [isValid, setIsValid] = useState(true);
  const [isDisplayPassword, setIsDisplayPassword] = useState(false);
  const inputRef = useRef();

  function displayPassword() {
    setIsDisplayPassword(true);
  }

  function hidePassword() {
    setIsDisplayPassword(false);
  }

  function inputBlurHandler(e) {
    if (props.onValidate) {
      setIsValid(props.onValidate(inputRef.current.value));
    }

    props.setValue && props.setValue(inputRef.current.value);
  }

  useEffect(() => {
    if (props.type === "password") {
      isDisplayPassword
        ? (inputRef.current.type = "text")
        : (inputRef.current.type = "password");
    }
  }, [isDisplayPassword]);

  return (
    <div
      className={`${styles["form__input"]} ${
        props.className ? props.className : ""
      } ${!isValid || props.isError ? styles["error"] : ""} `}
    >
      <div className="relative">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type || "text"}
          placeholder={props.placeholder}
          onBlur={inputBlurHandler}
          name={props.name}
          id={props.name}
        />
        {!(props.type === "password") && (
          <div
            className={`${styles["form__input-icon"]} ${styles["form__input-icon--error"]}`}
          >
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        )}

        {props.type === "password" && !isDisplayPassword && (
          <div
            onClick={displayPassword}
            className={`${styles["form__input-icon"]} ${styles["form__input-icon--display"]}`}
          >
            <i className="far fa-eye"></i>
          </div>
        )}

        {props.type === "password" && isDisplayPassword && (
          <div
            onClick={hidePassword}
            className={`${styles["form__input-icon"]} ${styles["form__input-icon--hide"]}`}
          >
            <i className="fas fa-eye-slash"></i>
          </div>
        )}
      </div>
      {(!isValid || props.isError) && (
        <span className={styles.message}>{props.message}</span>
      )}
    </div>
  );
}
