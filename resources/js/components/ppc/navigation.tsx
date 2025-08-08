'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { name: 'Teologi', href: '/category/teologi' },
        { name: 'Filsafat', href: '/category/filsafat' },
        { name: 'Politik', href: '/category/politik' },
        { name: 'Pendidikan', href: '/category/pendidikan' },
        { name: 'Sosial', href: '/category/sosial' },
        { name: 'Ekonomi', href: '/category/ekonomi' },
        { name: 'Bisnis', href: '/category/bisnis' },
    ];

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
                    <Button variant="ghost" size="sm" className="text-white lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>

                    {/* Desktop Navigation */}
                    <div className="hidden w-full items-center justify-between py-3 lg:flex">
                        <div className="flex items-center space-x-8">
                            <a href="/" className="font-medium text-blue-400 hover:text-blue-300">
                                Home
                            </a>
                            <a href="/category/news" className="transition-colors hover:text-blue-400">
                                Latest News
                            </a>
                            <a href="/category/opini" className="transition-colors hover:text-blue-400">
                                Opini
                            </a>
                            <a href="/category/the-story" className="transition-colors hover:text-blue-400">
                                The Story
                            </a>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-blue-400">
                                    <span>More Posts</span>
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white text-gray-900">
                                    {categories.map((category) => (
                                        <DropdownMenuItem key={category.name}>
                                            <a href={category.href} className="w-full">
                                                {category.name}
                                            </a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <a href="/kontak" className="transition-colors hover:text-blue-400">
                                Kontak
                            </a>
                        </div>

                        {/* Search */}
                        <div className="flex max-w-sm items-center">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Keyword"
                                    className="w-full rounded-l rounded-r-lg border-0 bg-gray-100 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <Button className="absolute top-0 right-0 h-full rounded-l-none bg-blue-600 px-4 hover:bg-blue-700">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <div className="absolute top-full right-0 left-0 z-50 border-t border-gray-700 bg-gray-900 lg:hidden">
                            <div className="space-y-4 px-4 py-4">
                                <a href="/" className="block font-medium text-blue-400">
                                    Home
                                </a>
                                <a href="/category/news" className="block hover:text-blue-400">
                                    Latest News
                                </a>
                                <a href="/category/opini" className="block hover:text-blue-400">
                                    Opini
                                </a>
                                <a href="/category/the-story" className="block hover:text-blue-400">
                                    The Story
                                </a>

                                <div className="space-y-2">
                                    <div className="font-medium text-gray-400">More Posts</div>
                                    {categories.map((category) => (
                                        <a key={category.name} href={category.href} className="block pl-4 hover:text-blue-400">
                                            {category.name}
                                        </a>
                                    ))}
                                </div>

                                <a href="/kontak" className="block hover:text-blue-400">
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
