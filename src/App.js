import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
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
                <Route path="/profile/*" element={<ProfilePage />} />
              </Routes>
            </Main>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
