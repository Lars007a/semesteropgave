import { useState } from "react";
import styles from "./customerClubForm.module.css";
import { useRef } from "react";
import Section from "../section/section.jsx";
import { Link } from "react-router-dom";
import Container from "../container/container.jsx";
import CustomerClubPopup from "../customerClubPopup/customerClubPopup.jsx";
import customerClubPopup from "../customerClubPopup/customerClubPopup.jsx";

export default function customerClubForm() {
  //Generelt til formen.
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [whoValue, setWhoVal] = useState("");
  let nameField = useRef();
  let emailField = useRef();
  let whoField = useRef();

  //Beskeder for fejl.
  const [showMsg, setShowMsg] = useState(false);
  const [msgBoxMessage, setMsgBoxMessage] = useState("");

  //Besked for success.
  const [showPopup, setShowPopup] = useState(false);

  const updateForm = () => {
    setEmailVal(emailField.current.value);
    setNameVal(nameField.current.value);
    setWhoVal(whoField.current.value);
  };

  const submitForm = (event) => {
    event.preventDefault();

    console.log(nameVal.length, emailVal.length, whoValue.length);

    const sendReq = async () => {
      if (nameVal.length < 2 || emailVal.length < 2 || whoValue.length < 2) {
        setMsgBoxMessage("Felterne skal udfyldes med minst 2 tegn...");
        setShowMsg(true);
        return;
      }

      try {
        let resp = await fetch("https://legekrogen.webmcdm.dk/subscribe", {
          method: "POST",
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            message: whoValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(resp);
        let jsonResponse = await resp.json();
        console.log(jsonResponse);

        if (!jsonResponse.created) {
          throw new Error("Fejl. Bruger ikke lavet. Prøv igen.");
        }

        if (!resp.ok) {
          throw new Error("Fejl. Respons ikke ok. Prøv igen.");
        }

        //Ingen problemer.
        setShowPopup(true);
      } catch (error) {
        console.log(error.message);
        setMsgBoxMessage(error.message);
        setShowMsg(true);
        return;
      }
    };

    sendReq();
  };

  return (
    <Section backgroundColor={"white"}>
      {showMsg ? (
        <div className={styles.msgBox}>
          <p>{msgBoxMessage}</p>
        </div>
      ) : (
        ""
      )}
      <div className={styles.formContainer}>
        ;
        <form onSubmit={submitForm} className={styles.form}>
          <input
            type="text"
            placeholder="Fulde navn...."
            onChange={updateForm}
            value={nameVal}
            ref={nameField}
          />
          <input
            type="email"
            placeholder="Email..."
            onChange={updateForm}
            value={emailVal}
            ref={emailField}
          />
          <textarea
            type="text"
            placeholder="Hvem køber du egentlig til?"
            onChange={updateForm}
            value={whoValue}
            ref={whoField}
          />
          <input type="submit" value="Bliv medlem nu!" />
        </form>
      </div>
      {showPopup ? <CustomerClubPopup name={nameVal} /> : ""}
    </Section>
  );
}
