// src/app/page.tsx
'use client'

import React from 'react';
import { LoginButton, liskSepolia } from 'panna-sdk';
import PetitionList from '@/components/PetitionList';
import CreatePetitionForm from '@/components/CreatePetitionForm';
import MembershipGate from '@/components/MembershipGate';
import { useActiveAccount } from 'panna-sdk'; 

export default function Home() {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address || 'Belum Terhubung';
  const displayAddress = address !== 'Belum Terhubung' ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8"> 
      
      {/* Header (Top Navbar Style) */}
      <header className="max-w-7xl mx-auto mb-10 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            SofcialFi Petition Hub 🗳️
        </h1>
        
        {/* Wallet & Login Button */}
        <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600 hidden sm:block">
                Status: {displayAddress}
            </span>
            
            {/* WRAP LoginButton dalam DIV untuk styling, dan HAPUS className dari LoginButton */}
            <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <LoginButton 
                    chain={liskSepolia} 
                    // CLASSNAME DIHAPUS DARI SINI
                    // Anda dapat menambahkan custom styling *ke dalam* LoginButton 
                    // (sesuai docs Panna), tetapi tidak sebagai className prop.
                />
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        
        {/* Layout Grid: 1/3 untuk Form, 2/3 untuk Daftar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> 
          
          {/* Kolom Kiri: Membership Gate & Form */}
          <div className="lg:col-span-1 space-y-6">
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