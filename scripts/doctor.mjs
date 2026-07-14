import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

/**
 * doctor.mjs - Consolidated runtime and contract verification script.
 *
 * Functions:
 * 1. Validates current Node.js and pnpm versions against the repository contract.
 * 2. Ensures consistency between .node-version, .nvmrc, and package.json.
 */

const isCI = process.env.CI === "true" || process.env.CI === "1" || process.env.VERCEL === "1";
const isJules = process.env.USER?.toLowerCase().includes("jules") || process.env.JULES_API_KEY;
const allowNodeChange = process.env.ALLOW_NODE_VERSION_CHANGE === "true";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

// --- Configuration Source of Truth ---
const expectedNodeExact = readFileSync(".node-version", "utf8").trim().replace(/^v/, "");
const expectedPnpm = pkg.packageManager?.replace(/^pnpm@/, "");
const expectedNodeMajorForVercel = "24.x"; // Vercel expected engine field

function getPnpmVersion() {
  try {
    return execSync("pnpm --version", { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

function checkRuntime() {
  console.log("🔍 Checking active runtime...");
  const actualNode = process.version.replace(/^v/, "");
  const actualPnpm = getPnpmVersion();
  let failed = false;

  const expectedMajorPrefix = expectedNodeExact.split(".")[0] + ".";
  const nodeMatches = isCI
    ? (actualNode.startsWith(expectedMajorPrefix) || isJules)
    : actualNode === expectedNodeExact;

  if (!nodeMatches && !isJules) {
    console.error("❌ Node version mismatch");
    console.error(`Expected: ${expectedNodeExact} (or ${expectedMajorPrefix}x in CI)`);
    console.error(`Actual:   ${actualNode}`);
    failed = true;
  } else if (actualNode !== expectedNodeExact && !isCI && !isJules && !allowNodeChange) {
    console.error("❌ Node version drift detected");
    console.error(`Local: ${actualNode}, Contract: ${expectedNodeExact}`);
    failed = true;
  }

  if (!actualPnpm) {
    console.error("❌ pnpm is not available");
    failed = true;
  } else if (actualPnpm !== expectedPnpm) {
    console.error("❌ pnpm version mismatch");
    console.error(`Expected: ${expectedPnpm}`);
    console.error(`Actual:   ${actualPnpm}`);
    failed = true;
  }

  if (failed) {
    console.error("\nHard block: Runtime modification is forbidden unless ALLOW_NODE_VERSION_CHANGE=true.");
    return false;
  }

  console.log(`✅ Runtime OK: node ${actualNode}, pnpm ${actualPnpm}`);
  return true;
}

function checkContractFiles() {
  console.log("🔍 Verifying runtime contract files...");
  const errors = [];

  function readTrimmed(path) {
    return readFileSync(path, "utf8").trim().replace(/^v/, "");
  }

  const nvmrc = existsSync(".nvmrc") ? readTrimmed(".nvmrc") : expectedNodeExact;
  const nodeVersionFile = readTrimmed(".node-version");

  if (nvmrc !== expectedNodeExact) {
    errors.push(`.nvmrc must be ${expectedNodeExact}, found ${nvmrc}`);
  }

  if (nodeVersionFile !== expectedNodeExact) {
    errors.push(`.node-version must be ${expectedNodeExact}, found ${nodeVersionFile}`);
  }

  if (pkg.packageManager !== `pnpm@${expectedPnpm}`) {
    errors.push(`packageManager must be pnpm@${expectedPnpm}, found ${pkg.packageManager}`);
  }

  if (pkg.engines?.node !== expectedNodeMajorForVercel) {
    errors.push(`engines.node must be ${expectedNodeMajorForVercel}, found ${pkg.engines?.node}`);
  }

  if (pkg.engines?.pnpm !== expectedPnpm) {
    errors.push(`engines.pnpm must be ${expectedPnpm}, found ${pkg.engines?.pnpm}`);
  }

  if (errors.length > 0) {
    console.error("❌ Runtime contract drift detected:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    if (!allowNodeChange) {
        console.error("\nHARD BLOCK: Runtime contract modification is forbidden unless ALLOW_NODE_VERSION_CHANGE=true.");
    }
    return false;
  }

  console.log("✅ Runtime contract files are consistent");
  return true;
}

// Execution Logic
const mode = process.argv[2];

let success = true;
if (mode === "--files-only") {
  success = checkContractFiles();
} else if (mode === "--runtime-only") {
  success = checkRuntime();
} else {
  // Default: check everything
  const runtimeOk = checkRuntime();
  const filesOk = checkContractFiles();
  success = runtimeOk && filesOk;
}

if (!success) {
  process.exit(1);
}
