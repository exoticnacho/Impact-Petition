// src/components/MembershipGate.tsx
'use client';

import React from 'react';
import { Loader2, Zap, CheckCircle } from 'lucide-react';
import { useMembership } from '@/hooks/useMembership';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MembershipGateProps {
  children: React.ReactNode;
}

const MembershipGate: React.FC<MembershipGateProps> = ({ children }) => {
  const { isMember, loading, mintMembership, isConnected } = useMembership();

  if (!isConnected) {
    return (
      <Card className="border-yellow-500 bg-yellow-50/20 shadow-none col-span-full">
        <CardHeader>
          <CardTitle className="text-xl text-yellow-700">Wallet Disconnected</CardTitle>
          <CardDescription>Harap hubungkan dompet Anda melalui tombol di Navbar untuk melanjutkan.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="flex items-center justify-center h-48 col-span-full">
        <Loader2 className="w-8 h-8 mr-2 text-indigo-500 animate-spin" />
        <span className="text-muted-foreground">Checking Membership Status...</span>
      </Card>
    );
  }

  if (!isMember) {
    return (
      <Card className="border-indigo-500 bg-indigo-50/20 col-span-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-indigo-600 flex items-center gap-2"><Zap className="w-5 h-5" /> Membership Required</CardTitle>
          <CardDescription>Anda harus mint NFT Soulbound Member (SBTM) untuk dapat berinteraksi penuh dengan Petition Platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={mintMembership} 
            disabled={loading}
            // Tombol utama menggunakan warna tematik (Indigo)
            className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md h-12 text-lg"
          >
            <CheckCircle className="w-5 h-5 mr-3" />
            {loading ? 'Processing Minting...' : 'Mint Keanggotaan Sekarang (Gasless)'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Jika sudah menjadi member
  return <>{children}</>;
};

export default MembershipGate;