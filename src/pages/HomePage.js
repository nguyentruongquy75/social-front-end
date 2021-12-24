import React, { useContext, useEffect, useState } from "react";

import Contact from "../components/contact/Contact";
import Nav from "../components/layout/Nav";
import Wrapper from "../components/layout/Wrapper";
import PostList from "../components/post/PostList";
import PostCreate from "../components/post/PostCreate";
import ProfileCard from "../components/profileCard/ProfileCard";
import Request from "../components/request/Request";

import styles from "./HomePage.module.css";
import { API } from "../config";
import userContext from "../context/userCtx";
import socket from "../socket";

export default function HomePage() {
  const context = useContext(userContext);
  const [status, setStatus] = useState("initial");
  const [newsfeed, setNewsfeed] = useState([]);
  const [dataSocket, setDataSocket] = useState(null);
  const [hasChangeNewsfeed, setHasChangeNewfeed] = useState(false);

  const changeNewsfeed = () => setHasChangeNewfeed((hasChange) => !hasChange);

  socket.on(context.id + "newsfeed", (data) => {
    setDataSocket(data);
  });

  useEffect(() => {
    if (dataSocket) {
      changeNewsfeed();
    }
  }, [dataSocket]);

  useEffect(async () => {
    try {
      setStatus("loading");
      const response = await fetch(`${API}user/${context.id}/newsfeed`);
      const newsfeed = await response.json();
      setNewsfeed(newsfeed);
    } catch (err) {
      console.log(err);
    } finally {
      setStatus("finished");
      setDataSocket(null);
    }
  }, [context, hasChangeNewsfeed]);

  return (
    <Wrapper className={styles.wrapper}>
      <aside>
        <ProfileCard />
        <Nav />
      </aside>

      <div>
        <PostCreate onChange={changeNewsfeed} />
        <PostList status={status} list={newsfeed} />
      </div>

      <aside>
        <Request />
        <Contact />
      </aside>
    </Wrapper>
  );
}
