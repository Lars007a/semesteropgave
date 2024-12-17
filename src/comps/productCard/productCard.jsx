import styles from "./productCard.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import {useState} from "react";



export default function productCard({obj}) {

    const [cart, updateCart] = useLocalStorage("cart", []);

    const [btnText, setBtnText] = useState("KØB");

    const addToCart = (event) => {
        
        updateCart(cart.concat(obj._id));
        
        setBtnText("Tilføjet!");

         
        const timeoutid = setTimeout(() => {
            setBtnText("KØB");
        }, 1500);

        return () => clearTimeout(timeoutid); //cleanup funktion som køres.

    }

    return (
        <div className={styles.productCard}>
            <img src={obj?.image} alt={obj?.description} />
            <div className={styles.textContent}>
                <h4>{obj?.title}</h4>
                <p>{obj?.description}</p>
                <p className={styles.price}>{obj?.price} kr</p>
            </div>
            <button onClick={addToCart} className={styles.addBtn}>{btnText}</button>

        </div>
    );
}