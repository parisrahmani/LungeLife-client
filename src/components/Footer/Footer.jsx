import React from "react";
import { Link } from "react-router-dom";

//import SnapsLogo from "../SnapsLogo/SnapsLogo";

import facebook from "../../assets/Icons/Facebook.svg";
import x_twitter from "../../assets/Icons/X_twitter.svg";
import instagram from "../../assets/Icons/Instagram.svg";
import pinterest from "../../assets/Icons/Pinterest.svg";

import "./Footer.scss";

function Footer() {
  return (
    <article className="footer">
      <section className="footer__main">
        <section className="footer__text">
          <Link to="/" className="footer__logo-link">
            <img src="/Logo/Logo.png" alt="Logo" className="logo" />
          </Link>
          {/* <section className="footer__cards">
            <ul className="footer__card">
              <li className="footer__item">For photographers</li>
              <li className="footer__item">Hire talent</li>
              <li className="footer__item">inspiration</li>
            </ul>
            <ul className="footer__card">
              <li className="footer__item">About</li>
              <li className="footer__item">Careers</li>
              <li className="footer__item">Support</li>
            </ul>
          </section> */}
        </section>
        <section className="social">
          <a href="https://www.facebook.com">
            <img
              className="social__icon facebook"
              src={facebook}
              alt="Facebook Icon"
            />
          </a>
          <a href="https://x.com/">
            <img
              className="social__icon x_twitter "
              src={x_twitter}
              alt="X or Twitter Icon"
            />
          </a>
          <a href="https://www.instagram.com/">
            <img
              className="social__icon instagram"
              src={instagram}
              alt="Instagram Icon"
            />
          </a>
          <a href="https://ca.pinterest.com/">
            <img
              className="social__icon pintrest"
              src={pinterest}
              alt="Pintrest Icon"
            />
          </a>
        </section>
      </section>
      <section className="copyright">
        <div className="copyright__text">© 2024 Snaps</div>
        <ul className="copyright__list">
          <li className="copyright__item">. Terms</li>
          <li className="copyright__item">Privacy</li>
          <li className="copyright__item">Cookies</li>
        </ul>
      </section>
    </article>
  );
}

export default Footer;
