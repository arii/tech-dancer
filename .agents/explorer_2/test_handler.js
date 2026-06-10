import { getMergeConflictFilesHandler } from "../../boomtick-mcp/dist/tools/github.get_merge_conflict_files.js";

process.env.BOOMTICK_REPO_PATH = ".";

async function main() {
  console.log("Calling handler for PR 1885...");
  const result = await getMergeConflictFilesHandler({ prNumber: 1885 });
  console.log("Result:", JSON.stringify(result, null, 2));
}

main().catch(console.error);
