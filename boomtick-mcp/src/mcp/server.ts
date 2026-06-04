import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BoomtickConfig } from "../config.js";
import { registerPrompts } from "./prompts.js";
import { registerResources } from "./resources.js";
import { registerTools } from "./tools.js";

export function createBoomtickServer(config: BoomtickConfig): McpServer {
  const server = new McpServer({ name: "boomtick-mcp", version: "0.1.0" });
  registerTools(server, config);
  registerResources(server, config);
  registerPrompts(server);
  return server;
}
