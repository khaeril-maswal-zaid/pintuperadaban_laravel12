'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Article {
    slug: string;
    title: string;
    picture1: string;
    category_articles_id: number;
    category: any;
    created_at: string;
}

export function HeroCarousel({ featuredArticles, sideArticles }: any) {
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
                        {featuredArticles.map((article: Article, index: number) => (
                            <div
                                key={article.slug}
                                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                                    index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                                }`}
                            >
                                <img
                                    src={`/storage/${article.picture1}` || '/placeholder.svg'}
                                    alt={article.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                                    <div className="mb-4">
                                        <Badge className="mr-4 bg-yellow-400 text-gray-900 hover:bg-yellow-500">{article?.category.name}</Badge>
                                        <span className="text-sm">{article.created_at}</span>
                                    </div>
                                    <a
                                        href={`/blog/${article.slug}`}
                                        className="text-2xl leading-tight font-bold uppercase transition-colors hover:text-yellow-300"
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
                        {featuredArticles.map((_: any, index: any) => (
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
                        {sideArticles.map((article: Article) => (
                            <div key={article.slug} className="group relative h-[250px] overflow-hidden">
                                <img
                                    src={`/storage/${article.picture1}` || '/placeholder.svg'}
                                    alt={article.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                                    <div className="mb-2">
                                        <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">
                                            {article?.category.name}
                                        </Badge>
                                        <span className="text-xs">{article.created_at}</span>
                                    </div>
                                    <a
                                        href={`/blog/${article.slug}`}
                                        className="line-clamp-3 text-sm leading-tight font-semibold uppercase transition-colors hover:text-yellow-300"
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
