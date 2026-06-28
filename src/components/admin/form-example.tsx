"use client";

import { z } from "zod";
import { AdminForm } from "./admin-form";
import {
  FormInput,
  FormTextarea,
  FormNumber,
  FormEmail,
  FormUrl,
  FormSwitch,
  FormSelect,
} from "./form-fields";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Example schema demonstrating all validation types
const exampleSchema = z.object({
  // Text validations
  title: z.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  
  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must not exceed 500 characters"),
  
  // Number validations
  order: z.number()
    .min(0, "Order must be at least 0")
    .max(100, "Order must not exceed 100"),
  
  price: z.number()
    .min(0, "Price must be positive")
    .optional(),
  
  // Email validation
  email: z.string()
    .email("Please enter a valid email address"),
  
  // URL validation
  website: z.string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  
  // Boolean fields
  featured: z.boolean(),
  published: z.boolean(),
  
  // Select field
  category: z.string()
    .min(1, "Please select a category"),
  
  status: z.enum(["draft", "published", "archived"]),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

export function FormExample() {
  const handleSubmit = async (data: ExampleFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Admin Form Example</CardTitle>
          <CardDescription>
            Demonstration of all available form field types with validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminForm
            schema={exampleSchema}
            defaultValues={{
              title: "",
              description: "",
              order: 0,
              price: undefined,
              email: "",
              website: "",
              featured: false,
              published: false,
              category: "",
              status: "draft",
            }}
            onSubmit={handleSubmit}
            submitLabel="Submit Example"
            className="space-y-6"
          >
            {(form) => (
              <>
                {/* Text Input */}
                <FormInput
                  form={form}
                  name="title"
                  label="Title"
                  placeholder="Enter a title"
                  description="A descriptive title for your content (5-100 characters)"
                />

                {/* Textarea */}
                <FormTextarea
                  form={form}
                  name="description"
                  label="Description"
                  placeholder="Enter a detailed description"
                  rows={4}
                  description="Provide a comprehensive description (20-500 characters)"
                />

                {/* Number Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormNumber
                    form={form}
                    name="order"
                    label="Display Order"
                    placeholder="0"
                    min={0}
                    max={100}
                    description="Order in which this item appears"
                  />

                  <FormNumber
                    form={form}
                    name="price"
                    label="Price (Optional)"
                    placeholder="0.00"
                    min={0}
                    step={0.01}
                    description="Price in USD"
                  />
                </div>

                {/* Email and URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormEmail
                    form={form}
                    name="email"
                    label="Contact Email"
                    placeholder="email@example.com"
                    description="Primary contact email"
                  />

                  <FormUrl
                    form={form}
                    name="website"
                    label="Website (Optional)"
                    placeholder="https://example.com"
                    description="External website URL"
                  />
                </div>

                {/* Select Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    form={form}
                    name="category"
                    label="Category"
                    placeholder="Select a category"
                    options={[
                      { label: "Technology", value: "technology" },
                      { label: "Business", value: "business" },
                      { label: "Education", value: "education" },
                      { label: "Healthcare", value: "healthcare" },
                    ]}
                    description="Content category"
                  />

                  <FormSelect
                    form={form}
                    name="status"
                    label="Status"
                    placeholder="Select status"
                    options={[
                      { label: "Draft", value: "draft" },
                      { label: "Published", value: "published" },
                      { label: "Archived", value: "archived" },
                    ]}
                    description="Publication status"
                  />
                </div>

                {/* Switch Fields */}
                <div className="space-y-4">
                  <FormSwitch
                    form={form}
                    name="featured"
                    label="Featured Item"
                    description="Display this item prominently on the homepage"
                  />

                  <FormSwitch
                    form={form}
                    name="published"
                    label="Published"
                    description="Make this item visible to the public"
                  />
                </div>

                {/* Form State Display (for demonstration) */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Form State</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>Is Valid:</span>
                      <span className={form.formState.isValid ? "text-green-600" : "text-red-600"}>
                        {form.formState.isValid ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Is Dirty:</span>
                      <span className={form.formState.isDirty ? "text-yellow-600" : "text-gray-600"}>
                        {form.formState.isDirty ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Is Submitting:</span>
                      <span className={form.formState.isSubmitting ? "text-blue-600" : "text-gray-600"}>
                        {form.formState.isSubmitting ? "Yes" : "No"}
                      </span>
                    </div>
                    {Object.keys(form.formState.errors).length > 0 && (
                      <div className="pt-2 border-t">
                        <span className="text-red-600 font-semibold">Errors:</span>
                        <ul className="list-disc list-inside mt-1">
                          {Object.entries(form.formState.errors).map(([key, error]) => (
                            <li key={key} className="text-red-600">
                              {key}: {error?.message as string}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </AdminForm>
        </CardContent>
      </Card>
    </div>
  );
}
