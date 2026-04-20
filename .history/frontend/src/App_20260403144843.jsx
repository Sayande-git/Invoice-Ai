import React from 'react'
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <div> Home </div>
  );
};

export default App
