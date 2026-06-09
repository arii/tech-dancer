import { runCommand } from "./shell.js";

export async function listPrs(params: {
  state?: "open" | "closed" | "all";
  maxResults?: number;
  includeFiles?: boolean;
  labels?: string[];
  includeDrafts?: boolean;
}) {
  const fields = ["number", "title", "author", "headRefName", "baseRefName", "isDraft", "mergeStateStatus", "reviewDecision", "statusCheckRollup", "updatedAt", "url"];
  if (params.includeFiles) fields.push("files");

  const ghArgs = [
    "pr",
    "list",
    "--state", params.state || "open",
    "--limit", (params.maxResults || 10).toString(),
    "--json", fields.join(",")
  ];

  if (params.labels && params.labels.length > 0) {
    ghArgs.push("--label", params.labels.join(","));
  }

  const result = await runCommand("gh", ghArgs);
  if (result.exitCode !== 0) throw new Error(`Failed to list PRs: ${result.stderr}`);

  let prs = JSON.parse(result.stdout);
  if (params.includeDrafts === false) {
    prs = prs.filter((pr: any) => !pr.isDraft);
  }
  return prs;
}

export async function getPrDiff(params: { prNumber: number; includeDiff?: boolean }) {
  const filesResult = await runCommand("gh", ["pr", "view", params.prNumber.toString(), "--json", "files"]);
  if (filesResult.exitCode !== 0) throw new Error(`Failed to get PR files: ${filesResult.stderr}`);
  const { files } = JSON.parse(filesResult.stdout);

  let diffText = "";
  if (params.includeDiff !== false) {
    const res = await runCommand("gh", ["pr", "diff", params.prNumber.toString()]);
    if (res.exitCode !== 0) throw new Error(`Failed to get PR diff: ${res.stderr}`);
    diffText = res.stdout.length > 50000 ? res.stdout.substring(0, 50000) + "\n[Truncated]" : res.stdout;
  }

  return {
    prNumber: params.prNumber,
    files: files.map((f: any) => ({
      path: f.path,
      status: f.status || "modified",
      additions: f.additions,
      deletions: f.deletions
    })),
    diffText: params.includeDiff !== false ? diffText : undefined
  };
}

export async function createPr(params: {
  baseBranch: string;
  repairBranch: string;
  title: string;
  body: string;
  draft?: boolean;
  worktreePath?: string;
}) {
  const prArgs = ["pr", "create", "--base", params.baseBranch, "--head", params.repairBranch, "--title", params.title, "--body", params.body];
  if (params.draft) prArgs.push("--draft");

  const result = await runCommand("gh", prArgs, { cwd: params.worktreePath });
  if (result.exitCode !== 0) throw new Error(`Failed to create PR: ${result.stderr}`);
  return result.stdout.trim();
}

export async function commentPr(params: { prNumber: number; body: string }) {
  const result = await runCommand("gh", ["pr", "comment", params.prNumber.toString(), "--body", params.body]);
  if (result.exitCode !== 0) throw new Error(`Failed to comment on PR: ${result.stderr}`);
  return result.stdout.trim();
}
