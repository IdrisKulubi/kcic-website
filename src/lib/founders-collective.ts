/**
 * Founders Collective registration form.
 * Override via NEXT_PUBLIC_FOUNDERS_COLLECTIVE_REGISTRATION_URL if needed.
 */
export const FOUNDERS_COLLECTIVE_REGISTRATION_URL =
  process.env.NEXT_PUBLIC_FOUNDERS_COLLECTIVE_REGISTRATION_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSe8wKNLBdcahDcs691-KN0K7gqsEJsREIJlfZTwlCo05HDEDA/viewform";

export const FOUNDERS_COLLECTIVE_EXTERNAL_LINK = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
