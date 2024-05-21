import React from "react";
import styles from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Header = ({ navigateBack }) => {
  const { t, i18n } = useTranslation();
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  const languageButtons = [
    { lang: "ru", image: "/svg/ru.svg" },
    { lang: "en", image: "/svg/en.svg" },
    { lang: "am", image: "/svg/am.svg" },
  ];
  return (
    <div className={`${styles.header} navbar`}>
      <Image
        width={290}
        height={85}
        src={"/svg/logo.svg"}
        alt={`logo`}
        onClick={navigateBack}
      />
      <div className={`${styles.langButtons} gap`}>
        {languageButtons.map((button, index) => (
          <div
            key={index}
            className={styles.languageButton}
            onClick={() => changeLang(button.lang)}
          >
            <Image
              className={`${styles.languageIcon} ${
                i18n.language === button.lang ? styles.active : ""
              }`}
              width={90}
              height={90}
              src={button.image}
              alt={`language-${button.lang}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
