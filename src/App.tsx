import HomePage from 'pages/HomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<div>Second page</div>} />
    </Routes>
  );
}

export default App;
