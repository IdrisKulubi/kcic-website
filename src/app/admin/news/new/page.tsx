'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';
import { createNewsArticle } from '@/lib/actions/news';
import { showSuccessToast, showErrorToast } from '@/lib/toast';

const NEWS_CATEGORIES = [
  'Events',
  'Announcements',
  'Success Stories',
  'Press Release',
  'Updates'
];

// Form validation schema
const newsFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be at most 200 characters'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters').max(500, 'Excerpt must be at most 500 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters').optional().or(z.literal('')),
  thumbnail: z.string().url('Please upload a thumbnail image'),
  category: z.string().min(1, 'Please select a category'),
  readTime: z.string().optional(),
  featured: z.boolean().default(false),
  publishedAt: z.string().min(1, 'Please select a publish date')
});

type NewsFormData = z.infer<typeof newsFormSchema>;

export default function NewNewsPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [slugPreview, setSlugPreview] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      thumbnail: '',
      category: '',
      readTime: '',
      featured: false,
      publishedAt: new Date().toISOString().split('T')[0]
    }
  });

  // Watch title to generate slug preview
  const title = watch('title');
  
  // Generate slug preview
  const generateSlugPreview = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Update slug preview when title changes
  useState(() => {
    if (title) {
      setSlugPreview(generateSlugPreview(title));
    }
  });

  const onSubmit = async (data: NewsFormData) => {
    setIsSaving(true);
    
    const result = await createNewsArticle({
      ...data,
      publishedAt: new Date(data.publishedAt)
    });
    
    if (result.success) {
      showSuccessToast(
        'Article created',
        'The news article is now live'
      );
      router.push('/admin/news');
    } else {
      showErrorToast('Failed to create article', result.error);
    }
    
    setIsSaving(false);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/news')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create News Article</h1>
        <p className="text-muted-foreground mt-2">
          Add a new article to your newsroom
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>
              Basic information about the news article
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter article title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
              {slugPreview && (
                <p className="text-sm text-muted-foreground">
                  Slug preview: <code className="bg-muted px-1 py-0.5 rounded">{slugPreview}</code>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                {...register('excerpt')}
                placeholder="Brief summary of the article"
                rows={3}
                className={errors.excerpt ? 'border-red-500' : ''}
              />
              {errors.excerpt && (
                <p className="text-sm text-red-500">{errors.excerpt.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                {...register('content')}
                placeholder="Full article content (optional)"
                rows={10}
                className={errors.content ? 'border-red-500' : ''}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {NEWS_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  {...register('readTime')}
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishedAt">Publish Date *</Label>
              <Input
                id="publishedAt"
                type="date"
                {...register('publishedAt')}
                className={errors.publishedAt ? 'border-red-500' : ''}
              />
              {errors.publishedAt && (
                <p className="text-sm text-red-500">{errors.publishedAt.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thumbnail Image</CardTitle>
            <CardDescription>
              Upload a featured image for the article
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange('')}
                  endpoint="imageUploader"
                />
              )}
            />
            {errors.thumbnail && (
              <p className="text-sm text-red-500 mt-2">{errors.thumbnail.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Additional article settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured Article</Label>
                <p className="text-sm text-muted-foreground">
                  Display this article prominently on the homepage
                </p>
              </div>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/news')}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Article'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
