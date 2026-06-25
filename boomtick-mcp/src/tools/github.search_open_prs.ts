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
  const cliArgs = [
    "gh",
    "search-open-prs",
    "--state", params.state,
    "--max-results", params.maxResults.toString()
  ];

  if (params.includeDrafts) {
    cliArgs.push("--include-drafts");
  } else {
    cliArgs.push("--no-include-drafts");
  }

  if (params.labels && params.labels.length > 0) {
    cliArgs.push("--labels", params.labels.join(","));
  }

  const result = await runCommand("td-cli", cliArgs);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to list PRs: ${result.stderr}`);
  }

  const parsed = JSON.parse(result.stdout);
  return { prs: parsed.prs || parsed };
}
