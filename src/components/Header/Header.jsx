import React from "react";
import "./Header.scss"; // Import SCSS for styling
//import "../LungeLifeLogo/LungeLifeLogo";
import LungeLifeLogo from "../LungeLifeLogo/LungeLifeLogo";
const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <LungeLifeLogo />
      </div>
      <nav className="header__nav">
        <a href="/start-workout" className="header__link">
          Start Workout
        </a>
        <a href="/exercises" className="header__link">
          Exercises
        </a>
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
};

export default Header;
