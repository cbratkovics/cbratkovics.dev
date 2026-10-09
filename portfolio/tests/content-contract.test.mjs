import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { scanText, suspiciousDocumentName } from "../scripts/publication-content-check.mjs";

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.filter((entry) => !["node_modules", ".next", ".git"].includes(entry.name)).map(async (entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(item) : [item];
  }))).flat();
}
const read = (relative) => readFile(new URL(relative, import.meta.url), "utf8");
const content = await read("../data/projects.ts");
const hero = await read("../components/MinimalHero.tsx");
const config = await read("../config/site.ts");
const contact = await read("../components/Contact.tsx");
const layout = await read("../app/layout.tsx");
const navigation = await read("../components/Navigation.tsx");

const page = await read("../app/page.tsx");
const storiesComponent = await read("../components/WorkStories.tsx");
const projectsComponent = await read("../components/Projects.tsx");
const sliceBetween = (start, end) => content.slice(content.indexOf(start), content.indexOf(end));
const senior = sliceBetween('id: "senior-data-analyst"', 'id: "bi-data-analyst"');
const bi = sliceBetween('id: "bi-data-analyst"', "export const education");
const prohibitedChannels = /(?:mailto:|tel:|\bemail\b\s*[:=]|contact\s*form|booking\s+link)/i;

function ordered(haystack, terms) {
  const positions = terms.map((term) => haystack.indexOf(term));
  assert.ok(positions.every((position) => position >= 0), `missing ordered term: ${terms[positions.indexOf(-1)]}`);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
}

test("identity and exactly two approved employer roles remain canonical", () => {
  assert.match(content, /name: "Christopher J\. Bratkovics"/);
  assert.match(content, /role: "Analytics Engineer"/);
  assert.match(content, /headline: "Analytics Engineer \| Data Modeling, Quality & Automation"/);
  assert.match(content, /eyebrow: "7\+ years in enterprise analytics"/);
  assert.match(hero, /identity\.(?:name|headline|summary|eyebrow)/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
  assert.match(senior, /Senior Data Analyst \/ Analytics Engineer[\s\S]*April 2022–Present/);
  assert.match(bi, /Business Intelligence Data Analyst[\s\S]*July 2019–April 2022/);
});

test("senior role has seven approved ordered accomplishment areas", () => {
  assert.equal((senior.match(/\{ label:/g) ?? []).length, 7);
  ordered(senior, ["Production data foundation", "Reporting migration", "Daily occupancy modeling", "Inventory modeling & peer analysis", "Retention & segmentation", "Generative AI delivery", "Cross-functional delivery"]);
  for (const term of ["five advertising platforms", "layered source transformations", "daily programmatic occupancy", "regression models", "churn-risk models", "K-means", "editable executive financial communications", "user acceptance testing"]) assert.ok(senior.includes(term));
  assert.doesNotMatch(senior, /entity-resolution|Advertiser entity resolution|fuzzy matching/);
});

test("BI role has five distinct ordered accomplishments and owns entity resolution", () => {
  assert.equal((bi.match(/\{ label:/g) ?? []).length, 5);
  ordered(bi, ["Python ETL & automation", "Dimensional modeling & KPIs", "Advertiser entity resolution", "Applied machine learning", "Production release coordination"]);
  for (const term of ["repeatable extraction, transformation, and reporting workflows", "fact and dimension tables", "exact and fuzzy matching", "exceptions for human review", "with external data-science specialists", "release sequencing", "phased rollout"]) assert.ok(bi.includes(term));
});

test("education is accurate, ordered, and separate from employment", () => {
  ordered(content, ["M.S., Applied Data Science", "June 2025", "B.S., Computer Science", "December 2018", "Data Science Immersive"]);
  assert.match(content, /Non-degree training program/);
  assert.doesNotMatch(content, /GPA/);
});

test("project structure, repositories, and capability boundaries remain scoped", () => {
  // Tier contract (matches the resume's Selected Independent Projects lineup): EV Charging is the
  // flagship; Fantasy Football and NBA are featured; SQL Genius, AI Chat, and Document Intelligence
  // are additional work.
  assert.equal((content.match(/featured: true/g) ?? []).length, 4);
  assert.equal((content.match(/featured: false/g) ?? []).length, 3);
  ordered(content, ["EV Charging Data: Unified Schema", "Entity Resolution: Rules vs. Calibrated Classifier", "Fantasy Football Data Platform & Decision Lab", "NBA Stat Predictor", "SQL Genius AI | SQL Analytics Playground", "AI Chat System | Multi-Provider LLM Gateway", "Document Intelligence | Hybrid Retrieval With Visible Evidence"]);
  for (const repo of ["ev-charging-data-unified-schema", "entity-resolution", "fantasy-football-ai", "sql-genius-ai", "chatbot-ai-system", "nba-ai-ml", "document-intelligence-ai"]) assert.match(content, new RegExp(`github\\.com/cbratkovics/${repo}`));
  assert.match(content, /maintained demo defaults to local reviewed-intent\/template generation[\s\S]*legacy Python\/FastAPI Anthropic route remains optional/);
  assert.match(content, /in-memory cache with configured embeddings[\s\S]*not a production SLA[\s\S]*Redis-backed benchmark/);
});

test("football evidence keeps metric context and commit meanings distinct", () => {
  assert.match(content, /value: 4\.4909[\s\S]*value: 4\.8046/);
  assert.match(content, /5,914 player-weeks[\s\S]*2025 season[\s\S]*Historical out-of-sample season evaluation of a frozen artifact/);
  assert.match(content, /sourceArtifact: "eval-20260911-20260911-asof_v1-d333de20-rf-oos2025\.json"/);
  assert.match(content, /sourceUrl: "https:\/\/github\.com\/cbratkovics\/fantasy-football-ai\/blob\/df3e7e6dbae3446da15535176d1dee9f4f045433\/artifacts\/eval\/eval-20260911-20260911-asof_v1-d333de20-rf-oos2025\.json"/);
  assert.match(content, /verifiedOn: "2026-09-12"/);
  assert.match(content, /modelVersion: "20260911-asof_v1-d333de20"/);
  assert.match(content, /artifactCommit: "df3e7e6dbae3446da15535176d1dee9f4f045433"/);
  assert.match(content, /evaluationCodeCommit: "8e22a47cfc99ba85861cccbe63732da42feb27ab"/);
  assert.match(content, /artifactBlobSha: "80fff5584a9ed50c6d895bd99232100c9b1bd77a"/);
  assert.match(content, /relativeReduction\(footballEvaluation\)\.toFixed\(1\)/);
  assert.match(content, /frozen-model historical evaluation, not a rolling-origin result or prospectively published forecast/);
});

test("identity, metadata, navigation, and contact use canonical sources", () => {
  assert.match(config, /identity\.name/);
  assert.match(config, /jobTitle: identity\.role/);
  assert.match(contact, /SITE\.links\.github/);
  assert.match(contact, /SITE\.links\.linkedin/);
  assert.match(contact, /SITE\.author\.name/);
  const urls = [...config.matchAll(/https:\/\/[^"']+/g)].map((match) => match[0]);
  assert.deepEqual(new Set(urls), new Set(["https://cbratkovics.dev", "https://github.com/cbratkovics", "https://linkedin.com/in/cbratkovics"]));
  for (const id of ["home", "experience", "work", "projects", "skills", "impact", "contact"]) assert.ok(navigation.includes(`id: "${id}"`));
  assert.doesNotMatch([config, contact, layout].join("\n"), prohibitedChannels);
});

test("publishable repository excludes private contact, career-status copy, and documents", async () => {
  const files = (await filesBelow(fileURLToPath(new URL("..", import.meta.url)))).filter((file) => !file.includes(`${path.sep}tests${path.sep}`));
  const publicSource = (await Promise.all(files.filter((file) => /\.(?:ts|tsx|js|mjs|md|json|html|css|svg)$/i.test(file)).map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(publicSource, prohibitedChannels);
  assert.doesNotMatch(publicSource, /available for hire|open to opportunities|selectively exploring|seeking a new role/i);
  assert.equal(files.some((file) => /(?:resume|curriculum.vitae|linkedin.export).*\.(?:pdf|docx?|txt)$/i.test(file)), false);
});

test("publication rules detect preparation guidance without reproducing matched content", () => {
  const prohibitedExamples = [
    ["interview", " preparation"].join(""),
    ["STAR", " answer"].join(""),
    ["tailor your", " resume"].join(""),
    ["recruiter", " talking points"].join(""),
  ];
  for (const example of prohibitedExamples) assert.ok(scanText(example).length > 0);
  assert.match(["alignment", "notes.md"].join("-"), suspiciousDocumentName);
});

test("publication rules preserve professional and technical language", () => {
  const allowedExamples = [
    "A technical case study documents the design decision and measured result.",
    "A reviewer validated the software terms against the source artifact.",
    "Professional experience follows a clear problem, contribution, and validation narrative.",
    "The parser extracts structured fields from uploaded documents.",
  ];
  for (const example of allowedExamples) assert.deepEqual(scanText(example), []);
});

test("decision narratives and stable anchors cover every card", () => {
  assert.equal((content.match(/decisionContext:/g) ?? []).length, 13);
  assert.equal((content.match(/findingBasis:/g) ?? []).length, 13); // interface plus twelve entries
  assert.equal((content.match(/recommendationStatus:/g) ?? []).length, 13);
  for (const id of ["reporting-modernization", "daily-occupancy", "advertiser-mappings", "applied-modeling", "operational-ai", "ev-charging-unified-schema", "entity-resolution", "fantasy-football", "sql-genius", "ai-chatbot", "nba-ml", "document-intelligence"]) assert.ok(content.includes(`id: "${id}"`));
  assert.match(storiesComponent, /story\.narrative\.finding[\s\S]*story\.narrative\.recommendation/);
  assert.match(projectsComponent, /project\.narrative\.finding[\s\S]*project\.narrative\.recommendation/);
});

test("render order, navigation, hero, and football platform hierarchy are explicit", () => {
  ordered(page, ["<MinimalHero", "<WorkStories", "<Projects", "<Experience", "<Skills", "<Impact", "<Contact"]);
  ordered(navigation, ['id: "home"', 'id: "work"', 'id: "projects"', 'id: "experience"', 'id: "skills"', 'id: "impact"', 'id: "contact"']);
  assert.match(content, /Reliable data\. Better decisions\./);
  assert.match(content, /primaryAction: \{ label: "Explore the data platform"/);
  assert.match(content, /secondaryAction: \{ label: "Trace a metric", url: "https:\/\/fantasy-football-ai\.vercel\.app\/data-platform#trace"/);
  assert.match(content, /Python produces predictions and evaluation artifacts; dbt builds tested facts and marts/);
  assert.doesNotMatch(content, /dbt (?:trains|fits) (?:the )?models?/i);
  assert.match(content, /Model card[\s\S]*dbt documentation[\s\S]*Pinned evaluation/);
});

test("entity resolution keeps labelled-fold hedges and every cited figure traces to an artifact", async () => {
  const entry = sliceBetween('id: "entity-resolution"', 'id: "fantasy-football"');
  const page = await read("../app/projects/entity-resolution/page.tsx").catch(() => "");
  for (const term of ["labelled test fold", "Unlinked records are unlabelled", "coverage is never reported as accuracy", "owner-run", "unverified accepts", "All figures scoped to v0.1.0"]) assert.ok(entry.includes(term), `missing hedge: ${term}`);
  assert.doesNotMatch(entry, /known non-match/i);
  const citations = content.slice(content.indexOf("const entityResolutionCommit"), content.indexOf("export const projects"));
  assert.match(citations, /const entityResolutionCommit = "f50d764359895ab3a4d9945ed2a8b37d77bd681c"/); // tag v0.1.0
  assert.ok(citations.includes("blob/${entityResolutionCommit}/${artifact}"));
  const figures = [...citations.matchAll(/entityResolutionArtifact\("([^"]+)", "([^"]+)", "([^"]+)"\)/g)];
  assert.ok(figures.length >= 20);
  for (const [, figure, artifact] of figures) {
    assert.ok(entry.includes(figure) || page.includes(figure), `cited figure not used in copy: ${figure}`);
    assert.match(artifact, /^artifacts\//);
  }
});


test("approved employment accomplishments retain their full wording and order", () => {
  const actual = [...content.matchAll(/\{ label: "([^"]+)", text: "([^"]+)" \}/g)].map(([, label, text]) => [label, text]);
  assert.deepEqual(actual, [
    [
      "Production data foundation",
      "Built the Snowflake/dbt data foundation for production revenue reporting across five advertising platforms, integrating source-specific schemas, deduplication, data enrichments, and backfills into Sigma-facing marts."
    ],
    [
      "Reporting migration",
      "Migrated legacy reporting logic as layered source transformations, unified fact models, and Sigma-facing marts, preserving established business definitions through the data-platform migration."
    ],
    [
      "Daily occupancy modeling",
      "Built and validated daily programmatic occupancy and buy-type models; designed separate sales-activity and shared-capacity components to preserve metric meaning across detailed and aggregate reporting."
    ],
    [
      "Inventory modeling & peer analysis",
      "Implemented regression models for inventory utilization and revenue per unit; combined model outputs with cross-market peer comparisons to identify performance gaps and support yield-management analysis."
    ],
    [
      "Retention & segmentation",
      "Developed Python churn-risk models and K-means customer segmentation to identify advertiser-retention priorities and account-growth opportunities against business-defined targeting criteria."
    ],
    [
      "Generative AI delivery",
      "Delivered generative AI applications for editable executive financial communications; supported production troubleshooting and partnered with the data team on source-data and output validation."
    ],
    [
      "Cross-functional delivery",
      "Partnered with business stakeholders, vendors, and engineers on requirements, troubleshooting, user acceptance testing, and documentation to deliver maintainable data products at scale."
    ],
    [
      "Python ETL & automation",
      "Automated recurring reporting with Python ETL, replacing manual data preparation with repeatable extraction, transformation, and reporting workflows."
    ],
    [
      "Dimensional modeling & KPIs",
      "Designed fact and dimension tables and defined KPIs, creating reusable data structures for consistent executive reporting across business lines."
    ],
    [
      "Advertiser entity resolution",
      "Built Python/SQL entity-resolution workflows linking external advertisers to internal accounts through name normalization, exact and fuzzy matching, confidence tiers, and exceptions for human review."
    ],
    [
      "Applied machine learning",
      "Authored and presented an applied machine-learning use case in 2021 for advertising-inventory optimization and customer-value projection with external data-science specialists."
    ],
    [
      "Production release coordination",
      "Coordinated the transition of business reporting from development to production, aligning stakeholders on release sequencing and phased rollout options to minimize disruption to active users."
    ]
  ]);
});

test("engineering identity and supporting expertise stay distinct across entry points", async () => {
  const social = await read("../app/opengraph-image.tsx");
  const readme = await read("../../README.md");
  assert.match(hero, /<h1[^>]*>\{identity\.role\}<\/h1>/);
  assert.equal((hero.match(/<h1/g) ?? []).length, 1);
  for (const field of ["name", "role", "specialty", "tagline", "coreStack", "supportingExpertise"]) {
    assert.ok(hero.includes(`identity.${field}`));
    assert.ok(social.includes(`identity.${field}`));
  }
  assert.match(content, /coreStack: \["SQL", "dbt", "Snowflake", "Python", "Sigma"\]/);
  assert.match(content, /supportingExpertise: "Applied Data Science & AI"/);
  assert.match(config, /title: `\$\{identity.name\} \| \$\{identity.role\}`/);
  assert.match(config, /description: identity.description/);
  const obsolete = /(?:Data Scientist\s*[|·]\s*Analytics Engineer|Analytics Engineer\s*[|·]\s*Data Scientist)/i;
  assert.doesNotMatch([content, hero, config, layout, social, readme].join("\n"), obsolete);
  ordered(readme, ["EV Charging Data: Unified Schema", "Entity Resolution: Rules vs. Calibrated Classifier", "Fantasy Football Data Platform & Decision Lab", "NBA Stat Predictor", "SQL Genius AI", "AI Chat System", "Document Intelligence"]);
});

test("skills and professional attribution preserve engineering scope", () => {
  ordered(content.slice(content.indexOf("export const skills")), ["Core analytics engineering", "Data modeling & reliability", "Platforms & development", "Applied data science", "Applied AI & applications"]);
  for (const term of ["Data contracts", "Incremental processing", "SCD2", "Airflow", "Snowflake Notebooks", "A/B testing analysis"]) assert.ok(content.includes(term));
  assert.match(content, /I built the SSP components and integration; a collaborating data engineer owns the shared-capacity and charted components/);
  assert.match(content, /not a claim that automated freshness monitoring was implemented/);
  const nba = sliceBetween('id: "nba-ml"', 'id: "sql-genius"');
  assert.match(nba, /locally validated on DuckDB/);
  assert.match(nba, /both baselines available/);
  assert.match(nba, /last-10 baseline wins across the broader replay population/);
  assert.match(nba, /Post-game minutes eligibility is not pregame knowledge/);
  const ev = sliceBetween('id: "ev-charging-unified-schema"', 'id: "entity-resolution"');
  assert.match(ev, /within-source only/);
  assert.match(ev, /does not measure waiting demand, recovered revenue, or the effect of an idle fee/);
});
