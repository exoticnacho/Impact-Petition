// src/components/MembersContent.tsx
import { Users, LayoutList } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MembersContent = () => {
    // Placeholder data (gunakan data API nyata jika tersedia)
    const membersList = [
        { address: '0xF933...b5f7', status: 'Active', petitions: 12 },
        { address: '0x7D3e...7B30', status: 'New', petitions: 3 },
        { address: '0x4Ec2...14D8b', status: 'Creator', petitions: 25 },
    ];

    return (
        <Card id="members" className="scroll-mt-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-500" />
                    Anggota Komunitas & Soulbound NFTs
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Daftar ini menampilkan contoh dompet yang telah me-*mint* NFT Soulbound Member (SBTM).
                </p>
                <Separator className="my-4" />
                <div className="space-y-3">
                    {membersList.map((member, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                            <span className="font-mono text-sm truncate">{member.address}</span>
                            <div className="flex items-center space-x-4 text-xs font-semibold">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{member.status}</span>
                                <span className="text-muted-foreground">{member.petitions} Petisi</span>
                            </div>
                        </div>
                    ))}
                    <p className="text-sm text-center text-muted-foreground pt-4">... Data dari kontrak SoulboundMember ...</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default MembersContent;