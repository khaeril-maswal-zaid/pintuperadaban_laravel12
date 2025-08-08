import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const popularPosts = [
    {
        id: 1,
        title: 'Muhammadiyah Bulukumba Pusatka...',
        category: 'Sosial',
        date: '29 Maret 2025',
        image: '/placeholder.svg?height=110&width=150',
        href: '/article/muhammadiyah-bulukumba',
    },
    {
        id: 2,
        title: 'Memaknai Humanisme Dalam Konte...',
        category: 'Teologi',
        date: '27 Mei 2022',
        image: '/placeholder.svg?height=110&width=150',
        href: '/article/memaknai-humanisme',
    },
    {
        id: 3,
        title: 'Israel Diakui, Palestina Merde...',
        category: 'News',
        date: '01 Juni 2025',
        image: '/placeholder.svg?height=110&width=150',
        href: '/article/israel-diakui',
    },
    {
        id: 4,
        title: 'Matangkan Skil Penulisan Karya...',
        category: 'Pendidikan',
        date: '25 April 2025',
        image: '/placeholder.svg?height=110&width=150',
        href: '/article/matangkan-skil',
    },
    {
        id: 5,
        title: 'MTQ ke-XVIII Desa Bulo-Bulo Re...',
        category: 'Teologi',
        date: '16 Maret 2025',
        image: '/placeholder.svg?height=110&width=150',
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

export function Sidebar() {
    const { iklans } = usePage<SharedData>().props;
    const advertise = iklans.filter((iklan: any) => iklan.type === '1-2')[0];
    const advMobile = iklans.filter((iklan: any) => iklan.type === '1-1')[0];

    return (
        <div className="space-y-6 lg:w-1/3">
            {/* Advertisement */}
            <div className="overflow-hidden rounded-lg border bg-white">
                <div className="bg-gray-900 p-3 text-white">
                    <h3 className="font-bold uppercase">Advertisement</h3>
                </div>
                <div className="p-4 text-center">
                    <div className="hidden md:block">
                        <img src={`storage/${advertise.image}`} className="rounded" alt="" />
                    </div>
                    <div className="block md:hidden">
                        <div className="rounded bg-gray-100 p-4">
                            <img src={`storage/${advMobile.image}`} className="rounded" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Follow */}
            <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="bg-gray-900 p-3 text-white">
                    <h3 className="font-bold uppercase">Follow Us</h3>
                </div>
                <div className="space-y-3 p-4">
                    <a
                        href="https://web.facebook.com/profile.php?id=100083999477470"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-blue-600 text-white transition-colors hover:bg-blue-700"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Facebook className="h-5 w-5" />
                        </div>
                        <span className="flex-1 font-medium">Pintu Peradaban Com</span>
                    </a>
                    <a
                        href="https://web.facebook.com/profile.php?id=100083999477470"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-sky-500 text-white transition-colors hover:bg-sky-600"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Twitter className="h-5 w-5" />
                        </div>
                        <span className="flex-1 font-medium">@pintuperadaban</span>
                    </a>
                    <a
                        href="https://web.facebook.com/profile.php?id=100083999477470"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-pink-600 text-white transition-colors hover:bg-pink-700"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Instagram className="h-5 w-5" />
                        </div>
                        <span className="flex-1 font-medium">@official.ppc</span>
                    </a>
                    <a
                        href="https://web.facebook.com/profile.php?id=100083999477470"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center rounded bg-red-600 text-white transition-colors hover:bg-red-700"
                    >
                        <div className="flex h-12 w-16 items-center justify-center bg-black/20">
                            <Youtube className="h-5 w-5" />
                        </div>
                        <span className="flex-1 font-medium">Pintu Peradaban</span>
                    </a>
                </div>
            </div>

            {/* Popular Posts */}
            <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="bg-gray-900 p-3 text-white">
                    <h3 className="font-bold uppercase">Populer</h3>
                </div>
                <div className="space-y-4 p-4">
                    {popularPosts.map((post) => (
                        <article key={post.id} className="flex h-[110px] bg-white">
                            <div className="relative w-[150px] flex-shrink-0">
                                <img src={post.image || '/placeholder.svg'} alt={post.title} className="rounded object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-center pl-3">
                                <div className="mb-2">
                                    <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">{post.category}</Badge>
                                    <span className="text-xs text-gray-600">{post.date}</span>
                                </div>
                                <a
                                    href={post.href}
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
                <div className="bg-gray-900 p-3 text-white">
                    <h3 className="font-bold uppercase">Newsletter</h3>
                </div>
                <div className="p-4 text-center">
                    <p className="mb-4 text-gray-600">Dapatkan informasi terupdate dari kami!</p>
                    <div className="mb-3 flex">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-1 rounded-l border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                        <Button className="rounded-l-none bg-yellow-400 px-4 text-gray-900 hover:bg-yellow-500">Sign Up</Button>
                    </div>
                    <p className="text-xs text-gray-500">Pastikan alamat email mu aktif</p>
                </div>
            </div>

            {/* Tags */}
            <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="bg-gray-900 p-3 text-white">
                    <h3 className="font-bold uppercase">Tags</h3>
                </div>
                <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <a
                                key={category.name}
                                href={category.href}
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
