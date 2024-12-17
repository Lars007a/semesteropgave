import styles from "./section.module.css";
import Container from "../container/container.jsx";

export default function section({children, backgroundColor}) {
    return <section className={styles.section} style={{backgroundColor: backgroundColor}}>
        <Container>
            {children}
        </Container>
    </section>
}