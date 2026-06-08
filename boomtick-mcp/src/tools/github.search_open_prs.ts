import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const SearchOpenPrsInputSchema = z.object({
  state: z.enum(["open", "closed", "all"]).optional().default("open"),
  includeDrafts: z.boolean().optional().default(true),
  maxResults: z.number().optional().default(10),
  labels: z.array(z.string()).optional(),
});

export async function searchOpenPrsHandler(args: z.infer<typeof SearchOpenPrsInputSchema>) {
  const params = SearchOpenPrsInputSchema.parse(args);
  const ghArgs = [
    "pr",
    "list",
    "--state", params.state,
    "--limit", params.maxResults.toString(),
    "--json", "number,title,author,headRefName,baseRefName,isDraft,mergeStateStatus,reviewDecision,statusCheckRollup,updatedAt,url"
  ];

  if (params.labels && params.labels.length > 0) {
    ghArgs.push("--label", params.labels.join(","));
  }

  const result = await runCommand("gh", ghArgs);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to list PRs: ${result.stderr}`);
  }

  let prs = JSON.parse(result.stdout);

  if (!params.includeDrafts) {
    prs = prs.filter((pr: unknown) => !pr.isDraft);
  }

  return { prs };
}
