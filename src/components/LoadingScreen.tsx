import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed z-[99] bg-white inset-0 w-screen h-screen flex items-center justify-center">
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-auto h-20 rounded-full border-4 border-t-4 border-t-black animate-pulse"
      />
    </div>
  );
};

export default LoadingScreen;
