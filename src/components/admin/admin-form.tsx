"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface AdminFormProps<T extends FieldValues> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void> | void;
  children: (form: UseFormReturn<T>) => ReactNode;
  submitLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function AdminForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitLabel = "Save Changes",
  isLoading = false,
  className = "",
}: AdminFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children(form)}
        
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
