import { execFile } from "node:child_process";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".jsx", ".md", ".mdx", ".mjs", ".svg", ".ts", ".tsx", ".txt", ".yaml", ".yml", ".xml"]);

// Expressions are assembled so the publication checker can inspect its own source.
export const preparationRules = [
  { id: "interview-preparation", expression: new RegExp(`\\binterview(?:er|ing)?\\s+(?:${["prep", "preparation", "answers?", "narratives?", "talking points?"].join("|")})`, "i") },
  { id: "structured-response-coaching", expression: new RegExp(`\\b${["ST", "AR"].join("")}[- ](?:answers?|responses?|stories?)\\b`, "i") },
  { id: "profile-tailoring", expression: new RegExp(`\\b(?:tailor|rewrite|optimi[sz]e|align)\\s+(?:your\\s+|the\\s+)?(?:r[ée]sum[ée]|CV|LinkedIn)(?:\\s+(?:profile|bullets?|copy))?\\b`, "i") },
  { id: "interviewer-talking-points", expression: new RegExp(`\\b(?:say|tell|explain)\\s+(?:this\\s+)?to\\s+(?:an?\\s+|the\\s+)?interviewer\\b`, "i") },
  { id: "target-role-guidance", expression: new RegExp(`\\b(?:target(?:ing)?\\s+(?:a\\s+|the\\s+)?role|role[- ]targeting|${["career", "signal roadmap"].join("[- ]")})\\b`, "i") },
  { id: "recruiting-talking-points", expression: new RegExp(`\\b(?:recruiter|recruiting)\\s+(?:script|talking points?|pitch)\\b`, "i") },
];

export const suspiciousDocumentName = new RegExp(`(?:^|/)(?:alignment[-_ ]notes|interview[-_ ](?:prep|notes)|career[-_ ]coaching|(?:r[ée]sum[ée]|linkedin)[-_ ](?:alignment|notes|guidance))(?:\\.[^/]*)?$`, "i");

export function scanText(contents) {
  const findings = [];
  for (const [index, line] of contents.split(/\r?\n/u).entries()) {
    for (const rule of preparationRules) {
      if (rule.expression.test(line)) findings.push({ line: index + 1, rule: rule.id });
    }
  }
  return findings;
}

async function trackedFiles() {
  const { stdout } = await execFileAsync("git", ["ls-files", "-z"], { cwd: repositoryRoot, encoding: "buffer" });
  return stdout.toString().split("\0").filter(Boolean);
}

async function filesBelow(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map(async (entry) => {
      const item = path.join(directory, entry.name);
      return entry.isDirectory() ? filesBelow(item) : [item];
    }))).flat();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function scanFile(file, displayPath) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) return [];
  if ((await stat(file)).size > 10_000_000) return [];
  const contents = await readFile(file, "utf8");
  return scanText(contents).map(({ line, rule }) => ({ path: displayPath, line, rule }));
}

export async function scanRepository({ generated = false } = {}) {
  const findings = [];
  for (const relative of await trackedFiles()) {
    if (suspiciousDocumentName.test(relative)) findings.push({ path: relative, line: 1, rule: "suspicious-document-name" });
    findings.push(...await scanFile(path.join(repositoryRoot, relative), relative));
  }
  if (generated) {
    const outputRoot = path.join(repositoryRoot, "portfolio/.next");
    for (const file of await filesBelow(outputRoot)) findings.push(...await scanFile(file, path.relative(repositoryRoot, file)));
  }
  return findings;
}

async function main() {
  const findings = await scanRepository({ generated: process.argv.includes("--generated") });
  for (const finding of findings) console.error(`${finding.path}:${finding.line} [${finding.rule}]`);
  if (findings.length) {
    console.error(`Publication content check failed with ${findings.length} finding(s).`);
    process.exitCode = 1;
  } else console.log("Publication content check passed.");
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) await main();
