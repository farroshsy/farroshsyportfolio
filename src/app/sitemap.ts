import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/cv`, priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      priority: p.featured ? 0.9 : 0.5,
    })),
  ];
}
