export const SITE = {
  name: "Christopher Bratkovics",
  title: "Christopher Bratkovics | AI/ML Engineer | Production ML Systems",
  description: "AI Engineer building production ML systems. 93.1% model accuracy, ~186ms P95 latency (synthetic benchmarks), 88% Docker reduction (RAG). All metrics verifiable via GitHub.",
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
    name: "Christopher Bratkovics",
    // No email or phone - links only per HARD RULES
  }
} as const;

export type SiteConfig = typeof SITE;
