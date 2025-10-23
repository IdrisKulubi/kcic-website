"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { X, Upload, Loader2 } from "lucide-react";
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
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
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
              onUploadBegin={() => {
                setIsUploading(true);
              }}
              disabled={disabled}
              className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-allowed-content:text-muted-foreground"
            />
          )}
        </div>
      )}
    </div>
  );
}
