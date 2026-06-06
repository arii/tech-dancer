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
import fs from "fs/promises";
import path from "path";
import { config } from "../config.js";
import { TOOLS } from "./tools.js";

// Tool handlers
import { handleSearchOpenPrs } from "../tools/github.search_open_prs.js";
import { handleGetPrDiff } from "../tools/github.get_pr_diff.js";
import { handleCommentTriageSummary } from "../tools/github.comment_triage_summary.js";
import { handleCheckoutBranch } from "../tools/github.checkout_branch.js";
import { handleGetChangedFiles } from "../tools/repo.get_changed_files.js";
import { handleGetPackageScripts } from "../tools/repo.get_package_scripts.js";
import { handleRunTests } from "../tools/repo.run_tests.js";
import { handleReadCiLogs } from "../tools/repo.read_ci_logs.js";
import { handleCreateRepairBranch } from "../tools/repo.create_repair_branch.js";
import { handleGetMergeConflictFiles } from "../tools/github.get_merge_conflict_files.js";
import { handleCommitPatch } from "../tools/repo.commit_patch.js";
import { handleOpenReplacementPr } from "../tools/github.open_replacement_pr.js";
import { handleRunPlaywright } from "../tools/repo.run_playwright.js";
import { handleRunLighthouse } from "../tools/repo.run_lighthouse.js";

export class BoomtickMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "boomtick-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // 1. Resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          { uri: "repo://package-json", name: "package.json", mimeType: "application/json" },
          { uri: "repo://vite-config", name: "vite.config.ts", mimeType: "text/typescript" },
          { uri: "repo://playwright-config", name: "playwright.config.ts", mimeType: "text/typescript" },
          { uri: "repo://detect-antipatterns", name: "scripts/detect-antipatterns.mjs", mimeType: "text/javascript" },
          { uri: "repo://agents-md", name: "AGENTS.md", mimeType: "text/markdown" },
        ],
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uriMap: Record<string, string> = {
        "repo://package-json": "package.json",
        "repo://vite-config": "vite.config.ts",
        "repo://playwright-config": "playwright.config.ts",
        "repo://detect-antipatterns": "scripts/detect-antipatterns.mjs",
        "repo://agents-md": "AGENTS.md",
      };

      const filepath = uriMap[request.params.uri];
      if (!filepath) throw new Error("Resource not found");

      // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      const absolutePath = path.join(config.repoPath, filepath);
      const content = await fs.readFile(absolutePath, "utf-8");

      return {
        contents: [{ uri: request.params.uri, mimeType: "text/plain", text: content }],
      };
    });

    // 2. Prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: [
          { name: "conflict-scout", description: "Prompt for analyzing merge conflicts" },
          { name: "repo-context", description: "Prompt for gathering repository context" },
          { name: "repair-agent", description: "Prompt for generating code patches" },
          { name: "verifier-agent", description: "Prompt for verifying fixes via tests" },
          { name: "pr-writer", description: "Prompt for writing replacement PR descriptions" },
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
      } catch (e: any) {
        throw new Error(`Prompt template not found: ${name}`);
      }
    });

    // 3. Tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: TOOLS };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;

        switch (name) {
          // Discovery Phase
          case "github.search_open_prs": return await handleSearchOpenPrs(args);
          case "github.get_pr_diff": return await handleGetPrDiff(args);
          case "github.get_merge_conflict_files": return await handleGetMergeConflictFiles(args);
          case "github.checkout_branch": return await handleCheckoutBranch(args);

          // Context Phase
          case "repo.get_changed_files": return await handleGetChangedFiles(args);
          case "repo.get_package_scripts": return await handleGetPackageScripts();
          case "repo.read_ci_logs": return await handleReadCiLogs(args);

          // Action Phase (Safety checks enforced within handlers via input validation)
          case "repo.create_repair_branch": return await handleCreateRepairBranch(args);
          case "repo.commit_patch": return await handleCommitPatch(args);

          // Verification Phase
          case "repo.run_tests": return await handleRunTests(args);
          case "repo.run_playwright": return await handleRunPlaywright(args);
          case "repo.run_lighthouse": return await handleRunLighthouse(args);

          // Resolution Phase
          case "github.open_replacement_pr": return await handleOpenReplacementPr(args);
          case "github.comment_triage_summary": return await handleCommentTriageSummary(args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    // console.error is used here because stdout is used for MCP communication
    console.error("Boomtick MCP Server started on stdio");
  }
}
