import React from 'react';
import Navbar from '../ui/navbar';
import BottomBar from '../ui/mobileNav';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-[28rem] ">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <BottomBar />
    </div>
  );
};

export default MainLayout;
