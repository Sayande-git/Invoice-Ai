import { appShellStyles } from "../assets/dummyStyles";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useClerk,useUser } from "@clerk/clerk-react";
const AppShell = () => {
   // const {Outlet} = Outlet();
    const {signOut} = useClerk();
    const {user} = useUser();

   const [mobileOpen , setMobileOpen] = useState(false);
    const [collapsed , setCollapsed] = useState(()=>{
try {
  return localStorage.getItem("sidebar_collapsed") === "true";
} catch  {
  return false;
}
   });
const [scrolled , setScrolled] = useState(false);
const [isMobile , setIsMobile] = useState(false);
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
    </aside>
  </div>
</div>
  );
};
export default AppShell;