import React from 'react';
import MainHeader from './MainHeader';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#111111] font-sans selection:bg-[#0057FF] selection:text-white">
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
