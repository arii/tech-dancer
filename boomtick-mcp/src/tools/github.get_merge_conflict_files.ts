import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const GetMergeConflictFilesInputSchema = z.object({
  prNumber: z.number(),
  baseBranch: z.string().optional().default("main"),
});

export async function getMergeConflictFilesHandler(args: z.infer<typeof GetMergeConflictFilesInputSchema>) {
  const result = await runCommand("td-cli", [
    "gh",
    "get-merge-conflict-files",
    args.prNumber.toString(),
    "--base-branch",
    args.baseBranch
  ]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to get merge conflict files: ${result.stderr}`);
  }

  return JSON.parse(result.stdout);
}
