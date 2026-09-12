export const identity = {
  name: "Christopher J. Bratkovics",
  headline: "Data Scientist | Analytics Engineer | Applied AI",
  eyebrow: "7+ years in enterprise analytics",
  summary:
    "Data Scientist and Analytics Engineer with 7+ years building predictive models, production data pipelines, and business-facing applications. I combine Python/SQL development with Snowflake/dbt modeling to turn fragmented source data into reliable reporting and decision-support tools."
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

export interface ExperienceRole { id: string; title: string; company: string; period: string; summary: string; milestones: { date: string; text: string }[]; }
export interface EducationEntry { credential: string; institution: string; date: string; detail?: string; }

export const experience: ExperienceRole[] = [
  {
    id: "senior-data-analyst", title: "Senior Data Analyst (Data Science / Analytics Engineering)", company: "OUTFRONT Media", period: "April 2022–Present",
    summary: "Built production reporting systems, developed Python models, and delivered business-facing AI applications. Translated fragmented advertising data and complex business rules into reusable data products for revenue reporting, customer retention, and inventory-performance analysis.",
    milestones: [
      { date: "Production data architecture", text: "Designed, built, and own the Snowflake/dbt foundation integrating five advertising platforms into unified production revenue and delivery reporting in Sigma, with standardized source transformations, inventory enrichment, source-specific deduplication, and controlled historical backfills." },
      { date: "Predictive modeling & customer segmentation", text: "Developed Python advertiser churn-risk models and K-means segmentation to identify retention priorities and account-growth opportunities, combining advertiser behavior with business-defined criteria for targeted analysis." },
      { date: "Inventory modeling & peer analysis", text: "Built inventory-utilization and revenue-per-unit regression models and peer comparisons to evaluate expected performance, identify underperforming advertising assets, and support yield-management analysis." },
      { date: "Advertiser entity resolution", text: "Built Python/SQL workflows linking external advertiser data to internal accounts through name normalization, exact and fuzzy matching, and similarity scoring. Preserved confidence tiers and reviewable exceptions to make cross-source advertiser reporting traceable." },
      { date: "Occupancy modeling & reconciliation", text: "Built and validated monthly and daily occupancy and buy-type models, integrating programmatic activity with direct-sold reporting while controlling shared-capacity aggregation. Created reusable SQL proofs to reconcile revenue, fees, delivery, and inventory coverage and validate metric behavior across reporting grains." },
      { date: "Applied AI delivery & recovery", text: "Delivered and supported a generative AI application turning financial data into editable executive communications. Traced a production failure to outdated source views, worked with the data team to correct them, and validated the restored output." }
    ]
  },
  {
    id: "bi-data-analyst", title: "Business Intelligence Data Analyst (Data Architecture / Data Science)", company: "OUTFRONT Media", period: "July 2019–April 2022",
    summary: "Built the data pipelines and analytical models behind recurring executive reporting, combining Python automation, dimensional modeling, and KPI design with applied machine-learning collaboration.",
    milestones: [
      { date: "Python ETL & automation", text: "Automated recurring reporting workflows with Python ETL, replacing manual data preparation with repeatable processes." },
      { date: "Dimensional modeling & business metrics", text: "Designed fact and dimension tables and defined KPIs for executive dashboards, translating business requirements into reusable reporting structures." },
      { date: "Applied machine learning | 2021", text: "Coauthored and presented an applied machine-learning use case for advertising-inventory optimization and customer-value projection, collaborating with external data-science specialists." }
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
  sourceUrl: "https://github.com/cbratkovics/fantasy-football-ai/blob/8e22a47cfc99ba85861cccbe63732da42feb27ab/artifacts/eval/eval-20260911-20260911-asof_v1-d333de20-rf-oos2025.json",
  verifiedOn: "2026-09-12"
};

export const relativeReduction = (evidence: QuantitativeEvidence) =>
  ((evidence.baseline.value - evidence.value) / evidence.baseline.value) * 100;

export const projects: Project[] = [
  {
    id: "fantasy-football", title: "Fantasy Football Projection Pipeline",
    summary: `${relativeReduction(footballEvaluation).toFixed(1)}% lower MAE than a trailing-mean baseline across ${footballEvaluation.population} in a 2025 out-of-sample evaluation.`,
    detail: "Per-position random forests use lagged/as-of features and temporal splits. The 4.49 versus 4.80 PPR-point result is a September 2026 historical evaluation of the frozen model—not a prospectively recorded 2025 forecast. GMM/PCA preseason draft tiers are evaluated separately.",
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
    detail: "The active generator uses local reviewed-intent/template matching with a conservative schema fallback. User-controlled execution and read-only policy checks narrow behavior; they are not unrestricted LLM synthesis or a hardened security guarantee.",
    inspect: "Inspect the maintained local generator, browser database, query policy, and portfolio evidence notes.",
    tech: ["TypeScript", "Next.js", "Browser SQLite", "Local templates", "Read-only policy"],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai", liveUrl: "https://sql-genius-ai.vercel.app/demo", liveLabel: "Open playground",
    evidence: [{ label: "Implementation evidence", url: "https://github.com/cbratkovics/sql-genius-ai/blob/main/docs/PORTFOLIO_EVIDENCE.md" }], featured: true
  },
  {
    id: "ai-chatbot", title: "AI Chat System | Multi-Provider LLM Gateway",
    summary: "An observable FastAPI/Next.js gateway with SSE streaming, provider failover, exact and semantic response caching, structured errors, bounded requests, and per-request/session telemetry.",
    detail: "A scoped localhost benchmark recorded failover checks passing 10/10 and stream-contract checks passing 20/20. Its 68-pair semantic-cache run also exposed the trade-off: 56.6% precision, 90.9% recall, and 23 false positives; runtime behavior remains configuration-dependent.",
    inspect: "Inspect the committed benchmark and the deployed evaluation presentation; these checks are not a production SLA or real-outage guarantee.",
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
    inspect: "Inspect cohort-aware metrics, replay reconciliation, agent design, and the overview, replay, and brief demonstrations.",
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
    inspect: "Inspect the engineering case study, architecture, and lifecycle/retrieval tests; the repository documents a local walkthrough rather than claiming a verified hosted service.",
    tech: ["Python", "SQLite", "Hybrid retrieval", "FastAPI", "Offline evaluation"],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    evidence: [
      { label: "Engineering case study", url: "https://github.com/cbratkovics/document-intelligence-ai/blob/main/docs/ENGINEERING_CASE_STUDY.md" },
      { label: "Architecture", url: "https://github.com/cbratkovics/document-intelligence-ai/blob/main/docs/ARCHITECTURE.md" }
    ], featured: false
  }
];

export const skills = {
  "Core analytics engineering": ["Python", "SQL", "Snowflake", "dbt", "Sigma"],
  "Data products and quality": ["Dimensional modeling", "ETL / ELT", "Source integration", "Reconciliation", "Data testing", "Controlled backfills", "Git"],
  "Modeling and validation": ["Random forests", "LightGBM", "Regression", "K-means", "Entity resolution", "Feature engineering", "Time-aware evaluation", "Baseline comparison"],
  "Applied AI and applications": ["FastAPI", "Next.js", "LLM APIs", "Retrieval", "SSE streaming", "Caching", "Telemetry"],
  "Cloud and delivery": ["AWS", "S3", "Docker", "GitHub Actions", "PostgreSQL"]
};
