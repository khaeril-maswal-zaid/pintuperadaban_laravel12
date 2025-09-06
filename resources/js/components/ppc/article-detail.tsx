'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Eye, Facebook, Linkedin, Share2, Tag, Twitter } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    category: any;
    date: string;
    picture1: string;
    picture2: string;
    author: any;
    authorImage: string;
    views: number;
    body1: string;
    body2: string;
}

interface ArticleDetailProps {
    article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
    return (
        <div className="space-y-4">
            {/* Article Card */}
            <article className="overflow-hidden rounded-lg border bg-white shadow-sm">
                {/* Featured Image */}
                <div className="relative overflow-hidden md:h-[550px]">
                    <img src={`/storage/${article.picture1}` || '/placeholder.svg'} alt={article.title} className="min-w-full object-cover" />
                </div>

                {/* Article Content */}
                <div className="p-6">
                    {/* Category and Date */}
                    <div className="mb-4">
                        <Badge className="mr-3 bg-yellow-400 text-gray-900 hover:bg-yellow-500">{article?.category?.name}</Badge>
                        <span className="text-gray-600">{article.date}</span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-6 text-2xl leading-tight font-bold text-gray-900 uppercase md:text-3xl">{article.title}</h1>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: article.body1 }} />
                    {article.picture2 && (
                        <img src={`/storage/${article.picture2}`} alt={article.title} className="min-h-full min-w-full object-cover" />
                    )}

                    <div className="prose prose-lg max-w-none leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: article.body2 }} />
                </div>

                {/* Author and Stats */}
                <div className="flex items-center justify-between border-t bg-gray-50 p-6">
                    <div className="space-x-3x flex items-center">
                        <img
                            src={`/storage/${article?.author?.image}` || '/placeholder.svg'}
                            alt={article.author?.name}
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <span className="ml-3 font-medium text-gray-700">{article.author?.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{article.views}</span>
                        </div>
                    </div>
                </div>
            </article>

            {/* Tags and Share Section - Combined Card */}
            <TagsAndShare article={article} />
        </div>
    );
}

function TagsAndShare({ article }: { article: Article }) {
    const { toast } = useToast();

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `${article.title} - Pintu Peradaban`;

    const handleShare = (platform: string) => {
        let url = '';

        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                toast({
                    title: 'Link berhasil disalin!',
                    description: 'Link artikel telah disalin ke clipboard',
                });
                return;
        }

        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
        }
    };

    return (
        <Card className="gap-2 py-2">
            <CardContent className="space-y-6 p-6">
                {/* Tags Section */}
                <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-600" />
                        <span className="mr-2 text-sm font-medium text-gray-600">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {article?.tags?.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                            >
                                {'#' + tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-200" />

                {/* Share Section */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <Share2 className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Bagikan Artikel:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 space-x-2">
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleShare('facebook')}>
                            <Facebook className="mr-1 h-4 w-4" />
                            Facebook
                        </Button>
                        <Button size="sm" className="bg-sky-500 text-white hover:bg-sky-600" onClick={() => handleShare('twitter')}>
                            <Twitter className="mr-1 h-4 w-4" />
                            Twitter
                        </Button>
                        <Button size="sm" className="bg-blue-700 text-white hover:bg-blue-800" onClick={() => handleShare('linkedin')}>
                            <Linkedin className="mr-1 h-4 w-4" />
                            LinkedIn
                        </Button>
                        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700" onClick={() => handleShare('whatsapp')}>
                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                            WhatsApp
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleShare('copy')}>
                            <Copy className="mr-1 h-4 w-4" />
                            Copy
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
