export type ProjectStatus = "Live demo" | "Demo data" | "Source only";

export interface Project {
  id: string;
  title: string;
  description: string;
  status?: ProjectStatus;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  companion?: {
    lead: string;
    label: string;
    url: string;
  };
}

export interface ExperienceRole {
  id: string;
  title: string;
  focus: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  date: string;
}

export const experience: ExperienceRole[] = [
  {
    id: "senior-data-analyst",
    title: "Senior Data Analyst",
    focus: "Data Science / Analytics Engineering",
    company: "OUTFRONT Media",
    location: "New York, NY",
    period: "April 2022 to Present",
    bullets: [
      "Built and own the production Snowflake and dbt pipeline unifying five advertising sources for revenue and delivery reporting in Sigma, with S3 feed integration, deduplication, and historical backfills",
      "Developed Python churn-risk models and K-means segmentation, delivering risk scores and interpretable customer segments through Snowflake and Sigma to guide retention outreach and growth targeting",
      "Built regression models for inventory utilization and revenue per unit, using cross-market peer clustering to identify performance gaps and support yield-management decisions",
      "Implemented a Python fuzzy-matching workflow comparing external advertiser names against 400,000+ internal records, delivering Snowflake ID mappings with confidence tiers and business-user overrides",
      "Created reusable SQL reconciliation checks with explicit tolerances and record-level diagnostics, producing auditable evidence for data-platform migration",
      "Developed daily programmatic occupancy components in dbt and co-designed a reporting model separating sales activity from shared inventory capacity",
      "Delivered a generative AI application for CFO financial communications, separating verified SQL data from generated narrative with numeric validation and editable previews"
    ]
  },
  {
    id: "bi-data-analyst",
    title: "Business Intelligence Data Analyst",
    focus: "Data Architecture / Data Science",
    company: "OUTFRONT Media",
    location: "New York, NY",
    period: "July 2019 to April 2022",
    bullets: [
      "Automated recurring reporting workflows with Python ETL, saving 20+ hours per week across teams",
      "Designed fact and dimension tables and KPI definitions to support executive dashboards and business reporting",
      "Built automated data-quality checks and anomaly-detection workflows to identify issues in reporting data",
      "Developed predictive-model prototypes to support business analysis and decision-making"
    ]
  }
];

export const education: EducationEntry[] = [
  {
    degree: "Master of Science",
    field: "Applied Data Science",
    institution: "Bay Path University",
    date: "June 2025"
  },
  {
    degree: "Bachelor of Science",
    field: "Computer Science",
    institution: "University of Vermont",
    date: "December 2018"
  }
];

export const projects: Project[] = [
  {
    id: "fantasy-football",
    title: "Win My League (Fantasy Football decision system)",
    status: "Demo data",
    description:
      "A decision-science case study that turns player projections into an explicit lineup and draft policy, with time-split evaluation, Gaussian mixture player tiers, and a policy simulator served through FastAPI and a Next.js front end.",
    tech: ["Python", "SQL", "scikit-learn", "FastAPI", "Next.js", "Docker"],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    liveUrl: "https://fantasy-football-ai.vercel.app",
    image: "/images/fantasy-football-ai-demo.png"
  },
  {
    id: "nba-ml",
    title: "NBA Performance Prediction System",
    status: "Demo data",
    description:
      "Ensemble models for points, rebounds, and assists using engineered player features, with time-based evaluation routines and predictions served through FastAPI.",
    tech: ["Python", "scikit-learn", "XGBoost", "FastAPI", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml",
    liveUrl: "https://nba-ai-ml.vercel.app",
    image: "/images/nba-ai-ml-demo.png"
  },
  {
    id: "sql-genius",
    title: "SQL Intelligence Platform",
    description:
      "A natural-language-to-SQL application using schema inference and schema-aware prompts, with SQL parsing, result previews, and asynchronous query processing.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "Anthropic Claude", "Next.js"],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai",
    liveUrl: "https://sql-genius-ai.vercel.app",
    image: "/images/sql-genius-ai-demo.png"
  },
  {
    id: "ai-chatbot",
    title: "Multi-Tenant AI Chat Platform",
    description:
      "A chat application integrating OpenAI and Anthropic models with server-sent event streaming, semantic caching, and provider failover including timeouts and retry handling.",
    tech: ["Python", "FastAPI", "OpenAI", "Anthropic", "Server-sent events", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/cbratkovics/chatbot-ai-system",
    liveUrl: "https://chatbot-ai-system.vercel.app",
    image: "/images/chatbot-ai-system-demo.png"
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence RAG System",
    status: "Source only",
    description:
      "A document-ingestion system with chunking, hybrid keyword and vector retrieval, and reranking, connected to question-answering workflows through FastAPI.",
    tech: ["Python", "LangChain", "ChromaDB", "BM25", "FastAPI", "Celery", "Redis", "OpenAI"],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    companion: {
      lead: "A companion retrieval pipeline with a RAGAS evaluation harness lives in",
      label: "rag-pipeline",
      url: "https://github.com/cbratkovics/rag-pipeline"
    }
  }
];

export const skills = {
  Core: ["Python", "SQL", "Machine Learning", "Snowflake", "dbt", "Sigma"],
  "Data Engineering": [
    "Dimensional modeling",
    "ETL and ELT",
    "Data quality",
    "Reconciliation",
    "dbt testing",
    "PostgreSQL",
    "Airflow"
  ],
  "Modeling and Analysis": [
    "pandas",
    "NumPy",
    "scikit-learn",
    "XGBoost",
    "LightGBM",
    "Random forest",
    "K-means",
    "Gaussian mixture models",
    "PCA",
    "Feature engineering",
    "Model evaluation",
    "A/B testing analysis"
  ],
  "Cloud and Development": [
    "AWS (S3, EC2, Lambda, Bedrock)",
    "Snowflake Python notebooks",
    "Git",
    "GitHub Actions",
    "Docker"
  ],
  "Applied AI and Applications": [
    "RAG",
    "LangChain",
    "ChromaDB",
    "BM25",
    "OpenAI and Anthropic APIs",
    "FastAPI",
    "Redis",
    "Next.js"
  ]
};
