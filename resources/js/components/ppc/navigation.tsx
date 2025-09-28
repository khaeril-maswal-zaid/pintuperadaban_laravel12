'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { categories } = usePage<SharedData>().props;

    return (
        <nav className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Mobile Logo */}
                    <div className="block py-5 lg:hidden">
                        <a href="/">
                            <img src="/image/assets/brand.png" alt="Pintu Peradaban" width={250} className="h-auto" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button variant="ghost" size="sm" className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>

                    {/* Desktop Navigation */}
                    <div className="hidden w-full items-center justify-between py-3 md:flex">
                        <div className="flex items-center xl:space-x-8 space-x-5">
                            <a href="/" className="font-medium hover:text-yellow-400">
                                Home
                            </a>
                            <a href={route('category.show', 'news')} className="transition-colors hover:text-yellow-400">
                                Berita Peradaban
                            </a>
                            <a href={route('category.show', 'opini')} className="transition-colors hover:text-yellow-400">
                                Opini Peradaban
                            </a>
                            <a href={route('category.show', 'the-story')} className="transition-colors hover:text-yellow-400">
                                Story Peradaban
                            </a>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-yellow-400">
                                    <span>Peradaban Lainnya</span>
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white text-gray-900">
                                    {categories
                                        .filter((category: any) => !['news', 'the-story', 'opini'].includes(category.slug))
                                        .map((category: any) => (
                                            <DropdownMenuItem key={category.name} className="data-[highlighted]:bg-yellow-400">
                                                <a href={route('category.show', category.slug)} className="w-full">
                                                    {category.name}
                                                </a>
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <a href="/kontak" className="transition-colors hover:text-yellow-400">
                                Kontak
                            </a>
                        </div>

                        {/* Search */}
                        <div className="flex max-w-sm items-center">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Keyword"
                                    className="w-full rounded-l rounded-r-lg border-0 bg-gray-100 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                />
                                <Button className="absolute top-0 right-0 h-full rounded-l-none bg-yellow-400 px-4 hover:bg-yellow-500">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <div className="absolute top-17 right-0 left-0 z-50 border-t border-gray-700 bg-gray-900 md:hidden">
                            <div className="space-y-4 px-4 py-4">
                                <a href="/" className="block font-medium text-yellow-400">
                                    Home
                                </a>
                                <a href={route('category.show', 'news')} className="block hover:text-yellow-400">
                                    Berita Peradaban
                                </a>
                                <a href={route('category.show', 'opini')} className="block hover:text-yellow-400">
                                    Opini Peradaban
                                </a>
                                <a href={route('category.show', 'the-story')} className="block hover:text-yellow-400">
                                    Story Peradaban
                                </a>

                                <div className="space-y-2">
                                    <div className="font-medium text-gray-400">More Posts</div>
                                    {categories.map((category: any) => (
                                        <a
                                            key={category.name}
                                            href={route('category.show', category.slug)}
                                            className="block pl-4 hover:text-yellow-400"
                                        >
                                            {category.name}
                                        </a>
                                    ))}
                                </div>

                                <a href="/kontak" className="block hover:text-yellow-400">
                                    Kontak
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
