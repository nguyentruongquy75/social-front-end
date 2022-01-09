import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

import DateSelection from "../dateSelection/DateSelection";
import SexSelection from "../sexSelection/SexSelection";

import FormInput from "./FormInput";
import SmallButton from "../ui/SmallButton";

import styles from "./RegisterForm.module.css";

import { API_register } from "../../config";
import Spinner from "../spinner/Spinner";

let isInitial = true;

export default function RegisterForm() {
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState({
    firstName: true,
    lastName: true,
    username: true,
    password: true,
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    birthday: Date.now(),
    sex: "male",
  });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("initial");

  const validatePassword = (password) => password.trim().length > 6;
  const validateBlank = (value) => value.trim() !== "";
  const blankMessage = "This field cannot blank";

  const setFirstName = (firstName) =>
    setUser((user) => ({ ...user, firstName }));
  const setLastName = (lastName) => setUser((user) => ({ ...user, lastName }));
  const setUsername = (username) => setUser((user) => ({ ...user, username }));
  const setPassword = (password) => setUser((user) => ({ ...user, password }));
  const setBirthday = (birthday) => setUser((user) => ({ ...user, birthday }));
  const setSex = (sex) => setUser((user) => ({ ...user, sex }));

  const submitHandler = (e) => {
    e.preventDefault();

    setIsValid({
      firstName: validateBlank(user.firstName),
      lastName: validateBlank(user.lastName),
      username: validateBlank(user.username),
      password: validatePassword(user.password),
    });
    isInitial = false;
  };

  useEffect(async () => {
    if (
      !isInitial &&
      isValid.firstName &&
      isValid.lastName &&
      isValid.username &&
      isValid.password
    ) {
      try {
        setStatus("loading");
        const response = await fetch(API_register, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          const user = await response.json();

          navigate("/auth/login", { replace: true });
        } else {
          const error = await response.json();
          console.log(error);
          setMessage(`${error.keyValue.username} already used`);
          setIsValid((prev) => ({ ...prev, username: false }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("finished");
      }
    }
  }, [isValid]);

  return (
    <>
      <Helmet>
        <title>Đăng kí</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles["form__top"]}>
          <h4>Tạo tài khoản mới</h4>
          <span>Nhanh chóng và dễ dàng</span>
        </div>

        <form onSubmit={submitHandler}>
          <div className={styles["form__input-name"]}>
            <FormInput
              className={styles["form__input"]}
              type="text"
              placeholder="Họ"
              name="lastName"
              onValidate={validateBlank}
              message={blankMessage}
              setValue={setLastName}
              isError={!isValid.lastName}
            />
            <FormInput
              className={styles["form__input"]}
              type="text"
              placeholder="Tên"
              name="firstName"
              onValidate={validateBlank}
              message={blankMessage}
              setValue={setFirstName}
              isError={!isValid.firstName}
            />
          </div>
          <FormInput
            className={styles["form__input"]}
            type="text"
            placeholder="Username"
            name="username"
            onValidate={validateBlank}
            message={blankMessage}
            setValue={setUsername}
            isError={!isValid.username}
            message={message || blankMessage}
          />
          <FormInput
            className={styles["form__input"]}
            type="password"
            placeholder="Password"
            name="password"
            onValidate={validatePassword}
            message="Password length must greater than 6"
            setValue={setPassword}
            isError={!isValid.password}
          />

          <DateSelection setDate={setBirthday} />

          <SexSelection setValue={setSex} />

          <div className={styles["register__button"]}>
            <SmallButton type="submit">Đăng ký</SmallButton>
          </div>

          <div className={styles["signin-action"]}>
            <Link to="/auth/login">Bạn đã có tài khoản ?</Link>
          </div>
        </form>

        {status === "loading" && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
