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

// Protected wrapper
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
    <div className="min-h-screen max-w-full overflow-x-hidden">
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
          {/* Nested route */}
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
