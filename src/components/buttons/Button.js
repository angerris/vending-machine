import styles from "./Button.module.scss";

function CustomButton({ variant, children, style, onClick, icon }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      style={style}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      {children}
    </button>
  );
}

export default CustomButton;
