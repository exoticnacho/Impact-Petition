// src/lib/contract.ts
import { liskSepolia } from 'panna-sdk'
import { prepareContractCall, sendTransaction, readContract } from 'thirdweb/transaction'
import { getContract } from 'thirdweb/contract'
import { toWei } from 'thirdweb/utils'
import {
    CAMPAIGN_TOKEN_CONTRACT_ADDRESS, // <-- Impor Campaign Token Address
    CAMPAIGN_TOKEN_ABI,              // <-- Impor Campaign Token ABI
    PETITION_PLATFORM_CONTRACT_ADDRESS,
    PETITION_PLATFORM_ABI,           // <-- KOREKSI: Wajib diimpor
    CAMPAIGN_FEE,                    // <-- Impor biaya token
    PETITION_BASE_PRICE,             // <-- Jika masih mendukung ETH
    Petition                         // <-- KOREKSI: Wajib diimpor
} from '@/types/contracts'


// ============================================
// PARSER & CONFIG
// ============================================

// Konversi data kontrak mentah menjadi objek Petisi
export function parsePetitionData(rawPetition: any): Petition {
    const isArray = Array.isArray(rawPetition)
    // Adaptasi parser sesuai dengan struktur Petition struct
    return {
        id: BigInt(isArray ? rawPetition[0] ?? 0 : rawPetition.id ?? 0),
        title: isArray ? rawPetition[1] ?? '' : rawPetition.title ?? '',
        description: isArray ? rawPetition[2] ?? '' : rawPetition.description ?? '',
        imageHash: isArray ? rawPetition[3] ?? '' : rawPetition.imageHash ?? '',
        creator: isArray ? rawPetition[4] ?? '' : rawPetition.creator ?? '',
        createdAt: BigInt(isArray ? rawPetition[5] ?? 0 : rawPetition.createdAt ?? 0),
        boostEndTime: BigInt(isArray ? rawPetition[6] ?? 0 : rawPetition.boostEndTime ?? 0),
        boostPriority: BigInt(isArray ? rawPetition[7] ?? 0 : rawPetition.boostPriority ?? 0),
        signatureCount: BigInt(isArray ? rawPetition[8] ?? 0 : rawPetition.signatureCount ?? 0),
    };
}

const getPetitionContract = (client: any) => getContract({
    client,
    chain: liskSepolia,
    address: PETITION_PLATFORM_CONTRACT_ADDRESS,
    abi: PETITION_PLATFORM_ABI as any, // Cast ABI yang diimpor
});

const getCampaignTokenContract = (client: any) => getContract({
    client,
    chain: liskSepolia,
    address: CAMPAIGN_TOKEN_CONTRACT_ADDRESS,
    abi: CAMPAIGN_TOKEN_ABI as any,
});

// ============================================
// CONTRACT READ FUNCTIONS (Read-only)
// ============================================

export async function fetchAllPetitions(client: any): Promise<Petition[]> {
    const contract = getPetitionContract(client);

    const rawPetitions = await readContract({
        contract,
        method: 'getAllPetitions', // Fungsi dari ABI Anda
        params: [],
    });

    // rawPetitions adalah array dari tuple, kita perlu map dan parse
    return rawPetitions.map(parsePetitionData);
}

// ============================================
// CONTRACT WRITE FUNCTIONS (Mengubah state, Gasless via Panna SDK)
// ============================================

// Membuat Petisi Baru (Payable)
export async function createPetition(
    client: any, 
    account: any, 
    title: string, 
    description: string, 
    imageHash: string,
    useToken: boolean = true // <-- Default ke TRUE jika user ingin bayar token
) {
    const contract = getPetitionContract(client);
    
    const txOptions = {
        // Jika menggunakan token, value harus 0. Jika tidak, kirim ETH.
        value: useToken ? BigInt(0) : toWei(PETITION_BASE_PRICE), 
    };

    const tx = prepareContractCall({
        contract,
        method: 'createPetition',
        params: [title, description, imageHash, useToken], // <-- _useToken diatur di sini
        value: txOptions.value, 
    });

    const result = await sendTransaction({ account, transaction: tx });
    return result;
}

// Menandatangani Petisi (Non-Payable, Gasless)
export async function signPetition(client: any, account: any, petitionId: bigint) {
    const contract = getPetitionContract(client);

    const tx = prepareContractCall({
        contract,
        method: 'signPetition',
        params: [petitionId],
    });

    const result = await sendTransaction({
        account,
        transaction: tx,
    });
    
    // await waitForReceipt(result);
    return result;
}

export async function approveCampaignToken(client: any, account: any, amount: string) {
    const tokenContract = getCampaignTokenContract(client);
    
    // Jumlah token yang akan di-approve (dikonversi ke Wei/BigInt)
    const amountInWei = toWei(amount); 

    const tx = prepareContractCall({
        contract: tokenContract, // <-- KOREKSI: Menggunakan 'contract' untuk kontrak ERC-20
        method: 'approve', // Fungsi ERC-20 Approve
        params: [
            PETITION_PLATFORM_CONTRACT_ADDRESS, // Spender: Kontrak PetitionPlatform
            amountInWei
        ],
    });

    return sendTransaction({ account, transaction: tx });
}