# Christopher J. Bratkovics | Data & Analytics Portfolio

**Data Scientist | Analytics Engineer | Applied AI**

## Trustworthy data foundations. Clear metrics. Defensible decisions.

I turn fragmented data and ambiguous business questions into reliable reporting, reusable data models, and evidence-backed decision support.

With 7+ years in enterprise analytics, my work connects SQL and Python development, Snowflake/dbt modeling, source reconciliation, applied data science, and practical AI applications. I focus on understanding what a result means, validating how it was produced, and explaining what action the evidence supports.

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

Each project explores a different part of building useful, trustworthy analytical systems.

| Project | Focus and decision question |
| --- | --- |
| [Fantasy Football Data Platform & Decision Lab](https://github.com/cbratkovics/fantasy-football-ai) | **Metric traceability and analytical architecture.** How do predictions, tested dbt/DuckDB facts, and evaluation artifacts remain consistent enough to support a decision? |
| [SQL Genius AI](https://github.com/cbratkovics/sql-genius-ai) | **Inspectable analytics and controlled automation.** How can schema context, editable SQL, and explicit execution keep a generated query open to review? |
| [AI Chat System](https://github.com/cbratkovics/chatbot-ai-system) | **The error cost of automation.** When does semantic response reuse save useful work, and when does it return an answer to the wrong question? |
| [NBA Stat Predictor](https://github.com/cbratkovics/nba-ai-ml) | **Population-aware model evaluation.** Does a favorable result in a restricted cohort justify using the model for the broader decision population? |
| [Document Intelligence](https://github.com/cbratkovics/document-intelligence-ai) | **Visible retrieval evidence.** How can users inspect which retrieval method surfaced a passage and whether its source context supports their question? |

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
