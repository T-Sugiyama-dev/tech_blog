import { TableOfContents } from "./table-of-contents";
import styles from "./toc-box.module.css";


export const TocBox = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Index</p>
      <TableOfContents />
    </div>
  );
};

