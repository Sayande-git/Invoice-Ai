// import React, { useState } from "react";
// import { appShellStyles } from "../assets/dummyStyles";
// import { Outlet, Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { useClerk, useUser } from "@clerk/clerk-react";

// const AppShell = () => {
//   const { signOut } = useClerk();
//   const { user } = useUser();

//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [collapsed, setCollapsed] = useState(() => {
//     try {
//       return localStorage.getItem("sidebar_collapsed") === "true";
//     } catch {
//       return false;
//     }
//   });

//   const [scrolled, setScrolled] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   return (
//     <div
//       className={appShellStyles.root}
//       style={{ display: "flex", minHeight: "100vh" }}  // 🔥 force layout to show
//     >
//       <div
//         className={appShellStyles.layout}
//         style={{ display: "flex", width: "100%" }}     // 🔥 ensure flex works
//       >
//         {/* Sidebar */}
//         <aside
//           className={`${appShellStyles.sidebar} ${
//             collapsed
//               ? appShellStyles.sidebarCollapsed
//               : appShellStyles.sidebarExpanded
//           }`}
//           style={{ minWidth: "200px", background: "#f3f3f3" }} // 🔥 visible sidebar
//         >
//           <Link to="/" className={appShellStyles.logoLink}>
//             <div className="relative">
//               <img
//                 src={logo}
//                 alt="logo"
//                 className={appShellStyles.logoImage}
//               />
//             </div>
//           </Link>
//         </aside>

//         {/* Main content */}
//         <div style={{ flex: 1, padding: "20px" }}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppShell;