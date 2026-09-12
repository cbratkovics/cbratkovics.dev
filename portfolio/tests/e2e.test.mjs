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
  for (const text of ["7+ years in enterprise analytics", "Decisions behind the delivery", "Independent Technical Projects", "Let’s connect"]) assert.ok(html.includes(text));
  for (const id of ["home", "experience", "work", "projects", "skills", "impact", "contact"]) {
    assert.ok(html.includes(`href=\"#${id}\"`));
    assert.ok(html.includes(`id=\"${id}\"`));
  }
  assert.ok(html.includes("<details"));
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
  const social = await fetch(`http://127.0.0.1:${port}/opengraph-image`);
  assert.equal(social.headers.get("content-type"), "image/png");
});
