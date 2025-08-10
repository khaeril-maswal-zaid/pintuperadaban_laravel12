import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

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

export function Sidebar() {
    const { iklans, popularPosts, categories, kontaks, name } = usePage<SharedData>().props;

    const advSidebarDeks = iklans.filter((iklan: any) => iklan.type === 'SidebarDeks')[0];
    const advSidebarMob = iklans.filter((iklan: any) => iklan.type === 'SidebarMob')[0];

    function formatTanggalIndo(tanggal: any) {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <div className="space-y-6">
            {/* Advertisement */}
            <div className="overflow-hidden rounded-lg border bg-white">
                <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                    <h2 className="font-bold text-gray-900 uppercase">Advertisement</h2>
                </div>
                <div className="p-4 text-center">
                    <div className="hidden md:block">
                        <img src={`storage/${advSidebarDeks?.image}`} className="rounded" alt="" />
                    </div>
                    <div className="block md:hidden">
                        <img src={`storage/${advSidebarMob?.image}`} className="rounded" alt="" />
                    </div>
                </div>
            </div>

            {/* Social Follow */}
            <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                    <h2 className="font-bold text-gray-900 uppercase">Ikuti Kami</h2>
                </div>
                <div className="space-y-3 p-4">
                    <a
                        href={kontaks?.fb?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-blue-600 text-white transition-colors hover:bg-blue-700"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Facebook className="h-5 w-5" />
                        </div>
                        <span className="flex-1 pl-4 font-medium">{kontaks?.fb?.value}</span>
                    </a>
                    <a
                        href={kontaks?.x?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-sky-500 text-white transition-colors hover:bg-sky-600"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Twitter className="h-5 w-5" />
                        </div>
                        <span className="flex-1 pl-4 font-medium">{kontaks?.x?.value}</span>
                    </a>
                    <a
                        href={kontaks?.ig?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-pink-600 text-white transition-colors hover:bg-pink-700"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Instagram className="h-5 w-5" />
                        </div>
                        <span className="flex-1 pl-4 font-medium">{kontaks?.ig?.value}</span>
                    </a>
                    <a
                        href={kontaks?.yt?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-red-600 text-white transition-colors hover:bg-red-700"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Youtube className="h-5 w-5" />
                        </div>
                        <span className="flex-1 pl-4 font-medium">{kontaks?.yt?.value}</span>
                    </a>
                </div>
            </div>

            {/* Popular Posts */}
            <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                    <h2 className="font-bold text-gray-900 uppercase">Populer</h2>
                </div>
                <div className="space-y-4 p-4">
                    {popularPosts.map((post: any, index: any) => (
                        <article key={post.id || index} className="flex h-[110px] bg-white">
                            <div className="relative w-[150px] flex-shrink-0">
                                <img src={`/storage/${post.picture1}` || '/placeholder.svg'} alt={post.title} className="rounded object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-center pl-3">
                                <div className="mb-2">
                                    <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">{post.category?.name}</Badge>
                                    <span className="text-xs text-gray-600">{formatTanggalIndo(post.created_at)}</span>
                                </div>
                                <a
                                    href={post.slug}
                                    className="line-clamp-2 text-sm font-bold text-gray-900 uppercase transition-colors hover:text-yellow-500"
                                >
                                    {post.title}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="overflow-hidden rounded-lg border bg-white">
                <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                    <h2 className="font-bold text-gray-900 uppercase">Langganan</h2>
                </div>
                <div className="p-4 text-center">
                    <p className="mb-4 text-gray-600">Dapatkan informasi terupdate dari kami!</p>
                    <div className="mb-3 flex">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-1 rounded-l border border-gray-300 px-4 focus:border-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                        <Button className="rounded-l-none bg-yellow-400 px-4 py-5 text-gray-900 hover:bg-yellow-500">Sign Up</Button>
                    </div>
                    <p className="text-xs text-gray-500">Pastikan alamat email mu aktif</p>
                </div>
            </div>

            {/* Tags */}
            <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                    <h2 className="font-bold text-gray-900 uppercase">Tags</h2>
                </div>
                <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category: any, index: any) => (
                            <a
                                key={category.name || index}
                                href={`/category/${category.slug}`}
                                className="rounded border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-100"
                            >
                                {category.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
