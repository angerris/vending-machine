import { FrownOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./page404.module.scss";
import CustomButton from "@/components/buttons/Button";

const Page404 = ({ handleTryAgainClick }) => {
  return (
    <div className={styles.page404}>
      <h1 className={styles.title}>The device is temporarily unavailable</h1>
      <CustomButton
        onClick={handleTryAgainClick}
        variant={"primary"}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        Try again{" "}
      </CustomButton>
    </div>
  );
};

export default Page404;
