import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PeoplePage from "./pages/PeoplePage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

import { useContext } from "react";
import userContext from "./context/userCtx";

function App() {
  const context = useContext(userContext);
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthPage />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Header />
            <Main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/profile/*"
                  element={<ProfilePage userId={context.id} />}
                />
                <Route path="/people/*" element={<PeoplePage />} />
                <Route path="/:userId/profile/*" element={<ProfilePage />} />
              </Routes>
            </Main>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
