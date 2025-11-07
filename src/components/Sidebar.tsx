// src/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { Home, FileText, Settings, Zap, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { name: 'Dashboard', href: '#home', icon: Home, current: true },
  { name: 'Buat Petisi', href: '#create', icon: FileText, current: false },
  { name: 'Statistik DAO', href: '#stats', icon: Zap, current: false },
];

const secondaryItems = [
    { name: 'Anggota', href: '#members', icon: Users, current: false },
    { name: 'Pengaturan', href: '#settings', icon: Settings, current: false },
];

const Sidebar: React.FC = () => {
  return (
    // Struktur Sidebar Dashboard: Menggunakan warna latar belakang primer (gray-900)
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 hidden lg:flex flex-col border-r border-gray-800">
      
      {/* Header Logo */}
      <div className="p-6 h-16 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-2xl font-extrabold text-indigo-400 tracking-wider">Impact Chain</h1>
      </div>
      
      {/* Navigasi Utama */}
      <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            // Styling tematik Impact Chain (Indigo)
            className={`flex items-center p-3 rounded-lg transition duration-150 ease-in-out font-medium ${
              item.current 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' // Shadow untuk elemen aktif
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </Link>
        ))}
        
        <Separator className="my-4 bg-gray-800" />

        {/* Navigasi Sekunder */}
        {secondaryItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition duration-150 ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white font-medium`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;