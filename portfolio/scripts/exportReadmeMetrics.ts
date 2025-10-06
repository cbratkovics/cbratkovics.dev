#!/usr/bin/env tsx
/**
 * Export README Metrics
 *
 * Generates auto-updated metrics block for README.md from metrics.json
 * Excludes prototype projects and unsupported claims like uptime
 */

import fs from 'fs';
import path from 'path';
import type { SiteMetrics, ProjectMetrics, Metric } from '../types/metrics';

const METRICS_PATH = path.join(process.cwd(), 'data', 'metrics.json');
const README_PATH = path.join(process.cwd(), '..', 'README.md');

const BEGIN_MARKER = '<!-- AUTO-GENERATED METRICS:BEGIN -->';
const END_MARKER = '<!-- AUTO-GENERATED METRICS:END -->';

function formatMetricValue(metric: Metric): string {
  if (metric.unit) {
    return `${metric.value}${metric.unit}`;
  }
  return `${metric.value}`;
}

function getStageBadge(stage: string): string {
  const badges: Record<string, string> = {
    'production': '🟢 PRODUCTION',
    'synthetic_benchmark': '🔵 SYNTHETIC',
    'prototype': '🟡 PROTOTYPE'
  };
  return badges[stage] || stage.toUpperCase();
}

function generateMetricsBlock(metrics: SiteMetrics): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('## Verified Production Metrics');
  lines.push('');
  lines.push('> All metrics below are auto-generated from [data/metrics.json](portfolio/data/metrics.json) with GitHub artifacts as evidence.');
  lines.push('> Synthetic benchmarks are clearly labeled. Prototype projects excluded from hero KPIs.');
  lines.push('');

  // Hero KPIs
  lines.push('### Key Performance Indicators');
  lines.push('');

  // Best Accuracy (with definition)
  const accuracyProject = metrics.projects.find(p =>
    p.stage !== 'prototype' && Object.values(p.metrics).some(m => m.key === 'accuracy')
  );
  if (accuracyProject && metrics.hero.bestAccuracy > 0) {
    const accuracyMetric = Object.values(accuracyProject.metrics).find(m => m.key === 'accuracy');
    if (accuracyMetric) {
      const definition = accuracyMetric.note || '';
      const evidenceLink = accuracyMetric.evidence?.[0]?.href || '';
      lines.push(`- **${metrics.hero.bestAccuracy}% Model Accuracy** ${definition ? `(${definition})` : ''} - ${accuracyProject.title} ${evidenceLink ? `[📊 Evidence](${evidenceLink})` : ''}`);
    }
  }

  // Fastest P95
  if (metrics.hero.fastestP95ms > 0) {
    const latencyProject = metrics.projects.find(p =>
      p.stage !== 'prototype' && Object.values(p.metrics).some(m => m.key === 'p95_latency_ms')
    );
    if (latencyProject) {
      const latencyMetric = Object.values(latencyProject.metrics).find(m => m.key === 'p95_latency_ms');
      const evidenceLink = latencyMetric?.evidence?.[0]?.href || '';
      lines.push(`- **${metrics.hero.fastestP95ms}ms P95 Latency** - ${latencyProject.title} ${evidenceLink ? `[📊 Evidence](${evidenceLink})` : ''}`);
    }
  }

  // Docker Reduction
  if (metrics.hero.dockerReductionPct > 0) {
    const dockerProject = metrics.projects.find(p =>
      p.stage !== 'prototype' && Object.values(p.metrics).some(m => m.key === 'docker_reduction')
    );
    if (dockerProject) {
      const dockerMetric = Object.values(dockerProject.metrics).find(m => m.key === 'docker_reduction');
      const evidenceLink = dockerMetric?.evidence?.[0]?.href || '';
      const note = dockerMetric?.note || '';
      lines.push(`- **${metrics.hero.dockerReductionPct}% Docker Reduction** ${note ? `(${note})` : ''} - ${dockerProject.title} ${evidenceLink ? `[📊 Evidence](${evidenceLink})` : ''}`);
    }
  }

  // Projects count
  const nonPrototypeProjects = metrics.projects.filter(p => p.stage !== 'prototype');
  lines.push(`- **${nonPrototypeProjects.length} Production ML Systems** with verified benchmarks`);
  lines.push('');

  // Project Details
  lines.push('### Project Portfolio');
  lines.push('');

  for (const project of metrics.projects) {
    const stageBadge = getStageBadge(project.stage);
    lines.push(`#### ${project.title} ${stageBadge}`);
    lines.push('');
    lines.push(`${project.summary}`);
    lines.push('');

    // Top metrics
    const metricsList = Object.values(project.metrics);
    if (metricsList.length > 0) {
      lines.push('**Key Metrics:**');
      for (const metric of metricsList.slice(0, 3)) {
        const value = formatMetricValue(metric);
        const description = metric.note || metric.key.replace(/_/g, ' ');
        const evidenceLinks = metric.evidence?.map(e => `[${e.label}](${e.href})`).join(', ') || '';
        lines.push(`- ${value} ${description} ${evidenceLinks ? `- ${evidenceLinks}` : ''}`);
      }
      lines.push('');
    }

    lines.push(`**Tech:** ${project.tech.join(', ')}`);
    lines.push('');
    lines.push(`[View on GitHub](https://github.com/${project.repo})`);
    lines.push('');
  }

  // Methodology Note
  lines.push('### Benchmark Methodology');
  lines.push('');
  lines.push('1. **Provenance-First:** Every metric includes its source (GitHub artifact, README, etc.)');
  lines.push('2. **Stage Labels:** Projects are labeled as Production, Synthetic Benchmark, or Prototype');
  lines.push('3. **Evidence Links:** Reproducible metrics link directly to GitHub artifacts');
  lines.push('4. **Honest Reporting:** Missing artifacts = metric hidden or marked as target');
  lines.push('');
  lines.push(`*Last updated: ${new Date(metrics.lastGeneratedISO).toISOString()}*`);
  lines.push('');

  return lines.join('\n');
}

function updateReadme(metricsBlock: string): void {
  if (!fs.existsSync(README_PATH)) {
    console.error(`❌ README.md not found at ${README_PATH}`);
    process.exit(1);
  }

  let readmeContent = fs.readFileSync(README_PATH, 'utf-8');

  // Check if markers exist
  const hasMarkers = readmeContent.includes(BEGIN_MARKER) && readmeContent.includes(END_MARKER);

  if (!hasMarkers) {
    // Add markers at the end
    console.log('⚠️  Markers not found in README.md, appending...');
    readmeContent += `\n\n${BEGIN_MARKER}\n${metricsBlock}${END_MARKER}\n`;
  } else {
    // Replace content between markers
    const beginIndex = readmeContent.indexOf(BEGIN_MARKER);
    const endIndex = readmeContent.indexOf(END_MARKER);

    if (beginIndex === -1 || endIndex === -1 || endIndex <= beginIndex) {
      console.error('❌ Invalid marker positions in README.md');
      process.exit(1);
    }

    readmeContent =
      readmeContent.substring(0, beginIndex + BEGIN_MARKER.length) +
      '\n' +
      metricsBlock +
      readmeContent.substring(endIndex);
  }

  fs.writeFileSync(README_PATH, readmeContent, 'utf-8');
}

function main() {
  console.log('📝 Generating README metrics block...\n');

  // Check if metrics file exists
  if (!fs.existsSync(METRICS_PATH)) {
    console.error(`❌ Metrics file not found at ${METRICS_PATH}`);
    console.error('   Run fetchMetrics.ts first.');
    process.exit(1);
  }

  // Parse metrics
  let metrics: SiteMetrics;
  try {
    const content = fs.readFileSync(METRICS_PATH, 'utf-8');
    metrics = JSON.parse(content);
  } catch (error) {
    console.error(`❌ Failed to parse metrics.json: ${error}`);
    process.exit(1);
  }

  // Generate and update
  const metricsBlock = generateMetricsBlock(metrics);
  updateReadme(metricsBlock);

  console.log(`✅ README.md updated with auto-generated metrics\n`);
}

if (require.main === module) {
  main();
}

export { generateMetricsBlock };
