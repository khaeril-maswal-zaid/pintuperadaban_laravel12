'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Article {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    href: string;
}

const featuredArticles: Article[] = [
    {
        id: 1,
        title: 'UKT Elit Fasilitas Sulit : Mahasiswa Keluhkan Fasilitas Kampus, hingga Ketidakpastian Jadwal Kuliah. UMK Diminta Berbenah',
        category: 'Pendidikan',
        date: '11 Juni 2025',
        image: '/placeholder.svg?height=500&width=800',
        href: '/article/ukt-elit-fasilitas-sulit',
    },
    {
        id: 2,
        title: 'Fitma Ungkap Tambang Ilegal di Konawe: Ancaman Nyata bagi Lingkungan dan Generasi Mendatang',
        category: 'Pendidikan',
        date: '10 Juni 2025',
        image: '/placeholder.svg?height=500&width=800',
        href: '/article/fitma-ungkap-tambang-ilegal',
    },
    {
        id: 3,
        title: 'Fitri, Mahasiswi Hukum UHO,Soroti Pendekatan Damai Polri terhadap KKB Papua dalam Jurnal Ilmiah',
        category: 'Pendidikan',
        date: '10 Juni 2025',
        image: '/placeholder.svg?height=500&width=800',
        href: '/article/fitri-mahasiswi-hukum',
    },
];

const sideArticles: Article[] = [
    {
        id: 4,
        title: 'PCM Baruga Gelar Penyembelihan Hewan Kurban Untuk pertama Kalinya',
        category: 'Sosial',
        date: '07 Juni 2025',
        image: '/placeholder.svg?height=250&width=400',
        href: '/article/pcm-baruga-gelar',
    },
    {
        id: 5,
        title: 'Tragedi Jembatan Teluk Kendari : Mahasiswa Psikologi Islam UMKendari Serukan Kepedulian Kesehatan Mental',
        category: 'News',
        date: '02 Juni 2025',
        image: '/placeholder.svg?height=250&width=400',
        href: '/article/tragedi-jembatan',
    },
    {
        id: 6,
        title: 'Salah Satu Kader PK IMM FAI Soroti Kekosongan Kepemimpinan BEM FAI UM Kendari',
        category: 'Opini',
        date: '05 Mei 2025',
        image: '/placeholder.svg?height=250&width=400',
        href: '/article/salah-satu-kader',
    },
    {
        id: 7,
        title: 'Kolaborasi Lintas Kampus: KPS UMKendari & KPS UHO Hadirkan Wawasan Baru Lewat Kuliah Umum dan Sharing Session',
        category: 'News',
        date: '03 Mei 2025',
        image: '/placeholder.svg?height=250&width=400',
        href: '/article/kolaborasi-lintas',
    },
];

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row">
                {/* Main Carousel */}
                <div className="relative lg:w-7/12">
                    <div className="relative h-[500px] overflow-hidden">
                        {featuredArticles.map((article, index) => (
                            <div
                                key={article.id}
                                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                                    index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                                }`}
                            >
                                <img src={article.image || '/placeholder.svg'} alt={article.title} className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                                    <div className="mb-4">
                                        <Badge className="mr-4 bg-blue-600 text-white hover:bg-blue-700">{article.category}</Badge>
                                        <span className="text-sm">{article.date}</span>
                                    </div>
                                    <a
                                        href={article.href}
                                        className="text-2xl leading-tight font-bold uppercase transition-colors hover:text-blue-300"
                                    >
                                        {article.title}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Controls */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:bg-black/20"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:bg-black/20"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                        {featuredArticles.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Side Articles Grid */}
                <div className="lg:w-5/12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {sideArticles.map((article) => (
                            <div key={article.id} className="group relative h-[250px] overflow-hidden">
                                <img
                                    src={article.image || '/placeholder.svg'}
                                    alt={article.title}
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                                    <div className="mb-2">
                                        <Badge className="mr-2 bg-blue-600 text-xs text-white hover:bg-blue-700">{article.category}</Badge>
                                        <span className="text-xs">{article.date}</span>
                                    </div>
                                    <a
                                        href={article.href}
                                        className="line-clamp-3 text-sm leading-tight font-semibold uppercase transition-colors hover:text-blue-300"
                                    >
                                        {article.title}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
