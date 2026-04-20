import {app}
import { Outlet } from "react-router-dom";

const AppShell = () => {
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  );
};

export default AppShell;