import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const expectedNodeExact = readFileSync(".node-version", "utf8")
  .trim()
  .replace(/^v/, "");
const expectedNodeMajor = expectedNodeExact.split('.')[0];

const actualNode = process.version.replace(/^v/, "");
const actualNodeMajor = actualNode.split('.')[0];

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

const expectedPnpm = pkg.packageManager?.replace(/^pnpm@/, "");

function getPnpmVersion() {
  try {
    return execSync("pnpm --version", { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

const actualPnpm = getPnpmVersion();

let failed = false;

if (actualNodeMajor !== expectedNodeMajor) {
  console.error("❌ Node version mismatch");
  console.error(`Expected: ${expectedNodeExact} (or compatible v${expectedNodeMajor}.x)`);
  console.error(`Actual:   ${actualNode}`);
  console.error("");
  console.error("Do not switch versions manually unless the task explicitly updates the runtime contract.");
  console.error("Use the repo-pinned version from .node-version / .nvmrc.");
  failed = true;
}

if (!expectedPnpm) {
  console.error("❌ package.json is missing packageManager");
  console.error('Expected: "packageManager": "pnpm@10.28.2"');
  failed = true;
}

if (!actualPnpm) {
  console.error("❌ pnpm is not available");
  console.error(`Run: corepack enable && corepack prepare pnpm@${expectedPnpm} --activate`);
  failed = true;
} else if (actualPnpm !== expectedPnpm) {
  console.error("❌ pnpm version mismatch");
  console.error(`Expected: ${expectedPnpm}`);
  console.error(`Actual:   ${actualPnpm}`);
  console.error("");
  console.error(`Run: corepack enable && corepack prepare pnpm@${expectedPnpm} --activate`);
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log(`✅ Runtime OK: node ${actualNode}, pnpm ${actualPnpm}`);
