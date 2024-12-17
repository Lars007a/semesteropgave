import Container from "../container/container.jsx";
import styles from "./topbanner.module.css";
import { FaTruck } from "react-icons/fa";


export default function topbanner() {


    return <>
    <div className={styles.banner}>
        <Container>
            <div className={styles.content}>
                <FaTruck className={styles.icon}/>
                <p>Fri fragt ved køb over 499,-</p>
            </div>
        </Container>
    </div>
    
    </>


}

