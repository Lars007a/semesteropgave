import Section from "../section/section.jsx";
import styles from "./clubbanner.module.css";
import { Link } from "react-router-dom";

export default function clubbanner() {

/* Banneret i bunden hvor man kan blive medlem af kundeklubben. */
    return (
        <>
        <Section backgroundColor={"#d7e6ed"}>
           <div className={styles.clubBoxcontent}>
                <p>Kunne du også tænke dig, at blive medlem af vores</p>
                <h2>Kundeklub?</h2>
                <Link to={"/club"}><button>Bliv medlem nu!</button></Link>
           </div>
        </Section>
        </>
    )


}