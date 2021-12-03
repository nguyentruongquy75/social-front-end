import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInForm from "../components/auth/SignInForm";

import LogoText from "../assets/img/meta-text.svg";

import styles from "./AuthPage.module.css";
import Card from "../components/ui/Card";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  return (
    <div className={styles.auth}>
      <div className={styles.logo}>
        <object type="image/svg+xml" data={LogoText} className="logo">
          Logo
        </object>
      </div>
      <Card className={styles.card}>
        <Routes>
          <Route path="login" element={<SignInForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Routes>
      </Card>
    </div>
  );
}
