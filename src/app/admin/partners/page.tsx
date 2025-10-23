"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, GripVertical, Pencil, Trash2 } from "lucide-react";
import {
  listPartners,
  createPartner,
  updatePartner,
  deletePartner,
  reorderPartners,
  type PartnerData,
} from "@/lib/actions/partners";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImageUpload } from "@/components/admin/image-upload";

// Sortable partner card component for drag-and-drop
function SortablePartnerCard({
  partner,
  onEdit,
  onDelete,
}: {
  partner: PartnerData;
  onEdit: (partner: PartnerData) => void;
  onDelete: (partner: PartnerData) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: partner.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-card border rounded-lg p-6 hover:shadow-lg transition-all"
    >
      <button
        className="absolute top-2 left-2 cursor-grab active:cursor-grabbing touch-none p-1 rounded hover:bg-accent"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex flex-col items-center gap-4 pt-6">
        <div className="w-full h-24 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain p-2"
          />
        </div>

        <div className="text-center w-full">
          <p className="font-medium truncate">{partner.name}</p>
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary truncate block"
            >
              {partner.website}
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(partner)}
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(partner)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReordering, setIsReordering] = useState(false);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form states
  const [editingPartner, setEditingPartner] = useState<PartnerData | null>(
    null
  );
  const [deletingPartner, setDeletingPartner] = useState<PartnerData | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load partners
  const loadPartners = async () => {
    setIsLoading(true);
    const result = await listPartners();

    if (result.success && result.data) {
      setPartners(result.data);
    } else {
      showErrorToast(
        "Failed to load partners",
        !result.success ? result.error : "Unknown error"
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  // Handle create dialog open
  const handleCreateClick = () => {
    setFormData({ name: "", logo: "", website: "" });
    setCreateDialogOpen(true);
  };

  // Handle edit dialog open
  const handleEditClick = (partner: PartnerData) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website || "",
    });
    setEditDialogOpen(true);
  };

  // Handle delete dialog open
  const handleDeleteClick = (partner: PartnerData) => {
    setDeletingPartner(partner);
    setDeleteDialogOpen(true);
  };

  // Handle create submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createPartner(formData);

    if (result.success) {
      showSuccessToast("Partner created", "The partner has been added");
      setCreateDialogOpen(false);
      await loadPartners();
    } else {
      showErrorToast(
        "Failed to create partner",
        !result.success ? result.error : "Unknown error"
      );
    }

    setIsSubmitting(false);
  };

  // Handle edit submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner?.id) return;

    setIsSubmitting(true);

    const result = await updatePartner(editingPartner.id, formData);

    if (result.success) {
      showSuccessToast("Partner updated", "The partner has been updated");
      setEditDialogOpen(false);
      setEditingPartner(null);
      await loadPartners();
    } else {
      showErrorToast(
        "Failed to update partner",
        !result.success ? result.error : "Unknown error"
      );
    }

    setIsSubmitting(false);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!deletingPartner?.id) return;

    const result = await deletePartner(deletingPartner.id);

    if (result.success) {
      showSuccessToast("Partner deleted", "The partner has been removed");
      await loadPartners();
    } else {
      showErrorToast(
        "Failed to delete partner",
        !result.success ? result.error : "Unknown error"
      );
    }

    setDeleteDialogOpen(false);
    setDeletingPartner(null);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = partners.findIndex((p) => p.id === active.id);
    const newIndex = partners.findIndex((p) => p.id === over.id);

    const newOrder = arrayMove(partners, oldIndex, newIndex);
    setPartners(newOrder);

    // Update order in database
    setIsReordering(true);
    const reorderData = {
      items: newOrder.map((partner, index) => ({
        id: partner.id!,
        order: index,
      })),
    };

    const result = await reorderPartners(reorderData);

    if (result.success) {
      showSuccessToast("Order updated", "Partner order has been saved");
      await loadPartners();
    } else {
      showErrorToast(
        "Failed to update order",
        !result.success ? result.error : "Unknown error"
      );
      // Revert on error
      await loadPartners();
    }

    setIsReordering(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Partners Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage partner organizations and their logos
          </p>
        </div>
        <Button onClick={handleCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Partners Grid */}
      {partners.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No partners yet</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={partners.map((p) => p.id!)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partners.map((partner) => (
                <SortablePartnerCard
                  key={partner.id}
                  partner={partner}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isReordering && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving order...</span>
        </div>
      )}

      {/* Create Partner Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Partner</DialogTitle>
            <DialogDescription>
              Add a new partner organization with their logo
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-name">Partner Name *</Label>
              <Input
                id="create-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter partner name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Logo *</Label>
              <ImageUpload
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                onRemove={() => setFormData({ ...formData, logo: "" })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-website">Website URL</Label>
              <Input
                id="create-website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.logo}>
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Create Partner
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Partner Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
            <DialogDescription>
              Update partner information and logo
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Partner Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter partner name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Logo *</Label>
              <ImageUpload
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                onRemove={() => setFormData({ ...formData, logo: "" })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-website">Website URL</Label>
              <Input
                id="edit-website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setEditingPartner(null);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.logo}>
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Update Partner
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
              This will permanently delete {deletingPartner?.name}. This action
              cannot be undone.
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
