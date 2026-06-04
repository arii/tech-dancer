import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BoomtickConfig } from "../config.js";

async function readText(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    return JSON.stringify({ success: false, error: String(error) }, null, 2);
  }
}

export function registerResources(server: McpServer, config: BoomtickConfig): void {
  server.registerResource(
    "repo-package-json",
    "repo://package-json",
    {
      title: "Repo package.json",
      description: "package.json for validation script discovery.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "application/json", text: await readText(join(config.repoPath, "package.json")) }],
    }),
  );

  server.registerResource(
    "repo-design-tokens",
    "repo://design-tokens",
    {
      title: "Repo design tokens",
      description: "Design token source used by UI repair agents.",
      mimeType: "text/typescript",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "text/typescript", text: await readText(join(config.repoPath, "src/styles/design-tokens.ts")) }],
    }),
  );
}
