import React from "react";
import Card from "../ui/Card";

import styles from "./Contact.module.css";
import ContactItem from "./ContactItem";

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles["heading"]}>
        <h6>Contacts</h6>
        <div className={styles["request-count"]}>100</div>
      </div>

      <Card className={styles.card}>
        <ContactItem />
        <ContactItem />
      </Card>
    </section>
  );
}
