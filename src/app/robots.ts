import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Static so it also works with STATIC_EXPORT=1.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/crm"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
