# Christopher J. Bratkovics

## Data Scientist → AI Engineer | Building Production ML Systems

[Portfolio](https://cbratkovics.dev) | [LinkedIn](https://www.linkedin.com/in/cbratkovics/) | [GitHub](https://github.com/cbratkovics)

---

## About Me

I bridge advanced analytics and reliable engineering to transform experimental AI into production systems that deliver real business value. From deploying ML models and RAG architectures to building low-latency inference pipelines, I thrive at the intersection of cutting-edge AI capabilities and practical engineering constraints. My mission: ensure ML solutions are not just accurate in notebooks, but scalable, monitored, and impactful once deployed. The rapid evolution in generative AI energizes me, pushing boundaries while maintaining the discipline needed for production systems.

---

## Technical Portfolio

### Production ML Systems

#### Document Intelligence RAG System
*Enterprise RAG implementation with hybrid search and async processing*

**Architecture Highlights:**
- Document processing pipeline supporting PDF, TXT, Markdown formats
- Hybrid search combining vector similarity (ChromaDB) with BM25 keyword matching
- Asynchronous document processing with Celery task queue
- Streaming response support for real-time interactions
- Cache hit rate improvement of 42% through optimization
- Docker optimization from 3.3GB to 402MB (88% reduction)

**Engineering Decisions:**
- Implemented chunking strategies preserving semantic boundaries
- Used factory pattern for multiple embedding model support
- Applied circuit breaker pattern for external API resilience
- Structured with clean architecture (ports and adapters)

**Technical Stack:** LangChain, ChromaDB, FastAPI, Celery, Redis, OpenAI APIs

[GitHub](https://github.com/cbratkovics/document-intelligence-ai)

---

#### Multi-Tenant SQL Intelligence Platform
*Enterprise platform with natural language SQL generation*

**Architecture Highlights:**
- Multi-tenant architecture with database-per-tenant isolation
- JWT authentication with RSA key rotation
- Cost tracking and usage monitoring per tenant
- Natural language to SQL conversion with context awareness
- Automated query optimization and caching

**Engineering Decisions:**
- Implemented tenant context injection via middleware
- Used event sourcing for audit logging
- Applied CQRS pattern for read/write separation
- Structured with domain-driven design principles

**Security & Performance:**
- Input validation against SQL injection
- Row-level security in PostgreSQL
- Query result caching with Redis
- <200ms average query generation time

**Technical Stack:** FastAPI, PostgreSQL, JWT, Redis, Docker, SQLAlchemy

[GitHub](https://github.com/cbratkovics/sql-genius-ai)

---

#### Multi-Tenant AI Chat Platform
*Production chat system with 99.5% uptime and <200ms latency*

**Architecture Highlights:**
- Multi-model integration (OpenAI, Anthropic) with failover logic
- WebSocket implementation handling 100+ concurrent connections
- Semantic caching reducing API costs by 30%
- Distributed tracing for observability
- Auto-scaling based on request patterns

**Engineering Decisions:**
- Implemented adapter pattern for LLM provider abstraction
- Used strategy pattern for model selection logic
- Applied saga pattern for distributed transactions
- Built with hexagonal architecture principles

**Technical Stack:** FastAPI, WebSockets, Redis, PostgreSQL, OpenAI/Anthropic APIs

[GitHub](https://github.com/cbratkovics/chatbot-ai-system)

---

### Data Science & Analytics Projects

#### Fantasy Football AI Platform
*93.1% prediction accuracy through ensemble ML with production API*

**Architecture Highlights:**
- Ensemble model combining XGBoost (0.4 weight), LightGBM (0.35), Random Forest (0.25)
- 93.1% accuracy (predictions within 3 fantasy points)
- FastAPI backend with <100ms cached response time
- Redis caching layer with intelligent TTL strategies
- Docker optimization from 2.4GB to 1.1GB (54% reduction)

**Engineering Decisions:**
- Implemented feature store with 40+ engineered features
- Used repository pattern for data access layer abstraction
- Applied dependency injection for testable components
- Structured as microservices-ready monolith for future scaling

**Technical Stack:** Python, FastAPI, Redis, PostgreSQL, Docker, XGBoost, LightGBM

[GitHub](https://github.com/cbratkovics/fantasy-football-ai)

---

#### NBA Performance Prediction System
*End-to-end ML pipeline processing 169K+ game records*

**Model Performance:**
- R² scores: Points (0.942), Rebounds (0.887), Assists (0.863)
- P95 API latency: 87ms
- ETL pipeline processing 169K+ game records
- 40+ engineered features with temporal analysis

**Production Features:**
- Drift detection with KS and Chi-squared tests
- Automated retraining pipeline with MLflow
- A/B testing framework with Bayesian inference
- SHAP-based model explainability

**Technical Stack:** Python, Scikit-learn, XGBoost, FastAPI, PostgreSQL, MLflow

[GitHub](https://github.com/cbratkovics/nba-ai-ml)

---

<!-- AUTO-GENERATED METRICS:BEGIN -->

## Verified Production Metrics

> All metrics below are auto-generated from [data/metrics.json](portfolio/data/metrics.json) with GitHub artifacts as evidence.
> Synthetic benchmarks are clearly labeled. Prototype projects excluded from hero KPIs.

### Key Performance Indicators

- **93.1% Model Accuracy** (within ±3 fantasy points) - Fantasy Football AI [📊 Evidence](https://github.com/cbratkovics/fantasy-football-ai#verified-production-metrics)
- **87ms P95 Latency** - NBA Performance Prediction System [📊 Evidence](https://github.com/cbratkovics/nba-ai-ml#model-performance)
- **88% Docker Reduction** (3.3GB → 402MB) - Document Intelligence RAG [📊 Evidence](https://github.com/cbratkovics/document-intelligence-ai#key-performance-metrics)
- **5 Production ML Systems** with verified benchmarks

### Project Portfolio

#### Multi-Tenant Chat Platform 🔵 SYNTHETIC

~186 ms P95, ~73% cache hit, ~70–73% cost reduction with failover across OpenAI/Anthropic

**Key Metrics:**
- 73% semantic cache - [cache_metrics_latest.json](https://github.com/cbratkovics/chatbot-ai-system/blob/main/benchmarks/results/cache_metrics_latest.json)

**Tech:** OpenAI, Anthropic, FastAPI, WebSockets, Redis, PostgreSQL, Jaeger

[View on GitHub](https://github.com/cbratkovics/chatbot-ai-system)

#### Document Intelligence RAG 🔵 SYNTHETIC

RAG with 42% semantic cache hit, P95 <200 ms, Docker −88% (3.3 GB → 402 MB)

**Key Metrics:**
- 88% 3.3GB → 402MB - [README.md](https://github.com/cbratkovics/document-intelligence-ai#key-performance-metrics)
- 35% cross-encoder reranking - [README.md](https://github.com/cbratkovics/document-intelligence-ai#key-performance-metrics)

**Tech:** LangChain, ChromaDB, FastAPI, Celery, Redis, Docker, OpenAI

[View on GitHub](https://github.com/cbratkovics/document-intelligence-ai)

#### NBA Performance Prediction System 🔵 SYNTHETIC

R² 0.942 (points), P95 87 ms, 169K+ records, 40+ features

**Key Metrics:**
- 87ms API latency - [README.md](https://github.com/cbratkovics/nba-ai-ml#model-performance)
- 169K+ ETL pipeline - [README.md](https://github.com/cbratkovics/nba-ai-ml#model-performance)
- 40+ feature engineering - [README.md](https://github.com/cbratkovics/nba-ai-ml#model-performance)

**Tech:** XGBoost, FastAPI, PostgreSQL, Redis, MLflow, SHAP

[View on GitHub](https://github.com/cbratkovics/nba-ai-ml)

#### Fantasy Football AI 🔵 SYNTHETIC

93.1% accuracy (±3 pts), <100 ms cached, <200 ms uncached

**Key Metrics:**
- 93.1% within ±3 fantasy points - [README.md](https://github.com/cbratkovics/fantasy-football-ai#verified-production-metrics)
- 100+ engineered features - [README.md](https://github.com/cbratkovics/fantasy-football-ai#verified-production-metrics)

**Tech:** XGBoost, LightGBM, Neural Networks, FastAPI, Redis, PostgreSQL

[View on GitHub](https://github.com/cbratkovics/fantasy-football-ai)

#### RAG Pipeline (Benchmarks) 🔵 SYNTHETIC

P99 ~1456 ms, 20.78 RPS, RAGAS metrics with full evaluation

**Tech:** LangChain, ChromaDB, RAGAS, OpenAI

[View on GitHub](https://github.com/cbratkovics/rag-pipeline)

### Benchmark Methodology

1. **Provenance-First:** Every metric includes its source (GitHub artifact, README, etc.)
2. **Stage Labels:** Projects are labeled as Production, Synthetic Benchmark, or Prototype
3. **Evidence Links:** Reproducible metrics link directly to GitHub artifacts
4. **Honest Reporting:** Missing artifacts = metric hidden or marked as target

*Last updated: 2025-10-06T23:53:27.410Z*
<!-- AUTO-GENERATED METRICS:END -->

---

## Technical Skills

### Core Competencies
- **ML/AI:** XGBoost, LightGBM, TensorFlow, PyTorch, Scikit-learn
- **LLM/RAG:** LangChain, ChromaDB, OpenAI/Anthropic APIs, Vector Databases
- **Backend:** FastAPI, Flask, AsyncIO, WebSockets, REST APIs
- **Infrastructure:** Docker, Redis, PostgreSQL, CI/CD, GitHub Actions
- **MLOps:** Model versioning, A/B testing, drift detection, monitoring

### Architecture Patterns
- Clean Architecture, Domain-Driven Design
- Repository, Factory, Strategy, Adapter patterns
- Event-driven architecture, CQRS
- Microservices-ready monolith design

---

## Professional Experience

**Data Scientist** | Current Role (April 2024 - Present)
- Developed and deployed predictive models to production
- Integrated ML solutions with engineering teams on MLOps workflows
- Validated product initiatives through rigorous A/B testing
- Enhanced workflows with Generative AI implementation
- Saved 20+ hours weekly through Python ETL automation

**Senior Data Analyst** | (April 2021 - April 2024)
- Led data initiatives using advanced analytics and predictive modeling
- Evaluated product performance through A/B testing and experimentation
- Identified business opportunities analyzing large-scale datasets
- Partnered with Product and Engineering teams for data integration
- Built early-stage ML models that became production AI systems

---

## What Sets Me Apart

**Production Focus:** Every project is built deployment-first with proper error handling, monitoring, and scaling considerations.

**Full-Stack ML:** I bridge model development and production systems, understanding both the mathematics and the engineering.

**Proven Impact:** Demonstrable improvements in accuracy, latency, and operational efficiency across all projects.

---

## Currently Exploring

- Advanced Kubernetes orchestration for ML workloads
- Feature stores (Feast) for production ML
- Real-time ML with streaming architectures
- Model optimization (quantization, distillation, pruning)

---

## Let's Connect

I'm passionate about transforming ML research into production systems that deliver real business value. If you're looking for someone who can both build models and deploy them reliably at scale, let's talk.

**Portfolio:** [cbratkovics.dev](https://cbratkovics.dev)
**LinkedIn:** [linkedin.com/in/cbratkovics](https://www.linkedin.com/in/cbratkovics/)
**GitHub:** [github.com/cbratkovics](https://github.com/cbratkovics)
