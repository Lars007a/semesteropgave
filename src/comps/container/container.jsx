import styles from "./container.module.css";
/* Generel container til at sørge for at det hele har den samme container på siden. */
export default function container({ children }) {
  return <div className={styles.container}>{children}</div>;
}
