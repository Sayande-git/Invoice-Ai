import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Children } from 'react';

const ClerkProtected = ({Children}) =>{
  <SignedIn>{Children}</SignedIn>
  <SignedOut>
    <RedirectToSignIn />
  </SignedOut>
}
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*Its must be a protected route  */}
    </Routes>
   
  );
  );
};

export default App
