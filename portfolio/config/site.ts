import { identity } from "@/data/projects";

export const SITE = {
  name: identity.name,
  title: `${identity.name} | ${identity.headline}`,
  shortTitle: `${identity.name} | ${identity.headline}`,
  description: `${identity.valueProposition} ${identity.summary}`,
  url: "https://cbratkovics.dev",

  links: {
    github: "https://github.com/cbratkovics",
    linkedin: "https://linkedin.com/in/cbratkovics"
  },

  sameAs: [
    "https://github.com/cbratkovics",
    "https://linkedin.com/in/cbratkovics"
  ],

  author: {
    name: identity.name,
    jobTitle: identity.headline
  }
} as const;

export type SiteConfig = typeof SITE;
