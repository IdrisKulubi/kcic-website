'use client';

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
import { Loader2, Plus, Trash2, Pencil, GripVertical } from 'lucide-react';
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

  const handleDragOver = (e: React.DragEvent, index: number) => {
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
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage the impact statistics displayed on your homepage
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Statistic
        </Button>
      </div>

      {statistics.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No statistics yet</p>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Statistic
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {statistics.map((stat, index) => (
            <Card
              key={stat.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className="cursor-move hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-center gap-4 p-6">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Label</p>
                    <p className="font-medium">{stat.label}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Value</p>
                    <p className="font-medium">{stat.value}{stat.suffix}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Icon</p>
                    <p className="font-medium">{stat.icon}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order</p>
                    <p className="font-medium">{stat.order}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(stat)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(stat.id!)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
              />
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Use Lucide icon names (e.g., TrendingUp, Users, Award)
              </p>
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
