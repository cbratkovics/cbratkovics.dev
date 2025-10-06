export interface EvidenceLink {
  label: string;
  href: string;
}

export type Provenance =
  | "repo_artifact"
  | "readme_text"
  | "commit_stats"
  | "resume_internal";

export interface Metric {
  key: string; // "p95_latency_ms", "cache_hit_rate", etc.
  value: number | string;
  unit?: string; // "ms", "%", "GB"
  note?: string; // "local synthetic", "prod", etc.
  evidence?: EvidenceLink[];
  lastUpdatedISO?: string; // from commit timestamp of artifact
  provenance: Provenance;
  reproducible: boolean; // true only if public artifact exists
}

export type ProjectStage = "production" | "synthetic_benchmark" | "prototype";

export interface ProjectMetrics {
  repo: string; // "cbratkovics/chatbot-ai-system"
  title: string;
  stage: ProjectStage;
  metrics: Record<string, Metric>;
  summary: string; // 1-2 lines for cards
  caseStudyPath: string; // /projects/chat-platform
  tech: string[]; // chips
}

export interface HeroKPIs {
  projectsCount: number;
  bestAccuracy: number;
  fastestP95ms: number;
  dockerReductionPct: number;
}

export interface SiteMetrics {
  hero: HeroKPIs;
  impactBullets: Metric[]; // from resume, labeled as internal
  projects: ProjectMetrics[];
  lastGeneratedISO: string;
}
