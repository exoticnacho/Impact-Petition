// src/components/CreatePetitionForm.tsx
'use client'

import React, { useState } from 'react';
import { usePetitions } from '@/hooks/usePetitions';
import { PETITION_BASE_PRICE } from '@/types/contracts';
import { Send, Loader2 } from 'lucide-react';
// Import komponen UI shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CreatePetitionForm: React.FC = () => {
  const { createPetition, isConnected, loading } = usePetitions();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;

    const placeholderImageHash = "QmVXz..._IPFS_Hash"; 
    
    await createPetition(title, description, placeholderImageHash, true); 
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Input Judul */}
      <div className="space-y-1">
          <Label htmlFor="title">Judul Petisi</Label>
          <Input 
            id="title"
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Tulis judul petisi Anda..." 
            required
            maxLength={100}
          />
      </div>

      {/* Textarea Deskripsi */}
      <div className="space-y-1">
          <Label htmlFor="description">Deskripsi Lengkap</Label>
          <Textarea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Jelaskan tujuan dan dampak petisi..." 
            required
            rows={5}
          />
      </div>
      
      {/* Biaya */}
      <div className="pt-2">
          {/* Menggunakan kelas shadcn untuk Alert/Info */}
          <p className="text-sm text-secondary-foreground bg-secondary p-3 rounded-lg border border-border font-medium">
              Biaya Platform: **{PETITION_BASE_PRICE} CampaignToken** (Gasless).
          </p>
      </div>

      {/* Tombol Submit */}
      <Button 
        type="submit" 
        disabled={loading || !isConnected}
        className="w-full h-12"
        variant={isConnected ? "default" : "secondary"} // Default = warna utama Impact Chain
      >
        {loading ? (
          <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memproses...</span>
        ) : !isConnected ? (
          'Hubungkan Dompet'
        ) : (
          <span className="flex items-center"><Send className="w-4 h-4 mr-2" /> Buat Petisi</span>
        )}
      </Button>
    </form>
  );
};

export default CreatePetitionForm;