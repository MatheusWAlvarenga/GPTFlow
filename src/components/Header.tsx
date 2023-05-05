import React from "react";
import styles from "./styles.module.css";
import logo from "../logo.svg";

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderBackgroundLogo}></div>
      <div className={styles.HeaderBackground2Logo}></div>
      <img src={logo} className={styles.HeaderLogo} alt="logo" />
      <div></div>

      <div className={styles.HeaderName}>
        <span className={styles.HeaderName1}>MWBR</span>
        <span className={styles.HeaderName2}>Technology</span>
      </div>
    </div>
  );
}

export default Header;
