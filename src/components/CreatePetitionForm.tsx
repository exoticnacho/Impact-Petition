// components/CreatePetitionForm.tsx
'use client'

import React, { useState } from 'react';
import { usePetitions } from '@/hooks/usePetitions';
import { PETITION_BASE_PRICE } from '@/types/contracts';

const CreatePetitionForm: React.FC = () => {
  const { createPetition, isConnected, loading } = usePetitions();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return alert("Harap hubungkan dompet Anda.");

    // Ganti dengan hash IPFS yang sebenarnya setelah mengunggah gambar
    const placeholderImageHash = "QmVXz..._IPFS_Hash"; 
    
    await createPetition(title, description, placeholderImageHash);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Buat Petisi Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Judul Petisi (Maks 100 Karakter)" 
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Deskripsi Lengkap Petisi" 
          required
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        
        <p className="text-sm text-gray-500">Biaya Dasar: {PETITION_BASE_PRICE} ETH/Lisk (Dibayar saat transaksi)</p>

        <button 
          type="submit" 
          disabled={loading || !isConnected}
          className={`w-full p-3 rounded-lg text-white font-semibold transition ${loading || !isConnected ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? "Memproses..." : isConnected ? "Buat Petisi di Blockchain" : "Hubungkan Dompet"}
        </button>
      </form>
    </div>
  );
};

export default CreatePetitionForm;