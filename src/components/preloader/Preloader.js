import React from "react";
import styles from "./Preloader.module.scss";
import Image from "next/image";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <Image
        width={400}
        height={400}
        src="/svg/preloader.svg"
        alt=""
        srcSet=""
      />
    </div>
  );
};

export default Preloader;
