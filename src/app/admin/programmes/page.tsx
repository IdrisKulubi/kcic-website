"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Pencil, Plus, Trash2, Save, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import {
  listProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  getProgrammeSponsors,
  addProgrammeSponsor,
  removeProgrammeSponsor,
  type ProgrammeData,
  type ProgrammeSponsorData,
} from "@/lib/actions/programmes";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { ImageUpload } from "@/components/admin/image-upload";
import Image from "next/image";

// Validation schema
const programmeFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Image must be a valid URL"),
  headerImage: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  order: z.number().int().min(0),
  isActive: z.boolean(),
  applicationLink: z.string().optional(),
  introduction: z.string().optional(),
  applicationProcess: z.string().optional(),
  criteria: z.string().optional(),
  eligibility: z.string().optional(),
  applicationSelection: z.string().optional(),
  technicalSupport: z.string().optional(),
  definitions: z.string().optional(),
  terms: z.string().optional(),
  scoringSystem: z.string().optional(),
  fraudPolicy: z.string().optional(),
});

type ProgrammeFormData = z.infer<typeof programmeFormSchema>;

// Content section config
const contentSections = [
  { key: 'introduction', label: 'Introduction', description: 'Overview of the programme' },
  { key: 'applicationProcess', label: 'Application Process', description: 'How to apply' },
  { key: 'criteria', label: 'Criteria', description: 'Requirements and criteria' },
  { key: 'eligibility', label: 'Eligibility', description: 'Who can apply' },
  { key: 'applicationSelection', label: 'Selection Process', description: 'How applications are selected' },
  { key: 'technicalSupport', label: 'Technical Support', description: 'Support provided' },
  { key: 'definitions', label: 'Definitions', description: 'Key terms and definitions' },
  { key: 'terms', label: 'Terms & Conditions', description: 'Legal terms' },
  { key: 'scoringSystem', label: 'Scoring System', description: 'How applications are scored' },
  { key: 'fraudPolicy', label: 'Fraud & Bribery Policy', description: 'Anti-fraud policies' },
] as const;

// Sponsor Management Component
function SponsorManager({ programmeId }: { programmeId: string }) {
  const [sponsors, setSponsors] = useState<ProgrammeSponsorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSponsor, setNewSponsor] = useState({ name: '', logo: '' });
  const [adding, setAdding] = useState(false);

  const loadSponsors = async () => {
    const result = await getProgrammeSponsors(programmeId);
    if (result.success && result.data) {
      setSponsors(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSponsors();
  }, [programmeId]);

  const handleAdd = async () => {
    if (!newSponsor.name || !newSponsor.logo) return;
    setAdding(true);
    const result = await addProgrammeSponsor(programmeId, {
      name: newSponsor.name,
      logo: newSponsor.logo,
      order: sponsors.length
    });
    if (result.success) {
      showSuccessToast("Sponsor added");
      setNewSponsor({ name: '', logo: '' });
      loadSponsors();
    } else {
      showErrorToast("Failed to add sponsor", result.error);
    }
    setAdding(false);
  };

  const handleRemove = async (id: string) => {
    const result = await removeProgrammeSponsor(id);
    if (result.success) {
      showSuccessToast("Sponsor removed");
      loadSponsors();
    } else {
      showErrorToast("Failed to remove sponsor", result.error);
    }
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading sponsors...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="relative group">
            <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden border">
              <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain p-2" />
            </div>
            <button
              onClick={() => handleRemove(sponsor.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs text-center mt-1 truncate w-24">{sponsor.name}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
        <Label className="text-sm font-medium">Add New Sponsor</Label>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Sponsor Name</Label>
            <Input
              value={newSponsor.name}
              onChange={(e) => setNewSponsor(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., European Union"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Sponsor Logo</Label>
            <ImageUpload
              value={newSponsor.logo}
              onChange={(url) => setNewSponsor(prev => ({ ...prev, logo: url }))}
              onRemove={() => setNewSponsor(prev => ({ ...prev, logo: '' }))}
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={adding || !newSponsor.name || !newSponsor.logo}
            className="w-full"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Sponsor
          </Button>
        </div>
      </div>
    </div>
  );
}

// Programme Editor Dialog
function ProgrammeEditor({
  programme,
  onSave,
  onCancel,
}: {
  programme?: ProgrammeData;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const isNew = !programme;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProgrammeFormData>({
    resolver: zodResolver(programmeFormSchema),
    defaultValues: programme ? {
      title: programme.title,
      slug: programme.slug,
      description: programme.description,
      image: programme.image,
      headerImage: programme.headerImage || '',
      color: programme.color,
      order: programme.order,
      isActive: programme.isActive,
      applicationLink: programme.applicationLink || '',
      introduction: programme.introduction || '',
      applicationProcess: programme.applicationProcess || '',
      criteria: programme.criteria || '',
      eligibility: programme.eligibility || '',
      applicationSelection: programme.applicationSelection || '',
      technicalSupport: programme.technicalSupport || '',
      definitions: programme.definitions || '',
      terms: programme.terms || '',
      scoringSystem: programme.scoringSystem || '',
      fraudPolicy: programme.fraudPolicy || '',
    } : {
      title: '',
      slug: '',
      description: '',
      image: '',
      headerImage: '',
      color: '#22c55e',
      order: 0,
      isActive: false,
      applicationLink: '',
      introduction: '',
      applicationProcess: '',
      criteria: '',
      eligibility: '',
      applicationSelection: '',
      technicalSupport: '',
      definitions: '',
      terms: '',
      scoringSystem: '',
      fraudPolicy: '',
    },
  });

  const onSubmit = async (data: ProgrammeFormData) => {
    setIsSaving(true);
    const result = isNew
      ? await createProgramme(data)
      : await updateProgramme(programme!.id, data);

    if (result.success) {
      showSuccessToast(isNew ? "Programme created" : "Programme updated");
      onSave();
    } else {
      showErrorToast("Failed to save", result.error);
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input {...register("title")} placeholder="Programme title" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input {...register("slug")} placeholder="programme-slug" />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea {...register("description")} placeholder="Short description" rows={3} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Card Image *</Label>
              <ImageUpload
                value={watch("image")}
                onChange={(url) => setValue("image", url)}
                onRemove={() => setValue("image", "")}
              />
            </div>
            <div className="space-y-2">
              <Label>Header Image (Optional)</Label>
              <ImageUpload
                value={watch("headerImage") || ''}
                onChange={(url) => setValue("headerImage", url)}
                onRemove={() => setValue("headerImage", "")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color Theme</Label>
              <div className="flex gap-2">
                <Input {...register("color")} placeholder="#22c55e" />
                <input
                  type="color"
                  value={watch("color")}
                  onChange={(e) => setValue("color", e.target.value)}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" {...register("order", { valueAsNumber: true })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Add content for each section. HTML formatting is supported.
          </p>

          <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
            {contentSections.map((section) => (
              <div key={section.key} className="space-y-2">
                <Label>{section.label}</Label>
                <p className="text-xs text-muted-foreground">{section.description}</p>
                <Textarea
                  {...register(section.key as keyof ProgrammeFormData)}
                  placeholder={`Enter ${section.label.toLowerCase()} content (HTML supported)...`}
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sponsors" className="mt-4">
          {programme ? (
            <SponsorManager programmeId={programme.id} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Save the programme first, then you can add sponsors.
            </p>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <Label className="text-base">Active Programme</Label>
              <p className="text-sm text-muted-foreground">
                When active, the &quot;Apply Now&quot; button will be shown
              </p>
            </div>
            <Switch
              checked={watch("isActive")}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label>Application Link</Label>
            <Input
              {...register("applicationLink")}
              placeholder="https://forms.google.com/..."
            />
            <p className="text-xs text-muted-foreground">
              External URL where applicants will be directed
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 pt-4 border-t">
        <Button type="submit" disabled={isSaving} className="flex-1">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {isNew ? "Create Programme" : "Save Changes"}
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// Programme Card Component
function ProgrammeCard({
  programme,
  onEdit,
  onDelete,
}: {
  programme: ProgrammeData;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this programme?")) return;
    setDeleting(true);
    const result = await deleteProgramme(programme.id);
    if (result.success) {
      showSuccessToast("Programme deleted");
      onDelete();
    } else {
      showErrorToast("Failed to delete", result.error);
    }
    setDeleting(false);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <Image
          src={programme.image}
          alt={programme.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg">{programme.title}</h3>
        </div>
        {programme.isActive && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              Active
            </span>
          </div>
        )}
      </div>

      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {programme.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: programme.color }} />
            {programme.color}
          </span>
          <span>•</span>
          <span>/{programme.slug}</span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
            <Pencil className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`/how-we-work/programmes/${programme.slug}`} target="_blank">
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Page
export default function ProgrammesAdminPage() {
  const [programmes, setProgrammes] = useState<ProgrammeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProgramme, setEditingProgramme] = useState<ProgrammeData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadProgrammes = async () => {
    setIsLoading(true);
    const result = await listProgrammes();
    if (result.success && result.data) {
      setProgrammes(result.data);
    } else {
      showErrorToast("Failed to load programmes", !result.success ? result.error : "Unknown error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadProgrammes();
  }, []);

  const handleCloseEditor = () => {
    setEditingProgramme(null);
    setIsCreating(false);
  };

  const handleSave = () => {
    handleCloseEditor();
    loadProgrammes();
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programmes</h1>
          <p className="text-muted-foreground mt-2">
            Manage programme pages with full content sections and application settings
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Programme
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Programme</DialogTitle>
              <DialogDescription>
                Add a new programme with all content sections
              </DialogDescription>
            </DialogHeader>
            <ProgrammeEditor onSave={handleSave} onCancel={handleCloseEditor} />
          </DialogContent>
        </Dialog>
      </div>

      {programmes.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No programmes yet</p>
          <Button className="mt-4" onClick={() => setIsCreating(true)}>
            Create your first programme
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((programme) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
              onEdit={() => setEditingProgramme(programme)}
              onDelete={loadProgrammes}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingProgramme} onOpenChange={() => setEditingProgramme(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Programme</DialogTitle>
            <DialogDescription>
              Update programme content and settings
            </DialogDescription>
          </DialogHeader>
          {editingProgramme && (
            <ProgrammeEditor
              programme={editingProgramme}
              onSave={handleSave}
              onCancel={handleCloseEditor}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
