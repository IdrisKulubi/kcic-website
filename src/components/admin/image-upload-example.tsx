"use client";

import { useState } from "react";
import { ImageUpload } from "./image-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example component demonstrating how to use the ImageUpload component
 * This can be used as a reference when implementing forms that need image uploads
 */
export function ImageUploadExample() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Image Upload Example</CardTitle>
          <CardDescription>
            Upload images for news articles, team members, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            onRemove={() => setImageUrl("")}
            endpoint="imageUploader"
          />
          {imageUrl && (
            <p className="mt-2 text-sm text-muted-foreground">
              Uploaded URL: {imageUrl}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Upload Example</CardTitle>
          <CardDescription>
            Upload logos for partners (smaller file size limit)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            value={logoUrl}
            onChange={setLogoUrl}
            onRemove={() => setLogoUrl("")}
            endpoint="logoUploader"
          />
          {logoUrl && (
            <p className="mt-2 text-sm text-muted-foreground">
              Uploaded URL: {logoUrl}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
