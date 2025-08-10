import { Badge } from '@/components/ui/badge';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

export function Footer() {
    const { mains, categories, kontaks } = usePage<SharedData>().props;

    return (
        <footer className="mt-12 bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold uppercase">Hubungi Kami</h3>
                        <div className="mb-6 space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <span className="text-sm">{kontaks?.alamat?.value}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <span className="text-sm">{kontaks?.telepon?.value}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <span className="text-sm">{kontaks?.email?.value}</span>
                            </div>
                        </div>

                        <h4 className="text-md mb-3 font-bold uppercase">Ikuti Kami</h4>
                        <div className="flex space-x-2">
                            <a
                                href={kontaks?.fb?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-yellow-500"
                            >
                                <Facebook className="h-5 w-5 text-yellow-400" />
                            </a>
                            <a
                                href={kontaks?.x?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-sky-500"
                            >
                                <Twitter className="h-5 w-5 text-yellow-400" />
                            </a>
                            <a
                                href={kontaks?.ig?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 transition-colors hover:bg-pink-600"
                            >
                                <Instagram className="h-5 w-5 text-yellow-400" />
                            </a>
                            <a
                                href={kontaks?.yt?.link}
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
                        <h3 className="mb-4 text-lg font-bold uppercase">Peradaban Utama</h3>
                        <div className="space-y-4">
                            {mains.map((post: any, index: any) => (
                                <article key={index}>
                                    <div className="mb-2">
                                        <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">{post?.category.name}</Badge>
                                        <span className="text-xs text-gray-400">{post.date}</span>
                                    </div>
                                    <a
                                        href={post.slug}
                                        className="line-clamp-1 text-sm font-medium text-gray-300 uppercase transition-colors hover:text-white"
                                    >
                                        {post.title}
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold uppercase">Kategori</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category: any, index: any) => (
                                <a
                                    key={category.name || index}
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
            <footer className="border-t border-gray-800 bg-black">
                <div className="container mx-auto px-6 py-4">
                    <p className="text-center text-xs tracking-wide text-gray-400 transition-colors duration-300 hover:text-gray-200">
                        &copy;{' '}
                        <a href="/" className="font-medium text-gray-300 transition-colors duration-300 hover:text-white">
                            PintuPeradaban.com
                        </a>{' '}
                        · All rights reserved · Developed by <span className="font-semibold text-gray-300">AlZaid Webcrafters</span> (System & Design)
                    </p>
                </div>
            </footer>
        </footer>
    );
}
