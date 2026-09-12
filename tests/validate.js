#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const fileArg = process.argv.find((arg) => arg.startsWith("--file="));
const pagePath = fileArg
  ? path.resolve(root, fileArg.slice("--file=".length))
  : path.join(root, "app", "page.tsx");

const checks = [];
const add = (ok, label, detail = "") => checks.push({ ok, label, detail });

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function listSourceFiles() {
  const files = new Set([pagePath, path.join(root, "app", "layout.tsx")]);
  const queue = [pagePath];

  while (queue.length > 0) {
    const current = queue.shift();
    const text = readText(current);
    const imports = [...text.matchAll(/from\s+["']@\/components\/([^"']+)["']/g)];
    for (const match of imports) {
      const imported = path.join(root, "components", `${match[1]}.tsx`);
      if (fs.existsSync(imported) && !files.has(imported)) {
        files.add(imported);
        queue.push(imported);
      }
    }
  }

  return [...files];
}

const sourceFiles = listSourceFiles();
const source = sourceFiles.map((file) => readText(file)).join("\n");
const packageJson = readText(path.join(root, "package.json"));

add(fs.existsSync(path.join(root, "package.json")), "package.json exists");
add(/"next"\s*:/.test(packageJson), "Next.js dependency exists");
add(/"dev"\s*:\s*"next dev"/.test(packageJson), "dev script exists");
add(/"build"\s*:\s*"next build"/.test(packageJson), "build script exists");
add(fs.existsSync(pagePath), `${path.relative(root, pagePath)} exists`);
add(fs.existsSync(path.join(root, "app", "layout.tsx")), "app layout exists");
add(fs.existsSync(path.join(root, "app", "globals.css")), "global stylesheet exists");
add(fs.existsSync(path.join(root, "components", "TrailCard.tsx")), "TrailCard component exists");
add(/<html\s+lang=["']es["']/.test(readText(path.join(root, "app", "layout.tsx"))), "document language is Spanish");
add(/description\s*:/.test(readText(path.join(root, "app", "layout.tsx"))), "metadata description exists");
add(/<h1[\s>]/.test(source), "main heading exists");
add(/<nav[\s>]/.test(source), "navigation exists");

const imageComponents = [...source.matchAll(/<Image\b[\s\S]*?\/>/g)].map((match) => match[0]);
const imagesMissingAlt = imageComponents.filter((tag) => !/\balt=(["'])[^"']+\1/.test(tag));
add(imageComponents.length > 0, "Next Image component is used");
add(imagesMissingAlt.length === 0, "images have non-empty alt text", `${imagesMissingAlt.length} image(s) missing alt`);

const ids = [...source.matchAll(/\bid=(["'])([^"']+)\1/g)].map((match) => match[2]);
const duplicateIds = [];
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) duplicateIds.push(id);
  seen.add(id);
}
add(duplicateIds.length === 0, "IDs are unique", duplicateIds.join(", "));

const internalLinks = [
  ...[...source.matchAll(/\bhref=(["'])(#[^"']+)\1/g)].map((match) => match[2]),
  ...[...source.matchAll(/\bhref:\s*(["'])(#[^"']+)\1/g)].map((match) => match[2]),
];
const brokenInternalLinks = internalLinks.filter((href) => href !== "#" && !ids.includes(href.slice(1)));
add(brokenInternalLinks.length === 0, "internal anchor links resolve", brokenInternalLinks.join(", "));

const emptyControls = [...source.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/g)]
  .filter((match) => match[2].replace(/<[^>]+>/g, "").replace(/[{}()]/g, "").trim().length === 0)
  .map((match) => match[0].slice(0, 80));
add(emptyControls.length === 0, "links and buttons have readable text", `${emptyControls.length} empty control(s)`);

const publicRefs = [...source.matchAll(/\bsrc=(["'])\/([^"']+)\1/g)].map((match) => match[2]);
const missingPublicAssets = publicRefs.filter((ref) => !fs.existsSync(path.join(root, "public", ref)));
add(missingPublicAssets.length === 0, "referenced public assets exist", missingPublicAssets.join(", "));

add(/bosque nuboso/i.test(source), "content mentions bosque nuboso");
add(!/bosque seco/i.test(source), "content avoids dry forest inconsistency");

console.log("Biotopo Next.js Demo Validation");
let issueCount = 0;
for (const check of checks) {
  const symbol = check.ok ? "✓" : "✗";
  console.log(`${symbol} ${check.label}${check.ok || !check.detail ? "" : ` (${check.detail})`}`);
  if (!check.ok) issueCount += 1;
}

console.log("");
console.log(issueCount === 0 ? "All checks passed" : `${issueCount} issue(s) detected`);
process.exitCode = issueCount === 0 ? 0 : 1;
