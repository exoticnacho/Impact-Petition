// src/components/Sidebar.tsx

import Link from 'next/link';
import { Home, FileText, Settings, Zap } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home, current: true },
  { name: 'Buat Petisi', href: '#create', icon: FileText, current: false },
  { name: 'Statistik DAO', href: '#stats', icon: Zap, current: false },
  { name: 'Settings', href: '#settings', icon: Settings, current: false },
];

const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 transform -translate-x-full lg:translate-x-0 transition duration-200 ease-in-out">
      <div className="p-6 h-16 border-b border-gray-700 flex items-center justify-center">
        <h1 className="text-2xl font-extrabold text-indigo-400">SofcialFi</h1>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition duration-150 ease-in-out ${
              item.current 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
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