// src/components/TopNavbar.tsx
'use client';

import React from 'react';
import { LoginButton, liskSepolia, useActiveAccount } from 'panna-sdk';
import { Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; 

interface TopNavbarProps {
  onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address || null;
  const isConnected = !!address;
  const displayAddress = isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Guest';

  return (
    <nav className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white dark:bg-gray-900 shadow-md z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center h-full px-6">
        
        {/* Tombol Menu untuk Mobile */}
        <Button 
          onClick={onMenuClick} 
          className="lg:hidden"
          variant="ghost"
          size="icon"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </Button>

        {/* Judul/Pesan Sambutan */}
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 hidden sm:block">
            Welcome back, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{isConnected ? 'Member' : 'Guest'}</span>!
        </h2>

        {/* User Actions & Wallet */}
        <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5 text-muted-foreground hover:text-indigo-500" />
            </Button>
            
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
                        {isConnected ? displayAddress.slice(0, 2) : 'G'}
                    </AvatarFallback>
                </Avatar>

                {/* Login Button Panna SDK - Ditempatkan di dalam wrapper shadcn/ui */}
                <div className="rounded-lg overflow-hidden shadow-sm transition">
                    <LoginButton 
                        chain={liskSepolia} 
                    />
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;