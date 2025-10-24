'use client';

import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as LucideIcons from 'lucide-react';
import { Loader2, Plus, Trash2, Pencil, GripVertical, BarChart3 } from 'lucide-react';
import { 
  listStatistics, 
  createStatistic, 
  updateStatistic, 
  deleteStatistic,
  reorderStatistics,
  type StatisticData 
} from '@/lib/actions/stats';
import { showSuccessToast, showErrorToast } from '@/lib/toast';

// Validation schema for the form
const statisticFormSchema = z.object({
  label: z.string().min(2, 'Label must be at least 2 characters').max(100, 'Label must be at most 100 characters'),
  value: z.coerce.number().int('Value must be an integer').min(0, 'Value must be positive'),
  suffix: z.string().max(20, 'Suffix must be at most 20 characters').optional().or(z.literal('')),
  icon: z.string().min(1, 'Icon is required')
});

type StatisticFormData = z.infer<typeof statisticFormSchema>;

const ICON_SUGGESTIONS = ['TrendingUp','Users','Award','BarChart3','Handshake','Briefcase','Target','Trophy','Leaf','Globe'];

function getIconByName(name?: string) {
  if (!name) return BarChart3;
  const Icon = (LucideIcons as Record<string, ComponentType<{ className?: string }>>)[name];
  return Icon || BarChart3;
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<StatisticData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<StatisticFormData>({
    resolver: zodResolver(statisticFormSchema),
    defaultValues: {
      label: '',
      value: 0,
      suffix: '',
      icon: ''
    }
  });

  // Load statistics
  const loadStatistics = async () => {
    setIsLoading(true);
    const result = await listStatistics();
    
    if (result.success && result.data) {
      setStatistics(result.data);
    } else {
      showErrorToast('Failed to load statistics', result.error);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  // Open dialog for creating new statistic
  const handleCreate = () => {
    setEditingId(null);
    reset({
      label: '',
      value: 0,
      suffix: '',
      icon: ''
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing existing statistic
  const handleEdit = (stat: StatisticData) => {
    setEditingId(stat.id || null);
    reset({
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || '',
      icon: stat.icon
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = async (data: StatisticFormData) => {
    setIsSaving(true);
    
    let result;
    if (editingId) {
      result = await updateStatistic(editingId, data);
    } else {
      result = await createStatistic(data);
    }
    
    if (result.success) {
      showSuccessToast(
        editingId ? 'Statistic updated' : 'Statistic created',
        'Changes are now live on the homepage'
      );
      setIsDialogOpen(false);
      await loadStatistics();
    } else {
      showErrorToast(
        editingId ? 'Failed to update statistic' : 'Failed to create statistic',
        result.error
      );
    }
    
    setIsSaving(false);
  };

  // Handle delete
  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    
    const result = await deleteStatistic(deletingId);
    
    if (result.success) {
      showSuccessToast('Statistic deleted', 'The statistic has been removed');
      await loadStatistics();
    } else {
      showErrorToast('Failed to delete statistic', result.error);
    }
    
    setDeleteDialogOpen(false);
    setDeletingId(null);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    // Reorder the array
    const newStats = [...statistics];
    const [draggedItem] = newStats.splice(draggedIndex, 1);
    newStats.splice(dropIndex, 0, draggedItem);

    // Update local state immediately for smooth UX
    setStatistics(newStats);
    setDraggedIndex(null);

    // Update order in database
    const reorderData = {
      items: newStats.map((stat, idx) => ({
        id: stat.id!,
        order: idx
      }))
    };

    const result = await reorderStatistics(reorderData);
    
    if (result.success) {
      showSuccessToast('Order updated', 'Statistics have been reordered');
    } else {
      showErrorToast('Failed to reorder statistics', result.error);
      // Reload to get correct order
      await loadStatistics();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header banner */}
      <div className="relative overflow-hidden rounded-xl bg-hero-gradient p-6 text-white shadow-glass">
        <div className="absolute inset-0 opacity-20 sustainability-pattern" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Statistics</h1>
            <p className="text-white/80">Manage the impact metrics shown on the homepage</p>
          </div>
          <Button onClick={handleCreate} variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            <Plus className="mr-2 h-4 w-4" /> Add Statistic
          </Button>
        </div>
      </div>

      {/* Live preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your statistics will look to visitors</CardDescription>
        </CardHeader>
        <CardContent>
          {statistics.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">No statistics yet</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat) => {
                const Icon = getIconByName(stat.icon);
                return (
                  <div key={`preview-${stat.id}`} className="rounded-lg border p-4 hover-lift">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold tabular-nums">{stat.value}{stat.suffix}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage</h2>
        {statistics.length > 0 && (
          <p className="text-sm text-muted-foreground">Tip: drag the handle to reorder</p>
        )}
      </div>

      {/* Manage list */}
      {statistics.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-muted-foreground">No statistics yet</p>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> Create First Statistic
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {statistics.map((stat, index) => {
            const Icon = getIconByName(stat.icon);
            return (
              <Card
                key={stat.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />

                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 grid w-full grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_1fr_0.5fr]">
                    <div className="min-w-0">
                      <p className="mb-1 text-xs text-muted-foreground">Label</p>
                      <p className="truncate text-base font-medium">{stat.label}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Value</p>
                      <p className="text-lg font-semibold tabular-nums">{stat.value}{stat.suffix}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-xs text-muted-foreground">Icon</p>
                      <p className="truncate text-sm text-muted-foreground">{stat.icon}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Order</p>
                      <p className="text-sm font-medium">{stat.order}</p>
                    </div>
                  </div>

                  <div className="ml-auto flex shrink-0 gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(stat)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(stat.id!)}
                            className="text-red-500 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Statistic' : 'Create Statistic'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update the statistic details' : 'Add a new statistic to your homepage'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  {...register('label')}
                  placeholder="e.g., Startups Supported"
                  className={errors.label ? 'border-red-500' : ''}
                />
                {errors.label && (
                  <p className="text-sm text-red-500">{errors.label.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  {...register('value')}
                  placeholder="e.g., 100"
                  className={errors.value ? 'border-red-500' : ''}
                />
                {errors.value && (
                  <p className="text-sm text-red-500">{errors.value.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix (optional)</Label>
                <Input
                  id="suffix"
                  {...register('suffix')}
                  placeholder="e.g., +, K, M"
                  className={errors.suffix ? 'border-red-500' : ''}
                />
                {errors.suffix && (
                  <p className="text-sm text-red-500">{errors.suffix.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  {...register('icon')}
                  placeholder="e.g., TrendingUp, Users, Award"
                  className={errors.icon ? 'border-red-500' : ''}
                  list="icon-suggestions"
                />
                <datalist id="icon-suggestions">
                  {ICON_SUGGESTIONS.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
                {errors.icon && (
                  <p className="text-sm text-red-500">{errors.icon.message}</p>
                )}
                <p className="text-xs text-muted-foreground">Use Lucide icon names (e.g., TrendingUp, Users, Award)</p>
              </div>
            </div>

            {/* Live mini preview in dialog */}
            <div className="rounded-md border p-3">
              <p className="mb-2 text-xs text-muted-foreground">Preview</p>
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getIconByName(watch('icon'));
                  return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  );
                })()}
                <div>
                  <div className="text-2xl font-bold tabular-nums">{watch('value') ?? 0}{watch('suffix') ?? ''}</div>
                  <div className="text-sm text-muted-foreground">{watch('label') || 'Label'}</div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingId ? 'Update' : 'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this statistic. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
