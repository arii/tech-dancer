import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BoomtickConfig } from "../config.js";
import { asToolContent, fail, ok } from "../lib/result.js";

export async function getPackageScripts(config: BoomtickConfig) {
  try {
    const packageJsonPath = join(config.repoPath, "package.json");
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8")) as { scripts?: Record<string, string> };
    return ok({ packageJsonPath, scripts: packageJson.scripts ?? {}, missingScripts: [] as string[] });
  } catch (error) {
    return fail("package_json_read_failed", "Unable to read package.json scripts from the configured repo path.", String(error));
  }
}

export function registerGetPackageScriptsTool(server: McpServer, config: BoomtickConfig): void {
  server.registerTool(
    "repo.get_package_scripts",
    {
      title: "Read package scripts",
      description: "Read package.json scripts so agents can choose validation commands from repo evidence.",
    },
    async () => asToolContent(await getPackageScripts(config)),
  );
}
