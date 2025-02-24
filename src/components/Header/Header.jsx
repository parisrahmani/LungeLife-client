import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

import LungeLifeLogo from "../LungeLifeLogo/LungeLifeLogo";
function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <LungeLifeLogo />
      </div>
      <nav className="header__nav">
        <Link to="/home" className="header__link">
          Start Workout
        </Link>
        <Link to="/exercises" className="header__link">
          Exercises
        </Link>
        <Link to="/" className="header__link">
          👤
        </Link>
      </nav>
    </header>
  );
}

export default Header;
