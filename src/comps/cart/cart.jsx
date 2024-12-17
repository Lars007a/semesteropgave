import styles from "./cart.module.css";
import Section from "../section/section.jsx";
import Container from "../container/container.jsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useGetProducts } from "./../../hooks/getDataHooks.jsx";
import CartListItem from "../cartListItem/cartListItem.jsx";
import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BiCart } from "react-icons/bi";

export default function cart() {
  /* Hver gang der sker en ændring, bliver det her opdateret, ser det ud til... */

  const [cart, setCart] = useLocalStorage("cart", []);

  const prods = useGetProducts();

  const [open, setOpen] = useState(false);

  const [orderProblem, setOrderProblem] = useState(false);
  const [orderBtnText, setOrderBtnText] = useState("Læg ordre!");
  const orderEmailRef = useRef();

  let countForTotal = 0;
  let filteredArray = [];

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

  //Funktion for når der bliver klikket på "placere ordre" knappen.
  const placeOrdre = (event) => {
    event.preventDefault();
    console.log("Placeret");

    if (orderEmailRef.current.value < 4) {
      setOrderProblem(true);
      return;
    }

    //Formater produkterne i kurven, så den kan blive postet til dben gennem api'en.
    //Det skal være en array med et objekt med id og antal for hvert produkt der er i kurven.

    let data = []; //Holder data'ene formateret ordentligt.

    cart.forEach((element) => {
      //Loope gennem hver eneste produkt i kurven.
      const result = data.find((e) => {
        //For hvert eneste produkt i kurven, looper vi over hver eneste dataobjekt der allerede er tilføjet til formateringen.
        //Se om produktets id allerede er tilføjet til dataene der skal til apien.
        if (e.id == element) {
          //Hvis det er, så op antallet.
          e.ammount++;
          return true; //Retunere true, for at stoppe gennemgangen af dataene der allerede er tilføjet.
        }
        //Hvis det ikke er, så returner false og kør over det næste objekt i den formatterede data.
        //Fordi nu er antallet oppet.
        return false;
      });

      //Hvis vi ikke fandt nogle med samme id, så lav et nyt ojekt med id'et og med et antal sat til 0.
      if (result == undefined) {
        let obj = {
          id: element,
          ammount: 1,
        };
        //Tilføj så det nye objekt til den formatterede data.
        data.push(obj);
      }
    });

    console.log("Alle", data);

    const sendReq = async () => {
      let result = await fetch("https://legekrogen.webmcdm.dk/orders", {
        method: "POST",
        body: JSON.stringify({
          products: [...data],
          email: orderEmailRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(result);

      let jsonResponse = await result.json();

      console.log(jsonResponse);

      if (!jsonResponse.created) {
        setOrderProblem(true);
        return;
      }

      setOrderBtnText("Success!");
      setOrderProblem(false);
    };

    sendReq();
    const timeoutId = setTimeout(() => {
      setOrderBtnText("Læg ordre!");
    }, 1000);

    return () => clearImmediate(timeoutId);
  };

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
                    <div className={styles.orderBox}>
                      <input
                        type="email"
                        placeholder="Din email"
                        ref={orderEmailRef}
                        className={`${orderProblem ? styles.problem : ""}`}
                      />
                      <button onClick={placeOrdre}>{orderBtnText}</button>
                    </div>
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

/* useEffect(() => {
        console.log("useeffect");
        let countForTotal = 0;
        let filteredArray = [];

         cart.forEach((element) => {
            for(let i = 0; i < prods.length; i++) {
                if(prods[i]._id == element) {
                    filteredArray.push(prods[i]);
                    countForTotal = countForTotal + prods[i].price;
                }
            }
        });

        setFavObjs(filteredArray);
        setTotal(countForTotal);
    }, [prods, open]); //Skal have open deri, eftersom uden den ville useEffect ikke kører når cart åbnes, men det vil den selvfølgelig hvis den også reagere på ændringer i open staten.   
 */

/*     let [favObjs, setFavObjs] = useState([]);
    const [total, setTotal] = useState(0); */
