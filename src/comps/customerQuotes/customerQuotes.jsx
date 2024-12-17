import styles from "./customerQuotes.module.css";
import Section from "../section/section.jsx";
import SingleQuote from "../singleQuote/singleQuote.jsx";


export default function customerQuotes({quoteList = []}) {

return <>
<Section backgroundColor={"white"}>

    <div className={styles.title}>
    <h2>Vores kunder</h2>
    <h3>Udtaler</h3>
    </div>

        {quoteList.length > 0 ? <div className={styles.quotesBox}>{quoteList.map((element, id) => {
            return <SingleQuote obj={element} key={id}/>
        })} </div> 
        : 
        <h3 className={styles.noFound}>Der er ingen citater...</h3>}
    </Section>
</>
}