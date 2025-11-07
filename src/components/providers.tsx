// components/providers.tsx
'use client'

import { PannaProvider } from 'panna-sdk'
import { Toaster } from 'sonner' // <-- Import Toaster dari sonner
// Import ThemeProvider dari shadcn/ui jika Anda menggunakannya

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PannaProvider
      clientId={process.env.NEXT_PUBLIC_PANNA_CLIENT_ID}
      partnerId={process.env.NEXT_PUBLIC_PANNA_PARTNER_ID}
    >
      {/* Tambahkan ThemeProvider di sini jika ada */}
      {children}
      <Toaster position="bottom-right" richColors /> {/* <-- Komponen Toaster Sonner */}
    </PannaProvider>
  )
}