import styles from "./cart.module.css";
import Section from "../section/section.jsx";
import Container from "../container/container.jsx"
import { useLocalStorage } from "@uidotdev/usehooks";
import {useGetProducts} from "./../../hooks/getDataHooks.jsx";
import CartListItem from "../cartListItem/cartListItem.jsx";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BiCart } from "react-icons/bi";

export default function cart() {

    /* Hver gang der sker en ændring, bliver det her opdateret, ser det ud til... */

    const [cart, setCart] = useLocalStorage("cart", []);

    const prods = useGetProducts();

    const [open, setOpen] = useState(false);

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



    const toggleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    }
        return <>
         <BiCart className={`${styles.navCart} ${Number(countForTotal) <= 0 ? styles.empty : ""}`} onClick={toggleOpen}/>

        {open ? <div className={styles.overlay}>
            <div className={styles.cartBox}>
                <Container>
                    <RxCross1 className={styles.icon} onClick={toggleOpen}/>
        {filteredArray.length > 0 ? <div className={styles.cartContent}>
            {filteredArray.map((element, id) => {
                return <CartListItem obj={element} key={id}/>
            })};
    
            <p className={styles.total}>{countForTotal} kr</p>
        </div>
     : <h3 className={styles.noFound}>Ingen produkter fundet...</h3>};
    
                </Container>
            </div>
        </div> : ""}
        </>
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