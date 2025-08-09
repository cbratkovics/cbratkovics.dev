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
    id: "fantasy-football",
    title: "Fantasy Football AI Platform",
    description: "Production-ready ML system with ensemble models achieving 93.1% accuracy",
    heroMetric: "93.1% Prediction Accuracy",
    metrics: [
      { label: "Model Accuracy", value: "93.1%" },
      { label: "API Latency (Cached)", value: "<100ms" },
      { label: "Ensemble Weights", value: "XGB:0.4, LGBM:0.35, RF:0.25" },
      { label: "Features Engineered", value: "50+" }
    ],
    techStack: ["XGBoost", "LightGBM", "FastAPI", "Redis", "PostgreSQL", "Docker", "SQLAlchemy"],
    features: [
      "Ensemble model with optimal weighted voting",
      "Feature store with 50+ engineered features (verifiable in code)",
      "Redis caching achieving <100ms latency for cached requests",
      "Repository pattern supporting microservices migration",
      "Docker optimization from 3.3GB to 1.5GB (54% reduction)"
    ],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    architecture: "Repository pattern with clean architecture"
  },
  {
    id: "nba-ml",
    title: "NBA ML Platform",
    description: "Production-ready sports analytics platform with high-accuracy predictions",
    heroMetric: "R²: 0.942 for Points",
    metrics: [
      { label: "Accuracy (Points)", value: "R²: 0.942" },
      { label: "API Response", value: "P95: 87ms" },
      { label: "ETL Pipeline", value: "169K+ records" },
      { label: "Feature Count", value: "40+" }
    ],
    techStack: ["XGBoost", "FastAPI", "React", "PostgreSQL", "Redis", "Railway", "GitHub Actions"],
    features: [
      "Comprehensive feature engineering (40+ features)",
      "P95 latency of 87ms (documented in README)",
      "ETL pipeline processing 169K+ NBA game records",
      "SHAP-based model explainability",
      "FastAPI backend with async processing"
    ],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml",
    performance: {
      before: "5s prediction time",
      after: "80ms prediction time",
      improvement: "98.4% faster"
    }
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence RAG System",
    description: "Production-ready RAG system with hybrid search and semantic caching",
    heroMetric: "42% Cache Hit Rate",
    metrics: [
      { label: "Cache Hit Rate", value: "42%" },
      { label: "Query Latency", value: "1.2s avg" },
      { label: "Docker Size", value: "402MB" },
      { label: "Accuracy", value: "89%" }
    ],
    techStack: ["LangChain", "ChromaDB", "FastAPI", "Celery", "Redis", "Docker", "OpenAI"],
    features: [
      "Hybrid search (ChromaDB + BM25)",
      "Semantic caching reducing LLM calls by 42% (documented)",
      "Async Celery workers for document processing",
      "Docker optimization: 3.3GB → 402MB (88% reduction)",
      "Support for PDF, TXT, and Markdown formats"
    ],
    githubUrl: "https://github.com/cbratkovics/document-intelligence-ai",
    performance: {
      before: "3.3GB Docker image",
      after: "402MB Docker image",
      improvement: "88% reduction"
    }
  },
  {
    id: "sql-genius",
    title: "Multi-Tenant SQL Intelligence SaaS",
    description: "Production-ready SaaS with natural language SQL generation and tenant isolation",
    heroMetric: "Multi-tenant Architecture",
    metrics: [
      { label: "Query Accuracy", value: "91%" },
      { label: "Tenant Isolation", value: "100%" },
      { label: "Auth Security", value: "JWT + RSA" },
      { label: "Database Pattern", value: "Per-tenant" }
    ],
    techStack: ["FastAPI", "PostgreSQL", "JWT", "Redis", "Docker", "Kubernetes", "SQLAlchemy"],
    features: [
      "Database-per-tenant isolation strategy",
      "JWT auth with RSA key rotation",
      "PostgreSQL with row-level security",
      "Cost tracking per tenant",
      "Row-level security implementation"
    ],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai"
  },
  {
    id: "ai-chatbot",
    title: "Production AI Chatbot Platform",
    description: "Production-ready chatbot platform with multi-model support and WebSockets",
    heroMetric: "<200ms P95 Latency",
    metrics: [
      { label: "P95 Response", value: "<200ms" },
      { label: "Concurrent Users", value: "100+" },
      { label: "API Cost Reduction", value: "30%" },
      { label: "Model Support", value: "3+" }
    ],
    techStack: ["OpenAI", "Anthropic", "FastAPI", "WebSockets", "Redis", "PostgreSQL", "Jaeger"],
    features: [
      "Multi-model support (GPT-4, Claude, Llama)",
      "WebSocket streaming with fallback logic",
      "Semantic caching reducing costs by 30%",
      "Distributed tracing with Jaeger",
      "Saga pattern for distributed transactions"
    ],
    githubUrl: "https://github.com/cbratkovics/ai-chatbot-system",
    performance: {
      before: "2s average response",
      after: "200ms average",
      improvement: "90% faster"
    }
  }
];

export const skills = {
  "ML/AI Engineering": [
    "XGBoost", "LightGBM", "Random Forest",
    "Scikit-learn", "SHAP", "Feature Engineering"
  ],
  "Backend & APIs": [
    "FastAPI", "AsyncIO", "Redis", "PostgreSQL",
    "SQLAlchemy", "Celery", "WebSockets"
  ],
  "MLOps & Infrastructure": [
    "Docker", "CI/CD", "GitHub Actions",
    "Model Versioning", "Performance Monitoring"
  ],
  "AI/LLM Systems": [
    "LangChain", "ChromaDB", "OpenAI", "Anthropic",
    "RAG Systems", "Semantic Search", "Vector DBs"
  ],
  "System Design": [
    "Clean Architecture", "Repository Pattern",
    "Multi-tenant", "JWT Auth", "Caching Strategies"
  ],
  "Data & Tools": [
    "Python", "SQL", "Git", "Railway",
    "Jupyter", "Pandas", "NumPy"
  ]
};

export const metrics = {
  modelsInProduction: "5+",
  avgAccuracy: "93%",
  avgLatency: "<150ms",
  dockerOptimization: "54%",
  weeklyHoursSaved: "20+",
  dataProcessed: "169K+"
};