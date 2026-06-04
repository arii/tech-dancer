import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BoomtickConfig } from "../config.js";
import { registerHealthTool } from "../tools/boomtick.health.js";
import { registerSearchOpenPrsTool } from "../tools/github.search_open_prs.js";
import { registerGetPackageScriptsTool } from "../tools/repo.get_package_scripts.js";

export function registerTools(server: McpServer, config: BoomtickConfig): void {
  registerHealthTool(server, config);
  registerSearchOpenPrsTool(server, config);
  registerGetPackageScriptsTool(server, config);
}
