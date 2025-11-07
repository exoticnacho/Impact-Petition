// src/components/PetitionList.tsx
'use client'

import React from 'react';
import { usePetitions } from '@/hooks/usePetitions';
import { format } from 'date-fns';
import { UserPlus, Clock, Zap, Loader2 } from 'lucide-react'; 
import { Button } from '@/components/ui/button'; // Import Button shadcn/ui

const PetitionList: React.FC = () => {
  const { petitions, signPetition, isConnected, loading } = usePetitions();

  const currentTimeInSeconds = BigInt(Math.floor(Date.now() / 1000));

  const handleSign = (id: bigint) => {
    if (!isConnected) return;
    signPetition(id);
  };

  return (
    <div className="p-4">
      
      {loading && (
        <div className="text-center p-8">
          <Loader2 className="w-8 h-8 mx-auto mb-3 text-primary animate-spin" />
          <p className="text-muted-foreground">Memuat petisi aktif dari Lisk Sepolia...</p>
        </div>
      )}
      
      {!loading && petitions.length === 0 && (
        <div className="p-8 text-center bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Tidak ada petisi aktif. Jadilah yang pertama!</p>
        </div>
      )}

      <div className="space-y-6">
        {petitions.map((p) => (
          // Kartu Petisi
          <div key={p.id.toString()} className="border border-border p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-card">
            
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-primary">{p.title}</h3>
                
                {/* Badge Boost: Sekarang membandingkan dua BigInt integer */}
                {p.boostEndTime > currentTimeInSeconds && ( 
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-400">
                        <Zap className="w-3 h-3 mr-1" />
                        Featured Boost
                    </span>
                )}
            </div>
            
            <p className="text-muted-foreground mt-2 text-sm line-clamp-2">{p.description}</p>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm border-t border-border pt-4">
                
                {/* Tanda Tangan */}
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">TANDA TANGAN</span>
                    <span className="font-extrabold text-xl text-green-600">{p.signatureCount.toString()}</span>
                </div>
                
                {/* Creator */}
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">CREATOR</span>
                    <span className="text-sm truncate">{p.creator.slice(0, 6)}...{p.creator.slice(-4)}</span>
                </div>

                {/* Tanggal Dibuat */}
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">DIBUAT PADA</span>
                    <span className="text-sm">{format(Number(p.createdAt) * 1000, 'dd MMM yyyy')}</span>
                </div>
            </div>

            {/* Tombol Tanda Tangan */}
            <Button
              onClick={() => handleSign(p.id)}
              disabled={loading || !isConnected}
              className="mt-4 w-full h-10"
              variant={isConnected ? "outline" : "secondary"}
            >
              {isConnected ? (
                <span className="flex items-center"><UserPlus className="w-4 h-4 mr-2" /> Tandatangani Petisi</span>
              ) : (
                'Hubungkan Dompet'
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetitionList;