import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

export function CategoryContent({ allArticles }: any) {
    function formatTanggalIndo(tanggal: any) {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <div className="space-y-8">
            {/* Articles List */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {allArticles?.data.map((article: any, index: any) => (
                    <article key={article?.slug} className="flex flex-col justify-between rounded-lg border bg-white shadow-sm">
                        <div className="h-[360px]">
                            <img
                                src={`/storage/${article?.picture1}` || '/placeholder.svg'}
                                alt={article?.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="mb-3">
                                <Badge className="mr-3 bg-yellow-400 text-gray-900 hover:bg-yellow-500">{article?.category.name}</Badge>
                                <span className="text-sm text-gray-600">{formatTanggalIndo(article?.created_at)}</span>
                            </div>
                            <a
                                href={`/blog/${article?.slug}`}
                                className="mb-3 block text-xl font-bold text-gray-900 uppercase transition-colors hover:text-yellow-500"
                            >
                                {article?.title}
                            </a>
                            <p className="mb-4 line-clamp-3 text-gray-600">{article?.excerpt}</p>
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
                                <span className="text-sm">{article?.views}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
