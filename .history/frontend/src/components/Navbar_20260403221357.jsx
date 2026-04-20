import React, { useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";

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
  const clerk = useClerk();

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const TOKEN_KEY = "token";

  // fetch & store token
  const fetchAndStoreToken = useCallback(async () => {
    try {
      if (!getToken) return null;

      const token = await getToken().catch(() => null);

      if (token) {
        try {
          localStorage.setItem(TOKEN_KEY, token);
          console.log(token);
        } catch (e) {}
        return token;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }, [getToken]);

  // sync token with auth
  useEffect(() => {
    let mounted = true;

    (async () => {
      if (isSignedIn) {
        const t = await fetchAndStoreToken();

        if (!t && mounted) {
          await fetchAndStoreToken();
        }
      } else {
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch (error) {}
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isSignedIn, fetchAndStoreToken]);

  // redirect after login
  useEffect(() => {
    if (isSignedIn) {
      const pathname = window.location.pathname || "/";

      if (
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/auth") ||
        pathname === "/"
      ) {
        navigate("/app/dashboard", { replace: true });
      }
    }
  }, [isSignedIn, navigate]);

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

  // open signup modal
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

  // close profile dropdown
  useEffect(() => {
    function onDocClick(e) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    if (profileOpen) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("touchstart", onDocClick);
    }

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [profileOpen]);

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img src={logo} alt="logo" className={navbarStyles.logoImage} />
              <span className={navbarStyles.logoText}>InvoiceAI</span>
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
                <button style={{ background: "red", color: "white" }}>
                TEST BUTTON
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className={navbarStyles.mobileMenuButton}
            >
              <div className={navbarStyles.mobileMenuIcon}>
                <span
                  className={`${navbarStyles.mobileMenuLine1} ${
                    open
                      ? navbarStyles.mobileMenuLine1Open
                      : navbarStyles.mobileMenuLine1Closed
                  }`}
                />
                <span
                  className={`${navbarStyles.mobileMenuLine2} ${
                    open
                      ? navbarStyles.mobileMenuLine2Open
                      : navbarStyles.mobileMenuLine2Closed
                  }`}
                />
                <span
                  className={`${navbarStyles.mobileMenuLine3} ${
                    open
                      ? navbarStyles.mobileMenuLine3Open
                      : navbarStyles.mobileMenuLine3Closed
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`${open ? "block" : "hidden"} ${navbarStyles.mobileMenu}`}>
        <div className={navbarStyles.mobileMenuContainer}>
          <a href="#features" className={navbarStyles.mobileNavLink}>
            Features
          </a>
          <a href="#pricing" className={navbarStyles.mobileNavLink}>
            Pricing
          </a>

          <div className={navbarStyles.mobileAuthSection}>
            <SignedOut>
              <button
                onClick={openSignIn}
                className={navbarStyles.mobileSignIn}
              >
                Sign in
              </button>

              <button
                onClick={openSignUp}
                className={navbarStyles.mobileSignUp}
              >
                Get Started
              </button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;