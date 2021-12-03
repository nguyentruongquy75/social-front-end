import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_login } from "../../config";

import FormInput from "./FormInput";

import styles from "./SignInForm.module.css";

export default function SignInForm() {
  const [isFormValid, setIsFormvalid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  function validateUsername(username) {
    return username.trim() !== "";
  }

  function validatePassword(password) {
    return password.trim().length > 6;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setIsFormvalid(validateUsername(username) && validatePassword(password));
  };

  useEffect(async () => {
    if (isFormValid) {
      try {
        const response = await fetch(API_login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
          }),
        });
        if (response.ok) {
          const account = await response.json();
          localStorage.setItem("user", account.user);
          navigate("/", { replace: true });
        } else {
          const message = await response.json();

          setMessage(message.message);
          setIsError(true);
        }

        setIsFormvalid(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isFormValid]);

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <FormInput
          onValidate={validateUsername}
          className={styles["form__input"]}
          placeholder="Username"
          message={message || "Username cannot blank"}
          name="username"
          setValue={setUsername}
          isError={isError}
        />
        <FormInput
          className={styles["form__input"]}
          name="password"
          placeholder="Password"
          type="password"
          onValidate={validatePassword}
          message="Password length must be greater than 6 character"
          setValue={setPassword}
        />

        <div className={styles.submit}>
          <button type="submit">Login</button>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.register}>
          <Link to="/auth/register">
            <button type="button">Create a profile</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
