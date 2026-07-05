import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-screen" style={{ backgroundColor: '#F3F4F6' }}>
      {/* Top Navbar */}
      <Navbar />
      
      {/* Centered Main Page Content Body */}
      <main className="flex-grow-1 w-100 container-xl py-5">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
