import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const content = await readFile(new URL("../data/projects.ts", import.meta.url), "utf8");
const hero = await readFile(new URL("../components/MinimalHero.tsx", import.meta.url), "utf8");
const config = await readFile(new URL("../config/site.ts", import.meta.url), "utf8");
const contact = await readFile(new URL("../components/Contact.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

test("canonical positioning and chronology do not drift", () => {
  assert.match(hero, /Data Scientist[\s\S]*Analytics Engineer[\s\S]*Applied AI/);
  assert.match(content, /April 2022 to present/);
  assert.match(content, /July 2019 to April 2022/);
  assert.equal((content.match(/company: "OUTFRONT Media"/g) ?? []).length, 2);
  assert.doesNotMatch(content, /20\+ hours|400,000\+|94\.26%|rapidly promoted/i);
});

test("education remains complete and correctly ordered", () => {
  const bayPath = content.indexOf("Bay Path University");
  const vermont = content.indexOf("University of Vermont");
  const generalAssembly = content.indexOf("General Assembly");
  assert.ok(bayPath > -1 && bayPath < vermont && vermont < generalAssembly);
  assert.match(content, /4\.0 GPA/);
  assert.match(content, /Non-degree training program/);
});

test("featured projects use current scoped descriptions and canonical links", () => {
  for (const repo of ["fantasy-football-ai", "sql-genius-ai", "chatbot-ai-system"]) {
    assert.match(content, new RegExp(`https://github\\.com/cbratkovics/${repo}`));
  }
  assert.match(content, /browser-based SQLite playground/);
  assert.match(content, /SSE streaming/);
  assert.doesNotMatch(content, /Multi-Tenant|WebSocket streaming|asynchronous query processing/);
});

test("metadata matches the visible professional identity", () => {
  assert.match(config, /Christopher J\. Bratkovics/);
  assert.match(config, /Data Scientist \| Analytics Engineer \| Applied AI/);
  assert.match(config, /7\+ years in enterprise analytics/);
});

test("public copy does not expose residence or availability messaging", () => {
  const publicCopy = [content, hero, config, contact, layout].join("\n");

  assert.match(hero, />\s*7\+ years in enterprise analytics\s*</);
  assert.match(contact, /Let’s connect/);
  assert.match(
    contact,
    /Questions about my work or interested in exchanging ideas about data science, analytics engineering, or applied AI\? Get in touch\./
  );
  assert.doesNotMatch(publicCopy, /Maine|Lewiston|open to (?:remote|work)|available for hire|seeking a new role/i);
});
