import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const SearchOpenPrsInputSchema = z.object({
  state: z.enum(["open", "closed", "all"]).optional().default("open"),
  includeDrafts: z.boolean().optional().default(true),
  maxResults: z.number().optional().default(10),
  labels: z.array(z.string()).optional(),
});

export async function searchOpenPrsHandler(args: z.infer<typeof SearchOpenPrsInputSchema>) {
  const ghArgs = [
    "pr",
    "list",
    "--state", args.state,
    "--limit", args.maxResults.toString(),
    "--json", "number,title,author,headRefName,baseRefName,isDraft,mergeStateStatus,reviewDecision,statusCheckRollup,updatedAt,url"
  ];

  if (args.labels && args.labels.length > 0) {
    ghArgs.push("--label", args.labels.join(","));
  }

  const result = await runCommand("gh", ghArgs);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to list PRs: ${result.stderr}`);
  }

  let prs = JSON.parse(result.stdout);

  if (!args.includeDrafts) {
    prs = prs.filter((pr: any) => !pr.isDraft);
  }

  return { prs };
}
