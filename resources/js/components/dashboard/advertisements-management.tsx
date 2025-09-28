'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { Building, Edit, Eye, ImageIcon, MoreHorizontal, Plus, Search, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AdvertisementModal } from './advertisement-modal';

type Advertisement = {
    id: number;
    owner: string;
    brand: string;
    no_hp: string;
    status: 'active' | 'nonactive';
    type: string;
    image: string;
    createdAt: string;
    updatedAt: string;
};

const advertisementTypes = [
    '1-1',
    '2-1',
    '728-90',
    'HeaderDeks',
    'HeaderMob',
    'News',
    'KategoriDeks',
    'KategoriMob',
    'SidebarDeks',
    'SidebarMob',
    'ShowMob',
    'ShowDeks',
];

export function AdvertisementsManagement({ mockAdvertisements }: any) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>(mockAdvertisements);
    useEffect(() => {
        setAdvertisements(mockAdvertisements);
    }, [mockAdvertisements]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdvertisement, setEditingAdvertisement] = useState<Advertisement | undefined>();
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    const { toast } = useToast();

    const filteredAdvertisements = advertisements.filter((ad) => {
        const matchesSearch =
            ad.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.no_hp.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || ad.type === filterType;
        const matchesStatus = filterStatus === 'all' || ad.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const handleDelete = (id: number) => {
        const advertisement = advertisements.find((ad) => ad.id === id);
        if (confirm(`Apakah Anda yakin ingin menghapus iklan "${advertisement?.brand}"?`)) {
            router.delete(route('iklan.delete', id), {
                onSuccess: () => {
                    setAdvertisements(advertisements.filter((ad) => ad.id !== id));
                    toast({
                        title: 'Iklan Dihapus!',
                        description: `Iklan "${advertisement?.brand}" berhasil dihapus.`,
                    });
                },
            });
        }
    };

    const toggleStatus = (id: number) => {
        const advertisement = advertisements.find((ad) => ad.id === id);
        const newStatus = advertisement?.status === 'active' ? 'nonactive' : 'active';

        setAdvertisements(
            advertisements.map((ad) => (ad.id === id ? { ...ad, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : ad)),
        );

        toast({
            title: 'Status Diperbarui!',
            description: `Iklan "${advertisement?.brand}" berhasil di${newStatus === 'active' ? 'aktifkan' : 'nonaktifkan'}.`,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'nonactive':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCreateAdvertisement = () => {
        setModalMode('create');
        setEditingAdvertisement(undefined);
        setIsModalOpen(true);
    };

    const handleEditAdvertisement = (advertisement: Advertisement) => {
        setModalMode('edit');
        setEditingAdvertisement(advertisement);
        setIsModalOpen(true);
    };

    const handleSaveAdvertisement = (ad: Advertisement) => {
        const exists = advertisements.some((a) => a.id === ad.id);

        if (exists) {
            // update
            setAdvertisements(advertisements.map((item) => (item.id === ad.id ? { ...item, ...ad } : item)));
        } else {
            // insert
            setAdvertisements([ad, ...advertisements]);
        }
    };

    const activeAds = advertisements.filter((ad) => ad.status === 'active').length;
    const inactiveAds = advertisements.filter((ad) => ad.status === 'nonactive').length;

    return (
        <div className="m-4 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Iklan</p>
                                <p className="text-2xl font-bold text-blue-600">{advertisements.length}</p>
                            </div>
                            <ImageIcon className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Iklan Aktif</p>
                                <p className="text-2xl font-bold text-green-600">{activeAds}</p>
                            </div>
                            <Eye className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Iklan Nonaktif</p>
                                <p className="text-2xl font-bold text-red-600">{inactiveAds}</p>
                            </div>
                            <Eye className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Brand</p>
                                <p className="text-2xl font-bold text-purple-600">{new Set(advertisements.map((ad) => ad.brand)).size}</p>
                            </div>
                            <Building className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Cari berdasarkan owner, brand, atau kontak..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Tipe: {filterType === 'all' ? 'Semua' : filterType}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setFilterType('all')}>Semua Tipe</DropdownMenuItem>
                                {advertisementTypes.map((type) => (
                                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                                        {type}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Status: {filterStatus === 'all' ? 'Semua' : filterStatus === 'active' ? 'Aktif' : 'Nonaktif'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setFilterStatus('all')}>Semua Status</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterStatus('active')}>Aktif</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterStatus('nonactive')}>Nonaktif</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            {/* Advertisements Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Manajemen Iklan ({filteredAdvertisements.length})</CardTitle>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateAdvertisement}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Iklan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Brand & Owner</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Kontak</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Tipe</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Gambar</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAdvertisements.map((ad: any, index: any) => (
                                    <tr key={ad.id || index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{ad.brand}</h3>
                                                <p className="flex items-center text-sm text-gray-600">
                                                    <Users className="mr-1 h-3 w-3" />
                                                    {ad.owner}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="max-w-xs text-sm text-gray-600">{ad.no_hp}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge className="bg-blue-100 text-blue-800">{ad.type}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge className={getStatusColor(ad.status)}>{ad.status === 'active' ? 'Aktif' : 'Nonaktif'}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-10 w-16 overflow-hidden rounded bg-gray-200">
                                                <img
                                                    src={`/storage/${ad.image}` || '/placeholder.svg'}
                                                    alt={ad.brand}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditAdvertisement(ad)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toggleStatus(ad.id)}>
                                                        {ad.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(ad.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <AdvertisementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} advertisement={editingAdvertisement} mode={modalMode} />
        </div>
    );
}
