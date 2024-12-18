import { RxCross1 } from "react-icons/rx";
import styles from "./cartListItem.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";

/* En enkelt "item" i kurven. */
export default function cartListItem({ obj }) {
  const [cart, setCart] = useLocalStorage("cart", []); /* siden produktet kan fjernes fra kurven, henter vi local storage ned. */

  const removeItem = (event) => {
    event.preventDefault();

    let newArray = [...cart]; //Kopier arrayen i localstorage.

    //Find indekset der skal fjernes.
    //Virker fordi den kun retunere et element, lige meget om der er flere der passer.
    let indexToRemove = cart.findIndex((element) => {
      if (element == obj._id) {
        return true;
      }

      return false;
    });

    newArray.splice(indexToRemove, 1); //Fjerner fra 0-indeks fra det indeks jeg har fundet og gør kun 1 fra den lokation og opefter. Med andre ord, fjerner elementet fra kopien af localstorage cart.

    setCart(newArray); //Opdater arrayen i localstorage.
  };

  return (
    <>
      <div className={styles.item}>
        <img src={obj.image} alt={obj.description} />
        <div>
          <p className={styles.title}>{obj.title}</p>
          <p className={styles.desc}>{obj.description}</p>
        </div>
        <p className={styles.price}>{obj.price} kr</p>
        <RxCross1 className={styles.removeIcon} onClick={removeItem} />
      </div>
    </>
  );
}
