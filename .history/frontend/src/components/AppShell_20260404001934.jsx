import { appShellStyles } from "../assets/dummyStyles";
import { Outlet } from "react-router-dom";
import logo 
const AppShell = () => {
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  );
};

export default AppShell;