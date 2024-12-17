import styles from "./singleQuote.module.css";

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