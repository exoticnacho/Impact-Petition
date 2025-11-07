// src/components/MembershipGate.tsx

import React from 'react';
import { Loader2, Zap, ShieldOff, CheckCircle } from 'lucide-react';
import { useMembership } from '@/hooks/useMembership';

interface MembershipGateProps {
  children: React.ReactNode;
}

const MembershipGate: React.FC<MembershipGateProps> = ({ children }) => {
  const { isMember, loading, mintMembership, isConnected } = useMembership();

  if (!isConnected) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-300 rounded-xl text-center shadow-lg">
        <ShieldOff className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
        <h2 className="text-xl font-bold text-gray-800">Wallet Disconnected</h2>
        <p className="mt-2 text-gray-600">Harap hubungkan dompet Anda melalui tombol di atas untuk melihat konten aplikasi.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 bg-white rounded-xl shadow-lg">
        <Loader2 className="w-8 h-8 mr-2 text-indigo-500 animate-spin" />
        <span className="text-gray-500">Memeriksa Status Keanggotaan...</span>
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="p-8 bg-indigo-50 border border-indigo-300 rounded-xl text-center shadow-lg space-y-4">
        <Zap className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">Dibutuhkan Keanggotaan SofcialFi</h2>
        <p className="text-gray-600">Anda harus me-mint NFT Soulbound (SBTM) untuk dapat berinteraksi (membuat/menandatangani) petisi.</p>
        <button 
          onClick={mintMembership} 
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition flex items-center justify-center space-x-2 
            ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
        >
            <CheckCircle className="w-4 h-4" />
            {loading ? 'Memproses Minting...' : 'Mint Keanggotaan Sekarang (Gasless)'}
        </button>
      </div>
    );
  }

  // Jika sudah menjadi member
  return <>{children}</>;
};

export default MembershipGate;