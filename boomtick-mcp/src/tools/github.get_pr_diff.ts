import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const GetPrDiffInputSchema = z.object({
  prNumber: z.number(),
  includeDiff: z.boolean().optional().default(true),
});

export async function getPrDiffHandler(args: z.infer<typeof GetPrDiffInputSchema>) {
  const params = GetPrDiffInputSchema.parse(args);

  // Get files list
  const filesResult = await runCommand("gh", [
    "pr",
    "view",
    args.prNumber.toString(),
    "--json", "files"
  ]);

  if (filesResult.exitCode !== 0) {
    throw new Error(`Failed to get PR files: ${filesResult.stderr}`);
  }

  const { files } = JSON.parse(filesResult.stdout);

  let diffText = "";
  let truncated = false;

  if (params.includeDiff) {
    // Get diff text
    const diffResult = await runCommand("gh", [
      "pr",
      "diff",
      params.prNumber.toString()
    ]);

    if (diffResult.exitCode !== 0) {
      throw new Error(`Failed to get PR diff: ${diffResult.stderr}`);
    }

    diffText = diffResult.stdout;
    const MAX_DIFF_SIZE = 50000; // 50KB limit for now

    if (diffText.length > MAX_DIFF_SIZE) {
      diffText = diffText.substring(0, MAX_DIFF_SIZE) + "\n\n... [Diff truncated due to size] ...";
      truncated = true;
    }
  }

  return {
    prNumber: params.prNumber,
    files: files.map((f: any) => ({
      path: f.path,
      status: f.status || "modified", // gh pr view --json files doesn't always provide status in same way as API
      additions: f.additions,
      deletions: f.deletions
    })),
    diffText: params.includeDiff ? diffText : undefined,
    truncated: params.includeDiff ? truncated : undefined
  };
}
