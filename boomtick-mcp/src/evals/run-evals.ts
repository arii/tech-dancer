import { healthHandler } from "../mcp/tools.js";
import { searchOpenPrsHandler } from "../tools/github.search_open_prs.js";
import { getPackageScriptsHandler } from "../tools/repo.get_package_scripts.js";

async function runEvals() {
  console.log("Starting Boomtick MCP Evaluations...");

  try {
    console.log("\n1. Health Check:");
    const health = await healthHandler();
    console.log(JSON.stringify(health, null, 2));

    console.log("\n2. Repository Scripts:");
    const scripts = await getPackageScriptsHandler();
    console.log(`Found ${Object.keys(scripts.scripts).length} scripts.`);

    console.log("\n3. GitHub PR Search (Dry Run):");
    try {
      const prs = await searchOpenPrsHandler({ state: "open", limit: 1, includeDrafts: true });
      console.log(`Found ${prs.prs.length} open PRs.`);
    } catch (e) {
      console.log("GitHub search failed (likely due to environment/auth):", e instanceof Error ? e.message : String(e));
    }

    console.log("\nEvaluations complete.");
  } catch (error) {
    console.error("\nEvaluation failed:", error);
    process.exit(1);
  }
}

runEvals();
