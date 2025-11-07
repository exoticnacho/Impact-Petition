// src/app/page.tsx
'use client'

import React from 'react';
import { LoginButton, liskSepolia } from 'panna-sdk';
import PetitionList from '@/components/PetitionList';
import CreatePetitionForm from '@/components/CreatePetitionForm';
import MembershipGate from '@/components/MembershipGate';

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-800">
          Petition Platform (Lisk Sepolia)
        </h1>
        
        {/* Hapus semua styling dari elemen LoginButton */}
        <div className="mt-4">
            <LoginButton 
                // Mengarahkan koneksi ke jaringan Lisk Sepolia
                chain={liskSepolia} 
                // HAPUS: className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
                {/* Teks dan styling tombol akan dikelola oleh Panna SDK */}
            </LoginButton>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MembershipGate>
          <div className="lg:col-span-1">
            <CreatePetitionForm />
          </div>
          <div className="lg:col-span-2">
            <PetitionList />
          </div>
        </MembershipGate>
      </main>
    </div>
  );
}