export const SITE = {
  name: "Christopher J. Bratkovics",
  title:
    "Christopher J. Bratkovics | Data Scientist | Analytics Engineer | Applied AI",
  shortTitle: "Christopher J. Bratkovics | Data Scientist | Analytics Engineer | Applied AI",
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
    name: "Christopher J. Bratkovics",
    jobTitle: "Data Scientist | Analytics Engineer | Applied AI"
  }
} as const;

export type SiteConfig = typeof SITE;
