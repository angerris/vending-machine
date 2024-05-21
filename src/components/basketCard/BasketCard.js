import React, { useEffect, useState } from "react";
import styles from "./BasketCard.module.scss";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { deleteBasketItem, updateBasketItem } from "@/services/api";

const BasketCard = ({ product }) => {
  const initialNum = 1;
  const [number, setNumber] = useState(initialNum);
  const [price, setPrice] = useState(Math.round(product.price));

  const increment = () => {
    if (number < 6) {
      setNumber((prevNumber) => prevNumber + 1);
      setPrice((prevPrice) => prevPrice + Math.round(product.price));
    }
  };
  const decrement = () => {
    if (number > 1) {
      setNumber((prevNumber) => prevNumber - 1);
      setPrice((prevPrice) => prevPrice - Math.round(product.price));
    }
  };
  const deleteBasket = () => {
    deleteBasketItem(product.id);
  };
  useEffect(() => {
    updateBasketItem(product.id, number);
  }, [number]);

  return (
    <div key={product.id} className={`${styles.card} row col-12`}>
      <img
        src={product.image}
        alt={product.name}
        className={`${styles.cardImg} row col-3`}
      />
      <div className={`${styles.cardContent} col col-6`}>
        {" "}
        <p className={styles.title}>{product.name}</p>
        <p className={styles.price}>{price} AMD</p>
        <ButtonGroup className={styles.buttonGroup}>
          <Button
            size="large"
            variant={"secondary"}
            style={{
              backgroundColor: "rgba(212, 212, 212, 1)",
              padding: "28px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={decrement}
          >
            <MinusOutlined
              size="large"
              style={{ color: "#000", fontSize: "28px" }}
            />
          </Button>
          <Button
            variant={"secondary"}
            style={{
              backgroundColor: "#fff",
              fontSize: "28px",
              padding: "28px",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {number}
          </Button>{" "}
          <Button
            size="large"
            variant={"secondary"}
            style={{
              backgroundColor: "rgba(212, 212, 212, 1)",
              padding: "28px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={increment}
          >
            <PlusOutlined
              size="large"
              style={{ color: "#000", fontSize: "28px" }}
            />
          </Button>
        </ButtonGroup>
      </div>
      <div className={styles.deleteBtn} onClick={deleteBasket}>
        <CloseOutlined />
      </div>
    </div>
  );
};

export default BasketCard;
