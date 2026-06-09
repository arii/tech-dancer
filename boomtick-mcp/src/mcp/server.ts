import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { config } from "../config.js";
import { createSuccessResult, createErrorResult } from "../lib/result.js";
import { healthHandler } from "./tools.js";
import { searchOpenPrsHandler } from "../tools/github.search_open_prs.js";
import { findSimilarPrsHandler, FindSimilarPrsInputSchema } from "../tools/github.find_similar_prs.js";
import { triagePrHandler, TriagePrInputSchema } from "../tools/github.triage_pr.js";
import { getPrDiffHandler } from "../tools/github.get_pr_diff.js";
import { getMergeConflictFilesHandler, GetMergeConflictFilesInputSchema } from "../tools/github.get_merge_conflict_files.js";
import { checkoutBranchHandler, CheckoutBranchInputSchema } from "../tools/github.checkout_branch.js";
import { getChangedFilesHandler, GetChangedFilesInputSchema } from "../tools/repo.get_changed_files.js";
import { getPackageScriptsHandler } from "../tools/repo.get_package_scripts.js";
import { getRouteMapHandler } from "../tools/repo.get_route_map.js";
import { readCiLogsHandler, ReadCiLogsInputSchema } from "../tools/repo.read_ci_logs.js";
import { createRepairBranchHandler, CreateRepairBranchInputSchema } from "../tools/repo.create_repair_branch.js";
import { runTestsHandler, RunTestsInputSchema } from "../tools/repo.run_tests.js";
import { runLighthouseHandler, RunLighthouseInputSchema } from "../tools/repo.run_lighthouse.js";
import { runPlaywrightHandler, RunPlaywrightInputSchema } from "../tools/repo.run_playwright.js";
import { commitPatchHandler, CommitPatchInputSchema } from "../tools/repo.commit_patch.js";
import { openReplacementPrHandler } from "../tools/github.open_replacement_pr.js";
import { commentTriageSummaryHandler } from "../tools/github.comment_triage_summary.js";
import fs from "fs/promises";
import path from "path";

export class BoomtickMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "boomtick-mcp",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupResourceHandlers();
    this.setupPromptHandlers();
  }

  private setupPromptHandlers() {
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: [
          {
            name: "conflict-scout",
            description: "Find PRs worth rescuing.",
          },
          {
            name: "repo-context",
            description: "Gather repository context for a PR.",
          },
          {
            name: "repair-agent",
            description: "Apply the smallest safe fix for a PR.",
          },
          {
            name: "verifier-agent",
            description: "Verify that a repair works.",
          },
          {
            name: "pr-writer",
            description: "Write a summary for a replacement PR.",
          },
        ],
      };
    });

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const name = request.params.name;

      const agentsDir = path.resolve(config.repoPath, "boomtick-mcp/src/agents");
      // nosemgrep
      const promptPath = path.resolve(agentsDir, `${name}.prompt.md`);

      if (!promptPath.startsWith(agentsDir + path.sep)) {
        throw new Error("Path traversal detected");
      }

      try {
        const content = await fs.readFile(promptPath, "utf-8");
        return {
          messages: [
            {
              role: "user",
              content: { type: "text", text: content },
            },
          ],
        };
      } catch (e) {
        throw new Error(`Prompt not found: ${name}`);
      }
    });
  }

  private setupResourceHandlers() {
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: "repo://package-json",
            name: "package.json",
            mimeType: "application/json",
            description: "The root package.json file of the repository.",
          },
          {
            uri: "repo://routes",
            name: "Route Map",
            mimeType: "application/json",
            description: "The mapping of application routes to content files.",
          },
          {
            uri: "repo://design-tokens",
            name: "Design Tokens",
            mimeType: "application/json",
            description: "The design tokens used in the repository.",
          },
          {
            uri: "repo://repair-report/{branch}",
            name: "Repair Report",
            mimeType: "application/json",
            description: "The validation report for a specific repair branch.",
          },
          {
            uri: "repo://lighthouse/{branch}",
            name: "Lighthouse Report",
            mimeType: "application/json",
            description: "Lighthouse CI report for a specific branch.",
          },
          {
            uri: "repo://playwright/{branch}",
            name: "Playwright Report",
            mimeType: "application/json",
            description: "Playwright test report for a specific branch.",
          },
          {
            uri: "repo://pr-similarity",
            name: "PR Similarity Report",
            mimeType: "application/json",
            description: "Analysis of file overlaps between open pull requests.",
          },
          {
            uri: "repo://pr-files/{number}",
            name: "PR Changed Files",
            mimeType: "application/json",
            description: "The list of changed files for a specific pull request.",
          },
        ],
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      if (uri === "repo://package-json") {
        const content = await fs.readFile(path.join(config.repoPath, "package.json"), "utf-8");
        return {
          contents: [{ uri, mimeType: "application/json", text: content }],
        };
      }
      if (uri === "repo://routes") {
        const routeMap = await getRouteMapHandler();
        return {
          contents: [{ uri, mimeType: "application/json", text: JSON.stringify(routeMap, null, 2) }],
        };
      }
      if (uri === "repo://design-tokens") {
        const tokensPath = path.join(config.repoPath, "src/styles/design-tokens.ts");
        const content = await fs.readFile(tokensPath, "utf-8");
        return {
          contents: [{ uri, mimeType: "text/typescript", text: content }],
        };
      }
      if (uri.startsWith("repo://diff/")) {
        const prNumber = parseInt(uri.split("/").pop() || "");
        const diff = await getPrDiffHandler({ prNumber });
        return {
          contents: [{ uri, mimeType: "text/plain", text: diff.diffText || "" }],
        };
      }
      if (uri.startsWith("repo://pr-files/")) {
        const prNumber = parseInt(uri.split("/").pop() || "");
        const result = await getPrDiffHandler({ prNumber, includeDiff: false });
        return {
          contents: [{ uri, mimeType: "application/json", text: JSON.stringify(result.files, null, 2) }],
        };
      }
      if (uri === "repo://pr-similarity") {
        const result = await findSimilarPrsHandler({});
        return {
          contents: [{ uri, mimeType: "application/json", text: JSON.stringify(result, null, 2) }],
        };
      }
      if (uri.startsWith("repo://ci/")) {
        const prNumber = parseInt(uri.split("/").pop() || "");
        const logs = await readCiLogsHandler({ prNumber });
        return {
          contents: [{ uri, mimeType: "application/json", text: JSON.stringify(logs, null, 2) }],
        };
      }
      if (uri.startsWith("repo://lighthouse/")) {
        const branch = uri.split("/").pop() || "";
        const report = await runLighthouseHandler({ route: "/", worktreePath: `../boomtick-mcp-rescue-${branch}` });
        return {
          contents: [{ uri, mimeType: "application/json", text: JSON.stringify(report, null, 2) }],
        };
      }
      if (uri.startsWith("repo://playwright/")) {
        const branch = uri.split("/").pop() || "";
        const report = await runPlaywrightHandler({ worktreePath: `../boomtick-mcp-rescue-${branch}` });
        return {
          contents: [{ uri, mimeType: "application/json", text: JSON.stringify(report, null, 2) }],
        };
      }
      throw new Error(`Resource not found: ${uri}`);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "boomtick.health",
            description: "MCP server health check.",
            inputSchema: { type: "object", properties: {} },
          },
          {
            name: "github.find_similar_prs",
            description: "Find PRs touching the same files.",
            inputSchema: {
              type: "object",
              properties: {
                state: { type: "string", enum: ["open", "closed", "all"] },
                maxResults: { type: "number" },
                minSharedFiles: { type: "number" },
              },
            },
          },
          {
            name: "github.triage_pr",
            description: "Deterministic PR triage (fetch, analyze, comment).",
            inputSchema: {
              type: "object",
              properties: {
                prNumber: { type: "number" },
                detailed: { type: "boolean" },
              },
              required: ["prNumber"],
            },
          },
          {
            name: "github.checkout_branch",
            description: "Checkout branch/worktree.",
            inputSchema: {
              type: "object",
              properties: {
                branch: { type: "string" },
                worktreePath: { type: "string" },
              },
              required: ["branch"],
            },
          },
          {
            name: "github.get_merge_conflict_files",
            description: "List merge conflict files for a PR.",
            inputSchema: {
              type: "object",
              properties: {
                prNumber: { type: "number" },
                baseBranch: { type: "string" },
              },
              required: ["prNumber"],
            },
          },
          {
            name: "repo.get_changed_files",
            description: "List changed files between refs.",
            inputSchema: {
              type: "object",
              properties: {
                base: { type: "string" },
                head: { type: "string" },
              },
            },
          },
          {
            name: "repo.get_package_scripts",
            description: "List package.json scripts.",
            inputSchema: { type: "object", properties: {} },
          },
          {
            name: "repo.get_route_map",
            description: "Map routes to content files.",
            inputSchema: { type: "object", properties: {} },
          },
          {
            name: "repo.read_ci_logs",
            description: "Read CI logs for a PR.",
            inputSchema: {
              type: "object",
              properties: {
                prNumber: { type: "number" },
              },
              required: ["prNumber"],
            },
          },
          {
            name: "repo.create_repair_branch",
            description: "Create repair branch from PR.",
            inputSchema: {
              type: "object",
              properties: {
                prNumber: { type: "number" },
                repairBranchName: { type: "string" },
                writeMode: { type: "boolean" },
              },
              required: ["prNumber"],
            },
          },
          {
            name: "repo.run_tests",
            description: "Run repo tests/checks.",
            inputSchema: {
              type: "object",
              properties: {
                commands: { type: "array", items: { type: "string" } },
                timeoutSeconds: { type: "number" },
                worktreePath: { type: "string" },
              },
            },
          },
          {
            name: "repo.run_lighthouse",
            description: "Run Lighthouse CI audits.",
            inputSchema: {
              type: "object",
              properties: {
                route: { type: "string" },
                worktreePath: { type: "string" },
              },
            },
          },
          {
            name: "repo.run_playwright",
            description: "Run Playwright E2E tests.",
            inputSchema: {
              type: "object",
              properties: {
                grep: { type: "string" },
                worktreePath: { type: "string" },
              },
            },
          },
          {
            name: "repo.commit_patch",
            description: "Commit verified repair changes.",
            inputSchema: {
              type: "object",
              properties: {
                worktreePath: { type: "string" },
                message: { type: "string" },
                allowedFiles: { type: "array", items: { type: "string" } },
                writeMode: { type: "boolean" },
              },
              required: ["worktreePath", "message", "allowedFiles"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        switch (request.params.name) {
          case "boomtick.health":
            return createSuccessResult(await healthHandler());
          case "github.find_similar_prs":
            return createSuccessResult(await findSimilarPrsHandler(FindSimilarPrsInputSchema.parse(request.params.arguments || {})));
          case "github.triage_pr":
            return createSuccessResult(await triagePrHandler(TriagePrInputSchema.parse(request.params.arguments)));
          case "github.get_merge_conflict_files":
            return createSuccessResult(await getMergeConflictFilesHandler(GetMergeConflictFilesInputSchema.parse(request.params.arguments)));
          case "github.checkout_branch":
            return createSuccessResult(await checkoutBranchHandler(CheckoutBranchInputSchema.parse(request.params.arguments)));
          case "repo.get_changed_files":
            return createSuccessResult(await getChangedFilesHandler(GetChangedFilesInputSchema.parse(request.params.arguments || {})));
          case "repo.get_package_scripts":
            return createSuccessResult(await getPackageScriptsHandler());
          case "repo.get_route_map":
            return createSuccessResult(await getRouteMapHandler());
          case "repo.read_ci_logs":
            return createSuccessResult(await readCiLogsHandler(ReadCiLogsInputSchema.parse(request.params.arguments)));
          case "repo.create_repair_branch":
            return createSuccessResult(await createRepairBranchHandler(CreateRepairBranchInputSchema.parse(request.params.arguments)));
          case "repo.run_tests":
            return createSuccessResult(await runTestsHandler(RunTestsInputSchema.parse(request.params.arguments || {})));
          case "repo.run_lighthouse":
            return createSuccessResult(await runLighthouseHandler(RunLighthouseInputSchema.parse(request.params.arguments || {})));
          case "repo.run_playwright":
            return createSuccessResult(await runPlaywrightHandler(RunPlaywrightInputSchema.parse(request.params.arguments || {})));
          case "repo.commit_patch":
            return createSuccessResult(await commitPatchHandler(CommitPatchInputSchema.parse(request.params.arguments)));
          default:
            return createErrorResult(`Tool not found: ${request.params.name}`);
        }
      } catch (error) {
        return createErrorResult(error instanceof Error ? error.message : String(error));
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Boomtick MCP Server running on stdio");
  }
}
