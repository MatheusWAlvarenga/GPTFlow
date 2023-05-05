import React from "react";
import "./styles.css";
import logo from "../logo.svg";

function Header() {
  return (
    <div className="Header">
      <div className="Header-background-logo"></div>
      <div className="Header-background2-logo"></div>
      <img src={logo} className="Header-logo" alt="logo" />
      <div></div>

      <div className="Header-name">
        <span className="Header-name-1">MWBR</span>
        <span className="Header-name-2">Technology</span>
      </div>
    </div>
  );
}

export default Header;
