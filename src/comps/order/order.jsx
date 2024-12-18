import styles from "./order.module.css";
import {useState, useRef} from "react"
import { useLocalStorage } from "@uidotdev/usehooks";


export default function order() {

    const [cart, setCart] = useLocalStorage("cart", []); /* kurven der skal vises. */

 /* nogle ting til ordre funktionen. */
 const [orderProblem, setOrderProblem] = useState(false); /* Hvis der er en fejl. */
 const [orderBtnText, setOrderBtnText] = useState("Læg ordre!"); /* Hvad der står på knappen. */
 const orderEmailRef = useRef();

   //Funktion for når der bliver klikket på "placere ordre" knappen.
   //Funktion delt om på 2 dele, den ene formatter det ordentligt, og den anden poster det til apien.
   const placeOrdre = () => {

    if (orderEmailRef.current.value.length < 4) {
      setOrderProblem(true);
      return;
    }

    //Formater produkterne i kurven, så den kan blive postet til dben gennem api'en.
    //Det skal være en array med et objekt for hvert produkt der er i kurven med id og antal.

    let data = []; //Varabel til at holde på dataen.

    cart.forEach((element) => {
      //Loope gennem hver eneste produkt i kurven.
      const result = data.find((e) => {
        //Se om produktets id allerede er tilføjet til dataene der skal til apien.
        if (e.id == element) {
          //Hvis det er, så op antallet.
          e.ammount++;
          return true;
        }
        //Hvis det ikke er, så returner false og kør over det næste objekt i den formatterede data.
        return false;
      });

      //Hvis vi ikke fandt nogle med samme id, så lav et nyt ojekt med id'et og med et antal sat til 1.
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
          products: data,
          email: orderEmailRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let jsonResponse = await result.json();

      console.log(jsonResponse);

      //Ville have "created", hvis den er blevet tilføjet til dben gennem apien.
      if (!jsonResponse.created) {
        setOrderProblem(true);
        return;
      }

      /* Hvis ikke noget problem. Giv et respons til brugeren */
      setOrderBtnText("Success!");
      setOrderProblem(false);

     /* Skift så teksten tilbage */
    const timeoutId = setTimeout(() => {
        setOrderBtnText("Læg ordre!");
      }, 1000);
  
      return () => clearImmediate(timeoutId); /* cleanup */
    };

    sendReq();
  };


return <>
    <div className={styles.orderBox}>
        <input
        type="email"
        placeholder="Din email"
        ref={orderEmailRef}
        className={`${orderProblem ? styles.problem : ""}`}
        />
        <button onClick={placeOrdre}>{orderBtnText}</button>
    </div>
    </>
}