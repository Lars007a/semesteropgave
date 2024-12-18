import styles from "./customerClubPopup.module.css";
import Container from "../container/container.jsx";
import {Link} from "react-router-dom";
import popupImg from "../../assets/heros/medlem.jpg";

/* Popup der vises hvis success når bliver medlem af kundeklubben. */
export default function customerClubPopup({name}) {
    return (<>
     <div className={styles.popup} style= {{backgroundImage: `linear-gradient(rgba(136,112,152, 0.8), rgba(136,112,152, 0.9)), url("${popupImg}")`}}>
           <Container>
            <div className={styles.popupcontent}>
            <h2>Tak <span>{name}</span>!</h2>
            <p>Vi er så glade for at du ville være <br/>en del af vores kundeklub.</p>
            <p>Tag et kig i din indbakke.<br/> Vi har givet dig fri fragt på din næste ordre!</p>
            <Link to={"/"}><button>Til forsiden</button></Link>
            </div>
           </Container>
        </div>
    </>);
}