import React from "react";
import Card from "../card/Card";
import styles from "./Grid.module.scss";

const Grid = ({ products, cols, rows }) => {
  products.sort((a, b) => a.sku - b.sku);
  const columns = Array.from({ length: cols }, () => []);
  products.forEach((product, index) => {
    const columnIndex = index % cols;
    columns[columnIndex].push(product);
  });
  const gridRows = [];
  for (let i = 0; i < rows; i++) {
    const cells = [];
    for (let j = 0; j < cols; j++) {
      const product = columns[j][i];
      cells.push(
        <div key={`${j}-${i}`} className={`col-${12 / cols}`}>
          {product && <Card key={product.id} product={product} />}
        </div>,
      );
    }
    gridRows.push(
      <div key={`row-${i}`} className={styles.row}>
        {cells}
      </div>,
    );
  }
  return (
    <div className={styles.content}>
      <div className={styles.col}>{gridRows}</div>
    </div>
  );
};

export default Grid;
