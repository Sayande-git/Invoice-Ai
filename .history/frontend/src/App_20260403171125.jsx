import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import AppShell from "./components/AppShell";

const ClerkProtected = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/app"
        element={
          <ClerkProtected>
            <AppShell />
          </ClerkProtected>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;