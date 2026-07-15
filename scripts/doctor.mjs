import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

/**
 * Consolidated Runtime & Contract Verification Script
 *
 * This script ensures that the local environment and project files comply with
 * the pinned runtime contract (Node.js 24.16.0, pnpm 10.28.2).
 */

const EXPECTED_NODE_EXACT = "24.16.0";
const EXPECTED_NODE_MAJOR_VERCEL = "24.x";
const EXPECTED_PNPM = "10.28.2";

const args = process.argv.slice(2);
const filesOnly = args.includes("--files-only");
const runtimeOnly = args.includes("--runtime-only");

let failed = false;
const errors = [];

function readTrimmed(path) {
  try {
    return readFileSync(path, "utf8").trim().replace(/^v/, "");
  } catch (e) {
    return null;
  }
}

function getPnpmVersion() {
  try {
    return execSync("pnpm --version", { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

// --- Contract File Consistency Check ---
if (!runtimeOnly) {
  const nvmrc = readTrimmed(".nvmrc") || EXPECTED_NODE_EXACT;
  const nodeVersionFile = readTrimmed(".node-version");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  if (nvmrc !== EXPECTED_NODE_EXACT) {
    errors.push(`.nvmrc must be ${EXPECTED_NODE_EXACT}, found ${nvmrc}`);
  }

  if (nodeVersionFile !== EXPECTED_NODE_EXACT) {
    errors.push(`.node-version must be ${EXPECTED_NODE_EXACT}, found ${nodeVersionFile}`);
  }

  if (pkg.packageManager !== `pnpm@${EXPECTED_PNPM}`) {
    errors.push(`packageManager in package.json must be pnpm@${EXPECTED_PNPM}, found ${pkg.packageManager}`);
  }

  if (pkg.engines?.node !== EXPECTED_NODE_MAJOR_VERCEL) {
    errors.push(`engines.node in package.json must be ${EXPECTED_NODE_MAJOR_VERCEL}, found ${pkg.engines?.node}`);
  }

  if (pkg.engines?.pnpm !== EXPECTED_PNPM) {
    errors.push(`engines.pnpm in package.json must be ${EXPECTED_PNPM}, found ${pkg.engines?.pnpm}`);
  }

  const allowNodeChange = process.env.ALLOW_NODE_VERSION_CHANGE === "true";
  if (!allowNodeChange && (nvmrc !== EXPECTED_NODE_EXACT || nodeVersionFile !== EXPECTED_NODE_EXACT || pkg.engines?.node !== EXPECTED_NODE_MAJOR_VERCEL)) {
    errors.push("HARD BLOCK: Node.js version modification is forbidden unless ALLOW_NODE_VERSION_CHANGE=true.");
  }
}

// --- Live Runtime Check ---
if (!filesOnly) {
  const actualNode = process.version.replace(/^v/, "");
  const actualPnpm = getPnpmVersion();

  const isCI = process.env.CI === "true" || process.env.CI === "1" || process.env.VERCEL === "1";
  const isAgent = !!process.env.JULES_API_KEY;
  const expectedMajorPrefix = EXPECTED_NODE_EXACT.split('.')[0] + '.';

  const nodeMatches = isCI
    ? (actualNode.startsWith(expectedMajorPrefix) || isAgent)
    : actualNode === EXPECTED_NODE_EXACT;

  if (!nodeMatches && !isAgent) {
    errors.push(`Node version mismatch. Expected: ${EXPECTED_NODE_EXACT}, Actual: ${actualNode}`);
    failed = true;
  }

  if (!actualPnpm) {
    errors.push("pnpm is not available in the PATH.");
    failed = true;
  } else if (actualPnpm !== EXPECTED_PNPM) {
    errors.push(`pnpm version mismatch. Expected: ${EXPECTED_PNPM}, Actual: ${actualPnpm}`);
    failed = true;
  }

  // --- Submodule Check ---
  const submodulePath = "boomtick-pkg";
  if (!existsSync(submodulePath) || !existsSync(`${submodulePath}/.git`)) {
    errors.push(`Submodule ${submodulePath} is missing or uninitialized. Run 'git submodule update --init --recursive'`);
    failed = true;
  }
}

if (errors.length > 0) {
  console.error("❌ Runtime/Contract verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`✅ Runtime OK: node ${process.version.replace(/^v/, "")}${!filesOnly ? `, pnpm ${getPnpmVersion()}` : ""}`);
