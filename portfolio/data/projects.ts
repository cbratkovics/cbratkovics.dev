export interface Project {
  id: string;
  title: string;
  description: string;
  heroMetric: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  architecture?: string;
  performance?: {
    before?: string;
    after?: string;
    improvement?: string;
  };
}

export const projects: Project[] = [
  {
    id: "ai-chatbot",
    title: "Multi-Tenant AI Chat Platform",
    description: "Enterprise-grade AI chatbot platform with multi-provider orchestration (OpenAI, Anthropic) and intelligent cost-aware routing achieving ~70% cost reduction through semantic caching",
    heroMetric: "~73% Cache Hit Rate",
    metrics: [
      { label: "P95 Latency", value: "~186ms" },
      { label: "Cache Hit Rate", value: "~73%" },
      { label: "Cost Reduction", value: "~70-73%" },
      { label: "Concurrent Users", value: "100+ verified" }
    ],
    techStack: ["OpenAI", "Anthropic", "FastAPI", "WebSockets", "Redis", "PostgreSQL", "Jaeger", "Docker", "Kubernetes", "Prometheus", "Grafana", "Next.js"],
    features: [
      "Multi-provider orchestration with intelligent cost-aware routing between OpenAI, Anthropic, and other LLMs",
      "Production-grade multi-tenancy with complete tenant isolation, JWT authentication, and per-tenant quotas",
      "Comprehensive observability stack (Prometheus/Grafana/Jaeger) with distributed tracing and custom SLOs",
      "P95 latency ~186ms with 100+ concurrent WebSocket sessions (verified)",
      "Semantic cache ~73% hit rate with ~70-73% API cost reduction (JSON artifacts)",
      "Provider failover ~463ms between OpenAI and Anthropic",
      "Throughput ~250 RPS on developer hardware (local benchmark)",
      "SLO 99.5%+, achieved 99.58% in synthetic tests"
    ],
    githubUrl: "https://github.com/cbratkovics/chatbot-ai-system",
    liveUrl: "https://chatbot-ai-system.vercel.app",
    performance: {
      before: "No caching",
      after: "~73% cache hit",
      improvement: "~70% cost reduction"
    }
  },
  {
    id: "document-intelligence",
    title: "Enterprise Document Intelligence (RAG)",
    description: "Hybrid retrieval system with verified metrics",
    heroMetric: "P95 <200ms",
    metrics: [
      { label: "Cache Hit Rate", value: "42%" },
      { label: "Query Latency P95", value: "<200ms" },
      { label: "Docker Reduction", value: "88%" },
      { label: "Relevance Boost", value: "+35%" }
    ],
    techStack: ["LangChain", "ChromaDB", "FastAPI", "Celery", "Redis", "Docker", "OpenAI"],
    features: [
      "Hybrid retrieval (ChromaDB + BM25) with P95 <200ms",
      "42% semantic cache hit rate (verified)",
      "Docker 3.3GB → 402MB (−88% reduction)",
      "Cross-encoder reranking improving relevance by +35%",
      "nDCG@10: 0.82, MRR@10: 0.76 on evaluation sets"
    ],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    performance: {
      before: "3.3GB Docker image",
      after: "402MB Docker image",
      improvement: "88% reduction"
    }
  },
  {
    id: "fantasy-football",
    title: "Fantasy Football AI Platform",
    description: "Weighted ensemble achieving 93.1% accuracy",
    heroMetric: "93.1% Accuracy",
    metrics: [
      { label: "Model Accuracy", value: "93.1%" },
      { label: "API Latency", value: "<100ms cached" },
      { label: "Features Engineered", value: "100+" },
      { label: "Ensemble Models", value: "XGB, LGBM, NN" }
    ],
    techStack: ["XGBoost", "LightGBM", "Neural Networks", "FastAPI", "Redis", "PostgreSQL", "Celery"],
    features: [
      "Weighted ensemble (XGBoost, LightGBM, Neural Networks) reaching 93.1% accuracy",
      "Feature store with 100+ engineered features (verifiable in code)",
      "Redis caching achieving <100ms cached, <200ms uncached",
      "Repository pattern supporting microservices migration",
      "Docker optimization from 2.6GB to 1.2GB (54% reduction)"
    ],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    liveUrl: "https://fantasy-football-ai.vercel.app",
    architecture: "Repository pattern with clean architecture"
  },
  {
    id: "nba-ml",
    title: "NBA Performance Prediction System",
    description: "ETL pipeline processing 169K+ records with drift detection",
    heroMetric: "R²: 0.942",
    metrics: [
      { label: "Points R²", value: "0.942" },
      { label: "API P95", value: "87ms" },
      { label: "ETL Records", value: "169K+" },
      { label: "Features", value: "40+" }
    ],
    techStack: ["XGBoost", "FastAPI", "PostgreSQL", "Redis", "MLflow", "SHAP"],
    features: [
      "R² 0.942/0.887/0.863 (pts/reb/ast) on 169K+ records",
      "P95 latency 87ms with Redis caching (verified)",
      "Drift detection using KS and Chi-squared tests",
      "A/B testing framework with Bayesian inference",
      "SHAP-based model explainability"
    ],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml",
    liveUrl: "https://nba-ai-ml.vercel.app",
    performance: {
      before: "Manual analysis",
      after: "87ms P95",
      improvement: "Automated pipeline"
    }
  },
  {
    id: "sql-genius",
    title: "SQL Intelligence Platform",
    description: "Enterprise multi-tenant SaaS with natural language SQL generation",
    heroMetric: "Production SaaS",
    metrics: [
      { label: "Target Latency", value: "<500ms P95" },
      { label: "Architecture", value: "Multi-tenant" },
      { label: "Auth", value: "JWT+RSA" },
      { label: "Deployment", value: "Vercel+Render" }
    ],
    techStack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker", "Kubernetes", "Anthropic Claude", "JWT"],
    features: [
      "Natural language to SQL with Claude 3.5 Sonnet",
      "Database-per-tenant isolation for security",
      "JWT authentication with RSA256 key rotation",
      "Production deployments on Vercel (frontend) and Render (backend)",
      "Prometheus metrics and Grafana dashboards",
      "Multi-factor authentication (TOTP, SMS, email)"
    ],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai",
    liveUrl: "https://sql-genius.vercel.app"
  }
];

export const skills = {
  "Core AI Engineering": [
    "LLM Orchestration (OpenAI/Anthropic)",
    "RAG (ChromaDB + BM25)",
    "Semantic Caching (~73% hit rate)",
    "WebSocket Streaming",
    "Failover Patterns"
  ],
  "MLOps": [
    "FastAPI Serving",
    "CI/CD (GitHub Actions)",
    "Drift Detection (KS/Chi-squared)",
    "MLflow/Monitoring",
    "A/B Testing"
  ],
  "Systems": [
    "Redis", "PostgreSQL",
    "Docker/K8s",
    "Prometheus/Grafana/Jaeger",
    "JWT + RSA Auth"
  ],
  "ML/AI Models": [
    "XGBoost", "LightGBM",
    "Neural Networks",
    "Feature Engineering",
    "SHAP Explainability"
  ],
  "Backend & APIs": [
    "FastAPI", "AsyncIO", "Celery",
    "SQLAlchemy", "WebSockets"
  ],
  "Data & Tools": [
    "Python", "SQL", "Git",
    "Pandas", "NumPy", "Jupyter"
  ]
};

export const metrics = {
  modelsInProduction: "15+",
  avgAccuracy: "90%+",
  avgLatency: "<150ms",
  dockerOptimization: "54-88%",
  weeklyHoursSaved: "20+",
  dataProcessed: "169K+"
};