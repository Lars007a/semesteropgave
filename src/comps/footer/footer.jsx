import Section from "../section/section.jsx";
import styles from "./footer.module.css";
import Clubbanner from "../clubbanner/clubbanner.jsx";
import { Link, useLocation } from "react-router-dom";
import facebookImg from "../../assets/icons/icons8-facebook-24.svg";
import instagramImg from "../../assets/icons/icons8-instagram-24.svg";
import { BiSolidPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";



export default function footer() {
    
    const {pathname} = useLocation();

    let showClubBanner = true;

    if(pathname == "/club") {
        showClubBanner = false;
    }
    
    return (
        <>
            {showClubBanner ? <Clubbanner/> : ""}


            <Section backgroundColor={"#355675"}>
                <div className={styles.footerContent}>
                    <h2>Kundeservice</h2>
                    <div>
                        <MdEmail/>
                        kontakt@legekrogen.dk
                    </div>
                    <div><BiSolidPhone/> +45 23 45 67 89</div>
                    <h3>Følg os</h3>
                    <div><Link to={"https://facebook.com"}><img className={styles.socialIcon} src={facebookImg} alt="facebook" /></Link>
                    
                    <Link to={"https://instagram.com"}><img src={instagramImg} className={styles.socialIcon} alt="Instagram" /></Link></div>
                </div>
            </Section>
        </>
    )
}