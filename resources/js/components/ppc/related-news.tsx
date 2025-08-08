import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface RelatedArticle {
    id: number;
    title: string;
    category: any;
    created_at: string;
    picture1: string;
    author: string;
    authorImage: string;
    views: number;
    href: string;
    excerpt?: string;
}

export function RelatedNews({ latestBlog }: any) {
    const relatedArticles: RelatedArticle[] = latestBlog[0];
    const smallRelatedNews: RelatedArticle[] = latestBlog.slice(1, 3);

    return (
        <div className="space-y-6">
            {/* Section Title */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 uppercase">Latest News</h2>
            </div>

            {/* Featured Related Article */}
            {relatedArticles && (
                <article key={relatedArticles?.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row">
                        <div className="relative h-[300px] md:h-[400px] md:w-1/2">
                            <img
                                src={`/storage/${relatedArticles?.picture1}` || '/placeholder.svg'}
                                alt={relatedArticles?.title}
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-between p-6 md:w-1/2">
                            <div>
                                <div className="mb-3">
                                    <Badge className="mr-3 bg-blue-600 text-white hover:bg-blue-700">{relatedArticles?.category?.name}</Badge>
                                    <span className="text-sm text-gray-600">{relatedArticles?.created_at}</span>
                                </div>
                                <a
                                    href={relatedArticles?.slug}
                                    className="mb-3 block text-xl font-bold text-gray-900 uppercase transition-colors hover:text-blue-600"
                                >
                                    {relatedArticles?.title}
                                </a>
                                {relatedArticles?.excerpt && <p className="line-clamp-3 text-gray-600">{relatedArticles?.excerpt}</p>}
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t pt-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={relatedArticles?.author?.image || '/placeholder.svg'}
                                        alt={relatedArticles?.author?.image}
                                        width={31}
                                        height={31}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{relatedArticles?.author.name}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Eye className="h-4 w-4" />
                                    <span className="text-sm">{relatedArticles?.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )}

            {/* Small Related Articles */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {smallRelatedNews.map((item) => (
                    <article key={item.id} className="flex h-[110px] overflow-hidden rounded-lg border bg-white shadow-sm">
                        <div className="relative w-[150px] flex-shrink-0">
                            <img src={`/storage/${item.picture1}` || '/placeholder.svg'} alt={item.title} className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-4">
                            <div className="mb-2">
                                <Badge className="mr-2 bg-blue-600 text-xs text-white hover:bg-blue-700">{item?.category?.name}</Badge>
                                <span className="text-xs text-gray-600">{item.created_at}</span>
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
