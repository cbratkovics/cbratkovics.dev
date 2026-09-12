export interface Project {
  id: string;
  title: string;
  summary: string;
  detail: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface ExperienceRole {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  milestones: { date: string; text: string }[];
}

export interface EducationEntry {
  credential: string;
  institution: string;
  date: string;
  detail?: string;
}

export const experience: ExperienceRole[] = [
  {
    id: "senior-data-analyst",
    title: "Senior Data Analyst (Data Science / Analytics Engineering)",
    company: "OUTFRONT Media",
    location: "New York-based employer | Maine-based",
    period: "April 2022 to present",
    summary:
      "Promoted into a senior individual-contributor role spanning production analytics engineering, applied modeling, and operational AI.",
    milestones: [
      {
        date: "2026",
        text: "Designed, built, and own the Snowflake/dbt foundation that standardizes Vistar, Place Exchange, Hivestack DDA, Hivestack Programmatic, and ViOOH data for production revenue and delivery reporting in Sigma."
      },
      {
        date: "2025",
        text: "Developed churn-risk models, K-means customer segments, inventory-utilization and revenue-per-unit regressions, peer comparisons, and reviewable Python/SQL advertiser mappings."
      },
      {
        date: "2024",
        text: "Delivered and supported a generative AI application for editable executive financial communications, then restored its output by tracing a production failure to stale source views and validating the cross-team correction."
      },
      {
        date: "2022–2023",
        text: "Delivered Mobile Contract Tracking to production, iterated on stakeholder enhancements and Finance reporting fixes, and completed acceptance testing for a marketing dashboard."
      }
    ]
  },
  {
    id: "bi-data-analyst",
    title: "Business Intelligence Data Analyst (Data Architecture / Data Science)",
    company: "OUTFRONT Media",
    location: "New York-based employer | Maine-based",
    period: "July 2019 to April 2022",
    summary:
      "Built reporting foundations with Python ETL automation, dimensional models, KPI definitions, data-quality checks, and early applied data-science collaboration.",
    milestones: [
      {
        date: "March 2022",
        text: "Supported budget-data corrections and loading required for sales-compensation and quarterly bonus calculations."
      },
      {
        date: "September 2021",
        text: "Coordinated Financial Pacing reports into production with Finance, sequencing the release and phased rollout around active reporting users."
      },
      {
        date: "May 2021",
        text: "Coauthored and presented an applied machine-learning use case for advertising-inventory optimization and customer-value projection with external data-science specialists."
      }
    ]
  }
];

export const education: EducationEntry[] = [
  {
    credential: "M.S., Applied Data Science",
    institution: "Bay Path University",
    date: "June 2025",
    detail: "4.0 GPA"
  },
  {
    credential: "B.S., Computer Science",
    institution: "University of Vermont",
    date: "December 2018"
  },
  {
    credential: "Data Science Immersive",
    institution: "General Assembly",
    date: "February–May 2019",
    detail: "Non-degree training program"
  }
];

export const projects: Project[] = [
  {
    id: "fantasy-football",
    title: "Fantasy Football Projection Pipeline",
    summary:
      "Per-position random forests use lagged player features and season-based evaluation, with predictions presented through FastAPI and Next.js.",
    detail:
      "Versioned model artifacts record the model and feature version, season split, population, metric, and causal trailing-mean baseline. Forecast evaluation remains separate from the GMM/PCA draft-tier component.",
    tech: ["Python", "Random forest", "FastAPI", "Next.js", "GMM / PCA"],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    liveUrl: "https://fantasy-football-ai.vercel.app",
    image: "/images/fantasy-football-ai-demo.png",
    featured: true
  },
  {
    id: "sql-genius",
    title: "SQL Genius AI | SQL Analytics Playground",
    summary:
      "A browser-based SQLite playground for synthetic sample data with schema inspection, editable SQL, explicit user-controlled execution, bounded previews, and CSV export.",
    detail:
      "Reviewed-template intent matching and conservative schema fallbacks assist query drafting. Read-only checks narrow what the interface will execute; they are not a general-purpose security or SQL-correctness guarantee.",
    tech: ["TypeScript", "Next.js", "SQLite", "Schema inspection"],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai",
    liveUrl: "https://sql-genius-ai.vercel.app",
    image: "/images/sql-genius-ai-demo.png",
    featured: true
  },
  {
    id: "ai-chatbot",
    title: "AI Chat System | Multi-Provider LLM Gateway",
    summary:
      "A FastAPI and Next.js chat system with SSE streaming, response caching, provider failover, structured errors, and request budgets.",
    detail:
      "Per-request and session telemetry make latency and estimated API cost observable. Semantic-cache support is an implementation capability, not a claim that semantic matching is enabled on every deployment.",
    tech: ["Python", "FastAPI", "Next.js", "SSE", "Caching"],
    githubUrl: "https://github.com/cbratkovics/chatbot-ai-system",
    liveUrl: "https://chatbot-ai-system.vercel.app",
    image: "/images/chatbot-ai-system-demo.png",
    featured: true
  },
  {
    id: "nba-ml",
    title: "NBA Performance Forecasting",
    summary:
      "Player-stat forecasting work with engineered features, time-aware evaluation routines, and a FastAPI presentation layer.",
    detail:
      "The project separates time-aware evaluation routines from the FastAPI presentation layer; no historical traffic or service-reliability metric is attributed to the modeling work.",
    tech: ["Python", "scikit-learn", "FastAPI"],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml",
    featured: false
  },
  {
    id: "document-intelligence",
    title: "Document Retrieval System",
    summary:
      "A document-processing and retrieval codebase covering chunking, keyword and vector retrieval, reranking, and evaluation scaffolding.",
    detail:
      "Implemented pipeline components and evaluation scaffolding are described separately from the optional stages configured in a hosted application.",
    tech: ["Python", "Retrieval", "FastAPI", "Evaluation"],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    featured: false
  }
];

export const skills = {
  "Core analytics engineering": ["Python", "SQL", "Snowflake", "dbt", "Sigma"],
  "Data products and quality": [
    "Dimensional modeling", "ETL / ELT", "Source integration", "Reconciliation",
    "Data testing", "Controlled backfills", "Git"
  ],
  "Modeling and validation": [
    "Random forests", "Regression", "K-means", "Entity resolution",
    "Feature engineering", "Time-aware evaluation", "Baseline comparison"
  ],
  "Applied AI and applications": [
    "FastAPI", "Next.js", "LLM APIs", "Retrieval", "Streaming", "Caching", "Telemetry"
  ],
  "Cloud and delivery": ["AWS", "S3", "Docker", "GitHub Actions", "PostgreSQL"]
};
