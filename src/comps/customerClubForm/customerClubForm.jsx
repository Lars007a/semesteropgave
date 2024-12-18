import { useState } from "react";
import styles from "./customerClubForm.module.css";
import { useRef } from "react";
import Section from "../section/section.jsx";
import CustomerClubPopup from "../customerClubPopup/customerClubPopup.jsx";

/* Formen til at blive medlem af kundeklubben. */
export default function customerClubForm() {

  //Generelt til formen.
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [whoValue, setWhoVal] = useState("");
  let nameField = useRef();
  let emailField = useRef();
  let whoField = useRef();

  //Beskeder for fejl.
  const [showMsg, setShowMsg] = useState(false); //Skal fejl besked vises?
  const [msgBoxMessage, setMsgBoxMessage] = useState(""); //Hvad skal fejl beskeden være?

  //Besked for success.
  const [showPopup, setShowPopup] = useState(false); /* Om success popupen skal vises. (Det er et andet komponent.) */

  /* Funktion til at opdater form state vars. */
  const updateForm = () => {
    setEmailVal(emailField.current.value);
    setNameVal(nameField.current.value);
    setWhoVal(whoField.current.value);
  };

  /* Form til submit. */
  const submitForm = (event) => {
    event.preventDefault(); /* Selv definere hvad der skal ske. */

    /* Tjek om info er puttet ind, hvis ikke, return med fejl besked... */
    if (nameVal.length < 2 || emailVal.length < 2 || whoValue.length < 2) {
      setMsgBoxMessage("Felterne skal udfyldes med minst 2 tegn...");
      setShowMsg(true);
      return;
    }

    /* Funktion for at poste dataen. */
    const sendReq = async () => {
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

        /* .created er noget der kommer med, hvis success. */
        if (!jsonResponse.created) {
          throw new Error("Fejl. Bruger ikke lavet. Prøv igen.");
        }

        if (!resp.ok) {
          throw new Error("Fejl. Respons ikke ok. Prøv igen.");
        }

        //Ingen problemer.
        setShowPopup(true); //Vis success popup.
      } catch (error) {
        //Hvis fejl, hvis fejl besked med fejlbeskeden vi satte.
        console.log(error.message);
        setMsgBoxMessage(error.message);
        setShowMsg(true);
        return;
      }
    };

    //Kør post funktionen der lige er defineret.
    sendReq();
  };

  return (
    <Section backgroundColor={"white"}>
      {/* Fejl beskeds boks */}
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
      {/* Popup til at vise, hvis der er success. */}
      {showPopup ? <CustomerClubPopup name={nameVal} /> : ""}
    </Section>
  );
}
