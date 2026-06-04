import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BoomtickConfig } from "../config.js";
import { asToolContent } from "../lib/result.js";
import { searchOpenPrs } from "../lib/github.js";

export const searchOpenPrsInputSchema = {
  state: z.enum(["open", "closed", "all"]).default("open"),
  includeDrafts: z.boolean().default(false),
  maxResults: z.number().int().min(1).max(100).default(30),
  labels: z.array(z.string().min(1)).default([]),
};

export function registerSearchOpenPrsTool(server: McpServer, config: BoomtickConfig): void {
  server.registerTool(
    "github.search_open_prs",
    {
      title: "Search open GitHub PRs",
      description: "Read-only PR rescue scout tool. Lists PRs with branch, mergeability, and check status.",
      inputSchema: searchOpenPrsInputSchema,
    },
    async (input) => asToolContent(await searchOpenPrs(config, input)),
  );
}
