// components/MembershipGate.tsx
'use client'

import React from 'react';
import { useMembership } from '@/hooks/useMembership';

interface MembershipGateProps {
  children: React.ReactNode;
}

const MembershipGate: React.FC<MembershipGateProps> = ({ children }) => {
  const { isMember, loading, mintMembership, isConnected } = useMembership();

  if (!isConnected) {
    return (
      <div className="p-8 bg-yellow-100 border border-yellow-300 rounded-xl text-center">
        <h2 className="text-xl font-bold text-yellow-800">Harap Hubungkan Dompet</h2>
        <p className="mt-2 text-gray-700">Akses fitur Petisi memerlukan koneksi dompet di jaringan Lisk Sepolia.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 bg-blue-100 border border-blue-300 rounded-xl text-center">
        <p className="text-blue-800 font-semibold">Memeriksa Status Keanggotaan...</p>
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="p-8 bg-red-100 border border-red-300 rounded-xl text-center space-y-4">
        <h2 className="text-xl font-bold text-red-800">Dibutuhkan Keanggotaan SofcialFi</h2>
        <p className="text-gray-700">Untuk membuat atau menandatangani petisi, Anda harus menjadi anggota dengan me-mint NFT Soulbound (GRATIS/Gasless).</p>
        <button 
          onClick={mintMembership} 
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {loading ? 'Memproses Minting...' : 'Mint Keanggotaan Sekarang (Gasless)'}
        </button>
      </div>
    );
  }

  // Jika sudah menjadi member
  return <>{children}</>;
};

export default MembershipGate;