import headerImg from "../../assets/heros/FAQ.jpg";
import Header from "../../comps/header/header.jsx";
import Accordion from "../../comps/accordion/accordion.jsx";
import { useGetFAQS } from "../../hooks/getDataHooks.jsx";
import { useEffect, useState } from "react";
import Section from "../../comps/section/section.jsx";
import styles from "./faq.module.css";
import { HiH3 } from "react-icons/hi2";

export default function faqPage() {

  const [dataToShow, setDataToShow] = useState([]);

  const req = useGetFAQS();

  useEffect(() => {
    setDataToShow([...req]);
  }, [req]);


  return (
    <>
    <Header fullCover={false} title={"Har du nolge"} secondText={"SPØRGSMÅL?"} img={headerImg} thirdText={"Måske er de allerede besvaret herunder. Ellers er du altid velkommen til at kontakte os."}/>

<Section>

{dataToShow.length > 0 ? <div className={styles.accordionBox}>    {dataToShow.map((element, id) => {
      return <Accordion obj={element} key={id}/>
    })}</div> : <h3 className={styles.noFound}>Ingen FAQ spørgsmål fundet...</h3>}

</Section>
    </>
  )
}
