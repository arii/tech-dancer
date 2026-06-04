#!/usr/bin/env node
import { startServer } from "./mcp/server.js";

startServer().catch((error) => {
  console.error("Failed to start Boomtick MCP server", error);
  process.exitCode = 1;
});
