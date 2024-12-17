import styles from "./navbar.module.css";
import Container from "./../container/container.jsx";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Logo from "../../assets/logo/legekrogen_logo.png";
import { useState } from "react";
import Cart from "../cart/cart.jsx";
import Login from "../login/login.jsx";

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen == true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <nav className={`${styles.navbar}`}>
      <Container>
        <div className={styles.navContent}>
          {/* <h2 className={styles.navLogo}>legeKROGEN</h2> */}
          <img src={Logo} className={styles.logoImg} alt="logo" />
          
          <div className={styles.iconandlinks}>

            <Cart/>
            {isOpen ? <RxCross1 className={styles.menuIcon} onClick={handleClick} /> : 
            <RxHamburgerMenu
              className={styles.menuIcon}
              onClick={handleClick}
            />
  }

          <ul>
            <li>
              <Link to={"/"}>Forside</Link>
            </li>
            <li>
              <Link to={"/products"}>Produkter</Link>
            </li>

            <li>
              <Link to={"/faq"}>FAQ</Link>
            </li>

            <li>
              <Link to={"/club"}>Kundekluben</Link>
            </li>

            <li>
              <Link to={"/"}>Backoffice</Link>
            </li>
            <li>
              <Login/>
            </li>
          </ul>
          </div>
        </div>
      </Container>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ""}`}>
      <RxCross1 className={`${styles.closeIconBtn} ${styles.menuIcon}`} size={40} onClick={handleClick} />
      <ul>
            <li>
              <Link to={"/"}>Forside</Link>
            </li>
            <li>
              <Link to={"/products"}>Produkter</Link>
            </li>

            <li>
              <Link to={"/faq"}>FAQ</Link>
            </li>

            <li>
              <Link to={"/club"}>Kundekluben</Link>
            </li>

            <li>
              <Link to={"/"}>Backoffice</Link>
            </li>
            <li>
              <Login/>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default navbar;
