import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/projects/ev-charging-data-unified-schema`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/projects/entity-resolution`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
