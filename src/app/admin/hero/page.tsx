'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import { getHeroSection, updateHeroSection, type HeroSectionData } from '@/lib/actions/hero';
import { showSuccessToast, showErrorToast } from '@/lib/toast';

// Validation schema
const heroButtonSchema = z.object({
  text: z.string().min(2, 'Button text must be at least 2 characters').max(50, 'Button text must be at most 50 characters'),
  href: z.string().min(1, 'Button link is required'),
  variant: z.enum(['primary', 'secondary'], {
    errorMap: () => ({ message: 'Variant must be either primary or secondary' })
  })
});

const heroSchema = z.object({
  headline: z.string().min(10, 'Headline must be at least 10 characters').max(200, 'Headline must be at most 200 characters'),
  subtext: z.string().min(20, 'Subtext must be at least 20 characters').max(500, 'Subtext must be at most 500 characters'),
  backgroundVideo: z.string().url('Background video must be a valid URL').optional().or(z.literal('')),
  buttons: z.array(heroButtonSchema).min(1, 'At least one button is required').max(3, 'Maximum 3 buttons allowed')
});

type HeroFormData = z.infer<typeof heroSchema>;

export default function HeroEditorPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      headline: '',
      subtext: '',
      backgroundVideo: '',
      buttons: [{ text: '', href: '', variant: 'primary' }]
    }
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'buttons'
  });

  // Load hero section data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const result = await getHeroSection();
      
      if (result.success && result.data) {
        setValue('headline', result.data.headline);
        setValue('subtext', result.data.subtext);
        setValue('backgroundVideo', result.data.backgroundVideo || '');
        setValue('buttons', result.data.buttons);
      } else {
        showErrorToast('Failed to load hero section', result.error);
      }
      
      setIsLoading(false);
    }

    loadData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = async (data: HeroFormData) => {
    setIsSaving(true);
    
    const result = await updateHeroSection(data);
    
    if (result.success) {
      showSuccessToast('Hero section updated successfully', 'Changes are now live on the homepage');
    } else {
      showErrorToast('Failed to update hero section', result.error);
    }
    
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hero Section Editor</h1>
        <p className="text-muted-foreground mt-2">
          Manage the main hero section content on your homepage
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Headline */}
        <Card>
          <CardHeader>
            <CardTitle>Headline</CardTitle>
            <CardDescription>The main headline displayed in the hero section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                {...register('headline')}
                placeholder="Enter headline"
                className={errors.headline ? 'border-red-500' : ''}
              />
              {errors.headline && (
                <p className="text-sm text-red-500">{errors.headline.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Subtext */}
        <Card>
          <CardHeader>
            <CardTitle>Subtext</CardTitle>
            <CardDescription>Supporting text that appears below the headline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Textarea
                {...register('subtext')}
                placeholder="Enter subtext"
                rows={4}
                className={errors.subtext ? 'border-red-500' : ''}
              />
              {errors.subtext && (
                <p className="text-sm text-red-500">{errors.subtext.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Background Video */}
        <Card>
          <CardHeader>
            <CardTitle>Background Video</CardTitle>
            <CardDescription>Optional background video URL (leave empty for none)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                {...register('backgroundVideo')}
                placeholder="https://example.com/video.mp4"
                type="url"
                className={errors.backgroundVideo ? 'border-red-500' : ''}
              />
              {errors.backgroundVideo && (
                <p className="text-sm text-red-500">{errors.backgroundVideo.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Call-to-Action Buttons</CardTitle>
            <CardDescription>Add up to 3 buttons (minimum 1 required)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start p-4 border rounded-lg">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`buttons.${index}.text`}>Button Text</Label>
                    <Input
                      {...register(`buttons.${index}.text`)}
                      placeholder="Button text"
                      className={errors.buttons?.[index]?.text ? 'border-red-500' : ''}
                    />
                    {errors.buttons?.[index]?.text && (
                      <p className="text-sm text-red-500">{errors.buttons[index]?.text?.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`buttons.${index}.href`}>Button Link</Label>
                    <Input
                      {...register(`buttons.${index}.href`)}
                      placeholder="/path or https://example.com"
                      className={errors.buttons?.[index]?.href ? 'border-red-500' : ''}
                    />
                    {errors.buttons?.[index]?.href && (
                      <p className="text-sm text-red-500">{errors.buttons[index]?.href?.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`buttons.${index}.variant`}>Button Style</Label>
                    <Select
                      value={watch(`buttons.${index}.variant`)}
                      onValueChange={(value) => setValue(`buttons.${index}.variant`, value as 'primary' | 'secondary')}
                    >
                      <SelectTrigger className={errors.buttons?.[index]?.variant ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.buttons?.[index]?.variant && (
                      <p className="text-sm text-red-500">{errors.buttons[index]?.variant?.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {errors.buttons && typeof errors.buttons.message === 'string' && (
              <p className="text-sm text-red-500">{errors.buttons.message}</p>
            )}

            {fields.length < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ text: '', href: '', variant: 'primary' })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Button
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isSaving}
            size="lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
