import { healthHandler } from "../../boomtick-mcp/dist/mcp/tools.js";
import { searchOpenPrsHandler } from "../../boomtick-mcp/dist/tools/github.search_open_prs.js";
import fs from "fs";

async function run() {
  const results = {};
  try {
    results.health = await healthHandler();
    if (results.health.status === "ok") {
      results.prs = await searchOpenPrsHandler({ state: "open", maxResults: 50, includeDrafts: true });
    }
    fs.writeFileSync("./.agents/explorer_1/discovery_results.json", JSON.stringify(results, null, 2));
    console.log("SUCCESS: Wrote results to .agents/explorer_1/discovery_results.json");
  } catch (error) {
    console.error("Error occurred:", error);
    fs.writeFileSync("./.agents/explorer_1/discovery_results.json", JSON.stringify({ error: error.message }, null, 2));
    process.exit(1);
  }
}

run();
