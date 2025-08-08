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
    description: "Production-grade ML system with ensemble models for accurate fantasy football predictions",
    heroMetric: "93.1% Prediction Accuracy",
    metrics: [
      { label: "Model Accuracy", value: "93.1%" },
      { label: "API Latency", value: "<100ms" },
      { label: "Cache Hit Rate", value: "85%" },
      { label: "Weekly Predictions", value: "10,000+" }
    ],
    techStack: ["XGBoost", "LightGBM", "FastAPI", "Redis", "PostgreSQL", "Docker", "Python"],
    features: [
      "Ensemble model with XGBoost, LightGBM, and RandomForest",
      "Feature store with 100+ engineered features",
      "Redis caching for sub-100ms response times",
      "Automated weekly model retraining pipeline",
      "A/B testing framework for model comparison"
    ],
    githubUrl: "https://github.com/cbratkovics/fantasy-football-ai",
    architecture: "Microservices with event-driven updates"
  },
  {
    id: "nba-ml",
    title: "NBA ML Platform",
    description: "Real-time sports analytics platform serving millions of predictions with MLOps dashboard",
    heroMetric: "1.2M+ Predictions Served",
    metrics: [
      { label: "Model Accuracy", value: "94.2%" },
      { label: "Predictions Served", value: "1.2M+" },
      { label: "System Uptime", value: "99.99%" },
      { label: "Data Pipeline", value: "Real-time" }
    ],
    techStack: ["TensorFlow", "FastAPI", "React", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    features: [
      "Real-time MLOps dashboard with performance monitoring",
      "Automated drift detection and model retraining",
      "94.2% accuracy on game outcome predictions",
      "Horizontal scaling with Kubernetes",
      "Feature importance visualization with SHAP"
    ],
    githubUrl: "https://github.com/cbratkovics/nba-ml-platform",
    liveUrl: "https://nba-predictions.demo.com",
    performance: {
      before: "5s prediction time",
      after: "80ms prediction time",
      improvement: "98.4% reduction"
    }
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence RAG System",
    description: "Enterprise RAG system with hybrid search and semantic caching for document Q&A",
    heroMetric: "42% Cache Hit Rate",
    metrics: [
      { label: "Cache Hit Rate", value: "42%" },
      { label: "Query Latency", value: "1.2s avg" },
      { label: "Docker Size", value: "402MB" },
      { label: "Accuracy", value: "89%" }
    ],
    techStack: ["LangChain", "ChromaDB", "FastAPI", "Redis", "Docker", "AsyncIO", "Sentence Transformers"],
    features: [
      "Hybrid search combining semantic and keyword matching",
      "Semantic caching reducing LLM calls by 42%",
      "Async processing pipeline for document ingestion",
      "Docker optimization from 3.3GB to 402MB",
      "Multi-format support (PDF, DOCX, TXT, HTML)"
    ],
    githubUrl: "https://github.com/cbratkovics/document-rag",
    performance: {
      before: "3.3GB Docker image",
      after: "402MB Docker image",
      improvement: "88% size reduction"
    }
  },
  {
    id: "sql-genius",
    title: "SQL Genius AI",
    description: "Multi-tenant SaaS platform for natural language to SQL conversion with enterprise features",
    heroMetric: "Multi-tenant SaaS Architecture",
    metrics: [
      { label: "Query Accuracy", value: "91%" },
      { label: "RTO", value: "< 1 hour" },
      { label: "RPO", value: "< 5 minutes" },
      { label: "Tenant Isolation", value: "100%" }
    ],
    techStack: ["OpenAI", "FastAPI", "PostgreSQL", "JWT", "Docker", "Redis", "SQLAlchemy"],
    features: [
      "Multi-tenant architecture with complete data isolation",
      "JWT-based authentication and authorization",
      "Disaster recovery with automated backups",
      "Query optimization and caching layer",
      "Schema inference and validation"
    ],
    githubUrl: "https://github.com/cbratkovics/sql-genius",
    architecture: "Clean Architecture with Repository pattern"
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Platform",
    description: "Production chatbot system with multi-model support and real-time communication",
    heroMetric: "99.9% Uptime",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Response Time", value: "< 200ms" },
      { label: "Concurrent Users", value: "1000+" },
      { label: "Models Supported", value: "5+" }
    ],
    techStack: ["OpenAI", "Anthropic", "FastAPI", "WebSockets", "Redis", "PostgreSQL", "Docker"],
    features: [
      "Multi-model orchestration (GPT-4, Claude, Llama)",
      "WebSocket support for real-time communication",
      "Semantic caching for response optimization",
      "Rate limiting and quota management",
      "Conversation history and analytics"
    ],
    githubUrl: "https://github.com/cbratkovics/ai-chatbot-platform",
    performance: {
      before: "2s average response",
      after: "200ms average response",
      improvement: "90% faster"
    }
  }
];

export const skills = {
  "Machine Learning": ["XGBoost", "LightGBM", "TensorFlow", "PyTorch", "Scikit-learn", "SHAP"],
  "Backend Engineering": ["FastAPI", "Django", "Flask", "AsyncIO", "Celery", "RabbitMQ"],
  "Databases": ["PostgreSQL", "Redis", "MongoDB", "ChromaDB", "Pinecone", "SQLAlchemy"],
  "MLOps": ["Docker", "Kubernetes", "CI/CD", "MLflow", "Weights & Biases", "A/B Testing"],
  "AI/LLM": ["OpenAI", "Anthropic", "LangChain", "Hugging Face", "RAG", "Fine-tuning"],
  "System Design": ["Microservices", "Event-driven", "Clean Architecture", "DDD", "REST", "GraphQL"]
};

export const metrics = {
  modelsDeployed: 15,
  deploymentTime: { from: "Weeks", to: "Hours" },
  accuracyImprovement: 30,
  costSavings: 67,
  predictionsServed: "1.2M+",
  systemUptime: 99.99
};