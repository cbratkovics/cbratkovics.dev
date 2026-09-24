export const identity = {
  name: "Christopher J. Bratkovics",
  headline: "Data Scientist | Analytics Engineer | Applied AI",
  eyebrow: "7+ years in enterprise analytics",
  valueProposition: "Trustworthy data foundations. Clear metrics. Defensible decisions.",
  summary:
    "I integrate messy sources, define business logic, validate results, and automate recurring workflows, connecting analytics engineering with applied data science and AI."
} as const;

export interface DecisionNarrative {
  decisionContext: string;
  finding: string;
  findingBasis: "Measured evaluation" | "Observed implementation" | "Design conclusion" | "Illustrative example";
  whyItMatters: string;
  recommendation: string;
  recommendationStatus: "Documented decision" | "Evidence-based interpretation" | "Proposed next step";
  ambiguity?: string;
  contribution?: string;
  validation?: string;
  deliveredOutcome?: string;
  limitations?: string;
}

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

export interface ArtifactCitation {
  figure: string;
  artifact: string;
  key: string;
  url: string;
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
  primaryAction?: { label: string; url: string };
  secondaryAction?: { label: string; url: string };
  narrative: DecisionNarrative;
  metric?: QuantitativeEvidence;
  /** Every figure in the entry's copy or case-study page, traced to a committed artifact key. */
  citations?: ArtifactCitation[];
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

const entityResolutionCommit = "f50d764359895ab3a4d9945ed2a8b37d77bd681c"; // tag v0.1.0
const entityResolutionArtifact = (figure: string, artifact: string, key: string): ArtifactCitation => ({
  figure, artifact, key,
  url: `https://github.com/cbratkovics/entity-resolution/blob/${entityResolutionCommit}/${artifact}`
});

// Verified on 2026-09-24 against the v0.1.0 artifacts. Card and case-study figures round the cited values.
const entityResolutionCitations: ArtifactCitation[] = [
  entityResolutionArtifact("482,514", "artifacts/manifest.json", "counts.musicbrainz.sampled"),
  entityResolutionArtifact("241,752", "artifacts/blocking_report.json", "pair_completeness.truth_pairs"),
  entityResolutionArtifact("96.3%", "artifacts/blocking_report.json", "pair_completeness.union"),
  entityResolutionArtifact("96.2%", "artifacts/blocking_report.json", "pair_completeness.after_cap"),
  entityResolutionArtifact("cap of 200", "artifacts/blocking_report.json", "candidate_cap_per_a"),
  entityResolutionArtifact("240 truth pairs", "artifacts/blocking_report.json", "pair_completeness.truth_pairs_lost_to_cap"),
  entityResolutionArtifact("7.6M candidate pairs", "artifacts/blocking_report.json", "candidate_pairs_after_cap"),
  entityResolutionArtifact("0.9946", "artifacts/eval_rules_v1.json", "metrics.at_auto_accept.precision"),
  entityResolutionArtifact("0.931", "artifacts/eval_rules_v1.json", "metrics.at_auto_accept.recall_labelled"),
  entityResolutionArtifact("0.962", "artifacts/eval_rules_v1.json", "metrics.at_auto_accept.f1"),
  entityResolutionArtifact("0.9993", "artifacts/eval_learned_v1.json", "metrics.at_auto_accept.precision"),
  entityResolutionArtifact("0.850", "artifacts/eval_learned_v1.json", "metrics.at_auto_accept.recall_labelled"),
  entityResolutionArtifact("0.919", "artifacts/eval_learned_v1.json", "metrics.at_auto_accept.f1"),
  entityResolutionArtifact("25,076", "artifacts/eval_rules_v1.json", "metrics.ambiguity_rule.review_queue"),
  entityResolutionArtifact("6,016", "artifacts/eval_learned_v1.json", "metrics.ambiguity_rule.review_queue"),
  entityResolutionArtifact("4,501", "artifacts/eval_rules_v1.json", "metrics.unverified_accepts.count"),
  entityResolutionArtifact("0.50 unlinked share", "artifacts/manifest.json", "sample.thresholds.a.unlinked_share_actual"),
  entityResolutionArtifact("13.8 GiB", "artifacts/manifest.json", "runtime.data_dir_bytes_peak"),
  entityResolutionArtifact("242,542", "artifacts/profile/musicbrainz.json", "truth.a_records_with_link_by_primary_type.Album"),
  entityResolutionArtifact("2,324,821", "artifacts/profile/musicbrainz.json", "records.albums"),
  entityResolutionArtifact("overconfident", "artifacts/eval_learned_v1.json", "metrics.calibration.decision_level.ece")
];

export const projects: Project[] = [
  {
    id: "ev-charging-unified-schema", title: "EV Charging Data: Unified Schema",
    summary: "Three public charging datasets in incompatible shapes conformed into one tested dbt schema, with explicit contracts, quarantine, reconciliation, denominator analysis, and evidence-backed findings.",
    detail: "Built to make every published number traceable from raw files through the reporting layer. This independent project uses public data; as of v0.1.0, it lands 440,575 rows, accepts 357,606 as sessions, and retains 82,969 quarantined rows with explicit reasons.",
    inspect: "Inspect the source contracts, bronze-to-gold lineage, quarantine, reconciliation, claim artifacts, and the bounded findings and recommendations.",
    tech: ["dbt", "DuckDB", "SQL", "Python", "Data Quality", "Reconciliation"],
    githubUrl: "https://github.com/cbratkovics/ev-charging-data-unified-schema",
    primaryAction: { label: "Read case study", url: "/projects/ev-charging-data-unified-schema" },
    secondaryAction: { label: "Explore dbt lineage", url: "https://cbratkovics.github.io/ev-charging-data-unified-schema/" },
    narrative: {
      decisionContext: "How can incompatible public charging feeds support defensible, reproducible utilization decisions?",
      findingBasis: "Measured evaluation",
      finding: "In Boulder, 45.1% of connected time is idle after charging, but only up to 12.4% is idle while every inferred port is occupied.",
      whyItMatters: "The headline idle figure overstates what an idle fee could recover by 3.6 times, and the smaller figure remains a ceiling.",
      recommendation: "Quote the smaller figure as ‘up to,’ pilot at multi-port stations around midday, and revisit the recommendation if queue data becomes available.",
      recommendationStatus: "Evidence-based interpretation",
      validation: "Contracts, unit tests, raw-to-gold reconciliation, deterministic rebuild checks, and committed claim artifacts keep the published numbers inspectable.",
      limitations: "No source publishes station port counts. Inferred port counts are lower bounds, so published utilization is an upper bound. All figures are scoped to v0.1.0."
    },
    evidence: [
      { label: "dbt docs and lineage", url: "https://cbratkovics.github.io/ev-charging-data-unified-schema/" },
      { label: "Findings", url: "https://github.com/cbratkovics/ev-charging-data-unified-schema/blob/main/docs/FINDINGS.md" }
    ], featured: true
  },
  {
    id: "entity-resolution", title: "Entity Resolution: Rules vs. Calibrated Classifier",
    summary: "482K sampled MusicBrainz album release groups matched against Discogs masters and scored against labelled ground truth, with blocking completeness, tiered decisions, review-queue cost, and an auditable mapping table.",
    detail: "482,514 sampled MusicBrainz album release groups against all Discogs masters, with 241,752 in-scope truth pairs from MusicBrainz’s own Discogs links. Multi-key blocking retains 96.2% of truth pairs after a per-record cap of 200, leaving 7.6M candidate pairs. Three methods share one normaliser: an exact-match rule, a weighted-score rules baseline, and one scikit-learn classifier calibrated on a held-out fold. A dbt bronze/silver/gold warehouse on DuckDB carries the mapping; a CI number checker fails the build when any cited figure lacks a matching artifact key.",
    inspect: "The blocking report (pair completeness before and after the per-record cap), the per-method evaluation artifacts, the tier semantics, the committed test-fold mapping table, the five decision records, and the number checker that verifies every cited figure.",
    tech: ["Python", "scikit-learn", "dbt", "DuckDB", "Record linkage", "Calibration"],
    githubUrl: "https://github.com/cbratkovics/entity-resolution",
    primaryAction: { label: "Read case study", url: "/projects/entity-resolution" },
    secondaryAction: { label: "Explore the results site", url: "https://cbratkovics.github.io/entity-resolution/" },
    narrative: {
      decisionContext: "When does a learned matcher earn its place over a well-designed rules baseline?",
      findingBasis: "Measured evaluation",
      finding: "On the labelled test fold, weighted rules reached 0.962 F1. The isotonic-calibrated classifier raised auto-accept precision from 0.9946 to 0.9993 and cut the review queue from 25,076 to 6,016 pairs, at lower recall (0.850 vs. 0.931).",
      whyItMatters: "The learned model’s contribution was calibration and a smaller review queue, not higher accuracy. Unlinked records are unlabelled, so coverage is never reported as accuracy.",
      recommendation: "Keep the rules baseline as the reference. Adopt the classifier where reviewer time is the binding cost and lower recall is acceptable, and report unverified accepts separately from every accuracy figure.",
      recommendationStatus: "Evidence-based interpretation",
      validation: "Folds are split by MusicBrainz record, calibration uses its own fold, and a too-good-to-be-true audit was run before the results were accepted. Committed artifacts pass a reproducibility check.",
      limitations: "The full build is owner-run; its ~13.8 GiB data peak does not fit a hosted runner, so CI verifies committed artifacts only. The methods use different tier thresholds, so recall and coverage differ. The learned model’s decision-level calibration remains overconfident. 4,501 rules accepts on unlabelled records are excluded from every accuracy figure. All figures scoped to v0.1.0."
    },
    evidence: [
      { label: "Results site", url: "https://cbratkovics.github.io/entity-resolution/" },
      { label: "Findings", url: "https://github.com/cbratkovics/entity-resolution/blob/main/docs/FINDINGS.md" },
      { label: "Methods card", url: "https://github.com/cbratkovics/entity-resolution/blob/main/docs/METHODS_CARD.md" }
    ],
    citations: entityResolutionCitations, featured: true
  },
  {
    id: "fantasy-football", title: "Fantasy Football Data Platform & Decision Lab",
    summary: "A Python and dbt/DuckDB workflow connecting time-aware predictions with tested facts, reconciled evaluation marts, and inspectable decision support.",
    detail: `Python produces predictions and evaluation artifacts; dbt builds tested facts and marts from statistics and artifacts; the API and product expose those distinct provenance paths. The frozen-model evaluation measured ${relativeReduction(footballEvaluation).toFixed(1)}% lower MAE than its baseline across ${footballEvaluation.population}.`,
    inspect: "Inspect the data-platform lineage, metric definition, dbt documentation, model card, and pinned evaluation artifact.",
    tech: ["Python", "dbt", "DuckDB", "Time-aware evaluation", "FastAPI", "Next.js"],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai", liveUrl: "https://fantasy-football-ai.vercel.app/data-platform", liveLabel: "Explore the data platform", metric: footballEvaluation,
    primaryAction: { label: "Explore the data platform", url: "https://fantasy-football-ai.vercel.app/data-platform" },
    secondaryAction: { label: "Trace a metric", url: "https://fantasy-football-ai.vercel.app/data-platform#trace" },
    narrative: {
      decisionContext: "When is a projection sufficiently traceable to use as decision support?",
      findingBasis: "Design conclusion", finding: "An evaluation metric is interpretable only when its population, window, model version, candidate, and aggregation rules stay aligned across the pipeline.",
      whyItMatters: "A historical error reduction does not show that the product wins leagues, improves lineups, or captures every piece of pregame context.",
      recommendation: "Inspect the metric definition, baseline, applicable population, and reconciliation before acting on a projection.", recommendationStatus: "Evidence-based interpretation",
      validation: "Tested facts and reconciled marts provide an independent path alongside pinned model artifacts.",
      limitations: "The 4.4909 versus 4.8046 PPR-point result is a frozen-model historical evaluation, not a rolling-origin result or prospectively published forecast."
    },
    evidence: [
      { label: "Model card", url: "https://github.com/cbratkovics/fantasy-football-ai/blob/main/docs/MODEL_CARD.md" },
      { label: "dbt documentation", url: "https://cbratkovics.github.io/fantasy-football-ai/" },
      { label: "Pinned evaluation", url: footballEvaluation.sourceUrl }
    ], featured: true
  },
  {
    id: "nba-ml", title: "NBA Stat Predictor",
    summary: "A LightGBM batch pipeline with point-in-time features, GitHub Actions, Hugging Face artifacts, Next.js artifact-reading pages, season replay reconciliation, and a read-only tool-grounded brief.",
    detail: "The holdout artifact reports 4.764 points MAE versus a 4.908 last-10 baseline for 22,244 eligible 2025–26 player-games (at least 10 minutes with baseline available). The distinct all-replay population does not beat its baseline, and post-game minutes eligibility is not pregame knowledge.",
    inspect: "Inspect cohort-aware metrics, replay reconciliation, and the read-only tool-grounded brief. Published replay differences are +0.0021 points, +0.0008 rebounds, and +0.0010 assists against a 0.05 tolerance; the restricted replay and holdout cohorts have different eligibility rules.",
    narrative: {
      decisionContext: "Does a favorable restricted-cohort score justify the model for the full pregame population?", findingBasis: "Measured evaluation",
      finding: "The restricted eligible cohort improves on its baseline, while the distinct all-replay population does not.", whyItMatters: "Post-game minutes eligibility is unavailable at the pregame decision point, so mixing populations can reverse the recommendation.",
      recommendation: "Compare like-for-like populations using decision-time information, and prefer the supported baseline where the comparison does not justify the model.", recommendationStatus: "Evidence-based interpretation",
      limitations: "This is a conclusion about the scoped evaluations, not every target or possible model."
    },
    tech: ["Python", "LightGBM", "GitHub Actions", "Hugging Face", "Next.js"],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml", liveUrl: "https://nba-ai-ml.vercel.app", liveLabel: "Project overview",
    evidence: [
      { label: "Replay", url: "https://nba-ai-ml.vercel.app/replay" },
      { label: "Agent brief", url: "https://nba-ai-ml.vercel.app/brief" },
      { label: "Reconciliation notes", url: "https://github.com/cbratkovics/nba-ai-ml/blob/master/docs/reconciliation.md" }
    ], featured: true
  },
  {
    id: "sql-genius", title: "SQL Genius AI | SQL Analytics Playground",
    summary: "An inspectable browser analytics workflow: explore a synthetic sample schema, draft or edit SQL, explicitly run an accepted read-only query in SQLite, preview bounded results, and export CSV.",
    detail: "The maintained demo defaults to local reviewed-intent/template generation with a conservative schema fallback, separate generation and execution, and synthetic fixtures. A legacy Python/FastAPI Anthropic route remains optional for private compatibility; the browser demo does not call it by default.",
    inspect: "Inspect the maintained local generator, browser SQLite execution, editable query flow, read-only policy, bounded previews, CSV export, and evidence notes. Policy checks narrow behavior but do not prove SQL correctness, tenant security, or a hardened sandbox.",
    narrative: {
      decisionContext: "How can generated SQL remain inspectable and under human control?", findingBasis: "Design conclusion",
      finding: "A syntactically accepted query does not establish that its metric answers the intended business question.", whyItMatters: "Even an illustrative question such as ‘best customers’ requires a definition, time window, and eligible population.",
      recommendation: "Inspect the schema, define the metric and population, review the editable SQL, and deliberately execute it.", recommendationStatus: "Evidence-based interpretation",
      limitations: "Read-only checks do not independently prove semantic correctness, tenant isolation, or a hardened sandbox."
    },
    tech: ["TypeScript", "Next.js", "Browser SQLite", "Local templates", "Read-only policy"],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai", liveUrl: "https://sql-genius-ai.vercel.app/demo", liveLabel: "Open playground",
    evidence: [{ label: "Implementation evidence", url: "https://github.com/cbratkovics/sql-genius-ai/blob/main/docs/PORTFOLIO_EVIDENCE.md" }], featured: false
  },
  {
    id: "ai-chatbot", title: "AI Chat System | Multi-Provider LLM Gateway",
    summary: "An observable FastAPI/Next.js gateway with SSE streaming, provider failover, exact and semantic response caching, structured errors, bounded requests, and per-request/session telemetry.",
    detail: "A scoped 2026-09-09 localhost run from a dirty working tree used an in-memory cache with configured embeddings: failover checks passed 10/10 and SSE checks passed 20/20. The 68-pair semantic-cache run measured 56.6% precision, 90.9% recall, and 23 false positives.",
    inspect: "Inspect the committed evaluation routines and presentation. The simulated primary failure occurred before its request; these checks are not a production SLA, real-timeout guarantee, or Redis-backed benchmark, and cache behavior is configuration-dependent.",
    narrative: {
      decisionContext: "When is semantic response reuse worth the cost of a wrong answer?", findingBasis: "Measured evaluation",
      finding: "In the scoped local run, similarity-based reuse produced 23 false positives and 56.6% precision.", whyItMatters: "A cache hit or avoided provider call is not useful when it returns an answer to a different question.",
      recommendation: "Evaluate false-positive costs and workload fit before enabling semantic reuse; treat bypass rules or threshold changes as proposals, not shipped policy.", recommendationStatus: "Proposed next step",
      limitations: "The localhost, in-memory-cache run came from a dirty working tree and is not a production reliability or Redis benchmark."
    },
    tech: ["Python", "FastAPI", "Next.js", "SSE", "Caching", "Telemetry"],
    githubUrl: "https://github.com/cbratkovics/chatbot-ai-system", liveUrl: "https://chatbot-ai-system.vercel.app", liveLabel: "Project demo",
    evidence: [
      { label: "System evaluations", url: "https://chatbot-ai-system.vercel.app/evals" },
      { label: "Committed benchmark", url: "https://github.com/cbratkovics/chatbot-ai-system/blob/main/evals/results/latest.md" }
    ], featured: false
  },
  {
    id: "document-intelligence", title: "Document Intelligence | Hybrid Retrieval With Visible Evidence",
    summary: "A hybrid retrieval service that shows its work: every passage reports its BM25 rank, dense rank, and reciprocal-rank-fused rank, so you can see why a result surfaced and which retriever found it.",
    detail: "The maintained demo runs BM25 alongside ONNX MiniLM embeddings behind a Next.js proxy. It is retrieval-only by design: no LLM is called. Uploads are size-limited, rate-limited, scoped to the visitor's session, and evicted oldest-first. Curated example questions illustrate retrieval differences; they are not quality measurements.",
    inspect: "Try an exact-identifier question, a paraphrase question, and the fusion example where neither retriever ranks the answer first, then compare the BM25, dense, and fused columns. In the repository, inspect the staged ingestion lifecycle, the demo-safety test that blocks any paid-provider call, and the engineering case study.",
    narrative: {
      decisionContext: "How can a user inspect why unstructured evidence was retrieved?", findingBasis: "Illustrative example",
      finding: "Lexical and dense retrieval can surface different passages, and visible component ranks show which method contributed to a fused result.", whyItMatters: "Rank visibility helps inspect relevance and provenance, but does not itself establish correctness.",
      recommendation: "Review the passage, source context, available version and scope, and relevance before relying on it.", recommendationStatus: "Evidence-based interpretation",
      limitations: "Curated questions are demonstrations, not retrieval-quality results; session filtering is not authenticated tenant isolation."
    },
    tech: ["Python", "FastAPI", "BM25", "ONNX embeddings", "Chroma", "Next.js", "Hugging Face Spaces"],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai", liveUrl: "https://frontend-doc-intel.vercel.app", liveLabel: "Live demo",
    evidence: [{ label: "Engineering case study", url: "https://github.com/cbratkovics/document-intelligence-ai/blob/main/docs/ENGINEERING_CASE_STUDY.md" }],
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

export const workStories: Array<{ id: string; title: string; narrative: DecisionNarrative }> = [
  { id: "reporting-modernization", title: "Five-source reporting modernization", narrative: {
    decisionContext: "How can five advertising-platform feeds support consistent reporting without erasing valid source rules?", ambiguity: "A shared schema can conceal differences in populations, timing, deduplication, and business definitions.",
    findingBasis: "Design conclusion", finding: "A common schema does not automatically make different sources comparable.", whyItMatters: "Business users need to know which aligned measures are trustworthy, which exceptions remain, and which differences require clarification rather than another transformation.",
    recommendation: "Compare aligned source and date populations using agreed definitions and traceable reconciliation before calling a discrepancy missing data—or matching totals complete validation.", recommendationStatus: "Documented decision",
    contribution: "I built Snowflake/dbt source transformations, unified facts, Sigma-facing marts, inventory enrichment, source-specific deduplication, controlled backfills, and historical recovery.", validation: "Reusable checks expose source/date populations, calculations, and record-level exceptions for stakeholder review.", deliveredOutcome: "A maintainable foundation feeds production revenue reporting in Sigma.", limitations: "Source-specific rules remain explicit rather than being flattened into false comparability."
  }},
  { id: "daily-occupancy", title: "Daily occupancy without double-counted capacity", narrative: {
    decisionContext: "What utilization ratio answers the requested question at the intended reporting grain?", ambiguity: "Activity categories may overlap, while physical capacity is shared and missing capacity must not be silently treated as zero.",
    findingBasis: "Design conclusion", finding: "Adding activity categories does not create capacity; repeating shared capacity across rows changes the meaning of utilization.", whyItMatters: "A denominator duplicated at a finer activity grain can produce an invalid rollup even when every row looks plausible.",
    recommendation: "Define grain and measurable population, aggregate only compatible components, and calculate the ratio with the denominator appropriate to that question.", recommendationStatus: "Documented decision",
    contribution: "I built the SSP components and integration; a collaborating data engineer owns the shared-capacity and charted components.", validation: "Checks cover documented measurable populations and detailed and aggregate grains.", deliveredOutcome: "Completed programmatic occupancy and buy-type components were built and validated for their documented grains.", limitations: "Not every numerator is additive across overlapping categories, and this does not claim every report was deployed or adopted."
  }},
  { id: "advertiser-mappings", title: "Reviewable advertiser mappings", narrative: {
    decisionContext: "Which external advertisers can be linked to internal accounts without hiding uncertain identity?", ambiguity: "Names vary, and higher match coverage can introduce false attribution.",
    findingBasis: "Design conclusion", finding: "Receiving a match is not the same as establishing a correct identity.", whyItMatters: "Exact-name matches can still be ambiguous, while similarity scores and coverage are not calibrated accuracy.",
    recommendation: "Use supported matching rules, retain method and review information, and route suspicious or ambiguous candidates for human review before consequential attribution.", recommendationStatus: "Documented decision",
    contribution: "In the earlier BI role, I built Python/SQL normalization, exact and fuzzy matching, confidence tiers, and review exceptions.", validation: "Retained scores, tiers, methods, and exceptions keep review status visible.", deliveredOutcome: "External advertiser data was connected to internal reporting with uncertain candidates inspectable."
  }},
  { id: "applied-modeling", title: "Applied modeling for retention and inventory decisions", narrative: {
    decisionContext: "Which accounts or inventory warrant closer attention, comparison, or follow-up?", ambiguity: "Risk prediction, customer grouping, inventory performance, and intervention effects are different questions.",
    findingBasis: "Design conclusion", finding: "Distinct business questions require distinct analytical outputs rather than one model presented as a complete decision system.", whyItMatters: "A score or segment can prioritize investigation but does not establish a causal driver or the effect of an intervention.",
    recommendation: "Use outputs as structured prioritization inputs, and evaluate risk prediction, segmentation, peer comparison, and intervention effects separately.", recommendationStatus: "Evidence-based interpretation",
    contribution: "I developed advertiser churn-risk models and K-means segmentation separately from inventory-utilization and revenue-per-unit regressions, then added peer comparisons.", validation: "Outputs were checked against business-defined criteria as decision support.", deliveredOutcome: "Implemented analytical views for retention priorities, customer groups, inventory gaps, and peer comparison.", limitations: "No retention lift, revenue recovery, recurring adoption, or completed intervention experiment is attributed."
  }},
  { id: "operational-ai", title: "Reliable inputs for AI-assisted communications", narrative: {
    decisionContext: "Where should diagnosis begin when generated business communications become invalid?", ambiguity: "A visible output failure can originate in the interface, prompt, application, or upstream business data.",
    findingBasis: "Observed implementation", finding: "The incident's failing dependency was stale source views, not a problem requiring a prompt or interface workaround.", whyItMatters: "Generated language cannot compensate for stale or incorrect business inputs.",
    recommendation: "Check source freshness and business-data correctness during diagnosis, then validate output after correcting the dependency.", recommendationStatus: "Evidence-based interpretation",
    contribution: "I supported application delivery, traced the incident, coordinated the source correction with the data team, and validated restored data and output.", validation: "Output was checked after the cross-team source correction.", deliveredOutcome: "Editable executive communications were delivered and the affected output was restored.", limitations: "This operating recommendation is not a claim that automated freshness monitoring was implemented or that I owned the entire platform."
  }}
];

export const deliveryHighlights = [
  { icon: "calendar", value: "7+ years", label: "Enterprise analytics", description: "A continuous path from reporting foundations to modeling and maintainable data products" },
  { icon: "sources", value: "5 platforms", label: "Revenue reporting", description: "Source-specific data modeled in Snowflake/dbt for Sigma-facing production marts" },
  { icon: "target", value: "Decision support", label: "Retention and inventory", description: "Models, segments, mappings, and peer comparisons built for distinct analytical questions" },
  { icon: "recovery", value: "Validated delivery", label: "Applied AI", description: "Editable executive communications delivered, with source and output validation during recovery" }
] as const;
