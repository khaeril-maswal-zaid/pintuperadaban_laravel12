import { Badge } from '@/components/ui/badge';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';

interface Article {
    slug: string;
    title: string;
    picture1: string;
    excerpt: string;
    views: string;
    created_at: string;
    category: any;
    author: any;
}

export function MainContent({ latestNews, categoryNews }: any) {
    const { iklans } = usePage<SharedData>().props;
    const advNews = iklans.filter((iklan: any) => iklan.type === 'News')[0];
    const advKategoriDeks = iklans.filter((iklan: any) => iklan.type === 'KategoriDeks')[0];
    const advKategoriMob = iklans.filter((iklan: any) => iklan.type === 'KategoriMob')[0];

    const bigLatestNews = latestNews.slice(0, 2);
    const smallLatestNews = latestNews.slice(2, 4);
    const featuredOpini = categoryNews.slice(0, 1)[0];
    const allCategoryNews = categoryNews.slice(1);

    function formatTanggalIndo(tanggal: any) {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <div className="space-y-5 lg:w-2/3">
            {/* Advertisement Banner */}
            <img src={`storage/${advNews?.image}`} className="rounded" alt="" />

            {/* Latest News Section */}
            <div>
                <div className="mb-3 flex items-center justify-between border-l-5 border-yellow-400 bg-white p-4 shadow-sm md:mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">Berita Peradaban</h2>
                    <a href="/category/news" className="hover:text-yellow-500">
                        View All
                    </a>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {bigLatestNews.map((article: Article) => (
                        <article key={article.slug} className="flex flex-col justify-between rounded-lg border bg-white shadow-sm">
                            <div className="h-[360px]">
                                <img
                                    src={`/storage/${article.picture1}` || '/placeholder.svg'}
                                    alt={article.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="mb-3">
                                    <Badge className="mr-3 bg-yellow-400 text-gray-900 hover:bg-yellow-500">{article?.category.name}</Badge>
                                    <span className="text-sm text-gray-600">{formatTanggalIndo(article.created_at)}</span>
                                </div>
                                <a
                                    href={`/blog/${article.slug}`}
                                    className="mb-3 block text-xl font-bold text-gray-900 uppercase transition-colors hover:text-yellow-500"
                                >
                                    {article.title}
                                </a>
                                <p className="mb-4 line-clamp-3 text-gray-600">{article.excerpt}</p>
                            </div>
                            <div className="flex items-center justify-between border-t p-5">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={`/storage/${article?.author.image}` || '/placeholder.svg'}
                                        alt={article?.author.name}
                                        width={31}
                                        height={31}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{article?.author.name}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{article.views}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Small News Items */}
                <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {smallLatestNews.map((item: Article) => (
                        <article key={item.slug} className="flex h-[150px] overflow-hidden rounded-lg border bg-white shadow-sm">
                            <div className="relative w-[150px] flex-shrink-0">
                                <img
                                    src={`/storage/${item.picture1}` || '/placeholder.svg'}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-4">
                                <div className="mb-2">
                                    <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">{item?.category.name}</Badge>
                                    <span className="text-xs text-gray-600">{formatTanggalIndo(item.created_at)}</span>
                                </div>
                                <a
                                    href={`/blog/${item.slug}`}
                                    className="line-clamp-3 text-sm font-bold text-gray-900 uppercase transition-colors hover:text-yellow-500"
                                >
                                    {item.title}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Advertisement Banner Bottom */}
            <div className="w-full">
                <div className="mb-6 block md:hidden">
                    <div className="overflow-hidden rounded-lg border bg-white">
                        <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                            <h2 className="font-bold text-gray-900 uppercase">Advertisement</h2>
                        </div>
                        <div className="p-4">
                            <img src={`storage/${advKategoriMob?.image}`} className="rounded" alt="" />
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img src={`storage/${advKategoriDeks?.image}`} className="rounded" alt="" />
                </div>
            </div>

            {/* Category Section */}
            <div>
                <div className="mb-3 flex items-center justify-between border-l-5 border-yellow-400 bg-white p-4 shadow-sm md:mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">Kategori</h2>
                    {/* <a href="/category/news" className="hover:text-yellow-500">
                        View All
                    </a> */}
                </div>

                {/* Featured Opinion Article */}
                <article className="mb-6 overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row">
                        <div className="relative h-[300px] md:h-auto md:w-1/2">
                            <img
                                src={`/storage/${featuredOpini?.picture1}` || '/placeholder.svg'}
                                alt={featuredOpini?.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-between p-6 md:w-1/2">
                            <div>
                                <div className="mb-3">
                                    <Badge className="mr-3 bg-yellow-400 text-gray-900 hover:bg-yellow-500">{featuredOpini?.category.name}</Badge>
                                    <span className="text-sm text-gray-600">{formatTanggalIndo(featuredOpini?.created_at)}</span>
                                </div>
                                <a
                                    href={`/blog/${featuredOpini?.slug}`}
                                    className="mb-3 block text-xl font-bold text-gray-900 uppercase transition-colors hover:text-yellow-500"
                                >
                                    {featuredOpini?.title}
                                </a>
                                <p className="line-clamp-4 text-gray-600">{featuredOpini?.excerpt}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t pt-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={featuredOpini?.author.image || '/placeholder.svg'}
                                        alt={featuredOpini?.author.name}
                                        width={31}
                                        height={31}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{featuredOpini?.author.name}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{featuredOpini?.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Category News Grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {allCategoryNews.map((item: Article) => (
                        <article key={item.slug} className="flex h-[150px] overflow-hidden rounded-lg border bg-white shadow-sm">
                            <div className="relative w-[150px] flex-shrink-0">
                                <img
                                    src={`/storage/${item.picture1}` || '/placeholder.svg'}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-4">
                                <div className="mb-2">
                                    <Badge className="mr-2 bg-yellow-400 text-xs text-gray-900 hover:bg-yellow-500">{item?.category.name}</Badge>
                                    <span className="text-xs text-gray-600">{formatTanggalIndo(item.created_at)}</span>
                                </div>
                                <a
                                    href={`/blog/${item.slug}`}
                                    className="line-clamp-3 text-sm font-bold text-gray-900 uppercase transition-colors hover:text-yellow-500"
                                >
                                    {item.title}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
