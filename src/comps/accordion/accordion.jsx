import { useState } from "react";
import styles from "./accordion.module.css";
import { IoMdArrowDropdown, IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

export default function accordion({obj}) {

    const [open, setOpen] = useState(false);


    const change = () => {
        open ? setOpen(false) : setOpen(true);
    }

    return <>

    <div className={`${styles.accordion} ${open ? `${styles.active}` : ""}`}>
    <div className={styles.top} onClick={change}>{obj.question} {open ? <IoMdArrowDropup className={styles.icon}/> : <IoMdArrowDropdown className={styles.icon}/>}</div>
        <div className={styles.panel}>
            <p>{obj.answer}</p>
        </div>

    </div>
    </>
}