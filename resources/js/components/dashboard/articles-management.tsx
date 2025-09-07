'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Edit, Eye, Filter, MoreHorizontal, Search, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import BlogPostModal from './blog_post_modal_edit';

interface Article {
    id: number;
    slug: string;
    title: string;
    author: any;
    category: any;
    status: 'published' | 'draft';
    created_at: string;
    views: number;
    body1: string;
    body2: string;
    excerpt: string;
    tags: string;
}

export function ArticlesManagement({ mockArticles }: { mockArticles?: Article[] | { data: Article[] } }) {
    const [articles, setArticles] = useState<Article[]>(Array.isArray(mockArticles) ? mockArticles : (mockArticles?.data ?? []));
    console.log(articles);

    useEffect(() => {
        setArticles(Array.isArray(mockArticles) ? mockArticles : (mockArticles?.data ?? []));
    }, [mockArticles]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | undefined>();
    const { toast } = useToast();

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === 'all' || article.category.toLowerCase() === filterCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    const handleDelete = (id: number) => {
        const article = articles.find((a) => a.id === id);
        setArticles(articles.filter((a) => a.id !== id));

        toast({
            title: 'Article Deleted',
            description: `Article "${article?.title}" has been deleted successfully.`,
        });
    };

    const handleCreateArticle = () => {
        setEditingArticle(undefined);
        setIsModalOpen(true);
    };

    const handleEditArticle = (article: Article) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    };

    function formatTanggalINA(dateString: string): string {
        const date = new Date(dateString);

        const tanggal = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const waktu = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${tanggal}, ${waktu}`;
    }

    return (
        <div className="m-4 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Category: {filterCategory === 'all' ? 'All' : filterCategory}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFilterCategory('all')}>All Categories</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterCategory('news')}>News</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterCategory('pendidikan')}>Pendidikan</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterCategory('politik')}>Politik</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterCategory('ekonomi')}>Ekonomi</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Articles Table */}
            <Card className="mt-0">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Articles ({filteredArticles.length})</CardTitle>
                        <Button onClick={handleCreateArticle}>New Article</Button>
                        <BlogPostModal open={isModalOpen} onOpenChange={setIsModalOpen} post={editingArticle} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Title</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Author</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Views</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArticles.map((article) => (
                                    <tr key={article.id} className="border-b hover:bg-gray-50">
                                        <td className="px-2 py-3">
                                            <div className="flex items-start space-x-3">
                                                <span className="text-sm text-gray-600">{article.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{article?.author?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <Badge className="bg-blue-100 text-blue-800">{article?.category?.name}</Badge>
                                        </td>

                                        <td className="px-2 py-3 text-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{formatTanggalINA(article.created_at)}</span>
                                            </div>
                                        </td>

                                        <td className="px-2 py-3">
                                            <div className="flex items-center space-x-2">
                                                <Eye className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{article.views}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <a
                                                            href={route('show', article.slug)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </a>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem onClick={() => handleEditArticle(article)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(article.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
