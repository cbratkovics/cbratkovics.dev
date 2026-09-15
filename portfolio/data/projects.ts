export const identity = {
  name: "Christopher J. Bratkovics",
  headline: "Data Scientist | Analytics Engineer | Applied AI",
  eyebrow: "7+ years in enterprise analytics",
  summary:
    "Data Scientist and Analytics Engineer with 7+ years in enterprise analytics, building predictive models, production data pipelines, and business-facing applications. I combine hands-on development with data modeling, source reconciliation, and business-rule validation to turn messy source data into reliable reporting and decision support."
} as const;

export interface QuantitativeEvidence {
  metric: string;
  value: number;
  unit: string;
  baseline: { label: string; value: number; unit: string };
  population: string;
  timeWindow: string;
  evaluationType: string;
  modelVersion: string;
  sourceArtifact: string;
  sourceUrl: string;
  artifactCommit: string;
  evaluationCodeCommit: string;
  artifactBlobSha: string;
  verifiedOn: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  detail: string;
  inspect: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  evidence?: { label: string; url: string }[];
  metric?: QuantitativeEvidence;
  featured: boolean;
}

export interface ExperienceRole { id: string; title: string; company: string; period: string; summary: string; milestones: { label: string; text: string }[]; }
export interface EducationEntry { credential: string; institution: string; date: string; detail?: string; }

export const experience: ExperienceRole[] = [
  {
    id: "senior-data-analyst", title: "Senior Data Analyst (Data Science / Analytics Engineering)", company: "OUTFRONT Media", period: "April 2022–Present",
    summary: "Built production reporting systems, developed Python models, and delivered business-facing AI applications. Translated fragmented advertising data and complex business rules into reusable data products for revenue reporting, customer retention, and inventory-performance analysis.",
    milestones: [
      { label: "Production data foundation", text: "Built the Snowflake/dbt data foundation for production revenue reporting across five advertising platforms, integrating source-specific schemas, deduplication, data enrichments, and backfills into Sigma-facing marts." },
      { label: "Reporting migration", text: "Migrated legacy reporting logic as layered source transformations, unified fact models, and Sigma-facing marts, preserving established business definitions through the data-platform migration." },
      { label: "Daily occupancy modeling", text: "Built and validated daily programmatic occupancy and buy-type models; designed separate sales-activity and shared-capacity components to preserve metric meaning across detailed and aggregate reporting." },
      { label: "Inventory modeling & peer analysis", text: "Implemented regression models for inventory utilization and revenue per unit; combined model outputs with cross-market peer comparisons to identify performance gaps and support yield-management analysis." },
      { label: "Retention & segmentation", text: "Developed Python churn-risk models and K-means customer segmentation to identify advertiser-retention priorities and account-growth opportunities against business-defined targeting criteria." },
      { label: "Generative AI delivery", text: "Delivered generative AI applications for editable executive financial communications; supported production troubleshooting and partnered with the data team on source-data and output validation." },
      { label: "Cross-functional delivery", text: "Partnered with business stakeholders, vendors, and engineers on requirements, troubleshooting, user acceptance testing, and documentation to deliver maintainable data products at scale." }
    ]
  },
  {
    id: "bi-data-analyst", title: "Business Intelligence Data Analyst (Data Architecture / Data Science)", company: "OUTFRONT Media", period: "July 2019–April 2022",
    summary: "Built the data pipelines and analytical models behind recurring executive reporting, combining Python automation, dimensional modeling, and KPI design with applied machine-learning collaboration.",
    milestones: [
      { label: "Python ETL & automation", text: "Automated recurring reporting with Python ETL, replacing manual data preparation with repeatable extraction, transformation, and reporting workflows." },
      { label: "Dimensional modeling & KPIs", text: "Designed fact and dimension tables and defined KPIs, creating reusable data structures for consistent executive reporting across business lines." },
      { label: "Advertiser entity resolution", text: "Built Python/SQL entity-resolution workflows linking external advertisers to internal accounts through name normalization, exact and fuzzy matching, confidence tiers, and exceptions for human review." },
      { label: "Applied machine learning", text: "Authored and presented an applied machine-learning use case in 2021 for advertising-inventory optimization and customer-value projection with external data-science specialists." },
      { label: "Production release coordination", text: "Coordinated the transition of business reporting from development to production, aligning stakeholders on release sequencing and phased rollout options to minimize disruption to active users." }
    ]
  }
];

export const education: EducationEntry[] = [
  { credential: "M.S., Applied Data Science", institution: "Bay Path University", date: "June 2025" },
  { credential: "B.S., Computer Science", institution: "University of Vermont", date: "December 2018" },
  { credential: "Data Science Immersive", institution: "General Assembly", date: "February–May 2019", detail: "Non-degree training program" }
];

const footballEvaluation: QuantitativeEvidence = {
  metric: "Mean absolute error", value: 4.4909, unit: "PPR points",
  baseline: { label: "causal trailing-mean baseline", value: 4.8046, unit: "PPR points" },
  population: "5,914 player-weeks", timeWindow: "2025 season", evaluationType: "Historical out-of-sample season evaluation of a frozen artifact",
  modelVersion: "20260911-asof_v1-d333de20", sourceArtifact: "eval-20260911-20260911-asof_v1-d333de20-rf-oos2025.json",
  sourceUrl: "https://github.com/cbratkovics/fantasy-football-ai/blob/df3e7e6dbae3446da15535176d1dee9f4f045433/artifacts/eval/eval-20260911-20260911-asof_v1-d333de20-rf-oos2025.json",
  artifactCommit: "df3e7e6dbae3446da15535176d1dee9f4f045433",
  evaluationCodeCommit: "8e22a47cfc99ba85861cccbe63732da42feb27ab",
  artifactBlobSha: "80fff5584a9ed50c6d895bd99232100c9b1bd77a",
  verifiedOn: "2026-09-12"
};

export const relativeReduction = (evidence: QuantitativeEvidence) =>
  ((evidence.baseline.value - evidence.value) / evidence.baseline.value) * 100;

export const projects: Project[] = [
  {
    id: "fantasy-football", title: "Fantasy Football Projection Pipeline",
    summary: `${relativeReduction(footballEvaluation).toFixed(1)}% lower MAE than a trailing-mean baseline across ${footballEvaluation.population} in a 2025 out-of-sample evaluation.`,
    detail: "Per-position random forests use lagged/as-of features and season-based temporal evaluation. The 4.4909 versus 4.8046 PPR-point result is a historical evaluation of a frozen model—not a prospectively published 2025 forecast or a rolling-origin result. GMM/PCA preseason draft tiers are evaluated separately.",
    inspect: "Inspect the pinned evaluation artifact, model card, and artifact-backed FastAPI/Next.js presentation.",
    tech: ["Python", "Random forests", "As-of features", "FastAPI", "Next.js", "GMM / PCA"],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai", liveUrl: "https://fantasy-football-ai.vercel.app", liveLabel: "Project demo", metric: footballEvaluation,
    evidence: [
      { label: "Model card", url: "https://github.com/cbratkovics/fantasy-football-ai/blob/main/docs/MODEL_CARD.md" },
      { label: "Pinned evaluation", url: footballEvaluation.sourceUrl }
    ], featured: true
  },
  {
    id: "sql-genius", title: "SQL Genius AI | SQL Analytics Playground",
    summary: "An inspectable browser analytics workflow: explore a synthetic sample schema, draft or edit SQL, explicitly run an accepted read-only query in SQLite, preview bounded results, and export CSV.",
    detail: "The maintained demo defaults to local reviewed-intent/template generation with a conservative schema fallback, separate generation and execution, and synthetic fixtures. A legacy Python/FastAPI Anthropic route remains optional for private compatibility; the browser demo does not call it by default.",
    inspect: "Inspect the maintained local generator, browser SQLite execution, editable query flow, read-only policy, bounded previews, CSV export, and evidence notes. Policy checks narrow behavior but do not prove SQL correctness, tenant security, or a hardened sandbox.",
    tech: ["TypeScript", "Next.js", "Browser SQLite", "Local templates", "Read-only policy"],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai", liveUrl: "https://sql-genius-ai.vercel.app/demo", liveLabel: "Open playground",
    evidence: [{ label: "Implementation evidence", url: "https://github.com/cbratkovics/sql-genius-ai/blob/main/docs/PORTFOLIO_EVIDENCE.md" }], featured: true
  },
  {
    id: "ai-chatbot", title: "AI Chat System | Multi-Provider LLM Gateway",
    summary: "An observable FastAPI/Next.js gateway with SSE streaming, provider failover, exact and semantic response caching, structured errors, bounded requests, and per-request/session telemetry.",
    detail: "A scoped 2026-09-09 localhost run from a dirty working tree used an in-memory cache with configured embeddings: failover checks passed 10/10 and SSE checks passed 20/20. The 68-pair semantic-cache run measured 56.6% precision, 90.9% recall, and 23 false positives.",
    inspect: "Inspect the committed evaluation routines and presentation. The simulated primary failure occurred before its request; these checks are not a production SLA, real-timeout guarantee, or Redis-backed benchmark, and cache behavior is configuration-dependent.",
    tech: ["Python", "FastAPI", "Next.js", "SSE", "Caching", "Telemetry"],
    githubUrl: "https://github.com/cbratkovics/chatbot-ai-system", liveUrl: "https://chatbot-ai-system.vercel.app", liveLabel: "Project demo",
    evidence: [
      { label: "System evaluations", url: "https://chatbot-ai-system.vercel.app/evals" },
      { label: "Committed benchmark", url: "https://github.com/cbratkovics/chatbot-ai-system/blob/main/evals/results/latest.md" }
    ], featured: true
  },
  {
    id: "nba-ml", title: "NBA Stat Predictor",
    summary: "A LightGBM batch pipeline with point-in-time features, GitHub Actions, Hugging Face artifacts, Next.js artifact-reading pages, season replay reconciliation, and a read-only tool-grounded brief.",
    detail: "The holdout artifact reports 4.764 points MAE versus a 4.908 last-10 baseline for 22,244 eligible 2025–26 player-games (at least 10 minutes with baseline available). The distinct all-replay population does not beat its baseline, and post-game minutes eligibility is not pregame knowledge.",
    inspect: "Inspect cohort-aware metrics, replay reconciliation, and the read-only tool-grounded brief. Published replay differences are +0.0021 points, +0.0008 rebounds, and +0.0010 assists against a 0.05 tolerance; the restricted replay and holdout cohorts have different eligibility rules.",
    tech: ["Python", "LightGBM", "GitHub Actions", "Hugging Face", "Next.js"],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml", liveUrl: "https://nba-ai-ml.vercel.app", liveLabel: "Project overview",
    evidence: [
      { label: "Replay", url: "https://nba-ai-ml.vercel.app/replay" },
      { label: "Agent brief", url: "https://nba-ai-ml.vercel.app/brief" },
      { label: "Reconciliation notes", url: "https://github.com/cbratkovics/nba-ai-ml/blob/master/docs/reconciliation.md" }
    ], featured: false
  },
  {
    id: "document-intelligence", title: "Document Intelligence | Local-First Retrieval Service",
    summary: "A local-first retrieval service with an authoritative SQLite manifest, staged ingestion/replacement/deletion, current-version hydration, scoped lexical and hybrid retrieval, and offline evaluation.",
    detail: "Document scope is applied to both retrieval branches, while unavailable-provider and excerpts-only outcomes are explicit. Dense retrieval, generation, and some reranking paths require configuration; citation validation checks references, not entailment, and sample tests are not a general quality benchmark.",
    inspect: "Inspect the repository implementation and lifecycle/retrieval tests; the project documents a local walkthrough rather than claiming a verified hosted service.",
    tech: ["Python", "SQLite", "Hybrid retrieval", "FastAPI", "Offline evaluation"],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    featured: false
  }
];

export const skills = {
  "Core analytics engineering": ["Python", "SQL", "Snowflake", "dbt", "Sigma"],
  "Data products and quality": ["Dimensional modeling", "ETL / ELT", "Source integration", "Reconciliation", "Data testing", "Controlled backfills", "Git"],
  "Modeling and validation": ["Random forests", "LightGBM", "Regression", "K-means", "Entity resolution", "Feature engineering", "Time-aware evaluation", "Baseline comparison"],
  "Applied AI and applications": ["FastAPI", "Next.js", "LLM APIs", "Retrieval", "SSE streaming", "Caching", "Telemetry"],
  "Cloud and delivery": ["AWS", "S3", "Docker", "GitHub Actions", "PostgreSQL"]
};

export const workStories = [
  { id: "reporting-modernization", title: "Five-source reporting modernization", outcome: "A maintainable Snowflake/dbt foundation feeds production revenue reporting in Sigma.", problem: "Five differently shaped advertising feeds needed consistent reporting without changing established revenue and delivery definitions.", contribution: "I built source transformations, unified facts, Sigma-facing marts, inventory enrichment, source-specific deduplication, controlled backfills, and reusable reconciliation.", decision: "I preserved valid source differences in explicit layers so historical recovery and business validation remained traceable.", validation: "Migration checks distinguish five-platform standardization from preserved definitions and cover source/date populations, business calculations, and record-level exceptions." },
  { id: "daily-occupancy", title: "Daily occupancy without double-counted capacity", outcome: "Completed programmatic occupancy and buy-type components were built and validated for the documented reporting grains.", problem: "Activity split across sources and buy types can multiply shared inventory-day capacity when grains are combined.", contribution: "I built the SSP components and integration; a collaborating data engineer owns the shared-capacity and charted components.", decision: "We separated sales activity from shared inventory-day capacity so additional activity groupings do not repeat the denominator.", validation: "Aggregation checks cover the documented measurable populations and detailed and aggregate reporting grains." },
  { id: "advertiser-mappings", title: "Reviewable advertiser mappings", outcome: "Connected external advertiser data to internal reporting while keeping uncertain matches inspectable.", problem: "External advertiser names did not reliably join to internal accounts, while maximizing coverage could increase false matches.", contribution: "In the earlier BI role, I built Python/SQL workflows combining normalization, exact and fuzzy matching, confidence tiers, and exceptions for human review.", decision: "Exact matching resolved known names first; fuzzy matching handled remaining candidates without treating similarity as calibrated probability.", validation: "Retained scores, tiers, and exceptions made coverage and review status visible without presenting coverage as accuracy." },
  { id: "applied-modeling", title: "Applied modeling for retention and inventory decisions", outcome: "Produced decision support for retention priorities, customer groups, inventory-performance gaps, and peer comparisons.", problem: "Business teams needed structured views of advertiser risk and uneven inventory utilization.", contribution: "I developed churn-risk models and K-means segmentation separately from inventory-utilization and revenue-per-unit regressions, then used peer comparisons to surface priorities.", decision: "Retention, segmentation, and inventory-performance questions remained distinct rather than being presented as one model.", validation: "Outputs were validated against business-defined criteria as analytical decision support; no measured lift or recurring adoption is attributed." },
  { id: "operational-ai", title: "Generative AI for executive communications", outcome: "Delivered and supported applications that turn business and financial data into editable executive communications.", problem: "The application needed maintainable business-data inputs and dependable, editable output; a later stale source view interrupted valid output.", contribution: "I contributed to delivery and support, traced the incident to stale source views, coordinated correction with the data team, and validated source data and restored output.", decision: "We corrected the source dependency rather than masking the issue with prompt or interface changes.", validation: "Application output was checked after the cross-team source correction, separating supported delivery and troubleshooting from broader platform ownership." }
] as const;

export const deliveryHighlights = [
  { icon: "calendar", value: "7+ years", label: "Enterprise analytics", description: "A continuous path from reporting foundations to modeling and maintainable data products" },
  { icon: "sources", value: "5 platforms", label: "Revenue reporting", description: "Source-specific data modeled in Snowflake/dbt for Sigma-facing production marts" },
  { icon: "target", value: "Decision support", label: "Retention and inventory", description: "Models, segments, mappings, and peer comparisons built for distinct analytical questions" },
  { icon: "recovery", value: "Validated delivery", label: "Applied AI", description: "Editable executive communications delivered, with source and output validation during recovery" }
] as const;
