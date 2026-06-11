import { z } from "zod";
import { runCommand } from "../lib/shell.js";
import { createWorktree, removeWorktree } from "../lib/git.js";
import { config } from "../config.js";

export const GetMergeConflictFilesInputSchema = z.object({
  prNumber: z.number(),
  baseBranch: z.string().optional().default("main"),
});

export async function getMergeConflictFilesHandler(args: z.infer<typeof GetMergeConflictFilesInputSchema>) {
  // Get PR head ref
  const prResult = await runCommand("gh", [
    "pr",
    "view",
    args.prNumber.toString(),
    "--json", "headRefName"
  ]);

  if (prResult.exitCode !== 0) {
    throw new Error(`Failed to get PR head ref: ${prResult.stderr}`);
  }

  const { headRefName } = JSON.parse(prResult.stdout);

  // Ensure we have the latest
  await runCommand("git", ["fetch", "origin", headRefName]);
  await runCommand("git", ["fetch", "origin", args.baseBranch]);

  const worktreePath = await createWorktree(`origin/${headRefName}`, args.prNumber);
  let conflictFiles: string[] = [];
  let commandLog = "";

  try {
    const mergeResult = await runCommand("git", ["merge", "--no-commit", "--no-ff", `origin/${args.baseBranch}`], { cwd: worktreePath });
    commandLog = mergeResult.stdout + mergeResult.stderr;

    if (mergeResult.exitCode !== 0) {
      const diffResult = await runCommand("git", ["diff", "--name-only", "--diff-filter=U"], { cwd: worktreePath });
      conflictFiles = diffResult.stdout.trim().split("\n").filter(l => l.length > 0);

      await runCommand("git", ["merge", "--abort"], { cwd: worktreePath });
    }
  } finally {
    await removeWorktree(worktreePath);
  }

  return {
    prNumber: args.prNumber,
    baseBranch: args.baseBranch,
    headRef: headRefName,
    conflictFiles,
    commandLog
  };
}
