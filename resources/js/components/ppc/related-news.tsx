import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface RelatedArticle {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    author: string;
    authorImage: string;
    views: number;
    href: string;
    excerpt?: string;
}

const relatedArticles: RelatedArticle[] = [
    {
        id: 1,
        title: 'UKT Elit Fasilitas Sulit : Mahasiswa Keluhkan Fasilitas Kampus, hingga Ketidakpastian Jadwal Kuliah. UMK Diminta Berbenah',
        category: 'Pendidikan',
        date: '11 Juni 2025',
        image: '/placeholder.svg?height=400&width=600',
        author: 'Faridun Taufik Muhamad Akbar',
        authorImage: '/placeholder.svg?height=31&width=31',
        views: 502,
        href: '/ukt-elit-fasilitas',
        excerpt: 'Mahasiswa mengeluhkan berbagai fasilitas kampus yang tidak memadai...',
    },
];

const smallRelatedNews = [
    {
        id: 2,
        title: 'Fitma Ungkap Tambang Ilegal di...',
        category: 'Pendidikan',
        date: '10 Juni 2025',
        image: '/placeholder.svg?height=110&width=150',
        href: '/fitma-ungkap-tambang',
    },
    {
        id: 3,
        title: 'Fitri, Mahasiswi Hukum UHO,Sor...',
        category: 'Pendidikan',
        date: '10 Juni 2025',
        image: '/placeholder.svg?height=110&width=150',
        href: '/fitri-mahasiswi-hukum',
    },
];

export function RelatedNews() {
    return (
        <div className="space-y-6">
            {/* Section Title */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 uppercase">Latest News</h2>
            </div>

            {/* Featured Related Article */}
            {relatedArticles.map((article) => (
                <article key={article.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row">
                        <div className="relative h-[300px] md:h-[400px] md:w-1/2">
                            <img src={article.image || '/placeholder.svg'} alt={article.title} className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-between p-6 md:w-1/2">
                            <div>
                                <div className="mb-3">
                                    <Badge className="mr-3 bg-blue-600 text-white hover:bg-blue-700">{article.category}</Badge>
                                    <span className="text-sm text-gray-600">{article.date}</span>
                                </div>
                                <a
                                    href={article.href}
                                    className="mb-3 block text-xl font-bold text-gray-900 uppercase transition-colors hover:text-blue-600"
                                >
                                    {article.title}
                                </a>
                                {article.excerpt && <p className="line-clamp-3 text-gray-600">{article.excerpt}</p>}
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t pt-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={article.authorImage || '/placeholder.svg'}
                                        alt={article.author}
                                        width={31}
                                        height={31}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{article.author}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{article.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            ))}

            {/* Small Related Articles */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {smallRelatedNews.map((item) => (
                    <article key={item.id} className="flex h-[110px] overflow-hidden rounded-lg border bg-white shadow-sm">
                        <div className="relative w-[150px] flex-shrink-0">
                            <img src={item.image || '/placeholder.svg'} alt={item.title} className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-4">
                            <div className="mb-2">
                                <Badge className="mr-2 bg-blue-600 text-xs text-white hover:bg-blue-700">{item.category}</Badge>
                                <span className="text-xs text-gray-600">{item.date}</span>
                            </div>
                            <a
                                href={item.href}
                                className="line-clamp-2 text-sm font-bold text-gray-900 uppercase transition-colors hover:text-blue-600"
                            >
                                {item.title}
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
