// src/components/SettingsContent.tsx
import { Settings, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SettingsContent = () => {
    return (
        <Card id="settings" className="scroll-mt-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-indigo-500" />
                    Pengaturan Akun & Keamanan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                
                {/* Bagian 1: Detail Keanggotaan */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Shield /> Status Keanggotaan</h3>
                    <p className="text-muted-foreground">NFT Soulbound Member Anda: **AKTIF** (Tidak dapat dipindahtangankan).</p>
                    <Button variant="secondary" disabled>Lihat NFT Metadata</Button>
                </div>

                <Separator />

                {/* Bagian 2: Pengaturan Notifikasi */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Notifikasi</h3>
                    <p className="text-muted-foreground">Kelola notifikasi terkait status petisi Anda.</p>
                    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <Input placeholder="Alamat email (Konseptual)" className="flex-1" />
                        <Button>Simpan</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SettingsContent;