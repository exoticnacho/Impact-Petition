# 🗳️ SofcialFi Petition Platform (Lisk Sepolia)

Aplikasi **frontend terdesentralisasi (dApp)** untuk **SofcialFi Petition Platform** yang di-*deploy* di **Lisk Sepolia Testnet**.  
Proyek ini memungkinkan pengguna untuk **membuat, melihat, dan menandatangani petisi on-chain** dengan pengalaman pengguna yang mulus berkat **Gasless Transactions** yang disediakan oleh **Panna SDK**.

---

## 🚀 Fitur Utama

- ⚡ **Gasless Transactions:**  
  Semua transaksi yang mengubah *state* (Mint Keanggotaan, Approve Token, Buat Petisi, Tanda Tangan) disubsidi biaya gasnya oleh **Paymaster Panna SDK**.

- 🧩 **Multi-Kontrak:**  
  Interaksi dengan tiga kontrak utama:
  - `PetitionPlatform`
  - `CampaignToken` (Token Biaya)
  - `SoulboundMember` (NFT Keanggotaan Soulbound)

- 🔐 **Membership Gate:**  
  Pengguna diwajibkan untuk *mint* NFT **Soulbound Member** terlebih dahulu sebelum dapat membuat atau menandatangani petisi.

- 💰 **Pembayaran Token:**  
  Biaya pembuatan petisi dibayar menggunakan **CampaignToken (ERC-20)**, bukan ETH *native*.

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router), React, TypeScript | Kerangka kerja dApp modern. |
| **Web3 Core** | Panna SDK | Wallet Connection & **Account Abstraction (Gasless)**. |
| **Kontrak** | Thirdweb SDK, Ethers v6 | Memformat dan mengirim interaksi *smart contract*. |
| **Styling** | Tailwind CSS | Framework CSS utility-first. |
| **Notifikasi** | Sonner | Toast notifications untuk *feedback* transaksi. |

---

## 📦 Instalasi & Setup

```bash
# 1️⃣ Kloning repositori
git clone https://github.com/exoticnacho/Impact-Petition
cd petition-platform-dapp

# 2️⃣ Instal dependensi
npm install
# atau
yarn install

# 3️⃣ Buat file konfigurasi environment
.env.local
# ============================================
# KREDENSIAL PANNA SDK (Wajib untuk Gasless!)
# ============================================
NEXT_PUBLIC_PANNA_CLIENT_ID=YOUR_CLIENT_ID_DARI_PANNA
NEXT_PUBLIC_PANNA_PARTNER_ID=YOUR_PARTNER_ID_DARI_PANNA

# ============================================
# ALAMAT KONTRAK DI LISK SEPOLIA (Chain ID 4202)
# ============================================
NEXT_PUBLIC_PETITION_PLATFORM_ADDRESS=0x4Ec2EEc9D8071DBB9e4ba332e93d6624fF614D8b
NEXT_PUBLIC_CAMPAIGN_TOKEN_ADDRESS=0x7D3e8350c2a87b9d61816975CFe0cd18CC4e7B30
NEXT_PUBLIC_SOULBOUND_MEMBER_ADDRESS=0x9F090D06638f7d32915065d51BE2E737b8E6bDaB


# 4️⃣ Jalankan aplikasi
npm run dev
# Buka http://localhost:3000 di browser
> ⚠️ **Penting:** Jangan pernah *commit* file `.env.local` Anda ke Git.

---

## 🧪 Prasyarat Pengujian

Pastikan akun **MetaMask** Anda telah terhubung ke **Lisk Sepolia Testnet**, dan memiliki aset berikut:

| Aset | Keterangan |
| :--- | :--- |
| **Sepolia ETH Testnet Token** (≥ 0.005 ETH) | Diperlukan untuk pre-flight check simulasi transaksi (gas disubsidi tapi saldo dibutuhkan untuk validasi).<br>🪙 *Dapatkan dari:* [https://sepolia-faucet.lisk.com](https://sepolia-faucet.lisk.com) |
| **CampaignToken (CAMP)** | Diperlukan untuk membayar biaya pembuatan petisi. <br>Saldo minimal **0.001 CAMP** disarankan untuk transaksi `approve`. |

---

## ⚙️ Cara Menjalankan Aplikasi

```bash
yarn dev
