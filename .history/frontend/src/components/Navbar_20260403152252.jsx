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
            <div className={navbarStyles.desktopNav}>
  <a href="#features" className={navbarStyles.navLink}>
    Features
  </a>
  <a href="#pricing" className={navbarStyles.navLinkInactive}>
    Pricing
  </a>
</div>
          </div>
          <div className='flex items-center'></div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;