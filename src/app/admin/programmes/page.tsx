'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Pencil, Save, X } from 'lucide-react';
import { listProgrammes, updateProgramme, type ProgrammeData } from '@/lib/actions/programmes';
import { showSuccessToast, showErrorToast } from '@/lib/toast';
import { ImageUpload } from '@/components/admin/image-upload';

// Validation schema for programme form
const programmeFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title must be at most 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be at most 1000 characters'),
  image: z.string().url('Image must be a valid URL'),
  href: z.string().min(1, 'Link is required'),
  color: z.string().min(1, 'Color is required')
});

type ProgrammeFormData = z.infer<typeof programmeFormSchema>;

// Programme card component with edit mode
function ProgrammeCard({ 
  programme, 
  onUpdate 
}: { 
  programme: ProgrammeData;
  onUpdate: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProgrammeFormData>({
    resolver: zodResolver(programmeFormSchema),
    defaultValues: {
      title: programme.title,
      description: programme.description,
      image: programme.image,
      href: programme.href,
      color: programme.color
    }
  });

  const imageValue = watch('image');

  const onSubmit = async (data: ProgrammeFormData) => {
    setIsSaving(true);
    
    const result = await updateProgramme(programme.id, data);
    
    if (result.success) {
      showSuccessToast('Programme updated', 'Changes have been saved');
      setIsEditing(false);
      onUpdate();
    } else {
      showErrorToast('Failed to update programme', result.error);
    }
    
    setIsSaving(false);
  };

  const handleCancel = () => {
    // Reset form to original values
    setValue('title', programme.title);
    setValue('description', programme.description);
    setValue('image', programme.image);
    setValue('href', programme.href);
    setValue('color', programme.color);
    setIsEditing(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4" style={{ backgroundColor: `${programme.color}10` }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{programme.title}</CardTitle>
            <CardDescription className="mt-1">
              {isEditing ? 'Edit programme details' : 'Programme information'}
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3 w-3 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${programme.id}`}>Title *</Label>
              <Input
                id={`title-${programme.id}`}
                {...register('title')}
                placeholder="Programme title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${programme.id}`}>Description *</Label>
              <Textarea
                id={`description-${programme.id}`}
                {...register('description')}
                placeholder="Programme description"
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Programme Image *</Label>
              <ImageUpload
                value={imageValue}
                onChange={(url) => setValue('image', url)}
                onRemove={() => setValue('image', '')}
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`href-${programme.id}`}>Link *</Label>
              <Input
                id={`href-${programme.id}`}
                {...register('href')}
                placeholder="/path or https://example.com"
                className={errors.href ? 'border-red-500' : ''}
              />
              {errors.href && (
                <p className="text-sm text-red-500">{errors.href.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`color-${programme.id}`}>Color Theme *</Label>
              <div className="flex gap-2">
                <Input
                  id={`color-${programme.id}`}
                  {...register('color')}
                  placeholder="#000000"
                  className={errors.color ? 'border-red-500' : ''}
                />
                <input
                  type="color"
                  value={watch('color')}
                  onChange={(e) => setValue('color', e.target.value)}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
              </div>
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
              <img
                src={programme.image}
                alt={programme.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm mt-1">{programme.description}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Link</p>
                <a 
                  href={programme.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-1 block"
                >
                  {programme.href}
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Color Theme</p>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: programme.color }}
                  />
                  <span className="text-sm font-mono">{programme.color}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<ProgrammeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProgrammes = async () => {
    setIsLoading(true);
    const result = await listProgrammes();

    if (result.success && result.data) {
      setProgrammes(result.data);
    } else {
      showErrorToast('Failed to load programmes', !result.success ? result.error : 'Unknown error');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadProgrammes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Programmes Editor</h1>
        <p className="text-muted-foreground mt-2">
          Manage the three main programmes: KCIC, Agribiz, and KCV
        </p>
      </div>

      {programmes.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No programmes found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {programmes.map((programme) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
              onUpdate={loadProgrammes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
