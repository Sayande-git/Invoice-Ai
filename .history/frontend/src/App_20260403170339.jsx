import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
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
   <div></div>
};

export default App;
