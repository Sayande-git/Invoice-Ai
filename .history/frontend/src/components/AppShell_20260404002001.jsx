import { appShellStyles } from "../assets/dummyStyles";
import { use } from "react-router-dom";
import logo from "../assets/logo.png";
const AppShell = () => {
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  );
};

export default AppShell;