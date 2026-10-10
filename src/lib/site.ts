// NEXT_PUBLIC_SITE_URL wins; on Vercel, fall back to the production domain it provides.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Shark Digital";

// Google Analytics 4 measurement ID (public, not a secret).
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-XZ1V33J8XT";

// Google Tag Manager container ID. GA4 stays loaded directly above, so do not
// add a GA4 config tag inside this container or page views count twice.
export const GTM_CONTAINER_ID =
  process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? "GTM-KP3WGD59";

/** Absolute URL for a site path, e.g. absoluteUrl("/blog"). */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
