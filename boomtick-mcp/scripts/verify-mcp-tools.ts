import { mkdtemp, writeFile, chmod, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

type Check = {
  name: string;
  ok: boolean;
  details?: unknown;
};

const expectedTools = ["boomtick.health", "github.search_open_prs", "repo.get_package_scripts"];
const expectedResources = ["repo://package-json", "repo://design-tokens"];
const expectedPrompts = ["conflict-scout", "repo-context", "repair-agent", "verifier-agent", "pr-writer"];

function assertCheck(condition: boolean, name: string, details?: unknown): Check {
  return { name, ok: condition, details };
}

type TextToolResult = { content?: Array<{ type: string; text?: string }> };

function textContent(result: unknown): string {
  const maybeResult = result as TextToolResult;
  const firstText = maybeResult.content?.find((item) => item.type === "text" && typeof item.text === "string");
  if (!firstText?.text) throw new Error("Tool result did not include text content");
  return firstText.text;
}

function parseToolJson(result: unknown): unknown {
  return JSON.parse(textContent(result));
}

async function createMockGh(): Promise<string> {
  const binDir = await mkdtemp(join(tmpdir(), "boomtick-mcp-gh-"));
  const ghPath = join(binDir, process.platform === "win32" ? "gh.cmd" : "gh");
  const script = `#!/usr/bin/env bash
set -euo pipefail
if [ "\${1:-}" = "pr" ] && [ "\${2:-}" = "list" ]; then
  cat <<'JSON'
[
  {
    "number": 1791,
    "title": "Fix Lighthouse base path",
    "author": { "login": "octocat" },
    "headRefName": "fix/lighthouse-base-path",
    "baseRefName": "main",
    "isDraft": false,
    "mergeStateStatus": "DIRTY",
    "reviewDecision": "REVIEW_REQUIRED",
    "statusCheckRollup": [
      { "status": "COMPLETED", "conclusion": "FAILURE" }
    ],
    "updatedAt": "2026-06-01T00:00:00Z",
    "url": "https://github.com/arii/tech-dancer/pull/1791"
  }
]
JSON
  exit 0
fi
echo "mock gh only supports pr list" >&2
exit 2
`;
  await writeFile(ghPath, script, "utf8");
  await chmod(ghPath, 0o755);
  return binDir;
}

async function main(): Promise<void> {
  const projectRoot = resolve(import.meta.dirname, "..");
  const repoRoot = resolve(projectRoot, "..");
  const mockGhDir = await createMockGh();
  const checks: Check[] = [];

  const env: Record<string, string> = {
    ...Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => typeof entry[1] === "string")),
    PATH: `${mockGhDir}:${process.env.PATH ?? ""}`,
    GITHUB_OWNER: "arii",
    GITHUB_REPO: "tech-dancer",
    BOOMTICK_REPO_PATH: repoRoot,
    DEFAULT_BASE_BRANCH: "main",
    VITE_BASE_PATH: "/tech-dancer/",
    CODEX_GH_TOKEN: "ghp_mocktokenmocktokenmocktoken1234567890",
    BOOMTICK_WRITE_MODE: "false",
    BOOMTICK_PUSH_MODE: "false",
  };

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [join(projectRoot, "dist/index.js")],
    cwd: projectRoot,
    env,
    stderr: "pipe",
  });

  const client = new Client({ name: "boomtick-mcp-verifier", version: "0.1.0" });

  try {
    await client.connect(transport);

    const tools = await client.listTools();
    const toolNames = tools.tools.map((tool) => tool.name).sort();
    checks.push(assertCheck(expectedTools.every((tool) => toolNames.includes(tool)), "listTools exposes every MVP tool", { expectedTools, toolNames }));

    const health = parseToolJson(await client.callTool({ name: "boomtick.health", arguments: {} })) as { success?: boolean; data?: { readOnly?: boolean; githubOwner?: string } };
    checks.push(assertCheck(health.success === true && health.data?.readOnly === true && health.data.githubOwner === "arii", "boomtick.health returns safe config", health));

    const scripts = parseToolJson(await client.callTool({ name: "repo.get_package_scripts", arguments: {} })) as { success?: boolean; data?: { scripts?: Record<string, string> } };
    checks.push(assertCheck(scripts.success === true && typeof scripts.data?.scripts?.build === "string", "repo.get_package_scripts reads root package scripts", scripts));

    const prs = parseToolJson(await client.callTool({ name: "github.search_open_prs", arguments: { maxResults: 5 } })) as { success?: boolean; data?: { prs?: Array<{ number?: number; mergeable?: string; checksConclusion?: string }> } };
    checks.push(assertCheck(prs.success === true && prs.data?.prs?.[0]?.number === 1791 && prs.data.prs[0].mergeable === "CONFLICTING" && prs.data.prs[0].checksConclusion === "FAILURE", "github.search_open_prs normalizes mocked PR data", prs));

    const resources = await client.listResources();
    const resourceUris = resources.resources.map((resource) => resource.uri).sort();
    checks.push(assertCheck(expectedResources.every((resource) => resourceUris.includes(resource)), "listResources exposes every MVP resource", { expectedResources, resourceUris }));

    for (const uri of expectedResources) {
      const resource = await client.readResource({ uri });
      checks.push(assertCheck(resource.contents.length > 0 && "text" in resource.contents[0] && String(resource.contents[0].text).length > 0, `readResource ${uri} returns text`, { uri, contentCount: resource.contents.length }));
    }

    const prompts = await client.listPrompts();
    const promptNames = prompts.prompts.map((prompt) => prompt.name).sort();
    checks.push(assertCheck(expectedPrompts.every((prompt) => promptNames.includes(prompt)), "listPrompts exposes every workflow prompt", { expectedPrompts, promptNames }));

    for (const name of expectedPrompts) {
      const prompt = await client.getPrompt({ name });
      checks.push(assertCheck(prompt.messages.length > 0 && prompt.messages[0]?.content.type === "text", `getPrompt ${name} returns text`, { name, messageCount: prompt.messages.length }));
    }
  } finally {
    await client.close().catch(() => undefined);
    await rm(mockGhDir, { recursive: true, force: true });
  }

  const failed = checks.filter((check) => !check.ok);
  console.log(JSON.stringify({ success: failed.length === 0, checks }, null, 2));
  if (failed.length > 0) process.exit(1);
}

await main();
