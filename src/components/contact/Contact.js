import React, { useContext, useEffect, useState } from "react";
import Card from "../ui/Card";

import userContext from "../../context/userCtx";
import { API_user } from "../../config";

import styles from "./Contact.module.css";
import ContactItem from "./ContactItem";
import socket from "../../socket";

export default function Contact() {
  const context = useContext(userContext);
  const [dataSocket, setDataSocket] = useState(null);
  const [contacts, setContacts] = useState([]);

  socket.on(`${context.id}contacts`, (data) => {
    setDataSocket(data);
  });

  useEffect(async () => {
    try {
      const response = await fetch(`${API_user}/${context.id}/contacts`);
      const contacts = await response.json();

      setContacts(contacts);
    } catch (error) {
      console.log(error);
    } finally {
      dataSocket && setDataSocket(null);
    }
  }, [dataSocket]);

  return (
    <section className={styles.contact}>
      <div className={styles["heading"]}>
        <h6>Contacts</h6>
      </div>

      {contacts.length > 0 && (
        <Card className={styles.card}>
          {contacts.slice(0, 20).map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
        </Card>
      )}
    </section>
  );
}
