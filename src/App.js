import "./App.css";
import Contact from "./components/contact/Contact";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Nav from "./components/layout/Nav";
import Post from "./components/post/Post";
import PostCreate from "./components/post/PostCreate";
import ProfileCard from "./components/profileCard/ProfileCard";
import Request from "./components/request/Request";

function App() {
  return (
    <>
      <Header />
      <Main>
        <aside>
          <ProfileCard />
          <Nav />
        </aside>

        <div>
          <PostCreate />
          <Post />
        </div>

        <aside>
          <Request />
          <Contact />
        </aside>
      </Main>
    </>
  );
}

export default App;
