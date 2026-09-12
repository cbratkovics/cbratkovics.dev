export const SITE = {
  name: "Christopher J. Bratkovics",
  title:
    "Christopher J. Bratkovics | Data Scientist | Analytics Engineer | Applied AI",
  shortTitle: "Christopher J. Bratkovics | Data Scientist | Analytics Engineer | Applied AI",
  description:
    "Maine-based Data Scientist and Analytics Engineer with 7+ years in enterprise analytics, building predictive models, production data products, and applied AI.",
  url: "https://cbratkovics.dev",

  // Contact policy: Links-only (no email, phone, or forms)
  links: {
    github: "https://github.com/cbratkovics",
    linkedin: "https://linkedin.com/in/cbratkovics"
  },

  // SEO
  sameAs: [
    "https://github.com/cbratkovics",
    "https://linkedin.com/in/cbratkovics"
  ],

  // Author
  author: {
    name: "Christopher J. Bratkovics",
    // No email or phone - links only per HARD RULES
    jobTitle: "Data Scientist | Analytics Engineer | Applied AI"
  }
} as const;

export type SiteConfig = typeof SITE;
