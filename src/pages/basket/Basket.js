import BasketCard from "@/components/basketCard/BasketCard";
import { getBasketsList } from "@/services/api";
import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import Preloader from "@/components/preloader/Preloader";
const Basket = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchItems() {
    getBasketsList()
      .then((res) => {
        setItems(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className={styles.basket}>
      <>
        {items.map((item) => (
          <BasketCard key={item.product.id} product={item.product} />
        ))}
      </>
    </div>
  );
};

export default Basket;
