// src/components/TopNavbar.tsx
'use client';

import React from 'react';
import { LoginButton, liskSepolia, useActiveAccount } from 'panna-sdk';
import { Menu } from 'lucide-react';

interface TopNavbarProps {
  onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address || 'Belum Terhubung';
  const displayAddress = address !== 'Belum Terhubung' ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

  return (
    <nav className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white shadow-md z-40 border-b border-gray-200">
      <div className="flex justify-between items-center h-full px-6">
        
        {/* Tombol Menu untuk Mobile */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Judul Dashboard */}
        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
            Petition Hub Dashboard
        </h2>

        {/* Wallet & Login Button */}
        <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600 hidden sm:block">
                {displayAddress}
            </span>
            <div className="rounded-lg overflow-hidden shadow-sm transition">
                <LoginButton 
                    chain={liskSepolia} 
                />
            </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;