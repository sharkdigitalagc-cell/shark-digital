import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { PORTFOLIO } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/site";

// Static so it also works with STATIC_EXPORT=1.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/portfolio"), changeFrequency: "monthly", priority: 0.8 },
    ...PORTFOLIO.map((p) => ({
      url: absoluteUrl(`/portfolio/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: absoluteUrl("/blog"),
      lastModified: posts[0]?.updatedAt ?? posts[0]?.publishedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
