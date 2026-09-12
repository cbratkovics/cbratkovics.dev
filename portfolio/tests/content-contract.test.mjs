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
  assert.match(hero, />\s*7\+ years in enterprise analytics\s*</);
  assert.match(hero, /Data Scientist[\s\S]*Analytics Engineer[\s\S]*Applied AI/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
  assert.match(content, /Senior Data Analyst \(Data Science \/ Analytics Engineering\)[\s\S]*April 2022 to present/);
  assert.match(content, /Business Intelligence Data Analyst \(Data Architecture \/ Data Science\)[\s\S]*July 2019 to April 2022/);
});

test("education remains complete, ordered, and separate from employment", () => {
  const institutions = ["Bay Path University", "University of Vermont", "General Assembly"];
  const positions = institutions.map((name) => content.indexOf(name));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(content, /Non-degree training program/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
});

test("featured project destinations and evidence labels remain scoped", () => {
  for (const repo of ["fantasy-football-ai", "sql-genius-ai", "chatbot-ai-system"]) {
    assert.match(content, new RegExp(`https://github\\.com/cbratkovics/${repo}`));
  }
  assert.match(content, /label: "Model card"[\s\S]*docs\/MODEL_CARD\.md/);
  assert.doesNotMatch(content, /Retrospective 2025 evaluation:/);
  assert.match(content, /browser-based SQLite playground/);
  assert.match(content, /SSE streaming/);
});

test("identity schema and contact configuration expose only profile links", () => {
  assert.match(config, /Christopher J\. Bratkovics/);
  assert.match(config, /Data Scientist \| Analytics Engineer \| Applied AI/);
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
