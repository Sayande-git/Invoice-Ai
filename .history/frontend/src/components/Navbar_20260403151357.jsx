import React from 'react'
import { Link } from "react-router-dom";
import { navbarStyles } from '../assets/dummyStyles'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img
                src={logo}
                alt="logo"
                className={navbarStyles.logoImage}
              />
              <span className={navbarStyles.logoText}>
                InvoiceAI
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;