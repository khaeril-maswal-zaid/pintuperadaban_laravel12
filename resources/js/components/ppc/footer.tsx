import { Badge } from '@/components/ui/badge';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

const popularFooterPosts = [
    {
        title: 'Muhammadiyah Bulukumba Pusatka',
        category: 'Sosial',
        date: '29 Maret 2025',
        href: '/article/muhammadiyah-bulukumba',
    },
    {
        title: 'Memaknai Humanisme Dalam Konte',
        category: 'Teologi',
        date: '27 Mei 2022',
        href: '/article/memaknai-humanisme',
    },
    {
        title: 'MTQ ke-XVIII Desa Bulo-Bulo Re',
        category: 'Teologi',
        date: '16 Maret 2025',
        href: '/article/mtq-ke-xviii',
    },
];

const categories = [
    { name: 'Teologi', href: '/category/teologi' },
    { name: 'Filsafat', href: '/category/filsafat' },
    { name: 'Ekonomi', href: '/category/ekonomi' },
    { name: 'Sosial', href: '/category/sosial' },
    { name: 'Politik', href: '/category/politik' },
    { name: 'News', href: '/category/news' },
    { name: 'Opini', href: '/category/opini' },
    { name: 'The-Story', href: '/category/the_story' },
    { name: 'Pendidikan', href: '/category/pendidikan' },
];

export function Footer() {
    return (
        <footer className="mt-12 bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold uppercase">Get In Touch</h3>
                        <div className="mb-6 space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <span className="text-sm">Berdikari C, Jln. Ahmad Yani, Bulukumba</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <span className="text-sm">62 853-4365-2494 / 62 853-4043-4280</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <span className="text-sm">official@pintuperadaban.com</span>
                            </div>
                        </div>

                        <h4 className="text-md mb-3 font-bold uppercase">Follow Us</h4>
                        <div className="flex space-x-2">
                            <a
                                href="https://web.facebook.com/profile.php?id=100083999477470"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-yellow-500"
                            >
                                <Facebook className="h-5 w-5 text-yellow-400" />
                            </a>
                            <a
                                href="https://web.facebook.com/profile.php?id=100083999477470"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-sky-500"
                            >
                                <Twitter className="h-5 w-5 text-yellow-400" />
                            </a>
                            <a
                                href="https://web.facebook.com/profile.php?id=100083999477470"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-pink-600"
                            >
                                <Instagram className="h-5 w-5 text-yellow-400" />
                            </a>
                            <a
                                href="https://web.facebook.com/profile.php?id=100083999477470"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-red-600"
                            >
                                <Youtube className="h-5 w-5 text-yellow-400" />
                            </a>
                        </div>
                    </div>

                    {/* Popular Posts */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold uppercase">Popular Peradaban</h3>
                        <div className="space-y-4">
                            {popularFooterPosts.map((post, index) => (
                                <article key={index}>
                                    <div className="mb-2">
                                        <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">{post.category}</Badge>
                                        <span className="text-xs text-gray-400">{post.date}</span>
                                    </div>
                                    <a href={post.href} className="text-sm font-medium text-gray-300 uppercase transition-colors hover:text-white">
                                        {post.title}
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold uppercase">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <a
                                    key={category.name}
                                    href={category.href}
                                    className="rounded bg-gray-700 px-3 py-1 text-sm transition-colors hover:bg-gray-600"
                                >
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-black py-4">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm text-gray-400">
                        &copy;{' '}
                        <a href="/" className="transition-colors hover:text-white">
                            Pintu Peradaban.Com
                        </a>
                        . All Rights Reserved. Design by{' '}
                        <a href="https://htmlcodex.com" className="transition-colors hover:text-white">
                            HTML Codex
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
