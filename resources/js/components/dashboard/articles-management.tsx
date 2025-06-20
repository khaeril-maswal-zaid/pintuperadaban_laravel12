'use client';

import BlogPostModal from '@/components/dashboard/blog-post-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Edit, Eye, Filter, MoreHorizontal, Search, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { ArticleModal } from './article-modalX';

interface Article {
    id: number;
    title: string;
    author: string;
    category: string;
    status: 'published' | 'draft';
    date: string;
    views: number;
    featured: boolean;
    content: string;
    excerpt: string;
    tags: string;
}

const mockArticles: Article[] = [
    {
        id: 1,
        title: 'Musyawarah Desa Bulo Bulo Hasilkan Kepengurusan Koperasi Merah Putih',
        author: 'Official Pintu Peradaban',
        category: 'News',
        status: 'published',
        date: '15 Mei 2025',
        views: 146,
        featured: true,
        content: '<p>Content of the article...</p>',
        excerpt: 'Pemerintah Desa Bulo-Bulo menggelar Musyawarah Desa Khusus untuk membentuk Koperasi Desa Merah Putih...',
        tags: 'koperasi,desa,bulukumpa,musyawarah',
    },
    {
        id: 2,
        title: 'UKT Elit Fasilitas Sulit : Mahasiswa Keluhkan Fasilitas Kampus',
        author: 'Faridun Taufik Muhamad Akbar',
        category: 'Pendidikan',
        status: 'published',
        date: '11 Juni 2025',
        views: 502,
        featured: false,
        content: '<p>Content of the article...</p>',
        excerpt: 'Mahasiswa mengeluhkan berbagai fasilitas kampus yang tidak memadai...',
        tags: 'pendidikan,kampus,mahasiswa,fasilitas',
    },
    {
        id: 3,
        title: 'Tragedi Jembatan Teluk Kendari : Mahasiswa Psikologi Islam',
        author: 'analisamu',
        category: 'News',
        status: 'draft',
        date: '02 Juni 2025',
        views: 101,
        featured: false,
        content: '<p>Content of the article...</p>',
        excerpt: 'Jembatan Teluk Kendari yang selama ini dikenal sebagai ikon Kota Kendari...',
        tags: 'kendari,jembatan,psikologi,mahasiswa',
    },
];

export function ArticlesManagement() {
    const [articles, setArticles] = useState(mockArticles);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | undefined>();
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const { toast } = useToast();

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || article.category.toLowerCase() === filterCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (id: number) => {
        const article = articles.find((a) => a.id === id);
        setArticles(articles.filter((article) => article.id !== id));

        toast({
            title: 'Article Deleted',
            description: `Article "${article?.title}" has been deleted successfully.`,
        });
    };

    const toggleFeatured = (id: number) => {
        const updatedArticles = articles.map((article) => (article.id === id ? { ...article, featured: !article.featured } : article));
        setArticles(updatedArticles);

        const article = updatedArticles.find((a) => a.id === id);
        toast({
            title: article?.featured ? 'Article Featured' : 'Article Unfeatured',
            description: `Article "${article?.title}" has been ${article?.featured ? 'marked as featured' : 'removed from featured'}.`,
        });
    };

    // const handleCreateArticle = () => {
    //     setModalMode('create');
    //     setEditingArticle(undefined);
    //     setIsModalOpen(true);
    // };

    const handleEditArticle = (article: Article) => {
        setModalMode('edit');
        setEditingArticle(article);
        setIsModalOpen(true);
    };

    const handleSaveArticle = (articleData: Omit<Article, 'id'> & { id?: number }) => {
        if (modalMode === 'create') {
            const newArticle: Article = {
                ...articleData,
                id: Math.max(...articles.map((a) => a.id)) + 1,
            } as Article;
            setArticles([newArticle, ...articles]);
        } else {
            setArticles(articles.map((article) => (article.id === articleData.id ? ({ ...articleData } as Article) : article)));
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card className="p-0">
                <CardContent className="p-4">
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
                </CardContent>
            </Card>

            {/* Articles Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Articles ({filteredArticles.length})</CardTitle>
                        <BlogPostModal />
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
                                                <span className="text-sm text-gray-600">{article.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <Badge className="bg-blue-100 text-blue-800">{article.category}</Badge>
                                        </td>

                                        <td className="px-2 py-3 text-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{article.date}</span>
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
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditArticle(article)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toggleFeatured(article.id)}>
                                                        {article.featured ? 'Remove from Featured' : 'Mark as Featured'}
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

            {/* Article Modal */}
            <ArticleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveArticle}
                article={editingArticle}
                mode={modalMode}
            />
        </div>
    );
}
