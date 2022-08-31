import React from 'react';

function HomePage() {
  const getInfo = () => {
    return 'boilerplate';
  };

  return <div>Welcome to React TS Vite {getInfo()}</div>;
}

export default HomePage;
