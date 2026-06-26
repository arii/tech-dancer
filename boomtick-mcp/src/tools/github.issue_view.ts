import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const IssueViewInputSchema = z.object({
  issueNumber: z.number().describe("The number of the issue to view."),
});

export async function issueViewHandler(args: z.infer<typeof IssueViewInputSchema>) {
  const params = IssueViewInputSchema.parse(args);

  const result = await runCommand("td-cli", ["gh", "issue-view", params.issueNumber.toString()]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to view issue: ${result.stderr}`);
  }

  const output = JSON.parse(result.stdout);
  if (output.status === "error") {
    throw new Error(`Failed to view issue: ${output.message}`);
  }

  return { issue: output.issue };
}
