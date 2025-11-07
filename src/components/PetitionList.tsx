// src/components/PetitionList.tsx

import React from 'react';
import { usePetitions } from '@/hooks/usePetitions';
import { format } from 'date-fns';
import { UserPlus, Clock, Zap } from 'lucide-react'; 

const PetitionList: React.FC = () => {
  const { petitions, signPetition, isConnected, loading } = usePetitions();

  const currentTimeInSeconds = BigInt(Math.floor(Date.now() / 1000));

  const handleSign = (id: bigint) => {
    if (!isConnected) return; // Hook handle error saat !isConnected
    signPetition(id);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
      <h2 className="text-2xl font-bold border-b pb-3 mb-6 text-gray-800">
        Petisi Aktif ({petitions.length})
      </h2>
      
      {loading && (
        <div className="text-center p-8">
          <Zap className="w-8 h-8 mx-auto mb-3 text-indigo-500 animate-pulse" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      )}
      
      {!loading && petitions.length === 0 && (
        <p className="p-4 text-center text-gray-500">Belum ada petisi yang tercatat di blockchain.</p>
      )}

      <div className="space-y-6">
        {petitions.map((p) => (
          <div key={p.id.toString()} className="border p-5 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-gray-50">
            
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-extrabold text-indigo-700">{p.title}</h3>
                
                {/* Badge Boost: KOREKSI ADA DI BARIS BAWAH INI */}
                {p.boostEndTime > currentTimeInSeconds && (
                    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>BOOSTED</span>
                    </span>
                )}
            </div>
            
            <p className="text-gray-700 mt-2 text-sm italic line-clamp-3">{p.description}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600 border-t border-gray-200 pt-3">
                <div className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-lg text-green-700">{p.signatureCount.toString()} Tanda Tangan</span>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Dibuat: {format(Number(p.createdAt) * 1000, 'dd MMM yyyy')}</span>
                </div>
                
                <p className="col-span-2 text-xs truncate">
                    **Creator:** {p.creator}
                </p>
            </div>

            {/* Tombol Tanda Tangan */}
            <button 
              className={`mt-4 w-full p-3 rounded-lg text-white font-semibold transition flex items-center justify-center space-x-2
                ${!isConnected ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-md'}`}
              onClick={() => handleSign(p.id)}
              disabled={loading || !isConnected}
            >
              {isConnected ? (
                <span className="flex items-center"><UserPlus className="w-4 h-4 mr-2" /> Tandatangani Petisi Gasless</span>
              ) : (
                'Hubungkan Dompet'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetitionList;