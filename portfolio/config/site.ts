export const SITE = {
  name: "Christopher Bratkovics",
  title:
    "Data Scientist | Analytics Engineer | Applied AI | Python, SQL, Snowflake, dbt, AWS, Sigma",
  shortTitle: "Christopher J. Bratkovics | Data Scientist and Analytics Engineer",
  description:
    "Data Scientist and Analytics Engineer with 7+ years in enterprise analytics. Predictive modeling, production data pipelines, and applied AI with Python, SQL, Snowflake, and dbt.",
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
    jobTitle: "Data Scientist and Analytics Engineer"
  }
} as const;

export type SiteConfig = typeof SITE;
