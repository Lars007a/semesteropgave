import Section from "../section/section.jsx";
import styles from "./productList.module.css";
import ProductCard from "../productCard/productCard.jsx";

export default function productList({ title, productList = [] }) {
  return (
    <>
      <Section backgroundColor={"rgba(193,174,206,1)"}>
        <div className={styles.listContent}>
          <h2>{title}</h2>
          <h3>Legetøj!</h3>

          {productList.length > 0 ? (
            <div className={styles.grid}>
              {productList.map((element) => {
                return <ProductCard key={element._id} obj={element} />;
              })}
            </div>
          ) : (
            <h3 className={styles.noFound}>Ingen produkter fundet!</h3>
          )}
        </div>
      </Section>
    </>
  );
}
