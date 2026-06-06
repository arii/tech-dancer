import { runCommand } from "./shell.js";
import { config } from "../config.js";
import path from "path";
import fs from "fs/promises";

export async function createWorktree(branch: string, prNumber: number): Promise<string> {
  const safePrNumber = parseInt(prNumber.toString(), 10);
  if (isNaN(safePrNumber)) throw new Error("Invalid PR number");
  // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  const worktreePath = path.resolve(config.repoPath, `../boomtick-mcp-rescue-${safePrNumber}`);

  // Clean up if exists
  try {
    await fs.rm(worktreePath, { recursive: true, force: true });
    await runCommand("git", ["worktree", "prune"]);
  } catch (e) {}

  const result = await runCommand("git", ["worktree", "add", "-b", `repair-pr-${prNumber}-${Date.now()}`, worktreePath, branch]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to create worktree: ${result.stderr}`);
  }

  return worktreePath;
}

export async function removeWorktree(worktreePath: string): Promise<void> {
  await runCommand("git", ["worktree", "remove", "--force", worktreePath]);
  await runCommand("git", ["worktree", "prune"]);
}
