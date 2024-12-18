import styles from "./productCard.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export default function productCard({ obj }) {
  const [cart, updateCart] = useLocalStorage("cart", []); /* local storage er det gemt i. */

  const [btnText, setBtnText] = useState("KØB"); /* teksten til knappen, fordi den ændre sig, når der bliver klikket på "køb" */

  //Tilføj produkt til ens kurv funktion.
  const addToCart = () => {
    updateCart(cart.concat(obj._id)); /* sætter localstorage til en ny array med det nye id tilføjet. Fordi concat returnere en ny array med det nye tilføjet. */

    setBtnText("Tilføjet!"); /* skift teksten så der er noget feedback. */

    //Vent lidt til med at skifte teksten tilbage.
    const timeoutid = setTimeout(() => {
      setBtnText("KØB");
    }, 1500);

    return () => clearTimeout(timeoutid); //cleanup funktion for timeout som køres.
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={obj?.image} alt={obj?.description} />
        {/* det den lille boks i hjørnet hvis der er en discount. */}
        {obj?.discountInPercent > 0 ? (
          <div className={styles.cornerBox}>{obj?.discountInPercent}%</div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.textContent}>
        <h4>{obj?.title}</h4>
        <p>{obj?.description}</p>
        <p className={styles.price}>{obj?.price} kr</p>
      </div>
      <button onClick={addToCart} className={styles.addBtn}>
        {btnText}
      </button>
    </div>
  );
}
