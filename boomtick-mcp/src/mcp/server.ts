import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadConfig } from "../config.js";

function jsonContent(data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export function createServer() {
  const server = new McpServer({
    name: "boomtick-mcp",
    version: "0.1.0",
  });

  server.tool(
    "boomtick.health",
    "Return non-secret Boomtick MCP configuration and safety mode.",
    {},
    async () => {
      const config = loadConfig();
      return jsonContent({
        name: "boomtick-mcp",
        owner: config.owner,
        repo: config.repo,
        repoPath: config.repoPath,
        defaultBaseBranch: config.defaultBaseBranch,
        viteBasePath: config.viteBasePath,
        readOnly: config.readOnly,
        writeMode: config.writeMode,
        pushMode: config.pushMode,
        githubTokenConfigured: config.githubTokenConfigured,
      });
    },
  );

  server.tool(
    "boomtick.echo",
    "Development-only structured echo tool for MCP Inspector smoke tests.",
    { message: z.string().min(1) },
    async ({ message }) => jsonContent({ success: true, message }),
  );

  return server;
}

export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
