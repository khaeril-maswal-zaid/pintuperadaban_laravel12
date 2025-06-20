import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    author: string;
    authorImage: string;
    views: number;
    href: string;
}

const latestNews: Article[] = [
    {
        id: 1,
        title: 'Tragedi Jembatan Teluk Kendari : Mahasiswa Psikologi Islam UMKendari Serukan Kepedulian Kesehatan Mental',
        excerpt:
            'Jembatan Teluk Kendari yang selama ini dikenal sebagai ikon Kota Kendari, Sulawesi Tenggara, menjadi sorotan bukan karena keindahannya, melainkan karena serangkaian insiden tragis. Empat kasus warga yang melompat dari jembatan tersebut terjadi berturut-turut dalam kurun Maret hingga Juni 2025. Kasus terbaru terjadi pada Minggu, 1 Juni 2025.',
        category: 'News',
        date: '02 Juni 2025',
        image: '/placeholder.svg?height=360&width=600',
        author: 'analisamu',
        authorImage: '/placeholder.svg?height=31&width=31',
        views: 101,
        href: '/article/tragedi-jembatan',
    },
    {
        id: 2,
        title: 'Israel Diakui, Palestina Merdeka? Siapa Percaya? Hubungan Diplomatik yang Problematik',
        excerpt:
            'Presiden Prabowo Subianto menyatakan bahwa Indonesia siap membuka hubungan diplomatik dengan Israel, dengan satu syarat penting: Israel harus terlebih dahulu mengakui kemerdekaan penuh negara Palestina. Pernyataan ini disampaikan Prabowo dalam konferensi pers bersama Presiden Prancis Emmanuel Macron di Istana Kepresidenan Jakarta, Rabu (28/5/2025)',
        category: 'News',
        date: '01 Juni 2025',
        image: '/placeholder.svg?height=360&width=600',
        author: 'Faridun Taufik Muhamad Akbar',
        authorImage: '/placeholder.svg?height=31&width=31',
        views: 98,
        href: '/article/israel-diakui',
    },
];

const smallNews = [
    {
        id: 3,
        title: 'Musyawarah Desa Bulo Bulo Hasilkan Kepengurusan Ko...',
        category: 'News',
        date: '15 Mei 2025',
        image: '/placeholder.svg?height=130&width=150',
        href: '/article/musyawarah-desa',
    },
    {
        id: 4,
        title: 'LMND Sultra Kritik Rencana Kemensos Bangun Sekolah...',
        category: 'News',
        date: '04 Mei 2025',
        image: '/placeholder.svg?height=130&width=150',
        href: '/article/lmnd-sultra',
    },
];

const featuredOpini = {
    id: 5,
    title: 'Salah Satu Kader PK IMM FAI Soroti Kekosongan Kepemimpinan BEM FAI UM Kendari',
    excerpt:
        'Ketua Bidang Hikmah Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah (IMM) Fakultas Agama Islam (FAI) Universitas Muhammadiyah Kendari (UMK), angkat suara terkait kekosongan kepemimpinan di tubuh Badan Eksekutif Mahasiswa (BEM) FAI UMK yang hingga kini belum terisi.',
    category: 'Opini',
    date: '05 Mei 2025',
    image: '/placeholder.svg?height=400&width=600',
    author: 'Ajmail Umar',
    authorImage: '/placeholder.svg?height=31&width=31',
    views: 187,
    href: '/article/salah-satu-kader',
};

const categoryNews = [
    {
        id: 6,
        title: 'MTQ ke-XVIII Desa Bulo-Bulo Resmi Dibuka...',
        category: 'Teologi',
        date: '16 Maret 2025',
        image: '/placeholder.svg?height=150&width=150',
        href: '/article/mtq-ke-xviii',
    },
    {
        id: 7,
        title: 'Filsafat Ilmu...',
        category: 'Filsafat',
        date: '25 Desember 2022',
        image: '/placeholder.svg?height=150&width=150',
        href: '/article/filsafat-ilmu',
    },
    {
        id: 8,
        title: 'Sejauh Mana Bisaku Bertahan...',
        category: 'The-Story',
        date: '11 Agustus 2022',
        image: '/placeholder.svg?height=150&width=150',
        href: '/article/sejauh-mana',
    },
    {
        id: 9,
        title: 'Kuliah di cafe, Dosen Coursepreneurship ...',
        category: 'Ekonomi',
        date: '16 Februari 2025',
        image: '/placeholder.svg?height=150&width=150',
        href: '/article/kuliah-di-cafe',
    },
];

export function MainContent() {
    return (
        <div className="space-y-8 lg:w-2/3">
            {/* Advertisement Banner */}
            <div className="w-full">
                <div className="rounded bg-gray-100 p-4 text-center">
                    <span className="text-gray-600">Advertisement Banner</span>
                </div>
            </div>

            {/* Latest News Section */}
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">Latest News</h2>
                    <a href="/category/news" className="font-medium text-blue-600 hover:text-blue-800">
                        View All
                    </a>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {latestNews.map((article) => (
                        <article key={article.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                            <div className="relative h-[360px]">
                                <img src={article.image || '/placeholder.svg'} alt={article.title} className="object-cover" />
                            </div>
                            <div className="p-6">
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
                                <p className="mb-4 line-clamp-3 text-gray-600">{article.excerpt}</p>
                            </div>
                            <div className="flex items-center justify-between border-t p-6 pt-0">
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
                        </article>
                    ))}
                </div>

                {/* Small News Items */}
                <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {smallNews.map((item) => (
                        <article key={item.id} className="flex h-[130px] overflow-hidden rounded-lg border bg-white shadow-sm">
                            <div className="relative w-[150px] flex-shrink-0">
                                <img src={item.image || '/placeholder.svg'} alt={item.title} className="object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-4">
                                <div className="mb-2">
                                    <Badge className="mr-2 bg-blue-600 text-xs text-white hover:bg-blue-700">{item.category}</Badge>
                                    <span className="text-xs text-gray-600">{item.date}</span>
                                </div>
                                <a href={item.href} className="text-sm font-bold text-gray-900 uppercase transition-colors hover:text-blue-600">
                                    {item.title}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Advertisement Banner Bottom */}
            <div className="w-full">
                <div className="mb-6 block md:hidden">
                    <h3 className="mb-3 text-lg font-bold text-gray-900 uppercase">Advertisement</h3>
                    <div className="rounded bg-gray-100 p-4 text-center">
                        <span className="text-gray-600">Mobile Advertisement</span>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="rounded bg-gray-100 p-4 text-center">
                        <span className="text-gray-600">Desktop Advertisement Banner</span>
                    </div>
                </div>
            </div>

            {/* Category Section */}
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">Category</h2>
                    <a href="/category/opini" className="font-medium text-blue-600 hover:text-blue-800">
                        View All
                    </a>
                </div>

                {/* Featured Opinion Article */}
                <article className="mb-6 overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row">
                        <div className="relative h-[300px] md:h-auto md:w-1/2">
                            <img src={featuredOpini.image || '/placeholder.svg'} alt={featuredOpini.title} className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-between p-6 md:w-1/2">
                            <div>
                                <div className="mb-3">
                                    <Badge className="mr-3 bg-blue-600 text-white hover:bg-blue-700">{featuredOpini.category}</Badge>
                                    <span className="text-sm text-gray-600">{featuredOpini.date}</span>
                                </div>
                                <a
                                    href={featuredOpini.href}
                                    className="mb-3 block text-xl font-bold text-gray-900 uppercase transition-colors hover:text-blue-600"
                                >
                                    {featuredOpini.title}
                                </a>
                                <p className="line-clamp-4 text-gray-600">{featuredOpini.excerpt}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t pt-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={featuredOpini.authorImage || '/placeholder.svg'}
                                        alt={featuredOpini.author}
                                        width={31}
                                        height={31}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{featuredOpini.author}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{featuredOpini.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Category News Grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {categoryNews.map((item) => (
                        <article key={item.id} className="flex h-[150px] overflow-hidden rounded-lg border bg-white shadow-sm">
                            <div className="relative w-[150px] flex-shrink-0">
                                <img src={item.image || '/placeholder.svg'} alt={item.title} className="object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-4">
                                <div className="mb-2">
                                    <Badge className="mr-2 bg-blue-600 text-xs text-white hover:bg-blue-700">{item.category}</Badge>
                                    <span className="text-xs text-gray-600">{item.date}</span>
                                </div>
                                <a href={item.href} className="text-sm font-bold text-gray-900 uppercase transition-colors hover:text-blue-600">
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
