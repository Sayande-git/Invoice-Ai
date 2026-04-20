import React from "react";
import { Outlet } from "react-router-dom";

const AppShell = () => {
  return (
    <div>
      <h1>App Shell</h1>

      {/* THIS IS REQUIRED */}
      <Outlet />
    </div>
  );
};

export default AppShell;