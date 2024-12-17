import styles from "./cartListItem.module.css";

export default function cartListItem({obj}) {
    return (
        <>
        <div className={styles.item}>
            <img src={obj.image} alt={obj.description} />
            <div>
            <p className={styles.title}>{obj.title}</p>
            <p className={styles.desc}>{obj.description}</p>
            </div>
            <p className={styles.price}>{obj.price} kr</p>
        </div>
        </>
    );
}