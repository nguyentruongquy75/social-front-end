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
import Post from "../components/post/Post";

export default function HomePage() {
  const context = useContext(userContext);
  const [newsfeed, setNewsfeed] = useState([]);
  const [isNewsfeedChange, setIsNewsfeedChange] = useState(false);

  const changeNewsfeed = () => setIsNewsfeedChange((state) => !state);

  useEffect(async () => {
    try {
      const response = await fetch(`${API}user/${context.id}/newsfeed`);
      const newsfeed = await response.json();
      setNewsfeed(newsfeed);

      console.log(newsfeed);
    } catch (err) {
      console.log(err);
    }
  }, [context, isNewsfeedChange]);

  return (
    <Wrapper className={styles.wrapper}>
      <aside>
        <ProfileCard />
        <Nav />
      </aside>

      <div>
        <PostCreate onChange={changeNewsfeed} />
        <PostList list={newsfeed} />
      </div>

      <aside>
        <Request />
        <Contact />
      </aside>
    </Wrapper>
  );
}
