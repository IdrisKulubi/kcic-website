"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { X, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  endpoint?: "imageUploader" | "logoUploader" | "videoUploader";
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  endpoint = "imageUploader",
  disabled = false,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [endpoint, value, disabled]);

  return (
    <div className={cn("space-y-4", className)}>
      {value ? (
        <div className="relative w-full h-60 rounded-lg overflow-hidden border border-border">
          <Image
            src={value}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          {!disabled && onRemove && (
            <Button
              type="button"
              onClick={onRemove}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-8">
          {!isMounted ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Loading uploader...
              </p>
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center space-y-4 mb-4">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 4MB
                  </p>
                </div>
              </div>
              <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    onChange(res[0].url);
                    setIsUploading(false);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error:", error);
                  alert(`Upload failed: ${error.message}`);
                  setIsUploading(false);
                }}
                onUploadBegin={(fileName) => {
                  setIsUploading(true);
                }}
                onBeforeUploadBegin={(files) => {
                  return files;
                }}
                disabled={disabled}
                config={{ mode: "auto" }}
                appearance={{
                  container: "w-full",
                  uploadIcon: "hidden",
                  label: "hidden",
                  allowedContent: "hidden",
                  button:
                    "ut-ready:bg-primary ut-ready:hover:bg-primary/90 ut-uploading:bg-primary/50 ut-uploading:cursor-not-allowed",
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
