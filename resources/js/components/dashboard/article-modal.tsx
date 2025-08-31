'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import { Bold, ImageIcon, Italic, Link, List, ListOrdered, Quote, Save, Underline, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const articleSchema = z.object({
    title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title too long'),
    content: z.string().min(50, 'Content must be at least 50 characters'),
    category: z.string().min(1, 'Please select a category'),
    excerpt: z.string().min(20, 'Excerpt must be at least 20 characters').max(300, 'Excerpt too long'),
    tags: z.string().min(1, 'Please add at least one tag'),
    status: z.enum(['draft', 'published']),
    featured: z.boolean(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface Article {
    id?: number;
    title: string;
    content: string;
    category: string;
    excerpt: string;
    tags: string;
    status: 'draft' | 'published';
    featured: boolean;
    author?: string;
    date?: string;
    views?: number;
}

interface ArticleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (article: Article) => void;
    article?: Article;
    mode: 'create' | 'edit';
}

export function ArticleModal({ isOpen, onClose, onSave, article, mode }: ArticleModalProps) {
    const { categories } = usePage<SharedData>().props;
    console.log(categories);

    const { toast } = useToast();
    const [content, setContent] = useState(article?.content || '');
    const [tags, setTags] = useState<string[]>(article?.tags ? article.tags.split(',') : []);
    const [newTag, setNewTag] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: article?.title || '',
            content: article?.content || '',
            category: article?.category || '',
            excerpt: article?.excerpt || '',
            tags: article?.tags || '',
            status: article?.status || 'draft',
            featured: article?.featured || false,
        },
    });

    const handleEditorAction = (action: string) => {
        const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        let newContent = content;

        switch (action) {
            case 'bold':
                newContent = content.substring(0, start) + `<strong>${selectedText}</strong>` + content.substring(end);
                break;
            case 'italic':
                newContent = content.substring(0, start) + `<em>${selectedText}</em>` + content.substring(end);
                break;
            case 'underline':
                newContent = content.substring(0, start) + `<u>${selectedText}</u>` + content.substring(end);
                break;
            case 'list':
                newContent = content.substring(0, start) + `<ul><li>${selectedText || 'List item'}</li></ul>` + content.substring(end);
                break;
            case 'ordered-list':
                newContent = content.substring(0, start) + `<ol><li>${selectedText || 'List item'}</li></ol>` + content.substring(end);
                break;
            case 'quote':
                newContent = content.substring(0, start) + `<blockquote>${selectedText || 'Quote text'}</blockquote>` + content.substring(end);
                break;
            case 'link':
                const url = prompt('Enter URL:');
                if (url) {
                    newContent = content.substring(0, start) + `<a href="${url}">${selectedText || 'Link text'}</a>` + content.substring(end);
                }
                break;
            case 'image':
                const imgUrl = prompt('Enter image URL:');
                if (imgUrl) {
                    newContent =
                        content.substring(0, start) + `<img src="${imgUrl}" alt="Image" class="w-full mb-4 rounded" />` + content.substring(end);
                }
                break;
        }

        setContent(newContent);
        setValue('content', newContent);
    };

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            const updatedTags = [...tags, newTag.trim()];
            setTags(updatedTags);
            setValue('tags', updatedTags.join(','));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
        setValue('tags', updatedTags.join(','));
    };

    const onSubmit = (data: ArticleFormData) => {
        try {
            const articleData: Article = {
                ...data,
                id: article?.id,
                author: article?.author || 'Current User',
                date: article?.date || new Date().toLocaleDateString('id-ID'),
                views: article?.views || 0,
            };

            onSave(articleData);

            toast({
                title: mode === 'create' ? 'Article Created!' : 'Article Updated!',
                description: `Article "${data.title}" has been ${mode === 'create' ? 'created' : 'updated'} successfully.`,
            });

            reset();
            setContent('');
            setTags([]);
            onClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleClose = () => {
        reset();
        setContent('');
        setTags([]);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        {mode === 'create' ? 'Create New Article' : 'Edit Article'}
                        <Button variant="ghost" size="sm" onClick={handleClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="Enter article title..."
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Category and Status */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="category">Category *</Label>
                            <Select onValueChange={(value) => setValue('category', value)} defaultValue={article?.category}>
                                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="status">Status *</Label>
                            <Select
                                onValueChange={(value: 'draft' | 'published') => setValue('status', value)}
                                defaultValue={article?.status || 'draft'}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <Label htmlFor="excerpt">Excerpt *</Label>
                        <Textarea
                            id="excerpt"
                            {...register('excerpt')}
                            placeholder="Brief description of the article..."
                            rows={3}
                            className={errors.excerpt ? 'border-red-500' : ''}
                        />
                        {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <Label>Tags *</Label>
                        <div className="mb-2 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                                    {tag} <X className="ml-1 h-3 w-3" />
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add tag..."
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            />
                            <Button type="button" onClick={addTag} variant="outline">
                                Add
                            </Button>
                        </div>
                        {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>}
                    </div>

                    {/* Content Editor */}
                    <div>
                        <Label htmlFor="content">Content *</Label>

                        {/* Editor Toolbar */}
                        <div className="flex flex-wrap gap-1 rounded-t-md border border-gray-300 bg-gray-50 p-2">
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('bold')}>
                                <Bold className="h-4 w-4" />
                            </Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('italic')}>
                                <Italic className="h-4 w-4" />
                            </Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('underline')}>
                                <Underline className="h-4 w-4" />
                            </Button>
                            <div className="mx-1 h-6 w-px bg-gray-300" />
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('list')}>
                                <List className="h-4 w-4" />
                            </Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('ordered-list')}>
                                <ListOrdered className="h-4 w-4" />
                            </Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('quote')}>
                                <Quote className="h-4 w-4" />
                            </Button>
                            <div className="mx-1 h-6 w-px bg-gray-300" />
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('link')}>
                                <Link className="h-4 w-4" />
                            </Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction('image')}>
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Content Textarea */}
                        <Textarea
                            id="content-editor"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setValue('content', e.target.value);
                            }}
                            placeholder="Write your article content here..."
                            rows={15}
                            className={`rounded-t-none ${errors.content ? 'border-red-500' : ''}`}
                        />
                        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="featured" {...register('featured')} className="rounded" />
                        <Label htmlFor="featured">Mark as Featured Article</Label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 border-t pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" />
                            {mode === 'create' ? 'Create Article' : 'Update Article'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
