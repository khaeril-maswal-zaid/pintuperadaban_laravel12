'use client';

import type React from 'react';

import { CropDialog } from '@/components/dashboard/crop-dialog';
import RichTextEditor from '@/components/dashboard/rich-text-editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { CropIcon, Loader2, PlusCircle, Upload, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

// Skema validasi
const blogPostSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter').max(250, 'Judul maksimal 250 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter').max(255, 'Deskripsi maksimal 255 karakter'),
  body1: z.string().min(20, 'Konten utama minimal 20 karakter'),
  body2: z.string().optional(),
  category: z.union([z.string(), z.number()], {
    required_error: 'Kategori wajib dipilih',
    invalid_type_error: 'Kategori harus berupa angka atau string',
  }),
  tags: z.array(z.string()).min(1, 'Minimal 1 tag harus dipilih').max(5, 'Maksimal 5 tag'),
  mainImage: z.any().optional(),
  subImage1: z.any().optional(),
});

type ValidationErrors = {
  [key: string]: string | undefined;
};

type BlogPostModalProps = {
  post?: {
    id: number;
    title: string;
    description: string;
    body1: string;
    body2?: string;
    category: string | number;
    tags: string[];
    mainImage?: string;
    subImage1?: string;
  };
};

export default function BlogPostModal({ post }: BlogPostModalProps) {
  const { auth, categories } = usePage().props;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post?.title ?? '');
  const [description, setDescription] = useState(post?.description ?? '');
  const [body1, setBody1] = useState(post?.body1 ?? '');
  const [body2, setBody2] = useState(post?.body2 ?? '');
  const [category, setCategory] = useState(post?.category?.toString() ?? '');

  const [imageType, setImageType] = useState<'main' | 'sub1' | null>(null);

  const [mainImage, setMainImage] = useState(post?.mainImage ?? '');
  const [subImage1, setSubImage1] = useState(post?.subImage1 ?? '');

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [activeTab, setActiveTab] = useState('media');

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pulse, setPulse] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [errorsServer, setErrorsServer] = useState('');

  // Crop state
  const [src, setSrc] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const aspectRatio = 4 / 3;

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
    const width = img.width * 0.75;
    const height = width * (3 / 4);
    setCrop({
      unit: 'px',
      width,
      height,
      x: (img.width - width) / 2,
      y: (img.height - height) / 2,
      aspect: aspectRatio,
    });
    return false;
  }, []);

  const generateCrop = useCallback(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const { width, height, x, y } = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = width * scaleX;
    canvas.height = height * scaleY;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, width * scaleX, height * scaleY);
    let base64 = canvas.toDataURL('image/jpeg', 1.0);
    if (base64.length > 700000) base64 = canvas.toDataURL('image/jpeg', 0.8);

    if (imageType === 'main') setMainImage(base64);
    else if (imageType === 'sub1') setSubImage1(base64);
  }, [completedCrop]);

  const [crop, setCrop] = useState({
    unit: '%',
    width: 75,
    height: 100,
    x: 12.5,
    y: 0,
    aspect: aspectRatio,
  });

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'sub1') => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    if (file.size > 510 * 1024) {
      toast({ title: `Gagal Upload Foto`, description: `Ukuran foto tidak boleh melebihi 510 KB` });
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string);
      setImageType(type);
    };
    reader.readAsDataURL(file);
    setCropDialogOpen(true);
  };

  // Reset error ketika input berubah
  useEffect(() => {
    if (errors.title && title.length >= 5) setErrors((p) => ({ ...p, title: undefined }));
    if (errors.description && description.length >= 10) setErrors((p) => ({ ...p, description: undefined }));
    if (errors.body1 && body1.length >= 20) setErrors((p) => ({ ...p, body1: undefined }));
    if (errors.mainImage && mainImage) setErrors((p) => ({ ...p, mainImage: undefined }));
    if (errors.tags && tags.length >= 1) setErrors((p) => ({ ...p, tags: undefined }));
    if (errors.category && category.length >= 1) setErrors((p) => ({ ...p, category: undefined }));
  }, [title, description, body1, mainImage, tags, category, errors]);

  useEffect(() => {
    if (pulse) {
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [pulse]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ';' && tagInput.trim() !== '') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(';', '');
      if (newTag && !tags.includes(newTag)) {
        if (tags.length >= 5) {
          setErrors((p) => ({ ...p, tags: 'Maximum 5 tags allowed' }));
          return;
        }
        setTags([...tags, newTag]);
        if (errors.tags) setErrors((p) => ({ ...p, tags: undefined }));
      }
      setTagInput('');
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    if (value.endsWith(';')) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        if (tags.length >= 5) {
          setErrors((p) => ({ ...p, tags: 'Maximum 5 tags allowed' }));
          return;
        }
        setTags([...tags, newTag]);
        if (errors.tags) setErrors((p) => ({ ...p, tags: undefined }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
    if (tags.length <= 1) setErrors((p) => ({ ...p, tags: 'At least one tag is required' }));
  };

  const validateForm = () => {
    try {
      blogPostSchema.parse({ title, description, body1, body2, category, tags, mainImage, subImage1 });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        const firstError = error.errors[0];
        if (firstError) toast({ title: 'Validation Error', description: firstError.message, variant: 'destructive' });
      } else {
        toast({ title: 'Error', description: 'Unexpected error occurred.', variant: 'destructive' });
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    const payload = { title, description, body1, body2, mainImage, subImage1, tags, category };

    if (post) {
      router.put(route('blog.update', post.id), payload, {
        onError: (e) => {
          setErrorsServer(e);
          setIsSubmitting(false);
        },
        onSuccess: () => {
          toast({ title: 'Berhasil!', description: 'Blog berhasil diperbarui' });
          setOpen(false);
          setIsSubmitting(false);
        },
      });
    } else {
      router.post(route('blog.store'), payload, {
        onError: (e) => {
          setErrorsServer(e);
          setIsSubmitting(false);
        },
        onSuccess: () => {
          toast({ title: 'Berhasil!', description: 'Blog berhasil dipublis' });
          resetForm();
          setOpen(false);
          setIsSubmitting(false);
        },
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBody1('');
    setBody2('');
    setCategory('');
    setMainImage('');
    setSubImage1('');
    setTagInput('');
    setTags([]);
    setActiveTab('media');
    setErrors({});
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (open && !newOpen) {
      setPulse(true);
      return;
    }
    setOpen(newOpen);
  };

  return (
    <>
      {!post && (
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Article
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange} modal={false}>
        <DialogContent
          className={'overflow-hidden p-0 transition-all duration-300 sm:max-w-[1000px]'}
          ref={dialogRef}
          onInteractOutside={(e) => {
            e.preventDefault();
            setPulse(true);
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            setPulse(true);
          }}
        >
          <DialogHeader className="relative p-6 pb-2">
            <DialogTitle>{post ? 'Edit Artikel' : 'Buat Postingan Artikel Baru'}</DialogTitle>
            <DialogDescription>
              {post ? 'Perbarui detail artikel Anda.' : 'Isi detail di bawah ini untuk membuat postingan artikel baru.'}
            </DialogDescription>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <X className="h-3" />
            </Button>
          </DialogHeader>

          {/* Tab & form tetap sama, hanya berbeda di handleSubmit */}
          {/* Konten form disamakan dengan versi sebelumnya */}

          <DialogFooter className="flex space-x-2 p-6 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {post ? 'Updating...' : 'Saving...'}
                </>
              ) : post ? 'Update Post' : 'Save Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CropDialog
        open={cropDialogOpen}
        onClose={() => setCropDialogOpen(false)}
        onCropDone={(base64) => {
          if (imageType === 'main') setMainImage(base64);
          else if (imageType === 'sub1') setSubImage1(base64);
        }}
        src={src!}
        crop={crop}
        setCrop={setCrop}
        setCompletedCrop={setCompletedCrop}
        onImageLoad={onImageLoad}
        generateCrop={generateCrop}
        previewCanvasRef={previewCanvasRef}
        aspectRatio={aspectRatio}
      />
    </>
  );
}
