import React, { useEffect, useState } from "react";
import styles from "./Payment.module.scss";
import { checkout } from "@/services/api";

const Payment = ({ navigateBack, navigateToBasket, setShowButton }) => {
  const [isSuccess, setIsSuccess] = useState(null);
  const pay = "svg/payment.svg";
  const paymentError = "svg/paymentError.svg";
  const paymentSuccess = "svg/paymentSuccess.svg";

  useEffect(() => {
    let timer;
    checkout()
      .then((res) => {
        setIsSuccess(res.success);
        timer = setTimeout(() => {
          setIsSuccess(null);
          res.success && navigateBack();
          !res.success && navigateToBasket(), setShowButton(true);
        }, 3000);
      })
      .then(() => {
        return () => {
          clearTimeout(timer);
        };
      });
  }, [navigateBack, navigateToBasket, setShowButton]);

  return (
    <div>
      {isSuccess !== null ? (
        <div className={styles.paymentContainer}>
          <img
            src={isSuccess ? paymentSuccess : paymentError}
            alt={isSuccess ? "success" : "error"}
          />
        </div>
      ) : (
        <div className={styles.paymentContainer}>
          <img src={pay} alt="pay" />
          <h2 className={styles.title}>PAY</h2>
        </div>
      )}
    </div>
  );
};

export default Payment;
