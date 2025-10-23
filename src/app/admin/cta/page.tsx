"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  getCTABanner,
  updateCTABanner,
  type CTABannerData,
} from "@/lib/actions/cta";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

// Validation schema
const ctaBannerSchema = z.object({
  headline: z
    .string()
    .min(5, "Headline must be at least 5 characters")
    .max(200, "Headline must be at most 200 characters"),
  subtext: z
    .string()
    .min(5, "Subtext must be at least 5 characters")
    .max(500, "Subtext must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  buttonText: z
    .string()
    .min(2, "Button text must be at least 2 characters")
    .max(50, "Button text must be at most 50 characters"),
  buttonHref: z.string().min(1, "Button link is required"),
});

type CTAFormData = z.infer<typeof ctaBannerSchema>;

export default function CTABannerEditorPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CTAFormData>({
    resolver: zodResolver(ctaBannerSchema),
    defaultValues: {
      headline: "",
      subtext: "",
      buttonText: "",
      buttonHref: "",
    },
  });

  // Watch form values for live preview
  const formValues = watch();

  // Load CTA banner data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const result = await getCTABanner();

      if (result.success && result.data) {
        setValue("headline", result.data.headline);
        setValue("subtext", result.data.subtext || "");
        setValue("buttonText", result.data.buttonText);
        setValue("buttonHref", result.data.buttonHref);
      } else if (!result.success) {
        showErrorToast("Failed to load CTA banner", result.error);
      }

      setIsLoading(false);
    }

    loadData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = async (data: CTAFormData) => {
    setIsSaving(true);

    const result = await updateCTABanner(data);

    if (result.success) {
      showSuccessToast(
        "CTA banner updated successfully",
        "Changes are now live on the website"
      );
    } else {
      showErrorToast("Failed to update CTA banner", result.error);
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
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">CTA Banner Editor</h1>
        <p className="text-muted-foreground mt-2">
          Manage the call-to-action banner content displayed on your website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Headline */}
            <Card>
              <CardHeader>
                <CardTitle>Headline</CardTitle>
                <CardDescription>
                  The main headline for the CTA banner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input
                    {...register("headline")}
                    placeholder="Enter headline"
                    className={errors.headline ? "border-red-500" : ""}
                  />
                  {errors.headline && (
                    <p className="text-sm text-red-500">
                      {errors.headline.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Subtext */}
            <Card>
              <CardHeader>
                <CardTitle>Subtext</CardTitle>
                <CardDescription>
                  Supporting text that appears below the headline (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Textarea
                    {...register("subtext")}
                    placeholder="Enter subtext"
                    rows={3}
                    className={errors.subtext ? "border-red-500" : ""}
                  />
                  {errors.subtext && (
                    <p className="text-sm text-red-500">
                      {errors.subtext.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Button Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Button Configuration</CardTitle>
                <CardDescription>
                  Configure the call-to-action button
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="buttonText" className="text-sm font-medium">
                    Button Text
                  </label>
                  <Input
                    {...register("buttonText")}
                    placeholder="Get Started"
                    className={errors.buttonText ? "border-red-500" : ""}
                  />
                  {errors.buttonText && (
                    <p className="text-sm text-red-500">
                      {errors.buttonText.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="buttonHref" className="text-sm font-medium">
                    Button Link
                  </label>
                  <Input
                    {...register("buttonHref")}
                    placeholder="/contact or https://example.com"
                    className={errors.buttonHref ? "border-red-500" : ""}
                  />
                  {errors.buttonHref && (
                    <p className="text-sm text-red-500">
                      {errors.buttonHref.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSaving} size="lg">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Live Preview Section */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See how your CTA banner will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white">
                <div className="max-w-2xl mx-auto text-center space-y-4">
                  <h2 className="text-3xl font-bold">
                    {formValues.headline || "Your Headline Here"}
                  </h2>
                  {formValues.subtext && (
                    <p className="text-lg opacity-90">{formValues.subtext}</p>
                  )}
                  <div className="pt-4">
                    <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      {formValues.buttonText || "Button Text"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This is a simplified preview. The
                  actual appearance may vary based on your website&apos;s
                  styling.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
