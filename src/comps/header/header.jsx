import styles from "./header.module.css";

export default function header({img, fullCover, title, secondText, thirdText}) {
    

    return (<>

        

    <header className={styles.header} style={fullCover ? {backgroundImage: `linear-gradient(rgba(191,177,184, 0.6), rgba(191,177,184, 0.6)), url("${img}")`} : {backgroundImage: `url("${img}")`}}>
        <div className={`${styles.headerContent} ${fullCover ? "" : styles.middle}`}>
            <h2>{title}</h2>
            <h3>{secondText}</h3>
            <p>{thirdText}</p>
        </div>
    </header>
    </>)
}