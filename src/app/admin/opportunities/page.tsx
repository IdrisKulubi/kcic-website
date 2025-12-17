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
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    SpinnerGap,
    PencilSimple,
    Plus,
    Trash,
    FloppyDisk,
    X,
    ArrowSquareOut,
    Briefcase,
    FileText,
    Users,
    Clock,
    MapPin
} from "@phosphor-icons/react";
import {
    listOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    toggleOpportunityStatus,
    addOpportunityAttachment,
    removeOpportunityAttachment,
    type OpportunityWithAttachments,
    type OpportunityType,
    type WorkMode,
    type EmploymentType,
} from "@/lib/actions/opportunities";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { ImageUpload } from "@/components/admin/image-upload";
import { format } from "date-fns";

// Validation schema
const opportunityFormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    type: z.enum(["job", "consulting", "rfp", "tender"]),
    referenceNumber: z.string().optional(),
    summary: z.string().min(10, "Summary must be at least 10 characters"),
    description: z.string().optional(),
    department: z.string().optional(),
    location: z.string().optional(),
    workMode: z.enum(["remote", "onsite", "hybrid"]).optional().nullable(),
    employmentType: z.enum(["full-time", "part-time", "contract", "consultancy"]).optional().nullable(),
    requirements: z.string().optional(),
    qualifications: z.string().optional(),
    responsibilities: z.string().optional(),
    applicationEmail: z.string().email().optional().or(z.literal("")),
    applicationLink: z.string().url().optional().or(z.literal("")),
    applicationInstructions: z.string().optional(),
    deadline: z.string().optional(),
    issuedDate: z.string().optional(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
});

type OpportunityFormData = z.infer<typeof opportunityFormSchema>;

// Type configs
const typeOptions: { value: OpportunityType; label: string; icon: typeof Briefcase }[] = [
    { value: "job", label: "Job", icon: Briefcase },
    { value: "consulting", label: "Consulting", icon: Users },
    { value: "rfp", label: "RFP", icon: FileText },
    { value: "tender", label: "Tender", icon: FileText },
];

const workModeOptions: { value: WorkMode; label: string }[] = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
];

const employmentTypeOptions: { value: EmploymentType; label: string }[] = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "consultancy", label: "Consultancy" },
];

// Attachment Manager Component
function AttachmentManager({
    opportunityId,
    attachments,
    onUpdate
}: {
    opportunityId: string;
    attachments: OpportunityWithAttachments["attachments"];
    onUpdate: () => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [newAttachment, setNewAttachment] = useState({ fileName: '', fileUrl: '' });

    const handleAdd = async () => {
        if (!newAttachment.fileName || !newAttachment.fileUrl) return;
        setUploading(true);

        const result = await addOpportunityAttachment(opportunityId, {
            fileName: newAttachment.fileName,
            fileUrl: newAttachment.fileUrl,
            fileType: newAttachment.fileUrl.split('.').pop() || 'pdf',
        });

        if (result.success) {
            showSuccessToast("Attachment added");
            setNewAttachment({ fileName: '', fileUrl: '' });
            onUpdate();
        } else {
            showErrorToast("Failed to add attachment", result.error);
        }
        setUploading(false);
    };

    const handleRemove = async (id: string) => {
        const result = await removeOpportunityAttachment(id);
        if (result.success) {
            showSuccessToast("Attachment removed");
            onUpdate();
        } else {
            showErrorToast("Failed to remove attachment", result.error);
        }
    };

    return (
        <div className="space-y-4">
            <Label className="text-sm font-medium">Attachments (RFP docs, ToRs, etc.)</Label>

            {/* Existing attachments */}
            {attachments.length > 0 && (
                <div className="space-y-2">
                    {attachments.map((att) => (
                        <div key={att.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm flex-1 truncate">{att.fileName}</span>
                            <a
                                href={att.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                <ArrowSquareOut className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => handleRemove(att.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X className="w-4 h-4" weight="bold" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add new attachment */}
            <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">File Name</Label>
                    <Input
                        value={newAttachment.fileName}
                        onChange={(e) => setNewAttachment(prev => ({ ...prev, fileName: e.target.value }))}
                        placeholder="e.g., RFP Document.pdf"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">File URL</Label>
                    <ImageUpload
                        value={newAttachment.fileUrl}
                        onChange={(url) => setNewAttachment(prev => ({ ...prev, fileUrl: url }))}
                        onRemove={() => setNewAttachment(prev => ({ ...prev, fileUrl: '' }))}
                        endpoint="documentUploader"
                        preset="document"
                    />
                </div>
                <Button
                    onClick={handleAdd}
                    disabled={uploading || !newAttachment.fileName || !newAttachment.fileUrl}
                    className="w-full"
                    size="sm"
                >
                    {uploading ? <SpinnerGap className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Add Attachment
                </Button>
            </div>
        </div>
    );
}

// Opportunity Editor Dialog
function OpportunityEditor({
    opportunity,
    onSave,
    onCancel,
}: {
    opportunity?: OpportunityWithAttachments;
    onSave: () => void;
    onCancel: () => void;
}) {
    const [isSaving, setIsSaving] = useState(false);
    const isNew = !opportunity;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OpportunityFormData>({
        resolver: zodResolver(opportunityFormSchema),
        defaultValues: opportunity ? {
            title: opportunity.title,
            type: opportunity.type as OpportunityType,
            referenceNumber: opportunity.referenceNumber || '',
            summary: opportunity.summary,
            description: opportunity.description || '',
            department: opportunity.department || '',
            location: opportunity.location || '',
            workMode: opportunity.workMode as WorkMode | null,
            employmentType: opportunity.employmentType as EmploymentType | null,
            requirements: opportunity.requirements || '',
            qualifications: opportunity.qualifications || '',
            responsibilities: opportunity.responsibilities || '',
            applicationEmail: opportunity.applicationEmail || '',
            applicationLink: opportunity.applicationLink || '',
            applicationInstructions: opportunity.applicationInstructions || '',
            deadline: opportunity.deadline ? format(new Date(opportunity.deadline), 'yyyy-MM-dd') : '',
            issuedDate: opportunity.issuedDate ? format(new Date(opportunity.issuedDate), 'yyyy-MM-dd') : '',
            isActive: opportunity.isActive,
            isFeatured: opportunity.isFeatured,
        } : {
            title: '',
            type: 'job',
            referenceNumber: '',
            summary: '',
            description: '',
            department: '',
            location: '',
            workMode: null,
            employmentType: null,
            requirements: '',
            qualifications: '',
            responsibilities: '',
            applicationEmail: '',
            applicationLink: '',
            applicationInstructions: '',
            deadline: '',
            issuedDate: format(new Date(), 'yyyy-MM-dd'),
            isActive: true,
            isFeatured: false,
        },
    });

    const selectedType = watch("type");

    const onSubmit = async (data: OpportunityFormData) => {
        setIsSaving(true);

        const input = {
            ...data,
            deadline: data.deadline ? new Date(data.deadline) : undefined,
            issuedDate: data.issuedDate ? new Date(data.issuedDate) : undefined,
            workMode: data.workMode || undefined,
            employmentType: data.employmentType || undefined,
            applicationEmail: data.applicationEmail || undefined,
            applicationLink: data.applicationLink || undefined,
        };

        const result = isNew
            ? await createOpportunity(input)
            : await updateOpportunity(opportunity!.id, input);

        if (result.success) {
            showSuccessToast(isNew ? "Opportunity created" : "Opportunity updated");
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
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="application">Application</TabsTrigger>
                    <TabsTrigger value="attachments">Attachments</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Title *</Label>
                            <Input {...register("title")} placeholder="Opportunity title" />
                            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Type *</Label>
                            <Select
                                value={watch("type")}
                                onValueChange={(value) => setValue("type", value as OpportunityType)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {typeOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {(selectedType === 'rfp' || selectedType === 'tender') && (
                        <div className="space-y-2">
                            <Label>Reference Number</Label>
                            <Input {...register("referenceNumber")} placeholder="e.g., RFP: KCIC/2025/202" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Summary *</Label>
                        <Textarea {...register("summary")} placeholder="Brief summary for listing cards" rows={2} />
                        {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Input {...register("department")} placeholder="e.g., Programs, Finance" />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input {...register("location")} placeholder="e.g., Nairobi, Kenya" />
                        </div>
                    </div>

                    {(selectedType === 'job' || selectedType === 'consulting') && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Work Mode</Label>
                                <Select
                                    value={watch("workMode") || ""}
                                    onValueChange={(value) => setValue("workMode", value as WorkMode)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select work mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {workModeOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Employment Type</Label>
                                <Select
                                    value={watch("employmentType") || ""}
                                    onValueChange={(value) => setValue("employmentType", value as EmploymentType)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employmentTypeOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Issued Date</Label>
                            <Input type="date" {...register("issuedDate")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Application Deadline</Label>
                            <Input type="date" {...register("deadline")} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground">
                        Add detailed content. HTML formatting is supported.
                    </p>

                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                        <div className="space-y-2">
                            <Label>Full Description</Label>
                            <Textarea
                                {...register("description")}
                                placeholder="Full description (HTML supported)..."
                                rows={6}
                                className="font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Responsibilities</Label>
                            <Textarea
                                {...register("responsibilities")}
                                placeholder="Key responsibilities..."
                                rows={4}
                                className="font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Requirements</Label>
                            <Textarea
                                {...register("requirements")}
                                placeholder="Requirements..."
                                rows={4}
                                className="font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Qualifications</Label>
                            <Textarea
                                {...register("qualifications")}
                                placeholder="Required qualifications..."
                                rows={4}
                                className="font-mono text-sm"
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="application" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                            <Label className="text-base">Active Opportunity</Label>
                            <p className="text-sm text-muted-foreground">
                                When active, this opportunity is visible on the careers page
                            </p>
                        </div>
                        <Switch
                            checked={watch("isActive")}
                            onCheckedChange={(checked) => setValue("isActive", checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                            <Label className="text-base">Featured</Label>
                            <p className="text-sm text-muted-foreground">
                                Featured opportunities appear at the top
                            </p>
                        </div>
                        <Switch
                            checked={watch("isFeatured")}
                            onCheckedChange={(checked) => setValue("isFeatured", checked)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Application Email</Label>
                        <Input
                            {...register("applicationEmail")}
                            type="email"
                            placeholder="e.g., procurement@kenyacic.org"
                        />
                        <p className="text-xs text-muted-foreground">
                            Applicants will be instructed to send applications to this email
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Application Link (External)</Label>
                        <Input
                            {...register("applicationLink")}
                            placeholder="https://forms.google.com/..."
                        />
                        <p className="text-xs text-muted-foreground">
                            External URL where applicants can apply (e.g., Google Form)
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Application Instructions</Label>
                        <Textarea
                            {...register("applicationInstructions")}
                            placeholder="How to apply, what to include in the application..."
                            rows={4}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="attachments" className="mt-4">
                    {opportunity ? (
                        <AttachmentManager
                            opportunityId={opportunity.id}
                            attachments={opportunity.attachments}
                            onUpdate={onSave}
                        />
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Save the opportunity first, then you can add attachments.
                        </p>
                    )}
                </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4 border-t">
                <Button type="submit" disabled={isSaving} className="flex-1">
                    {isSaving ? (
                        <>
                            <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <FloppyDisk className="mr-2 h-4 w-4" />
                            {isNew ? "Create Opportunity" : "Save Changes"}
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

// Opportunity Card Component
function OpportunityCard({
    opportunity,
    onEdit,
    onDelete,
    onToggleStatus,
}: {
    opportunity: OpportunityWithAttachments;
    onEdit: () => void;
    onDelete: () => void;
    onToggleStatus: () => void;
}) {
    const [deleting, setDeleting] = useState(false);
    const [toggling, setToggling] = useState(false);

    const typeConfig = typeOptions.find(t => t.value === opportunity.type);
    const TypeIcon = typeConfig?.icon || Briefcase;

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this opportunity?")) return;
        setDeleting(true);
        const result = await deleteOpportunity(opportunity.id);
        if (result.success) {
            showSuccessToast("Opportunity deleted");
            onDelete();
        } else {
            showErrorToast("Failed to delete", result.error);
        }
        setDeleting(false);
    };

    const handleToggle = async () => {
        setToggling(true);
        const result = await toggleOpportunityStatus(opportunity.id);
        if (result.success) {
            showSuccessToast(result.data?.isActive ? "Activated" : "Deactivated");
            onToggleStatus();
        } else {
            showErrorToast("Failed to toggle status", result.error);
        }
        setToggling(false);
    };

    return (
        <Card className="overflow-hidden">
            <div className={`h-2 ${opportunity.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
            <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${opportunity.type === 'job' ? 'bg-blue-100 text-blue-600' :
                            opportunity.type === 'consulting' ? 'bg-purple-100 text-purple-600' :
                                'bg-orange-100 text-orange-600'
                            }`}>
                            <TypeIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            {typeConfig?.label}
                        </span>
                    </div>
                    <Switch
                        checked={opportunity.isActive}
                        onCheckedChange={handleToggle}
                        disabled={toggling}
                    />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{opportunity.title}</h3>

                {opportunity.referenceNumber && (
                    <p className="text-xs text-gray-500 mb-2">{opportunity.referenceNumber}</p>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {opportunity.summary}
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                    {opportunity.location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {opportunity.location}
                        </span>
                    )}
                    {opportunity.deadline && (
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(new Date(opportunity.deadline), 'MMM d, yyyy')}
                        </span>
                    )}
                    {opportunity.attachments.length > 0 && (
                        <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {opportunity.attachments.length} file(s)
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
                        <PencilSimple className="w-3 h-3 mr-1" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? <SpinnerGap className="w-3 h-3 animate-spin" /> : <Trash className="w-3 h-3" />}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href={`/en/about/careers/${opportunity.slug}`} target="_blank">
                            <ArrowSquareOut className="w-3 h-3" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Main Page
export default function OpportunitiesAdminPage() {
    const [opportunities, setOpportunities] = useState<OpportunityWithAttachments[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingOpportunity, setEditingOpportunity] = useState<OpportunityWithAttachments | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");

    const loadOpportunities = async () => {
        setIsLoading(true);
        const result = await listOpportunities({ includeInactive: true });
        if (result.success && result.data) {
            setOpportunities(result.data);
        } else {
            showErrorToast("Failed to load opportunities", result.error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadOpportunities();
    }, []);

    const handleCloseEditor = () => {
        setEditingOpportunity(null);
        setIsCreating(false);
    };

    const handleSave = () => {
        handleCloseEditor();
        loadOpportunities();
    };

    const filteredOpportunities = typeFilter === "all"
        ? opportunities
        : opportunities.filter(o => o.type === typeFilter);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <SpinnerGap className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage job postings, consulting opportunities, RFPs, and tenders
                    </p>
                </div>
                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New Opportunity
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Opportunity</DialogTitle>
                            <DialogDescription>
                                Add a job, consulting opportunity, RFP, or tender
                            </DialogDescription>
                        </DialogHeader>
                        <OpportunityEditor onSave={handleSave} onCancel={handleCloseEditor} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
                <Button
                    variant={typeFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter("all")}
                >
                    All ({opportunities.length})
                </Button>
                {typeOptions.map((opt) => {
                    const count = opportunities.filter(o => o.type === opt.value).length;
                    return (
                        <Button
                            key={opt.value}
                            variant={typeFilter === opt.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTypeFilter(opt.value)}
                        >
                            {opt.label} ({count})
                        </Button>
                    );
                })}
            </div>

            {filteredOpportunities.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-muted/50">
                    <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No opportunities yet</p>
                    <Button className="mt-4" onClick={() => setIsCreating(true)}>
                        Create your first opportunity
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOpportunities.map((opportunity) => (
                        <OpportunityCard
                            key={opportunity.id}
                            opportunity={opportunity}
                            onEdit={() => setEditingOpportunity(opportunity)}
                            onDelete={loadOpportunities}
                            onToggleStatus={loadOpportunities}
                        />
                    ))}
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={!!editingOpportunity} onOpenChange={() => setEditingOpportunity(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Opportunity</DialogTitle>
                        <DialogDescription>
                            Update opportunity details and settings
                        </DialogDescription>
                    </DialogHeader>
                    {editingOpportunity && (
                        <OpportunityEditor
                            opportunity={editingOpportunity}
                            onSave={handleSave}
                            onCancel={handleCloseEditor}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
