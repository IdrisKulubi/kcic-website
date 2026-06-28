"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Loader2, Plus, GripVertical } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
  type DataTableAction,
} from "@/components/admin/data-table";
import {
  listTeamMembers,
  deleteTeamMember,
  reorderTeamMembers,
  type TeamMemberData,
} from "@/lib/actions/team";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sortable row component for drag-and-drop
function SortableTeamMemberRow({
  member,
  onEdit,
  onDelete,
}: {
  member: TeamMemberData;
  onEdit: (member: TeamMemberData) => void;
  onDelete: (member: TeamMemberData) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:bg-accent/50 transition-colors"
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>

      <Avatar className="h-12 w-12">
        <AvatarImage src={member.photo} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{member.name}</p>
        <p className="text-sm text-muted-foreground truncate">{member.role}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(member)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(member)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function TeamListPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMemberData[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMemberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<TeamMemberData | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isReordering, setIsReordering] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load team members
  const loadTeamMembers = async () => {
    setIsLoading(true);
    const result = await listTeamMembers();

    if (result.success && result.data) {
      setMembers(result.data);
      setFilteredMembers(result.data);
    } else {
      showErrorToast(
        "Failed to load team members",
        !result.success ? result.error : "Unknown error"
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Filter members based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (member as any).category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]);

  // Handle delete
  const handleDeleteClick = (member: TeamMemberData) => {
    setDeletingMember(member);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMember?.id) return;

    const result = await deleteTeamMember(deletingMember.id);

    if (result.success) {
      showSuccessToast(
        "Team member deleted",
        "The team member has been removed"
      );
      await loadTeamMembers();
    } else {
      showErrorToast(
        "Failed to delete team member",
        !result.success ? result.error : "Unknown error"
      );
    }

    setDeleteDialogOpen(false);
    setDeletingMember(null);
  };

  // Handle edit
  const handleEdit = (member: TeamMemberData) => {
    router.push(`/admin/team/${member.id}/edit`);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = filteredMembers.findIndex((m) => m.id === active.id);
    const newIndex = filteredMembers.findIndex((m) => m.id === over.id);

    const newOrder = arrayMove(filteredMembers, oldIndex, newIndex);
    setFilteredMembers(newOrder);

    // Update order in database
    setIsReordering(true);
    const reorderData = {
      items: newOrder.map((member, index) => ({
        id: member.id!,
        order: index,
      })),
    };

    const result = await reorderTeamMembers(reorderData);

    if (result.success) {
      showSuccessToast("Order updated", "Team member order has been saved");
      await loadTeamMembers();
    } else {
      showErrorToast(
        "Failed to update order",
        !result.success ? result.error : "Unknown error"
      );
      // Revert on error
      setFilteredMembers(members);
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
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage team members and their information
          </p>
        </div>
        <Button onClick={() => router.push("/admin/team/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Drag and Drop List */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No team members found matching your search"
              : "No team members yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredMembers.map((m) => m.id!)}
              strategy={verticalListSortingStrategy}
            >
              {filteredMembers.map((member) => (
                <SortableTeamMemberRow
                  key={member.id}
                  member={member}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      {isReordering && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving order...</span>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingMember?.name} from the team.
              This action cannot be undone.
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
