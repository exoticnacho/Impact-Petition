// hooks/useMembership.ts
'use client'

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useActiveAccount, usePanna } from 'panna-sdk';
import { prepareContractCall, readContract, sendTransaction } from 'thirdweb/transaction';
import { getContract } from 'thirdweb/contract';
import { liskSepolia } from 'panna-sdk';
import {
    SOULBOUND_MEMBER_CONTRACT_ADDRESS,
    SOULBOUND_MEMBER_ABI,
} from '@/types/contracts';

// Inisialisasi kontrak SoulboundMember
const getSoulboundContract = (client: any) => getContract({
    client,
    chain: liskSepolia,
    address: SOULBOUND_MEMBER_CONTRACT_ADDRESS,
    abi: SOULBOUND_MEMBER_ABI as any,
});

export function useMembership() {
    const { client } = usePanna();
    const activeAccount = useActiveAccount();
    const address = activeAccount?.address || null;
    const account = activeAccount;
    const isConnected = !!address;

    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(false);

    // 1. Fungsi Baca: Cek Status Keanggotaan
    const checkMembership = useCallback(async (userAddress: string) => {
        if (!client || !userAddress) return false;
        
        try {
            const contract = getSoulboundContract(client);
            // Panggil isMember(address user)
            const memberStatus: boolean = await readContract({
                contract,
                method: 'isMember', // Fungsi dari ABI SoulboundMember
                params: [userAddress],
            });
            setIsMember(memberStatus);
            return memberStatus;
        } catch (e) {
            console.error("Gagal cek keanggotaan:", e);
            return false;
        }
    }, [client]);

    // 2. Fungsi Tulis: Mint Soulbound NFT (Keanggotaan)
    const mintMembership = useCallback(async () => {
        if (!client || !account) {
            toast.error('Wallet belum terkoneksi', { description: 'Silakan connect wallet terlebih dahulu.' });
            return;
        }

        setLoading(true);
        try {
            const contract = getSoulboundContract(client);
            
            const tx = prepareContractCall({
                contract,
                method: 'mintMembership', // Fungsi dari ABI SoulboundMember
                params: [],
            });

            const result = await sendTransaction({ account, transaction: tx });
            
            toast.info('Transaksi Sedang Diproses', { description: 'Minting keanggotaan gasless! Harap tunggu konfirmasi.' });
            
            // Re-check status setelah transaksi terkirim
            await checkMembership(address!);
            
            toast.success('Selamat!', { description: 'Keanggotaan Soulbound berhasil di-mint!' });
            
            return result;
        } catch (e: any) {
            console.error("Gagal mint keanggotaan:", e);
            toast.error('Gagal Mint Keanggotaan', { description: e.message || 'Terjadi kesalahan. Mungkin Anda sudah menjadi member.' });
        } finally {
            setLoading(false);
        }
    }, [client, account, address, checkMembership]);

    // Auto-check saat alamat berubah
    useEffect(() => {
        if (address) {
            checkMembership(address);
        } else {
            setIsMember(false);
        }
    }, [address, checkMembership]);

    return {
        isMember,
        loading,
        mintMembership,
        checkMembership,
        isConnected
    };
}