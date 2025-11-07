// src/components/CreatePetitionForm.tsx

import React, { useState } from 'react';
import { usePetitions } from '@/hooks/usePetitions';
import { PETITION_BASE_PRICE } from '@/types/contracts';
import { Send, FileText } from 'lucide-react'; 

const CreatePetitionForm: React.FC = () => {
  const { createPetition, isConnected, loading } = usePetitions();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return; // Hook handle error saat !isConnected

    const placeholderImageHash = "QmVXz..._IPFS_Hash"; 
    
    // Asumsi: Bayar dengan Token
    await createPetition(title, description, placeholderImageHash, true); 
    setTitle('');
    setDescription('');
  };

  return (
    // Catatan: Card styling sudah dipindahkan ke app/page.tsx
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Input Judul */}
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Petisi
          </label>
          <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Tulis judul petisi Anda di sini..." 
          required
          maxLength={100}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition"
          />
      </div>

      {/* Textarea Deskripsi */}
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Lengkap
          </label>
          <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Jelaskan tujuan dan dampak petisi..." 
          required
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition"
          />
      </div>
      
      {/* Biaya */}
      <div className="pt-2">
          <p className="text-xs text-gray-600 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
              Biaya Platform: **{PETITION_BASE_PRICE} CampaignToken** (Gasless).
          </p>
      </div>

      {/* Tombol Submit */}
      <button 
        type="submit" 
        disabled={loading || !isConnected}
        className={`w-full p-3 rounded-lg text-white font-semibold transition flex items-center justify-center space-x-2 
          ${loading || !isConnected ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
      >
        {loading ? (
          <span className="flex items-center"><Send className="w-4 h-4 mr-2 animate-pulse" /> Memproses Transaksi...</span>
        ) : !isConnected ? (
          'Hubungkan Dompet'
        ) : (
          <span className="flex items-center"><Send className="w-4 h-4 mr-2" /> Buat Petisi Gasless</span>
        )}
      </button>
    </form>
  );
};

export default CreatePetitionForm;