'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { ImageIcon, Save, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const advertisementSchema = z.object({
    owner: z.string().min(3, 'Nama owner minimal 3 karakter').max(100, 'Nama owner terlalu panjang'),
    brand: z.string().min(2, 'Nama brand minimal 2 karakter').max(50, 'Nama brand terlalu panjang'),
    no_hp: z.string().min(10, 'Kontak minimal 10 karakter').max(200, 'Kontak terlalu panjang'),
    status: z.enum(['active', 'nonactive'], { required_error: 'Status harus dipilih' }),
    type: z.string().min(1, 'Tipe iklan harus dipilih'),
    image: z.string().optional(),
});

type AdvertisementFormData = z.infer<typeof advertisementSchema>;

interface Advertisement {
    id?: number;
    owner: string;
    brand: string;
    no_hp: string;
    status: 'active' | 'nonactive';
    type: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AdvertisementModalProps {
    isOpen: boolean;
    onClose: () => void;
    advertisement?: Advertisement;
    mode: 'create' | 'edit';
}

const advertisementTypes = [
    'Banner Website',
    'Display Sidebar',
    'Native Content',
    'Video Advertisement',
    'Pop-up Banner',
    'Header Banner',
    'Footer Banner',
    'Article Inline',
];

export function AdvertisementModal({ isOpen, onClose, advertisement, mode }: AdvertisementModalProps) {
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        setError,
        clearErrors,
    } = useForm<AdvertisementFormData>({
        resolver: zodResolver(advertisementSchema),
        defaultValues: {
            owner: '',
            brand: '',
            no_hp: '',
            status: 'active',
            type: '',
            image: '',
        },
    });

    // Reset form when modal opens/closes or advertisement changes
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && advertisement) {
                setValue('owner', advertisement.owner);
                setValue('brand', advertisement.brand);
                setValue('no_hp', advertisement.no_hp);
                setValue('status', advertisement.status);
                setValue('type', advertisement.type);
                setValue('image', advertisement.image);

                // ✅ cek apakah path sudah full URL atau masih relatif
                const imageUrl = advertisement.image?.startsWith('http') ? advertisement.image : `/storage/${advertisement.image}`;

                setImagePreview(imageUrl);
                setSelectedFile(null);
            } else {
                reset({
                    owner: '',
                    brand: '',
                    no_hp: '',
                    status: 'active',
                    type: '',
                    image: '',
                });
                setImagePreview('');
                setSelectedFile(null);
            }
        }
    }, [isOpen, mode, advertisement, setValue, reset]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setError('image', { type: 'manual', message: 'Format file harus berupa JPEG, PNG, GIF, atau WebP' });
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setError('image', { type: 'manual', message: 'Ukuran file maksimal 5MB' });
                return;
            }

            clearErrors('image');
            setSelectedFile(file);

            // ✅ preview dari file, bukan base64
            setImagePreview(URL.createObjectURL(file));

            // ✅ kasih nama file biar zod tidak error
            setValue('image', file.name);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview('');
        setValue('image', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = (data: AdvertisementFormData) => {
        const formData = new FormData();

        formData.append('owner', data.owner);
        formData.append('brand', data.brand);
        formData.append('no_hp', data.no_hp);
        formData.append('status', data.status);
        formData.append('type', data.type);

        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        if (mode === 'create') {
            router.post(route('iklan.store'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    handleClose();
                },
                onError: (err) => {
                    console.error(err);
                    toast({ title: 'Error', description: 'Gagal menambahkan iklan' });
                },
            });
        } else {
            router.post(route('iklan.update', advertisement?.id), formData, {
                forceFormData: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
                onSuccess: () => {
                    handleClose();
                },
                onError: (err) => {
                    console.error(err);
                    toast({ title: 'Error', description: 'Gagal memperbarui iklan' });
                },
            });
        }
    };

    const handleClose = () => {
        reset();
        setImagePreview('');
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        {mode === 'create' ? 'Tambah Iklan Baru' : 'Edit Iklan'}
                        <Button variant="ghost" size="sm" onClick={handleClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Owner and Brand */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="owner">Nama Owner/Perusahaan *</Label>
                            <Input
                                id="owner"
                                {...register('owner')}
                                placeholder="PT. Contoh Perusahaan"
                                className={errors.owner ? 'border-red-500' : ''}
                            />
                            {errors.owner && <p className="mt-1 text-sm text-red-500">{errors.owner.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="brand">Nama Brand *</Label>
                            <Input id="brand" {...register('brand')} placeholder="Brand Awesome" className={errors.brand ? 'border-red-500' : ''} />
                            {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <Label htmlFor="no_hp">Informasi Kontak *</Label>
                        <Textarea
                            id="no_hp"
                            {...register('no_hp')}
                            placeholder="Email: no_hp@brand.com | Telepon: +62 812-3456-7890 | Website: www.brand.com"
                            rows={3}
                            className={errors.no_hp ? 'border-red-500' : ''}
                        />
                        {errors.no_hp && <p className="mt-1 text-sm text-red-500">{errors.no_hp.message}</p>}
                        <p className="mt-1 text-sm text-gray-500">Masukkan email, nomor telepon, dan informasi kontak lainnya</p>
                    </div>

                    {/* Type and Status */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="type">Tipe Iklan *</Label>
                            <Select onValueChange={(value) => setValue('type', value)} value={watch('type')}>
                                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Pilih tipe iklan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {advertisementTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="status">Status *</Label>
                            <Select onValueChange={(value: 'active' | 'nonactive') => setValue('status', value)} value={watch('status')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="nonactive">Nonaktif</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-4">
                        <Label htmlFor="image">Gambar Iklan *</Label>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="space-y-4">
                                {/* File Input */}
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`h-32 w-full border-2 border-dashed ${
                                            errors.image ? 'border-red-500' : 'border-gray-300'
                                        } transition-colors hover:border-gray-400`}
                                    >
                                        <div className="text-center">
                                            <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                            <p className="text-sm text-gray-600">{selectedFile ? selectedFile.name : 'Klik untuk pilih gambar'}</p>
                                            <p className="mt-1 text-xs text-gray-500">JPEG, PNG, GIF, WebP (Max 5MB)</p>
                                        </div>
                                    </Button>
                                </div>

                                {/* File Info */}
                                {selectedFile && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                                                <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleRemoveImage}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                            </div>

                            {/* Image Preview */}
                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                                {imagePreview ? (
                                    <div className="space-y-2">
                                        <img
                                            src={imagePreview || '/placeholder.svg'}
                                            alt="Preview"
                                            className="mx-auto max-h-48 max-w-full rounded object-contain"
                                        />
                                        <p className="text-sm text-gray-600">Preview Gambar</p>
                                    </div>
                                ) : (
                                    <div className="py-12">
                                        <ImageIcon className="mx-auto mb-2 h-16 w-16 text-gray-400" />
                                        <p className="text-sm text-gray-500">Preview gambar akan muncul di sini</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 border-t pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Batal
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" />
                            {mode === 'create' ? 'Tambah Iklan' : 'Perbarui Iklan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
