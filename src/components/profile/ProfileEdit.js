import React, { useContext, useEffect, useRef, useState } from "react";
import { API_user } from "../../config";
import userContext from "../../context/userCtx";
import Overlay from "../overlay/Overlay";
import Button from "../ui/Button";
import Card from "../ui/Card";
import BioEdit from "./BioEdit";

import styles from "./ProfileEdit.module.css";
import ProfileEditIntroduction from "./ProfileEditIntroduction";

const ProfileEdit = React.forwardRef((props, ref) => {
  const context = useContext(userContext);
  const [isDisplayIntroductionModal, setIsDisplayIntroductionModal] =
    useState(false);
  const [isEditBio, setIsEditBio] = useState(false);
  const information = props.user;
  const [avatar, setAvatar] = useState(information.avatar);
  const [cover, setCover] = useState(information.cover);

  const displayIntroductionModal = () => setIsDisplayIntroductionModal(true);
  const hideIntroductionModal = () => setIsDisplayIntroductionModal(false);
  const displayEditBio = () => setIsEditBio(true);
  const hideEditBio = () => setIsEditBio(false);

  const avatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const coverChange = (e) => {
    setCover(e.target.files[0]);
  };

  useEffect(() => {
    if (isDisplayIntroductionModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
    }
  }, [isDisplayIntroductionModal]);

  // Cover image
  const coverRef = useRef();
  useEffect(() => {
    coverRef.current.style.background = information.cover;
  }, [information.cover]);

  // update avatar, cover

  useEffect(async () => {
    const updateUser = async () => {
      const formData = new FormData();
      formData.append("_id", context.id);
      information.avatar !== avatar && formData.append("avatar", avatar);
      information.cover !== cover && formData.append("cover", cover);

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

    if (information.avatar !== avatar || information.cover !== cover) {
      const updatedUser = await updateUser();
      props.setUser(updatedUser);

      information.avatar !== avatar && context.setAvatar(updatedUser.avatar);
    }
  }, [avatar, cover]);

  return (
    <>
      <Card ref={ref} className={styles.modal}>
        <div className={styles["modal__top"]}>
          <h4 className={styles["modal__heading"]}>Ch???nh s???a trang c?? nh??n</h4>
          <div onClick={props.onClose} className={styles["modal__close"]}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className={styles["modal__body"]}>
          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>???nh ?????i di???n</h4>
              <label className={styles["section__action"]} htmlFor="avatar">
                Th??m
              </label>
              <input
                onChange={avatarChange}
                accept="image/*"
                type="file"
                id="avatar"
              />
            </div>
            <div
              className={`${styles["section__body"]} ${styles["section__body--center"]}`}
            >
              <div className={styles.avatar}>
                <img src={information.avatar} alt="avatar" />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>???nh b??a</h4>
              <label className={styles["section__action"]} htmlFor="cover">
                Th??m
              </label>
              <input accept="image/*" type="file" id="cover" />
            </div>
            <div
              className={`${styles["section__body"]} ${styles["section__body--center"]}`}
            >
              <div ref={coverRef} className={styles.cover}>
                <div className={styles["cover__image"]}>
                  <img src={cover} alt={context.fullName} />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>Ti???u s???</h4>
              <span
                onClick={displayEditBio}
                className={styles["section__action"]}
              >
                Ch???nh s???a
              </span>
            </div>
            <div
              className={`${styles["section__body"]} ${styles["section__body--center"]}`}
            >
              {!isEditBio && <p className={styles.bio}>{information.bio}</p>}
              {isEditBio && (
                <BioEdit
                  bio={information.bio}
                  setUser={props.setUser}
                  onClose={hideEditBio}
                />
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>
                Ch???nh s???a ph???n gi???i thi???u
              </h4>
              <span
                onClick={displayIntroductionModal}
                className={styles["section__action"]}
              >
                Ch???nh s???a
              </span>
            </div>
            <div
              className={`${styles["section__body"]} ${styles["section__body--center"]}`}
            ></div>
          </section>
        </div>
      </Card>
      {isDisplayIntroductionModal && (
        <>
          <Overlay
            onClick={hideIntroductionModal}
            className={styles["overlay"]}
          />
          <ProfileEditIntroduction
            information={information}
            onClose={hideIntroductionModal}
            setUser={props.setUser}
          />
        </>
      )}
    </>
  );
});

export default ProfileEdit;
