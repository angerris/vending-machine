import React, { useState } from "react";
import { Button, Modal } from "antd";
import {
  CloseOutlined,
  LoadingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./ProductModal.module.scss";
import ButtonGroup from "antd/es/button/button-group";
import CustomButton from "../buttons/Button";
import { useTranslation } from "react-i18next";
import { addItemToBasket } from "@/services/api";

const ProductModal = ({ product, open, setOpen }) => {
  const initialNum = 1;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
  const handleOk = () => {
    setLoading(true);
    addItemToBasket(product.id, number).finally(() => {
      setLoading(false);
      setOpen(false);
      setNumber(initialNum);
      setPrice(Math.round(product.price));
    });
  };
  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 0);
  };

  return (
    <Modal
      setOpen={setOpen}
      open={open}
      centered
      closeIcon={
        <CloseOutlined
          onClick={() => {
            handleClose();
          }}
          style={{ fontSize: "32px", backgroundColor: "#fff", color: "#000" }}
        />
      }
      title={<ModalTitle name={product.name} />}
      footer={[
        <CustomButton
          variant={"primary"}
          key="back"
          onClick={handleOk}
          icon={loading && <LoadingOutlined />}
        >
          {t("addToCart")}
        </CustomButton>,
      ]}
    >
      <div className={styles.modalBody}>
        <img src={product.image} alt={product.name} className={styles.img} />
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
        <div className={`${styles.total} row`}>
          <p className={styles.totalTitle}>{t("total")}</p>
          <p className={styles.totalPrice}>{price} AMD</p>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;

export const ModalTitle = ({ name }) => {
  return (
    <h2
      className={styles.modalTitle}
      style={{ textAlign: "center", fontSize: "32px" }}
    >
      {name}
    </h2>
  );
};
