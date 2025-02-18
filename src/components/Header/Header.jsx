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
        <Link to="/" className="header__link">
          <a href="/start-workout" className="header__link">
            Start Workout
          </a>
        </Link>
        <Link to="/exercises" className="header__link">
          <a href="/exercises" className="header__link">
            Exercises
          </a>
        </Link>
        {/* <a href="/progress" className="header__link">
          📊 
          Progress
        </a>
        <a href="/history" className="header__link">
          History
        </a> */}

        <a href="/ai-chat" className="header__link">
          💬
        </a>
        <a href="/profile" className="header__link">
          👤
        </a>
      </nav>
    </header>
  );
}

export default Header;
