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
    description: "Production ML system with ensemble models achieving 93.1% accuracy",
    heroMetric: "93.1% Prediction Accuracy",
    metrics: [
      { label: "Model Accuracy", value: "93.1%" },
      { label: "API Latency", value: "<100ms" },
      { label: "Ensemble Weights", value: "XGB:0.4, LGBM:0.35, RF:0.25" },
      { label: "Features", value: "50+" }
    ],
    techStack: ["XGBoost", "LightGBM", "FastAPI", "Redis", "PostgreSQL", "Docker", "SQLAlchemy"],
    features: [
      "Ensemble model with optimal weighted voting",
      "Feature store with 50+ engineered features",
      "Redis caching with intelligent TTL strategies",
      "Microservices-ready monolith architecture",
      "Docker optimization from 3.3GB to 1.5GB"
    ],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    architecture: "Event-driven microservices pattern"
  },
  {
    id: "nba-ml",
    title: "NBA ML Platform",
    description: "Production sports analytics serving 1.2M+ predictions with real-time MLOps",
    heroMetric: "1.2M+ Predictions Served",
    metrics: [
      { label: "Accuracy (Points)", value: "R²: 0.942" },
      { label: "System Uptime", value: "99.99%" },
      { label: "API Response", value: "P95: 87ms" },
      { label: "ETL Pipeline", value: "169K+ records" }
    ],
    techStack: ["XGBoost", "FastAPI", "React", "PostgreSQL", "Redis", "Railway", "GitHub Actions"],
    features: [
      "Real-time MLOps dashboard with drift detection",
      "A/B testing with Bayesian inference",
      "Comprehensive feature engineering (40+ features)",
      "Automated retraining pipeline with MLflow",
      "SHAP-based model explainability"
    ],
    githubUrl: "https://github.com/cbratkovics/nba-ai-ml",
    liveUrl: "https://nba-predictions.demo.com",
    performance: {
      before: "5s prediction time",
      after: "80ms prediction time",
      improvement: "98.4% faster"
    }
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence RAG System",
    description: "Enterprise RAG with hybrid search achieving 42% cache hit rate",
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
      "Semantic caching reducing LLM calls by 42%",
      "Async Celery processing pipeline",
      "Docker optimization: 3.3GB → 402MB",
      "SSE streaming for real-time responses"
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
    description: "Enterprise SaaS with natural language SQL generation and tenant isolation",
    heroMetric: "Multi-tenant Architecture",
    metrics: [
      { label: "Query Accuracy", value: "91%" },
      { label: "RTO", value: "< 1 hour" },
      { label: "RPO", value: "< 5 minutes" },
      { label: "Tenant Isolation", value: "100%" }
    ],
    techStack: ["FastAPI", "PostgreSQL", "JWT", "Redis", "Docker", "Kubernetes", "SQLAlchemy"],
    features: [
      "Database-per-tenant isolation strategy",
      "JWT auth with RSA key rotation",
      "Automated backup and disaster recovery",
      "Cost tracking per tenant",
      "Row-level security implementation"
    ],
    githubUrl: "https://github.com/cbratkovics/sql-genius-ai"
  },
  {
    id: "ai-chatbot",
    title: "Production AI Chatbot Platform",
    description: "Multi-model orchestration with 99.9% uptime and real-time WebSockets",
    heroMetric: "99.9% Uptime",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "P95 Response", value: "<200ms" },
      { label: "Concurrent Users", value: "100+" },
      { label: "API Cost Reduction", value: "30%" }
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
    "XGBoost", "LightGBM", "TensorFlow", "PyTorch", 
    "Scikit-learn", "SHAP", "Feature Engineering"
  ],
  "Backend & APIs": [
    "FastAPI", "AsyncIO", "Redis", "PostgreSQL",
    "SQLAlchemy", "Celery", "WebSockets"
  ],
  "MLOps & Infrastructure": [
    "Docker", "CI/CD", "A/B Testing", "MLflow",
    "Model Versioning", "Drift Detection", "Prometheus"
  ],
  "AI/LLM Systems": [
    "LangChain", "ChromaDB", "OpenAI", "Anthropic",
    "RAG Systems", "Semantic Search", "Vector DBs"
  ],
  "System Design": [
    "Microservices", "Clean Architecture", "DDD",
    "Event-driven", "Circuit Breakers", "Multi-tenant"
  ],
  "Cloud & DevOps": [
    "AWS (EC2, S3, Lambda)", "Railway", "Kubernetes",
    "GitHub Actions", "Terraform", "Monitoring"
  ]
};

export const metrics = {
  predictionsServed: "1,200,000+",
  avgLatency: "<100ms",
  modelsInProduction: "15+",
  systemUptime: "99.99%",
  deploymentTime: "Hours",
  costSavings: "67%"
};