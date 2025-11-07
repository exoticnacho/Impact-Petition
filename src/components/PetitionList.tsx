// components/PetitionList.tsx
'use client'

import React from 'react';
import { usePetitions } from '@/hooks/usePetitions';
import { format } from 'date-fns';

const PetitionList: React.FC = () => {
  const { petitions, signPetition, isConnected, loading } = usePetitions();

  const handleSign = (id: bigint) => {
    if (!isConnected) return alert("Harap hubungkan dompet Anda untuk menandatangani.");
    signPetition(id);
  };

  return (
    <div className="space-y-6 p-6 border rounded-xl shadow-lg bg-white lg:col-span-2">
      <h2 className="text-2xl font-bold border-b pb-2">Daftar Petisi ({petitions.length})</h2>
      
      {loading && <p className="text-center p-4">Memuat Petisi dari Lisk Sepolia...</p>}
      
      {!loading && petitions.length === 0 && <p className="p-4">Belum ada petisi yang tercatat.</p>}

      <div className="space-y-4">
        {petitions.map((p) => (
          <div key={p.id.toString()} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50">
            <h3 className="text-xl font-bold text-blue-700">{p.title}</h3>
            <p className="text-gray-600 mt-1 text-sm">{p.description}</p>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <p><strong>Creator:</strong> {p.creator.slice(0, 6)}...{p.creator.slice(-4)}</p>
                <p><strong>Dibuat:</strong> {format(Number(p.createdAt) * 1000, 'dd MMM yyyy')}</p>
                <p className="text-lg font-extrabold text-green-700">Tanda Tangan: {p.signatureCount.toString()}</p>
            </div>

            <button 
              className={`mt-4 w-full p-2 rounded-lg text-white font-semibold transition 
                ${!isConnected ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
              onClick={() => handleSign(p.id)}
              disabled={loading || !isConnected}
            >
              {isConnected ? `Tandatangani Petisi ini (Gasless)` : 'Hubungkan Dompet'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetitionList;