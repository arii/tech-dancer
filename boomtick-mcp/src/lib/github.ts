import { z } from "zod";
import { fail, ok, type ToolResult } from "./result.js";
import { runShell } from "./shell.js";
import type { BoomtickConfig } from "../config.js";

const GhAuthorSchema = z.object({ login: z.string().optional() }).passthrough().optional();
const GhStatusCheckSchema = z.object({ conclusion: z.string().nullable().optional(), status: z.string().nullable().optional() }).passthrough();
const GhPrSchema = z.object({
  number: z.number(),
  title: z.string(),
  author: GhAuthorSchema,
  headRefName: z.string().optional(),
  baseRefName: z.string().optional(),
  isDraft: z.boolean().optional(),
  mergeStateStatus: z.string().optional(),
  reviewDecision: z.string().nullable().optional(),
  statusCheckRollup: z.array(GhStatusCheckSchema).optional(),
  updatedAt: z.string(),
  url: z.string(),
});

export type SearchOpenPrsInput = {
  state?: "open" | "closed" | "all";
  includeDrafts?: boolean;
  maxResults?: number;
  labels?: string[];
};

export type NormalizedPr = {
  number: number;
  title: string;
  author: string;
  headRef: string;
  baseRef: string;
  isDraft: boolean;
  mergeable: "MERGEABLE" | "CONFLICTING" | "UNKNOWN";
  reviewDecision?: string;
  checksConclusion: "SUCCESS" | "FAILURE" | "PENDING" | "UNKNOWN";
  updatedAt: string;
  url: string;
};

function normalizeMergeable(value: string | undefined): NormalizedPr["mergeable"] {
  if (value === "CLEAN" || value === "HAS_HOOKS" || value === "UNSTABLE") return "MERGEABLE";
  if (value === "DIRTY") return "CONFLICTING";
  return "UNKNOWN";
}

function normalizeChecks(checks: Array<{ conclusion?: string | null; status?: string | null }> | undefined): NormalizedPr["checksConclusion"] {
  if (!checks || checks.length === 0) return "UNKNOWN";
  if (checks.some((check) => ["FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED"].includes(check.conclusion ?? ""))) return "FAILURE";
  if (checks.some((check) => (check.status ?? "").toUpperCase() !== "COMPLETED" || !check.conclusion)) return "PENDING";
  if (checks.every((check) => check.conclusion === "SUCCESS" || check.conclusion === "SKIPPED" || check.conclusion === "NEUTRAL")) return "SUCCESS";
  return "UNKNOWN";
}

function githubEnv(): NodeJS.ProcessEnv {
  const token = process.env.CODEX_GH_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  return token ? { GH_TOKEN: token, GITHUB_TOKEN: token } : {};
}

export async function searchOpenPrs(config: BoomtickConfig, input: SearchOpenPrsInput = {}): Promise<ToolResult<{ prs: NormalizedPr[] }>> {
  const state = input.state ?? "open";
  const maxResults = Math.min(Math.max(input.maxResults ?? 30, 1), 100);
  const labelArgs = (input.labels ?? []).map((label) => `--label ${JSON.stringify(label)}`).join(" ");
  const command = [
    "gh pr list",
    `--repo ${config.githubOwner}/${config.githubRepo}`,
    `--state ${state}`,
    `--limit ${maxResults}`,
    labelArgs,
    "--json number,title,author,headRefName,baseRefName,isDraft,mergeStateStatus,reviewDecision,statusCheckRollup,updatedAt,url",
  ].filter(Boolean).join(" ");

  const result = await runShell(command, { cwd: config.repoPath, timeoutMs: 60_000, env: githubEnv() });
  if (result.exitCode !== 0) {
    return fail("github_pr_list_failed", "Failed to list GitHub PRs. Confirm gh is installed and Set CODEX_GH_TOKEN or GITHUB_TOKEN.", result);
  }

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(result.stdout || "[]");
  } catch (error) {
    return fail("github_pr_list_json_failed", "GitHub PR list output was not valid JSON.", String(error));
  }

  const parsed = z.array(GhPrSchema).safeParse(rawJson);
  if (!parsed.success) {
    return fail("github_pr_list_parse_failed", "GitHub PR list output did not match the expected schema.", parsed.error.flatten());
  }

  const prs = parsed.data
    .filter((pr) => input.includeDrafts || !pr.isDraft)
    .map((pr) => ({
      number: pr.number,
      title: pr.title,
      author: pr.author?.login ?? "unknown",
      headRef: pr.headRefName ?? "unknown",
      baseRef: pr.baseRefName ?? "unknown",
      isDraft: pr.isDraft ?? false,
      mergeable: normalizeMergeable(pr.mergeStateStatus),
      reviewDecision: pr.reviewDecision ?? undefined,
      checksConclusion: normalizeChecks(pr.statusCheckRollup),
      updatedAt: pr.updatedAt,
      url: pr.url,
    }));

  return ok({ prs });
}
