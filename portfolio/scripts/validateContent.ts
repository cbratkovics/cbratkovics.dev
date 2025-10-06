#!/usr/bin/env tsx
/**
 * Content Validation Script
 *
 * Ensures metrics.json meets honesty and reproducibility requirements.
 * Fails CI if validation errors are found.
 */

import fs from 'fs';
import path from 'path';
import type { SiteMetrics } from '../types/metrics';

const METRICS_PATH = path.join(process.cwd(), 'data', 'metrics.json');

interface ValidationError {
  severity: 'error' | 'warning';
  message: string;
}

function validateMetrics(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if metrics file exists
  if (!fs.existsSync(METRICS_PATH)) {
    errors.push({
      severity: 'error',
      message: `Metrics file not found at ${METRICS_PATH}. Run fetchMetrics.ts first.`
    });
    return errors;
  }

  // Parse metrics
  let metrics: SiteMetrics;
  try {
    const content = fs.readFileSync(METRICS_PATH, 'utf-8');
    metrics = JSON.parse(content);
  } catch (error) {
    errors.push({
      severity: 'error',
      message: `Failed to parse metrics.json: ${error}`
    });
    return errors;
  }

  // Validate hero KPIs are not zero when data exists
  if (metrics.hero.projectsCount === 0 && metrics.projects.length > 0) {
    errors.push({
      severity: 'error',
      message: 'Hero KPI projectsCount is 0, but projects exist in metrics'
    });
  }

  if (metrics.hero.bestAccuracy === 0) {
    const hasAccuracy = metrics.projects.some(p =>
      Object.values(p.metrics).some(m => m.key === 'accuracy')
    );
    if (hasAccuracy) {
      errors.push({
        severity: 'error',
        message: 'Hero KPI bestAccuracy is 0, but accuracy metrics exist in projects'
      });
    }
  }

  if (metrics.hero.fastestP95ms === 0) {
    const hasLatency = metrics.projects.some(p =>
      Object.values(p.metrics).some(m => m.key === 'p95_latency_ms')
    );
    if (hasLatency) {
      errors.push({
        severity: 'error',
        message: 'Hero KPI fastestP95ms is 0, but latency metrics exist in projects'
      });
    }
  }

  if (metrics.hero.dockerReductionPct === 0) {
    const hasDocker = metrics.projects.some(p =>
      Object.values(p.metrics).some(m => m.key === 'docker_reduction')
    );
    if (hasDocker) {
      errors.push({
        severity: 'error',
        message: 'Hero KPI dockerReductionPct is 0, but docker reduction metrics exist in projects'
      });
    }
  }

  // Validate each project
  for (const project of metrics.projects) {
    const projectMetrics = Object.values(project.metrics);

    // Check that each metric has required fields
    for (const metric of projectMetrics) {
      if (!metric.key) {
        errors.push({
          severity: 'error',
          message: `Project ${project.repo}: Metric missing 'key' field`
        });
      }

      if (metric.value === undefined || metric.value === null) {
        errors.push({
          severity: 'error',
          message: `Project ${project.repo}: Metric '${metric.key}' missing 'value' field`
        });
      }

      if (!metric.provenance) {
        errors.push({
          severity: 'error',
          message: `Project ${project.repo}: Metric '${metric.key}' missing 'provenance' field`
        });
      }

      if (metric.reproducible === undefined) {
        errors.push({
          severity: 'error',
          message: `Project ${project.repo}: Metric '${metric.key}' missing 'reproducible' field`
        });
      }

      // Production claims must be reproducible
      if (project.stage === 'production' && !metric.reproducible) {
        errors.push({
          severity: 'error',
          message: `Project ${project.repo}: Metric '${metric.key}' is labeled 'production' but reproducible=false`
        });
      }

      // Warn if no evidence links
      if (metric.reproducible && (!metric.evidence || metric.evidence.length === 0)) {
        errors.push({
          severity: 'warning',
          message: `Project ${project.repo}: Metric '${metric.key}' is reproducible but has no evidence links`
        });
      }
    }

    // Warn if project has no metrics
    if (projectMetrics.length === 0) {
      errors.push({
        severity: 'warning',
        message: `Project ${project.repo}: No metrics found`
      });
    }
  }

  // Validate internal metrics
  for (const metric of metrics.impactBullets) {
    if (metric.provenance !== 'resume_internal') {
      errors.push({
        severity: 'error',
        message: `Impact bullet '${metric.key}': Expected provenance='resume_internal', got '${metric.provenance}'`
      });
    }

    if (metric.reproducible === true) {
      errors.push({
        severity: 'error',
        message: `Impact bullet '${metric.key}': Internal metrics should have reproducible=false`
      });
    }
  }

  // ADDITIONAL GUARDRAILS

  // Fantasy accuracy must include definition
  const fantasyProject = metrics.projects.find(p => p.title.toLowerCase().includes('fantasy'));
  if (fantasyProject) {
    const accuracyMetric = Object.values(fantasyProject.metrics).find(m => m.key === 'accuracy');
    if (accuracyMetric && !accuracyMetric.note?.includes('±3')) {
      errors.push({
        severity: 'error',
        message: `Fantasy Football accuracy metric must include "±3 fantasy points" definition in note field`
      });
    }
  }

  // Chat project must be labeled as synthetic
  const chatProject = metrics.projects.find(p => p.title.toLowerCase().includes('chat'));
  if (chatProject && chatProject.stage !== 'synthetic_benchmark') {
    errors.push({
      severity: 'error',
      message: `Chat platform must have stage='synthetic_benchmark', found '${chatProject.stage}'`
    });
  }

  // Validate no PII patterns (basic check)
  const jsonStr = JSON.stringify(metrics);
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phonePattern = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;

  if (emailPattern.test(jsonStr)) {
    errors.push({
      severity: 'error',
      message: 'Potential email address found in metrics.json - remove all PII'
    });
  }

  if (phonePattern.test(jsonStr)) {
    errors.push({
      severity: 'error',
      message: 'Potential phone number found in metrics.json - remove all PII'
    });
  }

  // Check for uptime claims without public status page
  if (jsonStr.toLowerCase().includes('uptime') || /99\.[0-9]%/.test(jsonStr)) {
    const hasStatusPageLink = jsonStr.includes('status.') || jsonStr.includes('uptime.io');
    if (!hasStatusPageLink) {
      errors.push({
        severity: 'error',
        message: 'Uptime claims found without public status page link - remove or add status dashboard URL'
      });
    }
  }

  return errors;
}

function main() {
  console.log('🔍 Validating metrics.json...\n');

  const errors = validateMetrics();

  // Group by severity
  const criticalErrors = errors.filter(e => e.severity === 'error');
  const warnings = errors.filter(e => e.severity === 'warning');

  // Print warnings
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:\n');
    warnings.forEach(w => console.log(`   - ${w.message}`));
    console.log('');
  }

  // Print errors
  if (criticalErrors.length > 0) {
    console.log('❌ Validation Errors:\n');
    criticalErrors.forEach(e => console.log(`   - ${e.message}`));
    console.log('');
    console.log('💡 Fix these errors before deploying.\n');
    process.exit(1);
  }

  console.log('✅ All validations passed!\n');
  process.exit(0);
}

if (require.main === module) {
  main();
}

export { validateMetrics };
