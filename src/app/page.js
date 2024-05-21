"use client";
import Footer from "@/components/footer/Footer";
import styles from "./page.module.scss";
import Header from "@/components/header/Header";
import Preloader from "@/components/preloader/Preloader";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import getProducts from "@/services/api";
import Page404 from "@/pages/page404/page404";
import Grid from "@/components/grid/Grid";
import Basket from "@/pages/basket/Basket";
import Payment from "@/pages/payment/Payment";

export default function Home() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isClickable, setIsClickable] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const timerRef = useRef(null);
  const imageUrl = "img/img.png";

  const navigateToBasket = () => {
    setShowBasket(true);
    setShowPayment(false);
  };

  const navigateToPayment = () => {
    setShowBasket(true);
    setShowPayment(true);
  };

  const navigateBack = () => {
    setShowBasket(false);
    setShowPayment(false);
    setShowButton(true);
  };

  function fetchProducts() {
    getProducts()
      .then((res) => {
        setProducts(res.products);
        setData(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleActivity = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsClickable(true);
    }, 500);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsActive(false);
      setIsClickable(false);
    }, 100000);
  };

  useEffect(() => {
    fetchProducts();
    window.addEventListener("touchstart", handleActivity);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, []);

  function handleTryAgainClick() {
    setIsLoading(true);
    fetchProducts();
    if (data) {
      setError(false);
    }
  }

  if (error) {
    return <Page404 handleTryAgainClick={handleTryAgainClick} />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      {isActive ? (
        <div style={{ pointerEvents: !isClickable && "none" }}>
          <Header navigateBack={navigateBack} />
          {!showBasket && !showPayment && (
            <Grid cols={data.size_x} rows={data.size_y} products={products} />
          )}
          {showBasket && !showPayment && (
            <div className={styles.content}>
              <Basket navigateToPayment={navigateToPayment} />
            </div>
          )}
          {showPayment && (
            <div className={styles.content}>
              <Payment
                navigateBack={navigateBack}
                navigateToBasket={navigateToBasket}
                setShowButton={setShowButton}
              />
            </div>
          )}
          <Footer
            data={data}
            navigateToBasket={navigateToBasket}
            navigateToPayment={navigateToPayment}
            showBasket={showBasket}
            showPayment={showPayment}
            setShowButton={setShowButton}
            showButton={showButton}
          />
        </div>
      ) : (
        <FullScreenImage src={imageUrl} />
      )}
    </main>
  );
}

const FullScreenImage = ({ src }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `url(${src}) no-repeat center center`,
      backgroundSize: "cover",
    }}
  />
);
