import React, { useContext, useEffect, useRef, useState } from "react";
import { API_user } from "../../config";
import userContext from "../../context/userCtx";

import Button from "../ui/Button";

import styles from "./BioEdit.module.css";

export default function BioEdit(props) {
  const context = useContext(userContext);
  const buttonRef = useRef();

  const [remain, setRemain] = useState(100);
  const [bio, setBio] = useState(props.bio);
  const [isSubmit, setIsSubmit] = useState(false);

  const textChangeHandler = (e) => {
    setRemain(100 - e.target.value.length);
    setBio(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  // disable button
  useEffect(() => {
    if (props.bio === bio) {
      buttonRef.current.disabled = true;
    } else {
      buttonRef.current.disabled = false;
    }
  }, [bio]);

  // save bio

  useEffect(async () => {
    const updateBio = async () => {
      const formData = new FormData();
      formData.append("_id", context.id);
      formData.append("bio", bio);

      try {
        const response = await fetch(API_user, {
          method: "PATCH",
          body: formData,
        });
        const updatedUser = await response.json();

        return updatedUser;
      } catch (error) {
        console.log(error);
      }
    };

    if (isSubmit) {
      const updatedUser = await updateBio();

      props.setUser(updatedUser);
      props.onClose();

      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <div className={styles["bio-edit"]}>
      <form onSubmit={submitFormHandler}>
        <textarea
          placeholder="Mô tả về bạn"
          onChange={textChangeHandler}
          maxLength={100}
          value={bio}
        />
        <div className={styles["bio-edit__remain"]}>
          <span>Còn {remain} kí tự</span>
        </div>
        <div className={styles["bio-edit__action"]}>
          <Button type="button" onClick={props.onClose}>
            Huỷ
          </Button>
          <Button
            type="submit"
            ref={buttonRef}
            className={styles["button--blue"]}
          >
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
}
