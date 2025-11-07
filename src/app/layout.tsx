import type { Metadata } from "next";
import { Providers } from "@/components/providers"; // <-- Impor Providers
import "./globals.css";

export const metadata: Metadata = {
  title: "Petition Platform",
  description: "A SofcialFi Petition DApp on Lisk Sepolia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {/* HARUS MEMBUNGKUS CHILDREN DENGAN PROVIDERS */}
        <Providers> 
          {children}
        </Providers>
      </body>
    </html>
  );
}