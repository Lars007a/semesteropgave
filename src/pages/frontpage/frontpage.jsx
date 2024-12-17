import Header from "../../comps/header/header.jsx";
import headerImg from "../../assets/heros/forsiden.jpg";
import ProductList from "../../comps/productList/productList.jsx";
import { useEffect, useState } from "react";
import CustomerQuotes from "../../comps/customerQuotes/customerQuotes.jsx";
import {useGetQuotes, useGetProducts} from "../../hooks/getDataHooks.jsx";

export default function frontpage() {

  const [prodsToShow, setProdsToShow] = useState([]);
  const data = useGetProducts();

  const [quotesToShow, setQuotesToShow] = useState([]);
  const quotesFromApi = useGetQuotes();

  useEffect(() => {
    setQuotesToShow([...quotesFromApi]);
  }, [quotesFromApi]);

  useEffect(() => {
    const filteredArray = data.filter((element) => {
      if(element.recommended == true) {
        return true;
      }

      return false;
    });

    setProdsToShow([...filteredArray]);
  }, [data]);

  
  return (<>
  <Header img={headerImg} fullCover={true} title={"At lege er leve"} thirdText={"Her hos os har vi et stort udvalg af legetøj i høj kvalitet!"}/>
  <ProductList title={"Et udpluk af vores"} productList={prodsToShow}/>
  <CustomerQuotes quoteList={quotesToShow}/>
  </>);
}
