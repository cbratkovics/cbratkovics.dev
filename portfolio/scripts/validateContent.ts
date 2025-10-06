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
