import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./SignInPage.scss";

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth">
      <div className="auth__form-container">
        <h2 className="auth__title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form className="auth__form">
          <div className="auth__input-group">
            <label htmlFor="email" className="auth__label">
              Email
            </label>
            <input type="email" id="email" className="auth__input" />
          </div>
          <div className="auth__input-group">
            <label htmlFor="password" className="auth__label">
              Password
            </label>
            <input type="password" id="password" className="auth__input" />
          </div>
          {isSignUp && (
            <div className="auth__input-group">
              <label htmlFor="confirm-password" className="auth__label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="auth__input"
              />
            </div>
          )}
          <Link to="/home">
            <button type="submit" className="auth__button">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </Link>
        </form>
        <p className="auth__toggle-text">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}
          <span onClick={toggleForm} className="auth__toggle-link">
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
