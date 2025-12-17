import { useState, useEffect } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { X, Loader2, Upload, FileText } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  endpoint?: "imageUploader" | "logoUploader" | "videoUploader" | "documentUploader";
  disabled?: boolean;
  className?: string;
  preset?: "image" | "document";
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  endpoint = "imageUploader",
  disabled = false,
  className,
  preset = "image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDocument = preset === "document" || endpoint === "documentUploader";

  return (
    <div className={cn("space-y-4", className)}>
      {value ? (
        <div className={cn(
          "relative w-full rounded-lg overflow-hidden border border-border",
          isDocument ? "h-24 flex items-center p-4 bg-muted/50" : "h-60"
        )}>
          {isDocument ? (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-md border shadow-sm">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {value.split('/').pop()}
                </p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:underline"
                >
                  View File
                </a>
              </div>
            </div>
          ) : (
            <Image
              src={value}
              alt="Upload preview"
              fill
              className="object-cover"
            />
          )}

          {!disabled && onRemove && (
            <Button
              type="button"
              onClick={onRemove}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-8 hover:bg-muted/50 transition-colors">
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
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">
                    {isDocument ? "Drop document here" : "Drop image here"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isDocument ? "PDF, DOCX up to 16MB" : "PNG, JPG up to 4MB"}
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
                onUploadBegin={() => {
                  setIsUploading(true);
                }}
                disabled={disabled}
                config={{ mode: "auto" }}
                appearance={{
                  container: "w-full border-none p-0",
                  uploadIcon: "hidden",
                  label: "hidden",
                  allowedContent: "hidden",
                  button:
                    "ut-ready:bg-primary ut-ready:text-primary-foreground ut-ready:hover:bg-primary/90 ut-uploading:bg-primary/50 ut-uploading:cursor-not-allowed text-xs font-medium h-8 px-4",
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
