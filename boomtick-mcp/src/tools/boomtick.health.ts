import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BoomtickConfig } from "../config.js";
import { asToolContent } from "../lib/result.js";

export function registerHealthTool(server: McpServer, config: BoomtickConfig): void {
  server.registerTool(
    "boomtick.health",
    {
      title: "Boomtick MCP health",
      description: "Return MCP configuration without touching GitHub or running shell commands.",
    },
    async () => asToolContent({
      success: true,
      data: {
        repoPath: config.repoPath,
        githubOwner: config.githubOwner,
        githubRepo: config.githubRepo,
        defaultBaseBranch: config.defaultBaseBranch,
        viteBasePath: config.viteBasePath,
        readOnly: config.readOnly,
        writeMode: config.writeMode,
        pushMode: config.pushMode,
      },
    }),
  );
}
