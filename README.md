# Christopher J. Bratkovics | Analytics Engineering Portfolio

**Analytics Engineer | Data Modeling, Quality & Automation**

## Reliable data. Better decisions.

Analytics Engineer with 7+ years in enterprise analytics, building Snowflake/dbt data models, production pipelines, and business-facing data products. I combine hands-on development with source reconciliation, business-rule validation, and applied data science to turn messy source data into reliable reporting and decision support.

**Core stack:** SQL, dbt, Snowflake, Python, Sigma. **Supporting depth:** Applied Data Science & AI.

[Explore the portfolio](https://cbratkovics.dev) · [Selected professional work](https://cbratkovics.dev/#work) · [Independent projects](https://cbratkovics.dev/#projects)

## How I approach data problems

- **Start with the decision.** Clarify the business question, intended action, relevant population, and metric definitions before choosing an implementation.
- **Build a dependable foundation.** Clean and integrate sources, define the grain of each model, and preserve meaningful business rules.
- **Validate beyond the headline number.** Reconcile populations and calculations, investigate exceptions, and distinguish measured results from assumptions.
- **Automate repeatable work.** Turn recurring preparation, transformation, and validation into maintainable workflows with visible failure conditions.
- **Make the recommendation explicit.** Explain what was found, why it matters, what to do next, and what uncertainty remains.

## Selected professional work

My work at OUTFRONT Media spans reporting modernization, metric design, entity resolution, applied modeling, and AI application delivery. These case studies explain my contribution, consequential decisions, validation, and delivered results.

| Case study | Finding and practical takeaway |
| --- | --- |
| [Five-source reporting modernization](https://cbratkovics.dev/#reporting-modernization) | A common schema does not automatically make sources comparable. Preserve source-specific rules and reconcile aligned populations before interpreting differences. |
| [Daily occupancy without double-counted capacity](https://cbratkovics.dev/#daily-occupancy) | More activity categories do not create more physical capacity. Define the reporting grain and aggregate compatible components before calculating utilization. |
| [Reviewable advertiser mappings](https://cbratkovics.dev/#advertiser-mappings) | Match coverage is not matching accuracy. Retain matching methods and review information, and keep ambiguous identities visible. |
| [Applied modeling for retention and inventory decisions](https://cbratkovics.dev/#applied-modeling) | Risk scores, segments, and peer comparisons answer different questions. Use them to support prioritization without confusing prediction with intervention impact. |
| [Reliable inputs for AI-assisted communications](https://cbratkovics.dev/#operational-ai) | An application failure originated in stale source views. Correct the failing data dependency and validate the restored output rather than masking the issue in the generation layer. |

Professional case studies describe employer work separately from the independent implementations below. Contribution and collaboration boundaries are documented within each case.

## Independent projects

The four featured projects lead with integration, reusable models, data quality, and reconciled reporting. Modeling results provide supporting evidence with their populations and limitations intact.

| Featured project | Engineering focus and supporting evidence |
| --- | --- |
| [EV Charging Data: Unified Schema](https://github.com/cbratkovics/ev-charging-data-unified-schema) | Three public sources in a bronze/silver/gold dbt/DuckDB warehouse with explicit grains, source contracts, reason-coded quarantine, timestamp validation, and reconciled incremental loads. Idle time at full inferred occupancy is an upper bound of 12.4% of Boulder connected time, not measured waiting demand. [Case study](https://cbratkovics.dev/projects/ev-charging-data-unified-schema) · [dbt lineage](https://cbratkovics.github.io/ev-charging-data-unified-schema/) |
| [Entity Resolution: Rules vs. Calibrated Classifier](https://github.com/cbratkovics/entity-resolution) | Python linkage for 482K sampled MusicBrainz release groups against Discogs, with dbt/DuckDB marts reconciling match quality, coverage, and review queues to artifacts. Labelled-test precision increased from 99.46% to 99.93% and review cases fell from 25,076 to 6,016 at differing thresholds and lower recall. [Case study](https://cbratkovics.dev/projects/entity-resolution) · [Methods](https://github.com/cbratkovics/entity-resolution/blob/main/docs/METHODS_CARD.md) |
| [Fantasy Football Data Platform & Decision Lab](https://github.com/cbratkovics/fantasy-football-ai) | SCD2 player history, incremental restatement, contracts, and evaluation marts reconciled to versioned Python artifacts. The implementation at b03b618 has 26 models and 97 data tests, with local DuckDB development and MotherDuck transformation. Frozen per-position random forests reduced 2025 historical out-of-sample MAE by 6.5% versus a causal trailing-mean baseline (4.4909 vs. 4.8046 PPR points; 5,914 player-weeks). |
| [NBA Stat Predictor](https://github.com/cbratkovics/nba-ai-ml) | Locally validated dbt/DuckDB evaluation marts reconcile player-game residuals with versioned replay artifacts. LightGBM improved MAE about 2–3% on the restricted 2025–26 holdout with 10+ observed minutes and both baselines available; the last-10 baseline won across the broader replay population. A completed MotherDuck deployment is not established. |

### Additional work

| Project | Supporting depth |
| --- | --- |
| [SQL Genius AI](https://github.com/cbratkovics/sql-genius-ai) | Inspectable SQL generation and explicit read-only execution against synthetic fixtures. |
| [AI Chat System](https://github.com/cbratkovics/chatbot-ai-system) | Application integration and scoped local evaluation of semantic response reuse, including false-positive costs. |
| [Document Intelligence](https://github.com/cbratkovics/document-intelligence-ai) | Retrieval-only BM25 and dense search with visible component ranks; curated demonstrations are not quality measurements. |

### Explore the football data platform

The football project connects Python predictions and evaluation artifacts with tested dbt/DuckDB facts and reporting marts. Its data-platform view makes the relationship between metric definitions, transformations, validation, and product output inspectable.

[Explore the data platform](https://fantasy-football-ai.vercel.app/data-platform) · [Trace a metric](https://fantasy-football-ai.vercel.app/data-platform#trace) · [Browse dbt documentation](https://cbratkovics.github.io/fantasy-football-ai/)

## Findings, recommendations, and evidence

Case studies connect the decision being addressed to a key finding, its significance, and a practical recommendation.

Measured evaluation results are distinguished from design conclusions and illustrative examples. Technical details provide the relevant implementation, validation, and limitations. Recommendations are scoped to the available evidence rather than presented as guarantees of business impact.

Independent projects link to source code and available evaluation artifacts. Reported performance should be read alongside its population, time window, baseline, model version, and evaluation procedure. Synthetic demonstrations are not operational results, and implemented capabilities are distinct from proposed improvements.

## Website implementation

This repository contains the portfolio website, built with Next.js App Router and TypeScript. The data pipelines, models, and applications presented in the portfolio live in their respective project repositories.

The website uses centralized, typed content to keep project descriptions, findings, recommendations, and evidence references consistent.

| Location | Purpose |
| --- | --- |
| [`portfolio/app/`](portfolio/app/) | Page composition, metadata, and global styles |
| [`portfolio/components/`](portfolio/components/) | Portfolio sections, case-study presentation, and navigation |
| [`portfolio/data/projects.ts`](portfolio/data/projects.ts) | Professional experience, project narratives, findings, recommendations, and evidence |
| [`portfolio/tests/`](portfolio/tests/) | Content contracts and production-server checks |
| [`portfolio/README.md`](portfolio/README.md) | Requirements, local development, repository structure, and quality commands |

See the [application documentation](portfolio/README.md) to run the site locally or review its validation workflow.

## Connect

[LinkedIn](https://www.linkedin.com/in/cbratkovics/) · [GitHub](https://github.com/cbratkovics)
