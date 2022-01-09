import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import BigFriendCard from "../components/friend/BigFriendCard";
import Spinner from "../components/spinner/Spinner";
import { API_user } from "../config";
import userContext from "../context/userCtx";

import styles from "./PeoplePageFriends.module.css";
export default function PeoplePageFriends() {
  const context = useContext(userContext);
  const [status, setStatus] = useState("initial");
  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    try {
      setStatus("loading");
      const response = await fetch(`${API_user}/${context.id}/friends`);
      const friends = await response.json();

      setFriends(friends);
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("finished");
    }
  }, [context]);

  return (
    <>
      <Helmet>
        <title>Bạn bè</title>
      </Helmet>
      <div className={styles.container}>
        <h3 className={styles["friend__heading"]}>Bạn bè</h3>
        <div className={styles["friend__list"]}>
          {status === "loading" && (
            <div className={styles.loading}>
              <Spinner className={styles.spinner} />
            </div>
          )}

          {status === "finished" &&
            friends.map((friend) => (
              <BigFriendCard key={friend._id} friend={friend} />
            ))}
        </div>
      </div>
    </>
  );
}
