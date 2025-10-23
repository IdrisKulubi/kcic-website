"use client";

import { Button } from "@/components/ui/button";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  dismissToast,
  showPromiseToast,
} from "@/lib/toast";

export default function ToastTestPage() {
  const handleSuccessToast = () => {
    showSuccessToast("Success!", "Your changes have been saved successfully.");
  };

  const handleErrorToast = () => {
    showErrorToast("Error!", "Something went wrong. Please try again.");
  };

  const handleInfoToast = () => {
    showInfoToast("Info", "This is an informational message.");
  };

  const handleLoadingToast = () => {
    const toastId = showLoadingToast("Loading...");
    setTimeout(() => {
      dismissToast(toastId);
      showSuccessToast("Done!", "Loading completed.");
    }, 2000);
  };

  const handlePromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success") : reject(new Error("Failed"));
      }, 2000);
    });

    showPromiseToast(promise, {
      loading: "Processing...",
      success: "Operation completed successfully!",
      error: "Operation failed. Please try again.",
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Toast Notification Test</h1>
      <div className="flex flex-col gap-4 max-w-md">
        <Button onClick={handleSuccessToast} variant="default">
          Show Success Toast
        </Button>
        <Button onClick={handleErrorToast} variant="destructive">
          Show Error Toast
        </Button>
        <Button onClick={handleInfoToast} variant="secondary">
          Show Info Toast
        </Button>
        <Button onClick={handleLoadingToast} variant="outline">
          Show Loading Toast
        </Button>
        <Button onClick={handlePromiseToast} variant="outline">
          Show Promise Toast
        </Button>
      </div>
    </div>
  );
}
