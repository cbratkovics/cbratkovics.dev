import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port = 3210;
let server;

test.before(async () => {
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], { stdio: "ignore" });
  for (let attempt = 0; attempt < 40; attempt++) {
    try { if ((await fetch(`http://127.0.0.1:${port}`)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not start");
});
test.after(() => server?.kill());

test("initial HTML exposes core content and native navigation", async () => {
  const html = await (await fetch(`http://127.0.0.1:${port}`)).text();
  for (const text of ["Trustworthy data foundations. Clear metrics. Defensible decisions.", "Christopher J. Bratkovics", "Data Scientist | Analytics Engineer | Applied AI", "7+ years in enterprise analytics", "Decisions behind the delivery", "Independent Technical Projects", "Let’s connect"]) assert.ok(html.includes(text));
  for (const id of ["home", "experience", "work", "projects", "skills", "impact", "contact"]) {
    assert.ok(html.includes(`href=\"#${id}\"`));
    assert.ok(html.includes(`id=\"${id}\"`));
  }
  assert.ok(html.includes("<details"));
  assert.ok(html.indexOf('id="work"') < html.indexOf('id="experience"'));
  assert.ok(html.indexOf('id="projects"') < html.indexOf('id="experience"'));
  assert.ok(html.indexOf('href="#projects"') < html.indexOf('href="#experience"'));
  assert.equal((html.match(/Practical recommendation|>Recommendation</g) ?? []).length >= 9, true);
  assert.match(html, /Explore the data platform/);
  assert.match(html, /data-platform#trace/);
  assert.match(html, /href="\/projects\/ev-charging-data-unified-schema"/);
  assert.match(html, /href="\/projects\/entity-resolution"/);
  // Tier contract: EV Charging is the flagship; Entity Resolution, Fantasy Football, and NBA are
  // featured; SQL Genius, AI Chat, and Document Intelligence render under "Additional work".
  const tierOrder = ["Flagship evidence", "EV Charging Data: Unified Schema", "Entity Resolution: Rules vs. Calibrated Classifier", "Fantasy Football Data Platform &amp; Decision Lab", "NBA Stat Predictor", "Additional work", "SQL Genius AI | SQL Analytics Playground", "AI Chat System | Multi-Provider LLM Gateway", "Document Intelligence | Hybrid Retrieval With Visible Evidence"].map((text) => html.indexOf(text));
  assert.ok(tierOrder.every((position) => position >= 0), `missing tier text at ${tierOrder.indexOf(-1)}`);
  assert.deepEqual([...tierOrder].sort((a, b) => a - b), tierOrder);
  assert.ok(html.includes("Skip to main content"));
  assert.doesNotMatch(html, /mailto:|tel:|<form[\s>]/i);
});

test("metadata and discovery routes describe the canonical page", async () => {
  const html = await (await fetch(`http://127.0.0.1:${port}`)).text();
  assert.match(html, /rel="canonical" href="https:\/\/cbratkovics\.dev\/?"/);
  assert.match(html, /property="og:image"/);
  const robots = await (await fetch(`http://127.0.0.1:${port}/robots.txt`)).text();
  assert.match(robots, /Sitemap: https:\/\/cbratkovics\.dev\/sitemap\.xml/);
  const sitemap = await (await fetch(`http://127.0.0.1:${port}/sitemap.xml`)).text();
  assert.match(sitemap, /<loc>https:\/\/cbratkovics\.dev<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/cbratkovics\.dev\/projects\/ev-charging-data-unified-schema<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/cbratkovics\.dev\/projects\/entity-resolution<\/loc>/);
  const social = await fetch(`http://127.0.0.1:${port}/opengraph-image`);
  assert.equal(social.headers.get("content-type"), "image/png");
});

test("EV charging case study exposes scoped evidence and metadata", async () => {
  const response = await fetch(`http://127.0.0.1:${port}/projects/ev-charging-data-unified-schema`);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of ["EV Charging Data: Unified Schema", "As of v0.1.0", "440,575", "357,606", "82,969", "Where the data proved the plan wrong", "Claude Code", "three public sources’ charging-session logs", "within-source only", "Validate actual port inventory"]) assert.ok(html.includes(text), `missing: ${text}`);
  assert.match(html, /<title>EV Charging Data: Unified Schema \| Christopher J\. Bratkovics<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/cbratkovics\.dev\/projects\/ev-charging-data-unified-schema"/);
  assert.match(html, /property="og:image" content="https:\/\/cbratkovics\.dev\/opengraph-image/);
  assert.match(html, /name="twitter:image" content="https:\/\/cbratkovics\.dev\/opengraph-image/);
});

test("entity resolution case study exposes scoped evidence and metadata", async () => {
  const response = await fetch(`http://127.0.0.1:${port}/projects/entity-resolution`);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of ["Entity Resolution: Rules vs. Calibrated Classifier", "Independent project · Data science / Record linkage", "As of v0.1.0", "482,514", "241,752", "25,076", "6,016", "4,501", "unlinked record is not evidence of a non-match", "owner-run", "Where the data proved the plan wrong", "Claude Code", "Methods card"]) assert.ok(html.includes(text), `missing: ${text}`);
  assert.doesNotMatch(html, /known non-match/i);
  assert.match(html, /href="\/#work"/);
  assert.match(html, /<title>Entity Resolution: Rules vs\. Calibrated Classifier \| Christopher J\. Bratkovics<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/cbratkovics\.dev\/projects\/entity-resolution"/);
  assert.match(html, /property="og:image" content="https:\/\/cbratkovics\.dev\/opengraph-image/);
  assert.match(html, /name="twitter:image" content="https:\/\/cbratkovics\.dev\/opengraph-image/);
});
