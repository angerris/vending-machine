import React, { useState } from "react";
import styles from "./Card.module.scss";
import ProductModal from "../modal/ProductModal";

const Card = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleCardClick = () => {
    setOpen(true);
  };
  return (
    <>
      <div
        key={product.id}
        className={`${styles.card} col`}
        onClick={handleCardClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.cardImg}
        />
        <p className={styles.title}>{product.name}</p>
        <p className={styles.price}>{Math.round(product.price)} AMD</p>
        <ProductModal product={product} open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Card;
