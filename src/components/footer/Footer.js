import React, { useState } from "react";
import styles from "./Footer.module.scss";
import Button from "../buttons/Button";
import { useTranslation } from "react-i18next";

const Footer = ({
  data,
  navigateToBasket,
  navigateToPayment,
  showBasket,
  showButton,
  setShowButton,
}) => {
  const { t } = useTranslation();

  const handleButtonClick = () => {
    if (showBasket) {
      navigateToPayment();
      setShowButton(false);
    } else {
      navigateToBasket();
    }
  };

  return (
    <div className={`${styles.footer} navbar`}>
      {showButton && (
        <>
          <div className="col col-4">
            <h5>{t("itemsInTheCartTitle")}</h5>
            <h3>
              {data.baskets_count} {t("itemsInTheCart")}
            </h3>
          </div>

          <Button
            onClick={handleButtonClick}
            variant={"secondary"}
            style={{ display: "flex", flexDirection: "column", width: "400px" }}
          >
            <span>{t("pay")}</span>
            <span style={{ fontSize: "24px" }}>{data.total_price} AMD</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Footer;
