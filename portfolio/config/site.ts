import { identity } from "@/data/projects";

export const SITE = {
  name: identity.name,
  title: `${identity.name} | ${identity.headline}`,
  shortTitle: `${identity.name} | ${identity.headline}`,
  description:
    "Data Scientist and Analytics Engineer with 7+ years in enterprise analytics, building predictive models, production data products, and applied AI.",
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
