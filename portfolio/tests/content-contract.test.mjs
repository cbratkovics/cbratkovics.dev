import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.filter((entry) => !["node_modules", ".next", ".git"].includes(entry.name)).map(async (entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(item) : [item];
  }));
  return paths.flat();
}
const read = (relative) => readFile(new URL(relative, import.meta.url), "utf8");
const content = await read("../data/projects.ts");
const hero = await read("../components/MinimalHero.tsx");
const config = await read("../config/site.ts");
const contact = await read("../components/Contact.tsx");
const layout = await read("../app/layout.tsx");

const prohibitedChannels = /(?:mailto:|tel:|\bemail\b\s*[:=]|contact\s*form|booking\s+link)/i;

test("canonical positioning and chronology do not drift", () => {
  assert.match(content, /eyebrow: "7\+ years in enterprise analytics"/);
  assert.match(content, /headline: "Data Scientist \| Analytics Engineer \| Applied AI"/);
  assert.match(hero, /identity\.headline/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
  assert.match(content, /Senior Data Analyst \(Data Science \/ Analytics Engineering\)[\s\S]*April 2022–Present/);
  assert.match(content, /Business Intelligence Data Analyst \(Data Architecture \/ Data Science\)[\s\S]*July 2019–April 2022/);
});

test("earlier OUTFRONT role retains its technical focus", () => {
  const role = content.match(/id: "bi-data-analyst"[\s\S]*?\n  }\n\];/)[0];
  for (const copy of [
    "Built the data pipelines and analytical models behind recurring executive reporting, combining Python automation, dimensional modeling, and KPI design with applied machine-learning collaboration.",
    "Python ETL & automation",
    "Automated recurring reporting workflows with Python ETL, replacing manual data preparation with repeatable processes.",
    "Dimensional modeling & business metrics",
    "Designed fact and dimension tables and defined KPIs for executive dashboards, translating business requirements into reusable reporting structures.",
    "Applied machine learning | 2021",
    "Coauthored and presented an applied machine-learning use case for advertising-inventory optimization and customer-value projection, collaborating with external data-science specialists."
  ]) assert.ok(role.includes(copy));
  assert.doesNotMatch(role, /Financial Pacing|compensation reporting|Reporting delivery/);
});

test("senior OUTFRONT role retains its ordered implementation detail", () => {
  const role = content.match(/id: "senior-data-analyst"[\s\S]*?\n  },\n  \{\n    id: "bi-data-analyst"/)[0];
  const expectedCopy = [
    "Built production reporting systems, developed Python models, and delivered business-facing AI applications. Translated fragmented advertising data and complex business rules into reusable data products for revenue reporting, customer retention, and inventory-performance analysis.",
    "Production data architecture",
    "Designed, built, and own the Snowflake/dbt foundation integrating five advertising platforms into unified production revenue and delivery reporting in Sigma, with standardized source transformations, inventory enrichment, source-specific deduplication, and controlled historical backfills.",
    "Predictive modeling & customer segmentation",
    "Developed Python advertiser churn-risk models and K-means segmentation to identify retention priorities and account-growth opportunities, combining advertiser behavior with business-defined criteria for targeted analysis.",
    "Inventory modeling & peer analysis",
    "Built inventory-utilization and revenue-per-unit regression models and peer comparisons to evaluate expected performance, identify underperforming advertising assets, and support yield-management analysis.",
    "Advertiser entity resolution",
    "Built Python/SQL workflows linking external advertiser data to internal accounts through name normalization, exact and fuzzy matching, and similarity scoring. Preserved confidence tiers and reviewable exceptions to make cross-source advertiser reporting traceable.",
    "Occupancy modeling & reconciliation",
    "Built and validated monthly and daily occupancy and buy-type models, integrating programmatic activity with direct-sold reporting while controlling shared-capacity aggregation. Created reusable SQL proofs to reconcile revenue, fees, delivery, and inventory coverage and validate metric behavior across reporting grains.",
    "Applied AI delivery & recovery",
    "Delivered and supported a generative AI application turning financial data into editable executive communications. Traced a production failure to outdated source views, worked with the data team to correct them, and validated the restored output."
  ];
  const positions = expectedCopy.map((copy) => role.indexOf(copy));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.doesNotMatch(role, /Senior individual-contributor work spanning|Reporting foundation|Daily occupancy|Applied modeling|Operational AI/);
});

test("education remains complete, ordered, and separate from employment", () => {
  const institutions = ["Bay Path University", "University of Vermont", "General Assembly"];
  const positions = institutions.map((name) => content.indexOf(name));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(content, /Non-degree training program/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
  assert.doesNotMatch(content, /GPA/);
});

test("featured project destinations and evidence labels remain scoped", () => {
  for (const repo of ["fantasy-football-ai", "sql-genius-ai", "chatbot-ai-system"]) {
    assert.match(content, new RegExp(`https://github\\.com/cbratkovics/${repo}`));
  }
  assert.match(content, /label: "Model card"[\s\S]*docs\/MODEL_CARD\.md/);
  assert.match(content, /metric: "Mean absolute error"[\s\S]*value: 4\.4909[\s\S]*value: 4\.8046/);
  assert.match(content, /5,914 player-weeks/);
  assert.match(content, /Historical out-of-sample season evaluation of a frozen artifact/);
  assert.match(content, /8e22a47cfc99ba85861cccbe63732da42feb27ab/);
  assert.match(content, /synthetic sample schema[\s\S]*Browser SQLite/);
  assert.match(content, /SSE streaming/);
  assert.match(content, /LightGBM[\s\S]*Hugging Face[\s\S]*Next\.js/);
  assert.doesNotMatch(content.match(/id: "nba-ml"[\s\S]*?featured: false/)[0], /scikit-learn|FastAPI/);
  for (const label of ["Pinned evaluation", "Implementation evidence", "System evaluations", "Replay", "Engineering case study"]) assert.match(content, new RegExp(label));
});

test("identity schema and contact configuration expose only profile links", () => {
  assert.match(content, /name: "Christopher J\. Bratkovics"/);
  assert.match(content, /headline: "Data Scientist \| Analytics Engineer \| Applied AI"/);
  assert.match(config, /identity\.name/);
  assert.match(config, /identity\.headline/);
  const urls = [...config.matchAll(/https:\/\/[^"']+/g)].map((match) => match[0]);
  assert.deepEqual(new Set(urls), new Set(["https://cbratkovics.dev", "https://github.com/cbratkovics", "https://linkedin.com/in/cbratkovics"]));
  assert.doesNotMatch([config, contact, layout].join("\n"), prohibitedChannels);
  assert.match(contact, /Let’s connect/);
  assert.match(contact, /Questions about my work or interested in exchanging ideas about data science, analytics engineering, or applied AI\? Get in touch\./);
});

test("repository source excludes accidental contact channels, documents, and search-status copy", async () => {
  const files = (await filesBelow(fileURLToPath(new URL("..", import.meta.url)))).filter((file) => !file.includes(`${path.sep}tests${path.sep}`));
  const publicSource = (await Promise.all(files.filter((file) => /\.(?:ts|tsx|js|mjs|md|json|html|css|svg)$/i.test(file)).map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(publicSource, prohibitedChannels);
  assert.doesNotMatch(publicSource, /available for hire|open to opportunities|selectively exploring|seeking a new role/i);
  assert.equal(files.some((file) => /(?:resume|curriculum.vitae|linkedin.export).*\.(?:pdf|docx?|txt)$/i.test(file)), false);
});

test("privacy scanner detects synthetic unsafe examples", () => {
  assert.match("mailto:person@example.invalid", prohibitedChannels);
  assert.match("tel:+1-555-0100", prohibitedChannels);
  assert.doesNotMatch("https://github.com/example", prohibitedChannels);
});
