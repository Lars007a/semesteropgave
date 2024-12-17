import { useScript } from "@uidotdev/usehooks";
import Container from "../container/container.jsx";
import styles from "./login.module.css";
import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function loginScreen() {
    
    const [open, setOpen] = useState(false);

    let usernameElement = useRef();
    let passwordElement = useRef();

    const [token, setToken] = useLocalStorage("token", "");

    const [showMsg, setShowMsg] = useState(false);
    const [msgBoxMessage, setMsgBoxMessage] = useState("");


    const openCloseForm = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const sendData = async () => {

            try {
                let resp = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    body: JSON.stringify({username: usernameElement.current.value, password: passwordElement.current.value}),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
    
                if(!resp.ok) {
                    throw new Error("Fejl, request ikke ok!");
                }

                const jsonResp = await resp.json();

                if(resp.status == 200 && jsonResp.token != undefined && jsonResp.token != null) {
                    console.log("Godt!");
                    //Guider jeg læste på nettet gemte jwt-token i localstorage, så tænker det er fint her.
                    setToken(jsonResp.token);

                    setShowMsg(true);
                    setMsgBoxMessage("Success!");
                }else {
                    setShowMsg(true);
                    setMsgBoxMessage("Fejl! Prøv igen.");
                }

            }catch(error) {
                console.log(error.message);
                setShowMsg(true);
                setMsgBoxMessage("Fejl! Prøv igen.");
            }


        };

        sendData();
    };
        
    return (
        <>

        {!open ? <p onClick={openCloseForm}>Login</p> : 
        
        <>
            <div className={styles.loginScreen}>
                <Container>
                <RxCross1 className={styles.closeBtn} onClick={openCloseForm}/>
                    <div className={styles.content}>
                        <h1>Login</h1>
                        {showMsg ? <div className={styles.msgBox}><p>{msgBoxMessage}</p></div> : ""}
                        <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Brugernavn..." ref={usernameElement} />
                        <input type="password" placeholder="Adgangskode..." ref={passwordElement}/>
                        <input type="submit" value="Log ind" />
                        </form>
                    </div>
                </Container>
            </div>
        </>
        
        }


        </>
    );
}