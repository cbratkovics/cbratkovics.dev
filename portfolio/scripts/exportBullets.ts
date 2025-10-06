#!/usr/bin/env tsx
/**
 * Export LinkedIn/Resume Bullets
 *
 * Converts metrics.json into ready-to-use bullet points for LinkedIn and resumes.
 */

import fs from 'fs';
import path from 'path';
import type { SiteMetrics, ProjectMetrics, Metric } from '../types/metrics';

const METRICS_PATH = path.join(process.cwd(), 'data', 'metrics.json');
const LINKEDIN_OUTPUT = path.join(process.cwd(), 'exports', 'linkedin_bullets.md');
const RESUME_OUTPUT = path.join(process.cwd(), 'exports', 'resume_snippets.md');

function formatMetricValue(metric: Metric): string {
  if (metric.unit) {
    return `${metric.value}${metric.unit}`;
  }
  return `${metric.value}`;
}

function generateLinkedInBullets(metrics: SiteMetrics): string[] {
  const bullets: string[] = [];

  bullets.push('# LinkedIn Profile Bullets\n');
  bullets.push('Copy and paste these achievement bullets into your LinkedIn profile.\n');
  bullets.push('---\n');

  for (const project of metrics.projects) {
    bullets.push(`## ${project.title}\n`);

    // Create a compelling bullet from the project's top metrics
    const metricsList = Object.values(project.metrics);

    if (metricsList.length === 0) {
      bullets.push(`- Built ${project.title} with ${project.tech.slice(0, 3).join(', ')}\n`);
      continue;
    }

    // Build a bullet highlighting key metrics
    const metricHighlights = metricsList.slice(0, 3).map(m => {
      const value = formatMetricValue(m);
      const description = m.note || m.key.replace(/_/g, ' ');
      return `${value} ${description}`;
    });

    const evidenceLink = metricsList.find(m => m.evidence && m.evidence.length > 0)?.evidence?.[0];
    const evidenceText = evidenceLink ? ` ([evidence](${evidenceLink.href}))` : '';

    bullets.push(`- Shipped ${project.title}: ${metricHighlights.join(', ')}${evidenceText}\n`);
    bullets.push('');
  }

  bullets.push('## Impact Highlights (Internal)\n');
  for (const impact of metrics.impactBullets) {
    const value = formatMetricValue(impact);
    bullets.push(`- ${impact.note}: ${value} (internal metrics, not publicly reproducible)\n`);
  }

  return bullets;
}

function generateResumeSnippets(metrics: SiteMetrics): string[] {
  const snippets: string[] = [];

  snippets.push('# Resume Snippets\n');
  snippets.push('Copy these concise achievement statements for your resume.\n');
  snippets.push('---\n');

  snippets.push('## Technical Projects\n');

  for (const project of metrics.projects) {
    const metricsList = Object.values(project.metrics);

    if (metricsList.length === 0) continue;

    // Pick the top 2-3 metrics for resume
    const topMetrics = metricsList.slice(0, 2).map(m => {
      return formatMetricValue(m);
    });

    const tech = project.tech.slice(0, 4).join(', ');
    snippets.push(`- **${project.title}:** ${topMetrics.join(', ')} | ${tech}\n`);
  }

  snippets.push('\n## Professional Impact\n');

  for (const impact of metrics.impactBullets) {
    const value = formatMetricValue(impact);
    snippets.push(`- ${impact.note}: ${value}\n`);
  }

  snippets.push('\n## Summary Stats\n');
  snippets.push(`- ${metrics.hero.projectsCount} production ML systems with verified benchmarks\n`);
  if (metrics.hero.bestAccuracy > 0) {
    snippets.push(`- Up to ${metrics.hero.bestAccuracy}% model accuracy\n`);
  }
  if (metrics.hero.fastestP95ms > 0) {
    snippets.push(`- API latency as low as ${metrics.hero.fastestP95ms}ms P95\n`);
  }
  if (metrics.hero.dockerReductionPct > 0) {
    snippets.push(`- Docker optimization up to ${metrics.hero.dockerReductionPct}% reduction\n`);
  }

  return snippets;
}

function main() {
  console.log('📝 Generating LinkedIn and resume bullets...\n');

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

  // Generate outputs
  const linkedInBullets = generateLinkedInBullets(metrics);
  const resumeSnippets = generateResumeSnippets(metrics);

  // Ensure exports directory exists
  const exportsDir = path.dirname(LINKEDIN_OUTPUT);
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  // Write files
  fs.writeFileSync(LINKEDIN_OUTPUT, linkedInBullets.join('\n'), 'utf-8');
  fs.writeFileSync(RESUME_OUTPUT, resumeSnippets.join('\n'), 'utf-8');

  console.log(`✅ LinkedIn bullets written to ${LINKEDIN_OUTPUT}`);
  console.log(`✅ Resume snippets written to ${RESUME_OUTPUT}\n`);
}

if (require.main === module) {
  main();
}

export { generateLinkedInBullets, generateResumeSnippets };
