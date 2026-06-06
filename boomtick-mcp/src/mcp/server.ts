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
import { searchOpenPrsHandler, SearchOpenPrsInputSchema } from "../tools/github.search_open_prs.js";
import { getPrDiffHandler, GetPrDiffInputSchema } from "../tools/github.get_pr_diff.js";
import { getMergeConflictFilesHandler, GetMergeConflictFilesInputSchema } from "../tools/github.get_merge_conflict_files.js";
import { checkoutBranchHandler, CheckoutBranchInputSchema } from "../tools/github.checkout_branch.js";
import { getChangedFilesHandler, GetChangedFilesInputSchema } from "../tools/repo.get_changed_files.js";
import { getPackageScriptsHandler, GetPackageScriptsInputSchema } from "../tools/repo.get_package_scripts.js";
import { getRouteMapHandler, GetRouteMapInputSchema } from "../tools/repo.get_route_map.js";
import { readCiLogsHandler, ReadCiLogsInputSchema } from "../tools/repo.read_ci_logs.js";
import { createRepairBranchHandler, CreateRepairBranchInputSchema } from "../tools/repo.create_repair_branch.js";
import { runTestsHandler, RunTestsInputSchema } from "../tools/repo.run_tests.js";
import { runLighthouseHandler, RunLighthouseInputSchema } from "../tools/repo.run_lighthouse.js";
import { runPlaywrightHandler, RunPlaywrightInputSchema } from "../tools/repo.run_playwright.js";
import { commitPatchHandler, CommitPatchInputSchema } from "../tools/repo.commit_patch.js";
import { openReplacementPrHandler, OpenReplacementPrInputSchema } from "../tools/github.open_replacement_pr.js";
import { commentTriageSummaryHandler, CommentTriageSummaryInputSchema } from "../tools/github.comment_triage_summary.js";
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
      if (!/^[a-zA-Z0-9_-]+$/.test(name)) throw new Error("Invalid agent name");
      // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      const promptPath = path.join(config.repoPath, `boomtick-mcp/src/agents/${name}.prompt.md`);
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
          contents: [{ uri, mimeType: "text/plain", text: diff.diffText }],
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
            description: "Check the health and configuration of the MCP server.",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "github.search_open_prs",
            description: "Search for open pull requests in the repository.",
            inputSchema: {
              type: "object",
              properties: {
                state: { type: "string", enum: ["open", "closed", "all"] },
                includeDrafts: { type: "boolean" },
                maxResults: { type: "number" },
                labels: { type: "array", items: { type: "string" } },
              },
            },
          },
          {
            name: "github.get_pr_diff",
            description: "Get the diff and changed files for a pull request.",
            inputSchema: {
              type: "object",
              properties: {
                prNumber: { type: "number" },
              },
              required: ["prNumber"],
            },
          },
          {
            name: "github.checkout_branch",
            description: "Checkout a specific branch in the repository or worktree.",
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
            description: "Detect files that conflict when a PR is merged with the base branch.",
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
            description: "Get the list of changed files between two refs.",
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
            description: "Get the scripts defined in package.json.",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "repo.get_route_map",
            description: "Get the mapping of routes to content files.",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "repo.read_ci_logs",
            description: "Read CI logs for a given pull request.",
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
            description: "Create a new repair branch from a PR branch.",
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
            description: "Run repository tests and checks.",
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
          {
            name: "github.open_replacement_pr",
            description: "Open a new PR that replaces or repairs the original PR.",
            inputSchema: {
              type: "object",
              properties: {
                originalPrNumber: { type: "number" },
                repairBranch: { type: "string" },
                baseBranch: { type: "string" },
                title: { type: "string" },
                body: { type: "string" },
                draft: { type: "boolean" },
                worktreePath: { type: "string" },
                pushMode: { type: "boolean" },
              },
              required: ["originalPrNumber", "repairBranch", "baseBranch", "title", "body"],
            },
          },
          {
            name: "github.comment_triage_summary",
            description: "Comment on the original PR with a diagnosis and replacement link.",
            inputSchema: {
              type: "object",
              properties: {
                prNumber: { type: "number" },
                body: { type: "string" },
              },
              required: ["prNumber", "body"],
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
          case "github.search_open_prs":
            return createSuccessResult(await searchOpenPrsHandler(SearchOpenPrsInputSchema.parse(request.params.arguments || {})));
          case "github.get_pr_diff":
            return createSuccessResult(await getPrDiffHandler(GetPrDiffInputSchema.parse(request.params.arguments)));
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
          case "github.open_replacement_pr":
            return createSuccessResult(await openReplacementPrHandler(OpenReplacementPrInputSchema.parse(request.params.arguments)));
          case "github.comment_triage_summary":
            return createSuccessResult(await commentTriageSummaryHandler(CommentTriageSummaryInputSchema.parse(request.params.arguments)));
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
