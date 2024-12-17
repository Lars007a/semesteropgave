import { useState } from "react";
import styles from "./customerClubForm.module.css";
import { useRef } from "react";
import Section from "../section/section.jsx";
import { Link } from "react-router-dom";
import Container from "../container/container.jsx";
import CustomerClubPopup from "../customerClubPopup/customerClubPopup.jsx";
import customerClubPopup from "../customerClubPopup/customerClubPopup.jsx";

export default function customerClubForm() {

    const [nameVal, setNameVal] = useState("");
    const [emailVal, setEmailVal] = useState("");
    const [whoValue, setWhoVal] = useState("");
    
    let nameField = useRef();
    let emailField = useRef();
    let whoField = useRef();

    const [showPopup, setShowPopup] = useState(false);


    const updateForm = () => {
        setEmailVal(emailField.current.value);
        setNameVal(nameField.current.value);
        setWhoVal(whoField.current.value);
    };

    const submitForm = (event) => {
        event.preventDefault();
        console.log(emailVal, nameVal, whoValue);
        setShowPopup(true);
    };


    if(showPopup == true) {
    
    }


    return (
        <Section backgroundColor={"white"}>
            <div className={styles.formContainer}>
        <form onSubmit={submitForm} className={styles.form}>
            <input type="text" placeholder="Fulde navn...." onChange={updateForm} value={nameVal} ref={nameField}/>
            <input type="email" placeholder="Email..." onChange={updateForm} value={emailVal} ref={emailField}/>
            <textarea type="text" placeholder="Hvem køber du egentlig til?" onChange={updateForm} value={whoValue} ref={whoField} />
            <input type="submit" value="Bliv medlem nu!" />
        </form>
            </div>
            {showPopup ? <CustomerClubPopup name={nameVal}/> : ""}
        </Section>
    );

}