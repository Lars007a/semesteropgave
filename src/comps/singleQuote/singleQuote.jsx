import styles from "./singleQuote.module.css";

/* Et enkelt citat fra kunderne. */
export default function singleQUote({obj}) {
    return <>
    <div className={styles.box}>
    <p className={styles.desc}>
        {`"${obj.description}"`}
    </p>

    <p className={styles.name}>{`- ${obj.name}`}</p>
    </div>


    </>
}