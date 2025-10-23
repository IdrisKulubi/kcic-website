import { toast } from "sonner";

/**
 * Display a success toast notification
 * @param message - The success message to display
 * @param description - Optional description for additional context
 */
export function showSuccessToast(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 4000,
  });
}

/**
 * Display an error toast notification
 * @param message - The error message to display
 * @param description - Optional description for additional context
 */
export function showErrorToast(message: string, description?: string) {
  toast.error(message, {
    description,
    duration: 5000,
  });
}

/**
 * Display an info toast notification
 * @param message - The info message to display
 * @param description - Optional description for additional context
 */
export function showInfoToast(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: 4000,
  });
}

/**
 * Display a loading toast notification
 * @param message - The loading message to display
 * @returns Toast ID that can be used to dismiss or update the toast
 */
export function showLoadingToast(message: string) {
  return toast.loading(message);
}

/**
 * Dismiss a specific toast by ID
 * @param toastId - The ID of the toast to dismiss
 */
export function dismissToast(toastId: string | number) {
  toast.dismiss(toastId);
}

/**
 * Display a promise toast that shows loading, success, and error states
 * @param promise - The promise to track
 * @param messages - Messages for loading, success, and error states
 */
export function showPromiseToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: Error) => string);
  }
) {
  return toast.promise(promise, messages);
}
