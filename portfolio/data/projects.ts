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
    description: "Production chat service with semantic caching achieving ~70% cost reduction",
    heroMetric: "~73% Cache Hit Rate",
    metrics: [
      { label: "P95 Latency", value: "~186ms" },
      { label: "Cache Hit Rate", value: "~73%" },
      { label: "Cost Reduction", value: "~70%" },
      { label: "Failover Time", value: "~463ms" }
    ],
    techStack: ["OpenAI", "Anthropic", "FastAPI", "WebSockets", "Redis", "PostgreSQL", "Jaeger"],
    features: [
      "P95 latency ~186ms with ~100 concurrent WebSocket sessions (local synthetic bench)",
      "Semantic cache ~73% hit rate with ~70-73% API cost reduction (verified)",
      "Provider failover ~463ms between OpenAI and Anthropic",
      "Throughput ~250 RPS on developer hardware",
      "99.58% availability in synthetic tests"
    ],
    githubUrl: "https://github.com/cbratkovics/chatbot-ai-system",
    performance: {
      before: "No caching",
      after: "~73% cache hit",
      improvement: "~70% cost reduction"
    }
  },
  {
    id: "document-intelligence",
    title: "Enterprise Document Intelligence (RAG)",
    description: "Hybrid retrieval system with cross-encoder reranking and production metrics",
    heroMetric: "nDCG@10: 0.82",
    metrics: [
      { label: "nDCG@10", value: "0.82" },
      { label: "MRR@10", value: "0.76" },
      { label: "P95 Latency", value: "<200ms" },
      { label: "Cache Hit", value: "42%" }
    ],
    techStack: ["LangChain", "ChromaDB", "FastAPI", "Celery", "Redis", "Docker", "OpenAI"],
    features: [
      "Hybrid retrieval (ChromaDB + BM25) with nDCG@10 0.82, MRR@10 0.76",
      "P95 <200ms with 42% semantic cache hit rate",
      "Docker 3.3GB → 402MB (−88% reduction)",
      "Cross-encoder reranking improving relevance by +35%",
      "Precision@5: 0.84, Recall@10: 0.91 on evaluation sets"
    ],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    performance: {
      before: "3.3GB Docker",
      after: "402MB Docker",
      improvement: "88% reduction"
    }
  },
  {
    id: "fantasy-football",
    title: "Fantasy Football AI Platform",
    description: "Weighted ensemble including neural networks achieving 93.1% accuracy",
    heroMetric: "93.1% Accuracy",
    metrics: [
      { label: "Model Accuracy", value: "93.1%" },
      { label: "Serving Latency", value: "<200ms" },
      { label: "Features", value: "100+" },
      { label: "Cache Hit", value: ">80%" }
    ],
    techStack: ["XGBoost", "LightGBM", "Neural Networks", "FastAPI", "Redis", "PostgreSQL", "Celery"],
    features: [
      "Weighted ensemble (XGBoost, LightGBM, Neural Networks) reaching 93.1% accuracy",
      "Feature store with 100+ engineered features (verifiable in code)",
      "Sub-200ms serving via FastAPI + Redis caching",
      "Celery pipelines for async processing and A/B testing",
      "Docker optimization from 2.6GB to 1.2GB (54% reduction)"
    ],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    architecture: "Repository pattern with clean architecture"
  },
  {
    id: "nba-ml",
    title: "NBA Performance Prediction System",
    description: "ETL pipeline processing 169K+ records with drift detection",
    heroMetric: "R²: 0.942",
    metrics: [
      { label: "Points R²", value: "0.942" },
      { label: "P95 Latency", value: "87ms" },
      { label: "Records", value: "169K+" },
      { label: "Features", value: "40+" }
    ],
    techStack: ["XGBoost", "FastAPI", "PostgreSQL", "Redis", "MLflow", "SHAP"],
    features: [
      "ETL over 169K+ records; R² 0.942/0.887/0.863 for points/rebounds/assists",
      "P95 latency 87ms with Redis caching",
      "Drift detection using KS and Chi-squared tests",
      "A/B testing framework with Bayesian inference",
      "SHAP-based model explainability"
    ],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml",
    performance: {
      before: "5s predictions",
      after: "87ms P95",
      improvement: "98.3% faster"
    }
  },
  {
    id: "sql-genius",
    title: "SQL Intelligence Platform",
    description: "Multi-tenant architecture with natural language SQL (design phase)",
    heroMetric: "Design Targets",
    metrics: [
      { label: "Target Gen", value: "<500ms" },
      { label: "Isolation", value: "Per-tenant DB" },
      { label: "Auth", value: "JWT+RSA" },
      { label: "Target RPS", value: "5000+" }
    ],
    techStack: ["FastAPI", "PostgreSQL", "JWT", "Redis", "Docker", "Kubernetes"],
    features: [
      "Design target: Row-level security with database-per-tenant isolation",
      "JWT authentication with RSA key rotation (implemented)",
      "Target: P95 <500ms SQL generation",
      "Design capacity: 5000+ RPS with horizontal scaling",
      "Planned: Cost tracking and usage monitoring per tenant"
    ],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai"
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