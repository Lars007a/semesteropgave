import styles from "./cart.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useGetProducts } from "./../../hooks/getDataHooks.jsx";
import CartListItem from "../cartListItem/cartListItem.jsx";
import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import Order from "../order/order.jsx";

export default function cart() {

  const [cart, setCart] = useLocalStorage("cart", []); /* kurven der skal vises. */

  const prods = useGetProducts(); /* alle produkterne. */

  const [open, setOpen] = useState(false); /* om kurven er åben. */

  let countForTotal = 0; /* total pris af produkterne i kurven */
  let filteredArray = []; /* den array af produkter der skal vises i kurven. */

  /* Går over alle produkterne i kurven, og for hvert produkt i kurven
  går vi over alle produkter, og hvis id'et så passer, bliver det produkt
  tilføjet til de produkter der skal vises.
  */
  cart.forEach((element) => {
    for (let i = 0; i < prods.length; i++) {
      if (prods[i]._id == element) {
        filteredArray.push(prods[i]);
        countForTotal = countForTotal + prods[i].price;
      }
    }
  });

  const toggleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  /* Skal hele tiden vise knappen til at åbne kurven, og hvis kurven så er åben,
  skal kurven, som tager over skærmen, også vises. */
  return (
    <>
      <BiCart
        className={`${styles.navCart} ${
          Number(countForTotal) <= 0 ? styles.empty : ""
        }`}
        onClick={toggleOpen}
      />

      {open ? (
        <div className={styles.overlay}>
          <div className={styles.cartBox}>
            <div className={styles.container}>
              <RxCross1 className={styles.icon} onClick={toggleOpen} />
              {filteredArray.length > 0 ? (
                <div className={styles.cartContent}>
                  {filteredArray.map((element, id) => {
                    return <CartListItem obj={element} key={id} />;
                  })}
                  ;
                  <div className={styles.bottomRow}>
                    <Order/>
                    <p className={styles.total}>{countForTotal} kr</p>
                  </div>
                </div>
              ) : (
                <h3 className={styles.noFound}>Ingen produkter fundet...</h3>
              )}
              ;
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}