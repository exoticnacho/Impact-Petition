// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import PetitionList from '@/components/PetitionList';
import CreatePetitionForm from '@/components/CreatePetitionForm';
import MembershipGate from '@/components/MembershipGate';
import Sidebar from '@/components/Sidebar';
import TopNavbar from '@/components/TopNavbar';
// Mengimpor semua ikon yang digunakan di halaman ini, termasuk FileText
import { Zap, Users, Shield, FileText, LucideIcon } from 'lucide-react'; 

// 1. DEFINISI INTERFACE UNTUK STAT CARD (Koreksi Error 7031)
interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon; // LucideIcon adalah tipe data untuk komponen ikon dari lucide-react
}

// Card Statistik Sederhana (Sekarang menggunakan tipe eksplisit)
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex items-center space-x-4">
        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Sidebar (Sembunyi di mobile) */}
      <Sidebar />
      
      {/* Navbar (Mengambang di atas konten) */}
      <TopNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Konten Utama */}
      <main className="lg:ml-64 pt-24 p-6"> {/* Padding atas 16px untuk Navbar */}
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Petisi</h1>

        {/* Baris Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" id="stats">
            {/* KOREKSI: Menggunakan FileText yang sudah diimpor */}
            <StatCard title="Total Anggota (NFT)" value="1,245" icon={Users} />
            <StatCard title="Petisi Aktif" value="45" icon={FileText} /> 
            <StatCard title="Dana Terkunci (Boost)" value="890 CAMP" icon={Zap} />
        </div>

        {/* Konten Utama: Grid Petisi dan Formulir */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> 
          
          {/* Kolom Kiri: Membership Gate & Form */}
          <div className="lg:col-span-1 space-y-6" id="create">
            <MembershipGate>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Buat Petisi Baru</h2>
                <CreatePetitionForm />
              </div>
            </MembershipGate>
          </div>
          
          {/* Kolom Kanan: Daftar Petisi */}
          <div className="lg:col-span-2">
            <MembershipGate>
              <PetitionList />
            </MembershipGate>
          </div>
        </div>
      </main>
    </div>
  );
}