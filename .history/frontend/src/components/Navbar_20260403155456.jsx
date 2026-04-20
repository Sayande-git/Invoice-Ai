import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { navbarStyles } from '../assets/dummyStyles'
import logo from '../assets/logo.png'

import {
  useUser,
  useAuth,
  useClerk,
  SignedOut
} from "@clerk/clerk-react";

const Navbar = () => {

  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const clerk = useClerk();   // ✅ FIXED

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const TOKEN_KEY = "invoice_ai_token";

  // open login modal
  function openSignIn() {
    try {
      if (clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn();
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error opening sign-in modal:", error);
      navigate("/login");
    }
  }
 // open login modal
  function openSignUp() {
    try {
      if (clerk && typeof clerk.openSignUp === "function") {
        clerk.openSignUp();
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error opening sign-up modal:", error);
      navigate("/signup");
    }
  }



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

          <div className="flex items-center gap-4">
            <div className={navbarStyles.authSection}>
              <SignedOut>
                <button
                  onClick={openSignIn}
                  className={navbarStyles.signInButton}
                  type="button"
                >
                  Sign in
                </button>
                <button
  onClick={openSignUp}
  className={navbarStyles.signUpButton}
  type="button"
>
  <div className={navbarStyles.signUpOverlay}></div>
  <span className={navbarStyles.signUpText}>
    Get Started
  </span>
</button>
              </SignedOut>
            </div>

            {/*/}
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;