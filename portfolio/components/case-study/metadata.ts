import type { Metadata } from "next";
import { SITE } from "@/config/site";

// Page-level `openGraph` and `twitter` objects replace the root layout's objects rather than
// merging with them, so each case-study route must restate the site's social image here.
const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.author.name} — ${SITE.author.jobTitle}` };

export function caseStudyMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, type: "article", url: path, siteName: SITE.shortTitle, images: [socialImage] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  };
}
