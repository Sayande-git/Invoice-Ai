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
const 
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet /> 
    </div>
  );
};

export default AppShell;