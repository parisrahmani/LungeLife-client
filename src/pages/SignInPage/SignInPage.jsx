// import React, { useState } from "react";
// import "./SignInPage.scss";

// function SignInPage() {
//   const [isSignUp, setIsSignUp] = useState(false);

//   const toggleForm = () => {
//     setIsSignUp(!isSignUp);
//   };

//   return (
//     <div className="auth">
//       <div className="auth__form-container">
//         <h2 className="auth__title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
//         <form className="auth__form">
//           <div className="auth__input-group">
//             <label htmlFor="email" className="auth__label">
//               Email
//             </label>
//             <input type="email" id="email" className="auth__input" required />
//           </div>
//           <div className="auth__input-group">
//             <label htmlFor="password" className="auth__label">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="auth__input"
//               required
//             />
//           </div>
//           {isSignUp && (
//             <div className="auth__input-group">
//               <label htmlFor="confirm-password" className="auth__label">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 className="auth__input"
//                 required
//               />
//             </div>
//           )}
//           <button type="submit" className="auth__button">
//             {isSignUp ? "Sign Up" : "Sign In"}
//           </button>
//         </form>
//         <p className="auth__toggle-text">
//           {isSignUp ? "Already have an account?" : "Don’t have an account?"}
//           <span onClick={toggleForm} className="auth__toggle-link">
//             {isSignUp ? "Sign In" : "Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
// export default SignInPage;

import React, { useState } from "react";
import "./SignInPage.scss";
import { FaDumbbell } from "react-icons/fa"; // Adding a fitness icon

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth">
      <div className="auth__form-container">
        <div className="auth__logo">
          <FaDumbbell className="auth__icon" />
          <h2 className="auth__title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        </div>
        <form className="auth__form">
          <div className="auth__input-group">
            <label htmlFor="email" className="auth__label">
              Email
            </label>
            <input type="email" id="email" className="auth__input" required />
          </div>
          <div className="auth__input-group">
            <label htmlFor="password" className="auth__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="auth__input"
              required
            />
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
                required
              />
            </div>
          )}
          <button type="submit" className="auth__button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
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
