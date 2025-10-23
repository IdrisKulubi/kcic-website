"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Pencil,
  X,
} from "lucide-react";
import {
  getFooterSection,
  updateFooterSection,
  createFooterLink,
  updateFooterLink,
  deleteFooterLink,
  reorderFooterLinks,
  createFooterSocialMedia,
  updateFooterSocialMedia,
  deleteFooterSocialMedia,
  reorderFooterSocialMedia,
  type FooterSectionData,
  type FooterLinkData,
  type FooterSocialMediaData,
} from "@/lib/actions/footer";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import {
  footerSectionSchema,
  footerLinkSchema,
  footerSocialMediaSchema,
} from "@/lib/validators";

type FooterSectionFormData = z.infer<typeof footerSectionSchema>;
type FooterLinkFormData = Omit<FooterLinkData, "order">;
type FooterSocialMediaFormData = Omit<FooterSocialMediaData, "order">;

// Contact Information Form Component
function ContactInfoForm({
  data,
  onUpdate,
}: {
  data: FooterSectionData;
  onUpdate: () => void;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FooterSectionFormData>({
    resolver: zodResolver(footerSectionSchema),
    defaultValues: data,
  });

  const onSubmit = async (formData: FooterSectionFormData) => {
    setIsSaving(true);

    const result = await updateFooterSection(formData);

    if (result.success) {
      showSuccessToast("Footer updated", "Contact information has been saved");
      onUpdate();
    } else {
      showErrorToast("Failed to update footer", result.error);
    }

    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update contact details displayed in the footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactAddress">Address *</Label>
            <Textarea
              id="contactAddress"
              {...register("contactAddress")}
              placeholder="Physical address"
              rows={3}
              className={errors.contactAddress ? "border-red-500" : ""}
            />
            {errors.contactAddress && (
              <p className="text-sm text-red-500">
                {errors.contactAddress.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone *</Label>
            <Input
              id="contactPhone"
              {...register("contactPhone")}
              placeholder="+1 (555) 123-4567"
              className={errors.contactPhone ? "border-red-500" : ""}
            />
            {errors.contactPhone && (
              <p className="text-sm text-red-500">
                {errors.contactPhone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              {...register("contactEmail")}
              placeholder="contact@example.com"
              className={errors.contactEmail ? "border-red-500" : ""}
            />
            {errors.contactEmail && (
              <p className="text-sm text-red-500">
                {errors.contactEmail.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter Section</CardTitle>
          <CardDescription>Configure newsletter signup section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newsletterTitle">Title *</Label>
            <Input
              id="newsletterTitle"
              {...register("newsletterTitle")}
              placeholder="Newsletter title"
              className={errors.newsletterTitle ? "border-red-500" : ""}
            />
            {errors.newsletterTitle && (
              <p className="text-sm text-red-500">
                {errors.newsletterTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newsletterDescription">Description *</Label>
            <Textarea
              id="newsletterDescription"
              {...register("newsletterDescription")}
              placeholder="Newsletter description"
              rows={2}
              className={errors.newsletterDescription ? "border-red-500" : ""}
            />
            {errors.newsletterDescription && (
              <p className="text-sm text-red-500">
                {errors.newsletterDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newsletterPlaceholder">Input Placeholder *</Label>
            <Input
              id="newsletterPlaceholder"
              {...register("newsletterPlaceholder")}
              placeholder="Enter your email"
              className={errors.newsletterPlaceholder ? "border-red-500" : ""}
            />
            {errors.newsletterPlaceholder && (
              <p className="text-sm text-red-500">
                {errors.newsletterPlaceholder.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Copyright</CardTitle>
          <CardDescription>
            Copyright text displayed at the bottom
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="copyright">Copyright Text *</Label>
            <Input
              id="copyright"
              {...register("copyright")}
              placeholder="© 2024 Company Name. All rights reserved."
              className={errors.copyright ? "border-red-500" : ""}
            />
            {errors.copyright && (
              <p className="text-sm text-red-500">{errors.copyright.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSaving} className="w-full">
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
    </form>
  );
}

// Quick Links Manager Component
function QuickLinksManager({
  links,
  onUpdate,
}: {
  links: FooterLinkData[];
  onUpdate: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<FooterLinkFormData, "id">>({
    resolver: zodResolver(footerLinkSchema.omit({ id: true, order: true })),
  });

  const handleAdd = async (data: Omit<FooterLinkFormData, "id">) => {
    setIsSaving(true);

    const result = await createFooterLink(data);

    if (result.success) {
      showSuccessToast("Link added", "Quick link has been created");
      reset();
      setIsAdding(false);
      onUpdate();
    } else {
      showErrorToast("Failed to add link", result.error);
    }

    setIsSaving(false);
  };

  const handleUpdate = async (
    id: string,
    data: Omit<FooterLinkFormData, "id">
  ) => {
    setIsSaving(true);

    const result = await updateFooterLink(id, data);

    if (result.success) {
      showSuccessToast("Link updated", "Quick link has been saved");
      reset();
      setEditingId(null);
      onUpdate();
    } else {
      showErrorToast("Failed to update link", result.error);
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    const result = await deleteFooterLink(id);

    if (result.success) {
      showSuccessToast("Link deleted", "Quick link has been removed");
      onUpdate();
    } else {
      showErrorToast("Failed to delete link", result.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Manage footer navigation links</CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <form
            onSubmit={handleSubmit(handleAdd)}
            className="p-4 border rounded-lg space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="new-label">Label *</Label>
              <Input
                id="new-label"
                {...register("label")}
                placeholder="Link label"
                className={errors.label ? "border-red-500" : ""}
              />
              {errors.label && (
                <p className="text-sm text-red-500">{errors.label.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-href">URL *</Label>
              <Input
                id="new-href"
                {...register("href")}
                placeholder="/path or https://example.com"
                className={errors.href ? "border-red-500" : ""}
              />
              {errors.href && (
                <p className="text-sm text-red-500">{errors.href.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving} className="flex-1">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  reset();
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {links.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No quick links yet. Add one to get started.
          </div>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-2 p-3 border rounded-lg"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{link.label}</p>
                  <p className="text-sm text-muted-foreground">{link.href}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(link.id ?? null)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => link.id && handleDelete(link.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Social Media Manager Component
function SocialMediaManager({
  socialMedia,
  onUpdate,
}: {
  socialMedia: FooterSocialMediaData[];
  onUpdate: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<FooterSocialMediaFormData, "id">>({
    resolver: zodResolver(
      footerSocialMediaSchema.omit({ id: true, order: true })
    ),
  });

  const handleAdd = async (data: Omit<FooterSocialMediaFormData, "id">) => {
    setIsSaving(true);

    const result = await createFooterSocialMedia(data);

    if (result.success) {
      showSuccessToast(
        "Social media added",
        "Social media link has been created"
      );
      reset();
      setIsAdding(false);
      onUpdate();
    } else {
      showErrorToast("Failed to add social media", result.error);
    }

    setIsSaving(false);
  };

  const handleUpdate = async (
    id: string,
    data: Omit<FooterSocialMediaFormData, "id">
  ) => {
    setIsSaving(true);

    const result = await updateFooterSocialMedia(id, data);

    if (result.success) {
      showSuccessToast(
        "Social media updated",
        "Social media link has been saved"
      );
      reset();
      setEditingId(null);
      onUpdate();
    } else {
      showErrorToast("Failed to update social media", result.error);
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social media link?"))
      return;

    const result = await deleteFooterSocialMedia(id);

    if (result.success) {
      showSuccessToast(
        "Social media deleted",
        "Social media link has been removed"
      );
      onUpdate();
    } else {
      showErrorToast("Failed to delete social media", result.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Manage social media profiles</CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Social Media
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <form
            onSubmit={handleSubmit(handleAdd)}
            className="p-4 border rounded-lg space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="new-platform">Platform *</Label>
              <Input
                id="new-platform"
                {...register("platform")}
                placeholder="e.g., Facebook, Twitter, LinkedIn"
                className={errors.platform ? "border-red-500" : ""}
              />
              {errors.platform && (
                <p className="text-sm text-red-500">
                  {errors.platform.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-sm-href">URL *</Label>
              <Input
                id="new-sm-href"
                {...register("href")}
                placeholder="https://facebook.com/yourpage"
                className={errors.href ? "border-red-500" : ""}
              />
              {errors.href && (
                <p className="text-sm text-red-500">{errors.href.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-icon">Icon Name *</Label>
              <Input
                id="new-icon"
                {...register("icon")}
                placeholder="e.g., facebook, twitter, linkedin"
                className={errors.icon ? "border-red-500" : ""}
              />
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Use Lucide icon names (lowercase)
              </p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving} className="flex-1">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Social Media
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  reset();
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {socialMedia.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No social media links yet. Add one to get started.
          </div>
        ) : (
          <div className="space-y-2">
            {socialMedia.map((sm) => (
              <div
                key={sm.id}
                className="flex items-center gap-2 p-3 border rounded-lg"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{sm.platform}</p>
                  <p className="text-sm text-muted-foreground">{sm.href}</p>
                  <p className="text-xs text-muted-foreground">
                    Icon: {sm.icon}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(sm.id ?? null)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => sm.id && handleDelete(sm.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Main Footer Editor Page
export default function FooterEditorPage() {
  const [footerData, setFooterData] = useState<{
    section: FooterSectionData;
    links: FooterLinkData[];
    socialMedia: FooterSocialMediaData[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadFooterData = async () => {
    setIsLoading(true);
    const result = await getFooterSection();

    if (result.success && result.data) {
      setFooterData(result.data);
    } else {
      showErrorToast(
        "Failed to load footer data",
        !result.success ? result.error : "Unknown error"
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadFooterData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!footerData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load footer data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Footer Editor</h1>
        <p className="text-muted-foreground mt-2">
          Manage footer content, quick links, and social media
        </p>
      </div>

      <Tabs defaultValue="contact" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact & Newsletter</TabsTrigger>
          <TabsTrigger value="links">Quick Links</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <ContactInfoForm
            data={footerData.section}
            onUpdate={loadFooterData}
          />
        </TabsContent>

        <TabsContent value="links">
          <QuickLinksManager
            links={footerData.links}
            onUpdate={loadFooterData}
          />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaManager
            socialMedia={footerData.socialMedia}
            onUpdate={loadFooterData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
