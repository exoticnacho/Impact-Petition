// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import { LoginButton, liskSepolia, useActiveAccount } from 'panna-sdk';
import PetitionList from '@/components/PetitionList';
import CreatePetitionForm from '@/components/CreatePetitionForm';
import MembershipGate from '@/components/MembershipGate';
import Sidebar from '@/components/Sidebar';
import TopNavbar from '@/components/TopNavbar';
import { Zap, Users, FileText, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MembersContent from '@/components/MembersContent'; // <-- Import baru
import SettingsContent from '@/components/SettingsContent'; // <-- Import baru

// Interface untuk Stat Card
interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
}

// Card Statistik Sederhana
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
    // Menggunakan Card shadcn/ui
    <Card className="flex items-center space-x-4 p-4 hover:shadow-lg transition">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-400">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
    </Card>
);

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground"> {/* Menggunakan kelas shadcn */}
      
      <Sidebar />
      <TopNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Konten Utama */}
      <main className="lg:ml-64 pt-24 p-6"> 
        
        <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard Petisi</h1>

        {/* Baris Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" id="stats">
            <StatCard title="Total Anggota (NFT)" value="1,245" icon={Users} />
            <StatCard title="Petisi Aktif" value="45" icon={FileText} /> 
            <StatCard title="Dana Terkunci (Boost)" value="890 CAMP" icon={Zap} />
        </div>

        {/* Konten Utama: Grid Petisi dan Formulir */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> 
          
          {/* Kolom Kiri: Membership Gate & Form */}
          <div className="lg:col-span-1 space-y-6" id="create">
            <Card className="h-full scroll-mt-24"> {/* Tambahkan scroll-mt-24 */}
                <CardHeader>
                    <CardTitle className="text-xl">Buat Petisi Baru</CardTitle>
                </CardHeader>
                <CardContent>
                    <MembershipGate>
                        <CreatePetitionForm />
                    </MembershipGate>
                </CardContent>
            </Card>
          </div>
          
          {/* Kolom Kanan: Daftar Petisi */}
          <div className="lg:col-span-2">
            <Card className="h-full p-0">
                <CardHeader>
                    <CardTitle className="text-xl">Petisi Aktif</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <MembershipGate>
                        <PetitionList />
                    </MembershipGate>
                </CardContent>
            </Card>
          </div>
        </div>

        {/* ================================== */}
        {/* SEKSI TAMBAHAN DARI SIDEBAR */}
        {/* ================================== */}
        <div className="mt-10 space-y-8">
            <MembersContent /> {/* Bagian Anggota */}
            <SettingsContent /> {/* Bagian Pengaturan */}
        </div>

      </main>
    </div>
  );
}