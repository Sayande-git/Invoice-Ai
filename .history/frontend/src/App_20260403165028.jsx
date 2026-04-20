import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Children } from 'react';

const ClerkProtected = ({Children}) =>{
  <SignedIn>{Children}</SignedIn>
  <SignedOut>
    <R
  </SignedOut>
}
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*Its must be a protected route  */}
    </Routes>
   
 
  );
};

export default App
