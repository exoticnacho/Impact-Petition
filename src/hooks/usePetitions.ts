// hooks/usePetitions.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useActiveAccount, usePanna } from 'panna-sdk'
import { toast } from 'sonner' 

// --- PISAHKAN IMPOR INI ---
// 1. Impor fungsi (write/read) dari lib/contract.ts
import { 
    fetchAllPetitions, 
    createPetition as createPetitionContract,
    signPetition as signPetitionContract,
    approveCampaignToken,
} from '@/lib/contract' // <-- Hanya fungsi yang diimpor dari sini

// 2. Impor tipe dan konstanta dari types/contracts.ts
import { 
    Petition, 
    PETITION_BASE_PRICE,
    CAMPAIGN_FEE,
} from '@/types/contracts' // <-- PENTING: Import tipe dan konstanta dari sini

export function usePetitions() {
  const activeAccount = useActiveAccount(); 
  const { client } = usePanna(); 

  const isConnected = !!activeAccount && !!client;
  const address = activeAccount?.address || null;
  const account = activeAccount;

  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fungsi untuk mengambil daftar petisi
  const loadPetitions = useCallback(async (silent = false) => {
    if (!client) return;

    if (!silent) setLoading(true);
    setError(null);

    try {
      const fetchedPetitions = await fetchAllPetitions(client);
      setPetitions(fetchedPetitions);
    } catch (err) {
      console.error('Error fetching petitions:', err);
      setError(err as Error);
      if (!silent) {
        // Panggilan toast sonner:
        toast.error('Gagal mengambil data petisi.', {
          description: 'Periksa koneksi jaringan Lisk Sepolia Anda.',
        });
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [client]);


  // 1. Fungsi Write: Membuat Petisi
  const createPetition = useCallback(async (
    title: string, 
    description: string, 
    imageHash: string,
    payWithToken: boolean = true
  ) => {
    if (!client || !account) {
      toast.error('Wallet belum terkoneksi', {
        description: 'Silakan connect wallet terlebih dahulu.',
      });
      return;
    }

    setLoading(true);
    try {
        if (payWithToken) {
            // LANGKAH A: APPROVE TOKEN TERLEBIH DAHULU
            toast.info('Meminta Izin Token...', {
                description: `Harap setujui penggunaan ${CAMPAIGN_FEE} Token Campaign oleh kontrak Petisi. (Gasless)`,
            });
            await approveCampaignToken(client, account, CAMPAIGN_FEE);

            toast.info('Approval berhasil. Mengirim Petisi...', {
                description: 'Sekarang Petisi Anda akan dibuat menggunakan token.',
            });
        }
        const tx = await createPetitionContract(
          client, 
          account, 
          title, 
          description, 
          imageHash, 
          payWithToken
        );
      
        toast.success('Petisi Berhasil Dibuat!', {
              description: `Transaksi dikirim. Biaya: ${payWithToken ? CAMPAIGN_FEE + ' Token' : PETITION_BASE_PRICE + ' ETH/Lisk'}.`,
          });

          await loadPetitions(true);
          return tx;
      } catch (err: any) {
          // ... (Error handling)
      } finally {
          setLoading(false);
      }
  }, [client, account, loadPetitions]);


  // 2. Fungsi Write: Menandatangani Petisi
  const signPetition = useCallback(async (petitionId: bigint) => {
    if (!client || !account) {
      toast.error('Wallet belum terkoneksi', {
        description: 'Silakan connect wallet terlebih dahulu.',
      });
      return;
    }

    setLoading(true);
    try {
      const tx = await signPetitionContract(client, account, petitionId);
      
      toast.info('Transaksi Sedang Diproses', {
        description: 'Tanda tangan Anda sedang diverifikasi. Gasless transaksi via Panna SDK!',
      });
      
      // Tunggu konfirmasi di sini (opsional, tergantung UX yang diinginkan)
      // await tx.wait(); 

      await loadPetitions(true);
    } catch (err: any) {
      console.error('Error signing petition:', err);
      toast.error('Gagal menandatangani petisi.', {
        description: err.message || 'Mungkin Anda sudah tanda tangan atau ada masalah jaringan.',
      });
    } finally {
      setLoading(false);
    }
  }, [client, account, loadPetitions]);

  // Auto-fetch logic (tidak berubah)
  useEffect(() => {
    if (isConnected) {
      loadPetitions();
    }
  }, [isConnected, loadPetitions]);

  useEffect(() => {
    if (!isConnected) return;
    const intervalId = setInterval(() => {
      loadPetitions(true);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isConnected, loadPetitions]);


  return {
    address,
    isConnected,
    petitions,
    loading,
    error,
    createPetition,
    signPetition,
    refreshPetitions: loadPetitions,
  };
}