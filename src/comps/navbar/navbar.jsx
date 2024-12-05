import styles from "./navbar.module.css";
import Container from "./../container/container.jsx";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";

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
    <nav className={`${isOpen ? styles.active : ""} ${styles.navbar}`}>
      <Container>
        <div className={styles.navContent}>
          <h2 className={styles.navLogo}>legeKROGEN</h2>

          {isOpen ? (
            <RxCross1 className={styles.menuIcon} onClick={handleClick} />
          ) : (
            <RxHamburgerMenu
              className={styles.menuIcon}
              onClick={handleClick}
            />
          )}

          <ul>
            <li>
              <Link to={"/"}>Forside</Link>
            </li>
            <li>
              <Link to={"/"}>Produkter</Link>
            </li>

            <li>
              <Link to={"/"}>FAQ</Link>
            </li>

            <li>
              <Link to={"/"}>Kundekluben</Link>
            </li>

            <li>
              <Link to={"/"}>Backoffice</Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default navbar;
