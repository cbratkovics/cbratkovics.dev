#!/usr/bin/env tsx
/**
 * GitHub Metrics Ingestion Script
 *
 * Fetches verifiable metrics from GitHub repos and normalizes them into metrics.json
 * Runs at build time to auto-ingest latest data from source repos.
 */

import fs from 'fs';
import path from 'path';
import type { SiteMetrics, ProjectMetrics, Metric, EvidenceLink } from '../types/metrics';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_PATH = path.join(process.cwd(), 'data', 'metrics.json');

interface RepoConfig {
  owner: string;
  repo: string;
  title: string;
  stage: 'production' | 'synthetic_benchmark' | 'prototype';
  summary: string;
  caseStudyPath: string;
  tech: string[];
  artifactPaths: string[];
  readmePath?: string;
}

const REPOS: RepoConfig[] = [
  {
    owner: 'cbratkovics',
    repo: 'chatbot-ai-system',
    title: 'Multi-Tenant Chat Platform',
    stage: 'synthetic_benchmark',
    summary: '~186 ms P95, ~73% cache hit, ~70–73% cost reduction with failover across OpenAI/Anthropic',
    caseStudyPath: '/projects/chat-platform',
    tech: ['OpenAI', 'Anthropic', 'FastAPI', 'WebSockets', 'Redis', 'PostgreSQL', 'Jaeger'],
    artifactPaths: [
      'benchmarks/results/benchmark_summary.json',
      'benchmarks/results/cache_metrics_latest.json',
      'benchmarks/load_tests/k6_results.json',
    ],
    readmePath: 'README.md'
  },
  {
    owner: 'cbratkovics',
    repo: 'document-intelligence-ai',
    title: 'Document Intelligence RAG',
    stage: 'synthetic_benchmark',
    summary: 'RAG with 42% semantic cache hit, P95 <200 ms, Docker −88% (3.3 GB → 402 MB)',
    caseStudyPath: '/projects/document-intelligence',
    tech: ['LangChain', 'ChromaDB', 'FastAPI', 'Celery', 'Redis', 'Docker', 'OpenAI'],
    artifactPaths: [
      'docs/metrics.md',
      'eval/retrieval_metrics.json'
    ],
    readmePath: 'README.md'
  },
  {
    owner: 'cbratkovics',
    repo: 'nba-ai-ml',
    title: 'NBA Performance Prediction System',
    stage: 'synthetic_benchmark',
    summary: 'R² 0.942 (points), P95 87 ms, 169K+ records, 40+ features',
    caseStudyPath: '/projects/nba-predictions',
    tech: ['XGBoost', 'FastAPI', 'PostgreSQL', 'Redis', 'MLflow', 'SHAP'],
    artifactPaths: [
      'docs/model_performance.md'
    ],
    readmePath: 'README.md'
  },
  {
    owner: 'cbratkovics',
    repo: 'fantasy-football-ai',
    title: 'Fantasy Football AI',
    stage: 'synthetic_benchmark',
    summary: '93.1% accuracy (±3 pts), <100 ms cached, <200 ms uncached',
    caseStudyPath: '/projects/fantasy-football',
    tech: ['XGBoost', 'LightGBM', 'Neural Networks', 'FastAPI', 'Redis', 'PostgreSQL'],
    artifactPaths: [],
    readmePath: 'README.md'
  },
  {
    owner: 'cbratkovics',
    repo: 'rag-pipeline',
    title: 'RAG Pipeline (Benchmarks)',
    stage: 'synthetic_benchmark',
    summary: 'P99 ~1456 ms, 20.78 RPS, RAGAS metrics with full evaluation',
    caseStudyPath: '/projects/rag-pipeline',
    tech: ['LangChain', 'ChromaDB', 'RAGAS', 'OpenAI'],
    artifactPaths: [
      'results/metrics.json',
      'results/ragas_evaluation.json'
    ],
    readmePath: 'README.md'
  }
];

/**
 * Fetch content from GitHub API
 */
async function fetchGitHubContent(owner: string, repo: string, filePath: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`  ⚠️  File not found: ${filePath}`);
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.encoding === 'base64' && data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }

    return null;
  } catch (error) {
    console.error(`  ❌ Error fetching ${filePath}:`, error);
    return null;
  }
}

/**
 * Fetch commit timestamp for a file
 */
async function fetchLastCommitDate(owner: string, repo: string, filePath: string): Promise<string | undefined> {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&page=1&per_page=1`;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) return undefined;

    const commits = await response.json();
    if (commits && commits.length > 0) {
      return commits[0].commit.committer.date;
    }
  } catch (error) {
    console.error(`  ⚠️  Could not fetch commit date for ${filePath}`);
  }

  return undefined;
}

/**
 * Parse metrics from chatbot-ai-system
 */
function parseChatPlatformMetrics(artifacts: Map<string, string>, readme: string | null, repoUrl: string): Record<string, Metric> {
  const metrics: Record<string, Metric> = {};

  // Try to parse benchmark_summary.json
  const benchmarkSummary = artifacts.get('benchmarks/results/benchmark_summary.json');
  if (benchmarkSummary) {
    try {
      const data = JSON.parse(benchmarkSummary);

      if (data.p95_latency_ms !== undefined) {
        metrics.p95_latency_ms = {
          key: 'p95_latency_ms',
          value: Math.round(data.p95_latency_ms),
          unit: 'ms',
          note: 'local synthetic benchmark',
          evidence: [{ label: 'benchmark_summary.json', href: `${repoUrl}/blob/main/benchmarks/results/benchmark_summary.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }
    } catch (error) {
      console.error('  ⚠️  Could not parse benchmark_summary.json');
    }
  }

  // Try to parse cache_metrics_latest.json
  const cacheMetrics = artifacts.get('benchmarks/results/cache_metrics_latest.json');
  if (cacheMetrics) {
    try {
      const data = JSON.parse(cacheMetrics);

      if (data.cache_hit_rate !== undefined) {
        metrics.cache_hit_rate = {
          key: 'cache_hit_rate',
          value: Math.round(data.cache_hit_rate * 100),
          unit: '%',
          note: 'semantic cache',
          evidence: [{ label: 'cache_metrics_latest.json', href: `${repoUrl}/blob/main/benchmarks/results/cache_metrics_latest.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }

      if (data.cost_reduction !== undefined) {
        metrics.cost_reduction = {
          key: 'cost_reduction',
          value: Math.round(data.cost_reduction * 100),
          unit: '%',
          note: 'API cost savings',
          evidence: [{ label: 'cache_metrics_latest.json', href: `${repoUrl}/blob/main/benchmarks/results/cache_metrics_latest.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }
    } catch (error) {
      console.error('  ⚠️  Could not parse cache_metrics_latest.json');
    }
  }

  // Parse from README if metrics not found in artifacts
  if (readme && Object.keys(metrics).length === 0) {
    // Fallback to README parsing
    const p95Match = readme.match(/P95[:\s]+~?(\d+)\s*ms/i);
    if (p95Match) {
      metrics.p95_latency_ms = {
        key: 'p95_latency_ms',
        value: parseInt(p95Match[1]),
        unit: 'ms',
        note: 'from README',
        evidence: [{ label: 'README.md', href: `${repoUrl}#verified-performance-metrics-local-synthetic-benchmarks` }],
        provenance: 'readme_text',
        reproducible: false
      };
    }

    const cacheHitMatch = readme.match(/cache hit rate[:\s]+~?(\d+)%/i);
    if (cacheHitMatch) {
      metrics.cache_hit_rate = {
        key: 'cache_hit_rate',
        value: parseInt(cacheHitMatch[1]),
        unit: '%',
        note: 'from README',
        evidence: [{ label: 'README.md', href: `${repoUrl}#verified-performance-metrics-local-synthetic-benchmarks` }],
        provenance: 'readme_text',
        reproducible: false
      };
    }
  }

  return metrics;
}

/**
 * Parse metrics from document-intelligence-ai
 */
function parseDocIntelMetrics(artifacts: Map<string, string>, readme: string | null, repoUrl: string): Record<string, Metric> {
  const metrics: Record<string, Metric> = {};

  if (readme) {
    // Parse from README tables and metrics sections
    const cacheHitMatch = readme.match(/cache hit rate[:\s]+(\d+)%/i);
    if (cacheHitMatch) {
      metrics.cache_hit_rate = {
        key: 'cache_hit_rate',
        value: parseInt(cacheHitMatch[1]),
        unit: '%',
        note: 'semantic cache',
        evidence: [{ label: 'README.md', href: `${repoUrl}#key-performance-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const p95Match = readme.match(/P95[:\s]+<\s*(\d+)\s*ms/i);
    if (p95Match) {
      metrics.p95_latency_ms = {
        key: 'p95_latency_ms',
        value: parseInt(p95Match[1]),
        unit: 'ms',
        note: 'query latency',
        evidence: [{ label: 'README.md', href: `${repoUrl}#key-performance-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const dockerMatch = readme.match(/(\d+\.?\d*)\s*GB\s*→\s*(\d+)\s*MB/);
    if (dockerMatch) {
      const beforeGB = parseFloat(dockerMatch[1]);
      const afterMB = parseInt(dockerMatch[2]);
      const reduction = Math.round((1 - afterMB / (beforeGB * 1024)) * 100);

      metrics.docker_reduction = {
        key: 'docker_reduction',
        value: reduction,
        unit: '%',
        note: `${beforeGB}GB → ${afterMB}MB`,
        evidence: [{ label: 'README.md', href: `${repoUrl}#key-performance-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const relevanceMatch = readme.match(/\+(\d+)%\s+relevance/i);
    if (relevanceMatch) {
      metrics.relevance_boost = {
        key: 'relevance_boost',
        value: parseInt(relevanceMatch[1]),
        unit: '%',
        note: 'cross-encoder reranking',
        evidence: [{ label: 'README.md', href: `${repoUrl}#key-performance-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }
  }

  return metrics;
}

/**
 * Parse metrics from nba-ai-ml
 */
function parseNBAMetrics(artifacts: Map<string, string>, readme: string | null, repoUrl: string): Record<string, Metric> {
  const metrics: Record<string, Metric> = {};

  if (readme) {
    const r2PointsMatch = readme.match(/Points.*?R²[:\s]+(\d+\.\d+)/i);
    if (r2PointsMatch) {
      metrics.r2_points = {
        key: 'r2_points',
        value: parseFloat(r2PointsMatch[1]),
        unit: '',
        note: 'points prediction',
        evidence: [{ label: 'README.md', href: `${repoUrl}#model-performance` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const p95Match = readme.match(/P95[:\s]+(\d+)\s*ms/i);
    if (p95Match) {
      metrics.p95_latency_ms = {
        key: 'p95_latency_ms',
        value: parseInt(p95Match[1]),
        unit: 'ms',
        note: 'API latency',
        evidence: [{ label: 'README.md', href: `${repoUrl}#model-performance` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const recordsMatch = readme.match(/(\d+)K\+?\s+(?:game\s+)?records/i);
    if (recordsMatch) {
      metrics.records_processed = {
        key: 'records_processed',
        value: `${recordsMatch[1]}K+`,
        unit: '',
        note: 'ETL pipeline',
        evidence: [{ label: 'README.md', href: `${repoUrl}#model-performance` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const featuresMatch = readme.match(/(\d+)\+?\s+(?:engineered\s+)?features/i);
    if (featuresMatch) {
      metrics.features = {
        key: 'features',
        value: `${featuresMatch[1]}+`,
        unit: '',
        note: 'feature engineering',
        evidence: [{ label: 'README.md', href: `${repoUrl}#model-performance` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }
  }

  return metrics;
}

/**
 * Parse metrics from fantasy-football-ai
 */
function parseFantasyMetrics(artifacts: Map<string, string>, readme: string | null, repoUrl: string): Record<string, Metric> {
  const metrics: Record<string, Metric> = {};

  if (readme) {
    const accuracyMatch = readme.match(/(\d+\.\d+)%\s+accuracy/i);
    if (accuracyMatch) {
      metrics.accuracy = {
        key: 'accuracy',
        value: parseFloat(accuracyMatch[1]),
        unit: '%',
        note: 'within ±3 fantasy points',
        evidence: [{ label: 'README.md', href: `${repoUrl}#verified-production-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const cachedLatencyMatch = readme.match(/<(\d+)\s*ms\s+cached/i);
    if (cachedLatencyMatch) {
      metrics.latency_cached_ms = {
        key: 'latency_cached_ms',
        value: parseInt(cachedLatencyMatch[1]),
        unit: 'ms',
        note: 'cached response',
        evidence: [{ label: 'README.md', href: `${repoUrl}#verified-production-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }

    const featuresMatch = readme.match(/(\d+)\+\s+features/i);
    if (featuresMatch) {
      metrics.features = {
        key: 'features',
        value: `${featuresMatch[1]}+`,
        unit: '',
        note: 'engineered features',
        evidence: [{ label: 'README.md', href: `${repoUrl}#verified-production-metrics` }],
        provenance: 'readme_text',
        reproducible: true
      };
    }
  }

  return metrics;
}

/**
 * Parse metrics from rag-pipeline
 */
function parseRAGPipelineMetrics(artifacts: Map<string, string>, readme: string | null, repoUrl: string): Record<string, Metric> {
  const metrics: Record<string, Metric> = {};

  // Try to parse results/metrics.json
  const metricsJson = artifacts.get('results/metrics.json');
  if (metricsJson) {
    try {
      const data = JSON.parse(metricsJson);

      if (data.p99_latency_ms !== undefined) {
        metrics.p99_latency_ms = {
          key: 'p99_latency_ms',
          value: Math.round(data.p99_latency_ms),
          unit: 'ms',
          note: 'local synthetic',
          evidence: [{ label: 'metrics.json', href: `${repoUrl}/blob/main/results/metrics.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }

      if (data.throughput_rps !== undefined) {
        metrics.throughput_rps = {
          key: 'throughput_rps',
          value: parseFloat(data.throughput_rps.toFixed(2)),
          unit: 'RPS',
          note: 'requests per second',
          evidence: [{ label: 'metrics.json', href: `${repoUrl}/blob/main/results/metrics.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }
    } catch (error) {
      console.error('  ⚠️  Could not parse results/metrics.json');
    }
  }

  // Try to parse RAGAS evaluation
  const ragasJson = artifacts.get('results/ragas_evaluation.json');
  if (ragasJson) {
    try {
      const data = JSON.parse(ragasJson);

      if (data.answer_relevancy !== undefined) {
        metrics.ragas_answer_relevancy = {
          key: 'ragas_answer_relevancy',
          value: parseFloat(data.answer_relevancy.toFixed(3)),
          unit: '',
          note: 'RAGAS metric',
          evidence: [{ label: 'ragas_evaluation.json', href: `${repoUrl}/blob/main/results/ragas_evaluation.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }

      if (data.context_recall !== undefined) {
        metrics.ragas_context_recall = {
          key: 'ragas_context_recall',
          value: parseFloat(data.context_recall.toFixed(3)),
          unit: '',
          note: 'RAGAS metric',
          evidence: [{ label: 'ragas_evaluation.json', href: `${repoUrl}/blob/main/results/ragas_evaluation.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }

      if (data.faithfulness !== undefined) {
        metrics.ragas_faithfulness = {
          key: 'ragas_faithfulness',
          value: parseFloat(data.faithfulness.toFixed(3)),
          unit: '',
          note: 'RAGAS metric',
          evidence: [{ label: 'ragas_evaluation.json', href: `${repoUrl}/blob/main/results/ragas_evaluation.json` }],
          provenance: 'repo_artifact',
          reproducible: true
        };
      }
    } catch (error) {
      console.error('  ⚠️  Could not parse results/ragas_evaluation.json');
    }
  }

  return metrics;
}

/**
 * Main ingestion function
 */
async function ingestMetrics() {
  console.log('🚀 Starting metrics ingestion from GitHub...\n');

  const projects: ProjectMetrics[] = [];

  for (const config of REPOS) {
    console.log(`📦 Processing ${config.owner}/${config.repo}...`);
    const repoUrl = `https://github.com/${config.owner}/${config.repo}`;

    // Fetch artifacts
    const artifacts = new Map<string, string>();
    for (const artifactPath of config.artifactPaths) {
      console.log(`  📄 Fetching ${artifactPath}...`);
      const content = await fetchGitHubContent(config.owner, config.repo, artifactPath);
      if (content) {
        artifacts.set(artifactPath, content);
        console.log(`  ✅ Loaded ${artifactPath}`);
      }
    }

    // Fetch README
    let readme: string | null = null;
    if (config.readmePath) {
      console.log(`  📄 Fetching README...`);
      readme = await fetchGitHubContent(config.owner, config.repo, config.readmePath);
      if (readme) {
        console.log(`  ✅ Loaded README`);
      }
    }

    // Parse metrics based on repo
    let metrics: Record<string, Metric> = {};

    if (config.repo === 'chatbot-ai-system') {
      metrics = parseChatPlatformMetrics(artifacts, readme, repoUrl);
    } else if (config.repo === 'document-intelligence-ai') {
      metrics = parseDocIntelMetrics(artifacts, readme, repoUrl);
    } else if (config.repo === 'nba-ai-ml') {
      metrics = parseNBAMetrics(artifacts, readme, repoUrl);
    } else if (config.repo === 'fantasy-football-ai') {
      metrics = parseFantasyMetrics(artifacts, readme, repoUrl);
    } else if (config.repo === 'rag-pipeline') {
      metrics = parseRAGPipelineMetrics(artifacts, readme, repoUrl);
    }

    console.log(`  📊 Extracted ${Object.keys(metrics).length} metrics`);

    projects.push({
      repo: `${config.owner}/${config.repo}`,
      title: config.title,
      stage: config.stage,
      metrics,
      summary: config.summary,
      caseStudyPath: config.caseStudyPath,
      tech: config.tech
    });

    console.log('');
  }

  // Add internal impact metrics
  const impactBullets: Metric[] = [
    {
      key: 'mape_production',
      value: '<8%',
      unit: '%',
      note: 'OUTFRONT Media production model with drift detection',
      provenance: 'resume_internal',
      reproducible: false,
      evidence: [{ label: 'Internal (employer)', href: '' }]
    },
    {
      key: 'hours_saved_weekly',
      value: '20+',
      unit: 'hours/week',
      note: 'Python ETL automations',
      provenance: 'resume_internal',
      reproducible: false,
      evidence: [{ label: 'Internal (employer)', href: '' }]
    },
    {
      key: 'ensemble_error_reduction',
      value: '~20%',
      unit: '%',
      note: 'Bayesian A/B testing with ensembles',
      provenance: 'resume_internal',
      reproducible: false,
      evidence: [{ label: 'Internal (employer)', href: '' }]
    }
  ];

  // Compute hero KPIs
  const projectsWithEvidence = projects.filter(p =>
    Object.values(p.metrics).some(m => m.reproducible)
  );

  const accuracyMetrics = projects
    .flatMap(p => Object.values(p.metrics))
    .filter(m => m.key === 'accuracy' && typeof m.value === 'number');
  const bestAccuracy = accuracyMetrics.length > 0
    ? Math.max(...accuracyMetrics.map(m => m.value as number))
    : 0;

  const latencyMetrics = projects
    .flatMap(p => Object.values(p.metrics))
    .filter(m => m.key === 'p95_latency_ms' && typeof m.value === 'number');
  const fastestP95ms = latencyMetrics.length > 0
    ? Math.min(...latencyMetrics.map(m => m.value as number))
    : 0;

  const dockerMetrics = projects
    .flatMap(p => Object.values(p.metrics))
    .filter(m => m.key === 'docker_reduction' && typeof m.value === 'number');
  const dockerReductionPct = dockerMetrics.length > 0
    ? Math.max(...dockerMetrics.map(m => m.value as number))
    : 0;

  const siteMetrics: SiteMetrics = {
    hero: {
      projectsCount: projectsWithEvidence.length,
      bestAccuracy,
      fastestP95ms,
      dockerReductionPct
    },
    impactBullets,
    projects,
    lastGeneratedISO: new Date().toISOString()
  };

  // Write to file
  const dataDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(siteMetrics, null, 2), 'utf-8');

  console.log(`✅ Metrics written to ${OUTPUT_PATH}`);
  console.log(`📊 Summary:`);
  console.log(`   - Projects: ${projects.length}`);
  console.log(`   - Projects with evidence: ${projectsWithEvidence.length}`);
  console.log(`   - Best accuracy: ${bestAccuracy}%`);
  console.log(`   - Fastest P95: ${fastestP95ms}ms`);
  console.log(`   - Docker reduction: ${dockerReductionPct}%`);
}

// Run if executed directly
if (require.main === module) {
  ingestMetrics().catch(error => {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  });
}

export { ingestMetrics };
