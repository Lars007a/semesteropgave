import Header from "../../comps/header/header.jsx";
import headerImg from "../../assets/heros/produkter.jpg";
import ProductList from "../../comps/productList/productList.jsx";
import { useGetProducts } from "../../hooks/getDataHooks.jsx";
import { useEffect, useState } from "react";

export default function products() {
  const [prodsToShow, setProdsToShow] = useState([]);
  const data = useGetProducts();

  useEffect(() => {
    setProdsToShow([...data]);
  }, [data]);

  return (
    <>
      <Header
        fullCover={false}
        title={"På udkig efter nyt"}
        secondText={"LEGETØJ?"}
        img={headerImg}
      />
      <ProductList title={"Alt vores"} productList={prodsToShow} />
    </>
  );
}
