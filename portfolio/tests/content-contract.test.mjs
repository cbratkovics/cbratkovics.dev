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
  assert.match(content, /headline: "Data Scientist \| Analytics Engineer \| Applied AI"/);
  assert.match(content, /eyebrow: "7\+ years in enterprise analytics"/);
  assert.match(hero, /identity\.(?:name|headline|summary|eyebrow)/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
  assert.match(senior, /Senior Data Analyst \(Data Science \/ Analytics Engineering\)[\s\S]*April 2022–Present/);
  assert.match(bi, /Business Intelligence Data Analyst \(Data Architecture \/ Data Science\)[\s\S]*July 2019–April 2022/);
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
  assert.equal((content.match(/featured: true/g) ?? []).length, 3);
  assert.equal((content.match(/featured: false/g) ?? []).length, 2);
  ordered(content, ["Fantasy Football Projection Pipeline", "SQL Genius AI | SQL Analytics Playground", "AI Chat System | Multi-Provider LLM Gateway", "NBA Stat Predictor", "Document Intelligence | Hybrid Retrieval With Visible Evidence"]);
  for (const repo of ["fantasy-football-ai", "sql-genius-ai", "chatbot-ai-system", "nba-ai-ml", "document-intelligence-ai"]) assert.match(content, new RegExp(`github\\.com/cbratkovics/${repo}`));
  assert.match(content, /maintained demo defaults to local reviewed-intent\/template generation[\s\S]*legacy Python\/FastAPI Anthropic route remains optional/);
  assert.match(content, /in-memory cache with configured embeddings[\s\S]*not a production SLA[\s\S]*Redis-backed benchmark/);
});

test("football evidence keeps metric context and commit meanings distinct", () => {
  assert.match(content, /value: 4\.4909[\s\S]*value: 4\.8046/);
  assert.match(content, /5,914 player-weeks[\s\S]*2025 season[\s\S]*Historical out-of-sample season evaluation of a frozen artifact/);
  assert.match(content, /modelVersion: "20260911-asof_v1-d333de20"/);
  assert.match(content, /artifactCommit: "df3e7e6dbae3446da15535176d1dee9f4f045433"/);
  assert.match(content, /evaluationCodeCommit: "8e22a47cfc99ba85861cccbe63732da42feb27ab"/);
  assert.match(content, /artifactBlobSha: "80fff5584a9ed50c6d895bd99232100c9b1bd77a"/);
  assert.match(content, /relativeReduction\(footballEvaluation\)\.toFixed\(1\)/);
  assert.match(content, /historical evaluation of a frozen model—not a prospectively published 2025 forecast or a rolling-origin result/);
});

test("identity, metadata, navigation, and contact use canonical sources", () => {
  assert.match(config, /identity\.name/);
  assert.match(config, /identity\.headline/);
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
