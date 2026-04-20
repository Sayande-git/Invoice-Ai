import React, { useState } from "react";
import { appShellStyles } from "../assets/dummyStyles";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useClerk, useUser } from "@clerk/clerk-react";

const AppShell = () => {
  // ❌ removed wrong line: const {Navigate} = Outlet();

  const { signOut } = useClerk();
  const { user } = useUser();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className={appShellStyles.root}>
      <div className={appShellStyles.layout}>
        {/* Sidebar */}
        <aside
          className={`${appShellStyles.sidebar} ${
            collapsed
              ? appShellStyles.sidebarCollapsed
              : appShellStyles.sidebarExpanded
          }`}
        >
          <Link to="/" className={appShellStyles.logoLink}>
            <div className="relative">
              <img
                src={logo}
                alt="logo"
                className={appShellStyles.logoImage}
              />
            </div>
          </Link>
        </aside>

        {/* ADD THIS (was missing, needed for rendering child routes) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppShell;