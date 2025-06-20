import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface Category {
    name: string;
    description: string;
    color: string;
}

interface CategoryContentProps {
    category: Category;
    slug: string;
}

// Sample articles data - in real app this would come from API/database filtered by category
const getArticlesByCategory = (slug: string) => {
    const allArticles = [
        {
            id: 1,
            title: 'Memaknai Humanisme Dalam Konteks Kemuhammadiyahan',
            excerpt: 'Humanisme dalam perspektif Muhammadiyah memiliki makna yang mendalam dalam memahami nilai-nilai kemanusiaan yang universal.',
            category: 'Teologi',
            date: '27 Mei 2022',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Dr. Ahmad Syafii',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 245,
            href: '/article/memaknai-humanisme',
            slug: 'teologi',
        },
        {
            id: 2,
            title: 'MTQ ke-XVIII Desa Bulo-Bulo Resmi Dibuka oleh Camat Bulukumpa',
            excerpt: 'Musabaqah Tilawatil Quran tingkat desa yang ke-18 ini diikuti oleh peserta dari berbagai kalangan usia.',
            category: 'Teologi',
            date: '16 Maret 2025',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Tim Redaksi',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 189,
            href: '/article/mtq-ke-xviii',
            slug: 'teologi',
        },
        {
            id: 3,
            title: 'Filsafat Ilmu: Memahami Hakikat Pengetahuan',
            excerpt: 'Kajian mendalam tentang epistemologi dan ontologi dalam perspektif filsafat ilmu kontemporer.',
            category: 'Filsafat',
            date: '25 Desember 2022',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Prof. Suharto',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 156,
            href: '/article/filsafat-ilmu',
            slug: 'filsafat',
        },
        {
            id: 4,
            title: 'UKT Elit Fasilitas Sulit : Mahasiswa Keluhkan Fasilitas Kampus',
            excerpt: 'Mahasiswa mengeluhkan berbagai fasilitas kampus yang tidak memadai dibandingkan dengan biaya UKT yang tinggi.',
            category: 'Pendidikan',
            date: '11 Juni 2025',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Faridun Taufik Muhamad Akbar',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 502,
            href: '/article/ukt-elit-fasilitas',
            slug: 'pendidikan',
        },
        {
            id: 5,
            title: 'Kuliah di Cafe, Dosen Coursepreneurship Ajarkan Mahasiswa Berbisnis',
            excerpt: 'Metode pembelajaran inovatif dengan menggunakan cafe sebagai tempat belajar praktik bisnis langsung.',
            category: 'Ekonomi',
            date: '16 Februari 2025',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Ekonomi Reporter',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 234,
            href: '/article/kuliah-di-cafe',
            slug: 'ekonomi',
        },
        {
            id: 6,
            title: 'Tragedi Jembatan Teluk Kendari : Mahasiswa Psikologi Islam Serukan Kepedulian',
            excerpt: 'Jembatan Teluk Kendari yang selama ini dikenal sebagai ikon Kota Kendari menjadi sorotan karena insiden tragis.',
            category: 'News',
            date: '02 Juni 2025',
            image: '/placeholder.svg?height=300&width=400',
            author: 'analisamu',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 101,
            href: '/article/tragedi-jembatan',
            slug: 'news',
        },
        {
            id: 7,
            title: 'Salah Satu Kader PK IMM FAI Soroti Kekosongan Kepemimpinan BEM',
            excerpt: 'Ketua Bidang Hikmah PK IMM FAI UMK angkat suara terkait kekosongan kepemimpinan di tubuh BEM FAI UMK.',
            category: 'Opini',
            date: '05 Mei 2025',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Ajmail Umar',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 187,
            href: '/article/salah-satu-kader',
            slug: 'opini',
        },
        {
            id: 8,
            title: 'PCM Baruga Gelar Penyembelihan Hewan Kurban Untuk Pertama Kalinya',
            excerpt: 'Pimpinan Cabang Muhammadiyah Baruga menggelar acara penyembelihan hewan kurban yang pertama kali dilaksanakan.',
            category: 'Sosial',
            date: '07 Juni 2025',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Sosial Reporter',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 298,
            href: '/article/pcm-baruga',
            slug: 'sosial',
        },
        {
            id: 9,
            title: 'Sejauh Mana Bisaku Bertahan: Refleksi Kehidupan',
            excerpt: 'Sebuah refleksi mendalam tentang ketahanan hidup dan perjuangan dalam menghadapi berbagai tantangan.',
            category: 'The Story',
            date: '11 Agustus 2022',
            image: '/placeholder.svg?height=300&width=400',
            author: 'Story Teller',
            authorImage: '/placeholder.svg?height=31&width=31',
            views: 167,
            href: '/article/sejauh-mana',
            slug: 'the-story',
        },
    ];

    return allArticles.filter((article) => article.slug === slug);
};

export function CategoryContent({ category, slug }: CategoryContentProps) {
    const articles = getArticlesByCategory(slug);

    return (
        <div className="space-y-8">
            {/* Category Header */}
            <div className="rounded-lg border bg-white p-6">
                <div className="mb-4 flex items-center space-x-4">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white"
                        style={{ backgroundColor: category.color }}
                    >
                        {category.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 uppercase">{category.name}</h1>
                        <p className="mt-1 text-gray-600">{category.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{articles.length} artikel tersedia</span>
                    <span>•</span>
                    <span>Diperbarui secara berkala</span>
                </div>
            </div>

            {/* Articles List */}
            {articles.length > 0 ? (
                <div className="space-y-6">
                    {articles.map((article, index) => (
                        <article key={article.id} className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
                            <div className="flex flex-col md:flex-row">
                                <div className="relative h-[250px] md:h-[300px] md:w-1/3">
                                    <img src={article.image || '/placeholder.svg'} alt={article.title} className="object-cover" />
                                </div>
                                <div className="flex flex-col justify-between p-6 md:w-2/3">
                                    <div>
                                        <div className="mb-3">
                                            <Badge className="mr-3 text-white" style={{ backgroundColor: category.color }}>
                                                {article.category}
                                            </Badge>
                                            <span className="text-sm text-gray-600">{article.date}</span>
                                        </div>
                                        <a
                                            href={article.href}
                                            className="mb-3 block text-xl leading-tight font-bold text-gray-900 uppercase transition-colors hover:text-blue-600 md:text-2xl"
                                        >
                                            {article.title}
                                        </a>
                                        <p className="mb-4 line-clamp-3 text-gray-600">{article.excerpt}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-t pt-4">
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
                </div>
            ) : (
                <div className="rounded-lg border bg-white p-12 text-center">
                    <div className="mx-auto max-w-md">
                        <div
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                            style={{ backgroundColor: category.color }}
                        >
                            {category.name.charAt(0)}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">Belum Ada Artikel</h3>
                        <p className="mb-6 text-gray-600">
                            Kategori {category.name} belum memiliki artikel. Silakan kembali lagi nanti untuk melihat konten terbaru.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            )}

            {/* Load More Button */}
            {articles.length > 0 && (
                <div className="text-center">
                    <button className="rounded-lg bg-gray-100 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-200">
                        Muat Lebih Banyak Artikel
                    </button>
                </div>
            )}
        </div>
    );
}
