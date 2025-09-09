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
      { label: "Features Engineered", value: "100+" }
    ],
    techStack: ["XGBoost", "LightGBM", "FastAPI", "Redis", "PostgreSQL", "Docker", "SQLAlchemy"],
    features: [
      "Weighted ensemble (XGBoost 0.4, LightGBM 0.35, RF 0.25) achieving 93.1% accuracy",
      "Feature store with 100+ engineered features (verifiable in code)",
      "Redis caching achieving <100ms latency for cached predictions",
      "Repository pattern supporting clean microservices migration",
      "Docker optimization from 2.6GB to 1.2GB (54% reduction)"
    ],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    architecture: "Repository pattern with clean architecture"
  },
  {
    id: "nba-ml",
    title: "NBA Performance Prediction System",
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
    title: "Enterprise Document Intelligence (RAG) System",
    description: "Production-ready RAG system with hybrid search and semantic caching",
    heroMetric: "P95 <200ms",
    metrics: [
      { label: "Cache Hit Rate", value: "42%" },
      { label: "Query Latency P95", value: "<200ms" },
      { label: "Docker Reduction", value: "88%" },
      { label: "Relevance Boost", value: "+35%" }
    ],
    techStack: ["LangChain", "ChromaDB", "FastAPI", "Celery", "Redis", "Docker", "OpenAI"],
    features: [
      "Hybrid search combining ChromaDB vectors with BM25 keywords",
      "42% semantic cache hit rate reducing LLM calls (verified)",
      "Cross-encoder reranking improving relevance by 35%",
      "Docker optimization: 3.3GB → 402MB (88% reduction)",
      "Async Celery workers for scalable document processing"
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
    title: "SQL Intelligence Platform (Design Phase)",
    description: "Production-ready SaaS with natural language SQL generation and tenant isolation",
    heroMetric: "Enterprise Architecture",
    metrics: [
      { label: "Target Query Gen", value: "<500ms" },
      { label: "Tenant Isolation", value: "Database-per-tenant" },
      { label: "Auth Security", value: "JWT + RSA" },
      { label: "Architecture", value: "Multi-tenant" }
    ],
    techStack: ["FastAPI", "PostgreSQL", "JWT", "Redis", "Docker", "Kubernetes", "SQLAlchemy"],
    features: [
      "Designed for database-per-tenant isolation strategy",
      "JWT authentication with RSA key rotation (implemented)",
      "PostgreSQL with row-level security (design target)",
      "Cost tracking and usage monitoring per tenant (planned)",
      "Target: <500ms P95 SQL generation, 5000+ RPS capacity"
    ],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai"
  },
  {
    id: "ai-chatbot",
    title: "Multi-Tenant AI Chatbot Platform",
    description: "Production-ready chatbot platform with multi-model support and WebSockets",
    heroMetric: "99.58% Availability",
    metrics: [
      { label: "Availability", value: "99.58%" },
      { label: "P95 Response", value: "185ms" },
      { label: "Concurrent Users", value: "120" },
      { label: "Cost Reduction", value: "32.5%" },
      { label: "Failover Time", value: "423ms" }
    ],
    techStack: ["OpenAI", "Anthropic", "FastAPI", "WebSockets", "Redis", "PostgreSQL", "Jaeger"],
    features: [
      "Multi-model orchestration (OpenAI/Anthropic) with automatic failover",
      "WebSocket streaming supporting 120 concurrent connections (verified)",
      "Semantic caching reducing API costs by 32.5% (benchmarked)",
      "99.58% availability with 423ms provider failover",
      "Distributed tracing with Jaeger and comprehensive monitoring"
    ],
    githubUrl: "https://github.com/cbratkovics/ai-chatbot-system",
    performance: {
      before: "2s average response",
      after: "185ms P95 response",
      improvement: "91% faster"
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
  modelsInProduction: "15+",
  avgAccuracy: "90%+",
  avgLatency: "<150ms",
  dockerOptimization: "54-88%",
  weeklyHoursSaved: "20+",
  dataProcessed: "169K+"
};