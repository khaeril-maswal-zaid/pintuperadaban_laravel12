'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PopularPost {
    id: number;
    title: string;
    category: any;
    created_at: string;
    picture1: string;
    slug: string;
}

const popularPosts: PopularPost[] = [
    {
        id: 1,
        title: 'Muhammadiyah Bulukumba Pusatkan Pelaksanaan Idul Fitri 1446 H di Kompleks Perguruan Teko',
        category: 'Sosial',
        date: '29 Maret 2025',
        picture1: '/placeholder.svg?height=300&width=400',
        slug: '/article/muhammadiyah-bulukumba',
    },
    {
        id: 2,
        title: 'Memaknai Humanisme Dalam Konteks Kemuhammadiyahan',
        category: 'Teologi',
        date: '27 Mei 2022',
        picture1: '/placeholder.svg?height=300&width=400',
        slug: '/article/memaknai-humanisme',
    },
    {
        id: 3,
        title: 'Israel Diakui, Palestina Merdeka? Siapa Percaya? Hubungan Diplomatik yang Problematik',
        category: 'News',
        date: '01 Juni 2025',
        picture1: '/placeholder.svg?height=300&width=400',
        slug: '/article/israel-diakui',
    },
    {
        id: 4,
        title: 'Matangkan Skil Penulisan Karya Ilmiah, Prodi PTI Gelar Pembinaan dan Pendampingan Penggunaan Mendeley',
        category: 'Pendidikan',
        date: '25 April 2025',
        picture1: '/placeholder.svg?height=300&width=400',
        slug: '/article/matangkan-skil',
    },
    {
        id: 5,
        title: 'MTQ ke-XVIII Desa Bulo-Bulo Resmi Dibuka oleh Camat Bulukumpa',
        category: 'Teologi',
        date: '16 Maret 2025',
        picture1: '/placeholder.svg?height=300&width=400',
        slug: '/article/mtq-ke-xviii',
    },
];

export function PopularPosts() {
    const { popularPosts } = usePage().props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 768) {
                setItemsPerView(2);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(3);
            } else {
                setItemsPerView(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, popularPosts.length - itemsPerView);

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    function formatTanggalIndo(tanggal: any) {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <div className="mb-7 bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">Peradaban Popular</h2>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentIndex === 0}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                        }}
                    >
                        {popularPosts.map((post: PopularPost) => (
                            <div key={post.slug} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                                <div className="group relative h-[300px] overflow-hidden rounded-lg">
                                    <img
                                        src={`/storage/${post.picture1}`}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                                        <div className="mb-2">
                                            <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">
                                                {post?.category?.name}
                                            </Badge>
                                            <span className="text-xs">{formatTanggalIndo(post.created_at)}</span>
                                        </div>
                                        <a
                                            href={`/blog/${post.slug}`}
                                            className="line-clamp-3 text-sm leading-tight font-semibold uppercase transition-colors hover:text-yellow-300"
                                        >
                                            {post.title}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
