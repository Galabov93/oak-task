import CompletePage from 'pages/CompletePage';
import HomePage from 'pages/HomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/complete" element={<CompletePage />} />
    </Routes>
  );
}

export default App;
