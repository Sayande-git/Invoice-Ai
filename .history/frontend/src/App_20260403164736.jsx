import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import {Sign}
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*Its must be a protected route  */}
    </Routes>
   
 
  );
};

export default App
