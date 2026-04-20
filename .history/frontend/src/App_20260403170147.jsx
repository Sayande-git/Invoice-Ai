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
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Example protected route */}
      <Route
        path="/app"
        element={
          <ClerkProtected>
          <AppShell/>
          </ClerkProtected>
        }
      />
      <Route index element={}></Route>
    </Routes>
  );
};

export default App;
