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
  for (const text of ["Reliable data. Better decisions.", "Christopher J. Bratkovics", "Analytics Engineer", "7+ years in enterprise analytics", "Decisions behind the delivery", "Independent Technical Projects", "Let’s connect"]) assert.ok(html.includes(text));
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
  for (const text of ["Entity Resolution: Rules vs. Calibrated Classifier", "Independent project | Data integration &amp; record linkage", "As of v0.1.0", "482,514", "241,752", "25,076", "6,016", "4,501", "unlinked record is not evidence of a non-match", "owner-run", "Where the data proved the plan wrong", "Claude Code", "Methods card", "Three methods, one labelled truth set", "Independent project on CC0 data; MIT licence; no employer code, data, or business rules.", "Every figure on this page resolves to a", "https://github.com/cbratkovics/entity-resolution/tree/f50d764359895ab3a4d9945ed2a8b37d77bd681c/artifacts"]) assert.ok(html.includes(text), `missing: ${text}`);
  assert.doesNotMatch(html, /known non-match/i);
  assert.match(html, /href="\/#work"/);
  assert.match(html, /<title>Entity Resolution: Rules vs\. Calibrated Classifier \| Christopher J\. Bratkovics<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/cbratkovics\.dev\/projects\/entity-resolution"/);
  assert.match(html, /property="og:image" content="https:\/\/cbratkovics\.dev\/opengraph-image/);
  assert.match(html, /name="twitter:image" content="https:\/\/cbratkovics\.dev\/opengraph-image/);
});


test("initial HTML keeps the role, metadata, employment, and skill hierarchy aligned", async () => {
  const html = await (await fetch(`http://127.0.0.1:${port}`)).text();
  assert.match(html, /<title>Christopher J\. Bratkovics \| Analytics Engineer<\/title>/);
  assert.match(html, /property="og:title" content="Christopher J\. Bratkovics \| Analytics Engineer"/);
  assert.match(html, /name="twitter:title" content="Christopher J\. Bratkovics \| Analytics Engineer"/);
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1);
  assert.equal(headings[0][1], "Analytics Engineer");
  for (const text of ["Data Modeling, Quality &amp; Automation", "Reliable data. Better decisions.", "Applied Data Science &amp; AI", "SQL · dbt · Snowflake · Python · Sigma", "Senior Data Analyst / Analytics Engineer", "Business Intelligence Data Analyst", "April 2022–Present", "July 2019–April 2022"]) assert.ok(html.includes(text), `missing: ${text}`);
  assert.doesNotMatch(html, /(?:Data Scientist\s*[|·]\s*Analytics Engineer|Analytics Engineer\s*[|·]\s*Data Scientist)/i);
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(json);
  const person = JSON.parse(json[1]);
  assert.equal(person.jobTitle, "Analytics Engineer");
  assert.equal(person.name, "Christopher J. Bratkovics");
  assert.deepEqual(person.sameAs, ["https://github.com/cbratkovics", "https://linkedin.com/in/cbratkovics"]);
  assert.doesNotMatch(JSON.stringify(person), /mailto:|tel:|"(?:email|telephone|address)"/i);
  const description = "Analytics Engineer building reliable data models, trusted metrics, and automated workflows with SQL, dbt, Snowflake, and Python, with applied data science and AI depth.";
  assert.equal(person.description, description);
  for (const attribute of ['name="description"', 'property="og:description"', 'name="twitter:description"']) assert.ok(html.includes(`${attribute} content="${description}"`));
  const skills = ["Core analytics engineering", "Data modeling &amp; reliability", "Platforms &amp; development", "Applied data science", "Applied AI &amp; applications"].map(text => html.indexOf(text));
  assert.ok(skills.every(position => position >= 0));
  assert.deepEqual([...skills].sort((a,b) => a-b), skills);
  assert.equal((html.match(/>OUTFRONT Media<\/span>/g) ?? []).length, 2);
  const image = await fetch(`http://127.0.0.1:${port}/opengraph-image`);
  assert.equal(image.status, 200);
  const bytes = Buffer.from(await image.arrayBuffer());
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
});
