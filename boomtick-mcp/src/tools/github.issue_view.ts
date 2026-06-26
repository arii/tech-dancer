import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const IssueViewInputSchema = z.object({
  issueNumber: z.number().describe("The number of the issue to view."),
});

const IssueViewOutputSchema = z.object({
  status: z.string(),
  issue: z.object({
    number: z.number(),
    title: z.string(),
    body: z.string().nullable().optional(),
    state: z.string(),
  }).optional(),
  message: z.string().optional(),
});

function sanitizeError(stderr: string): string {
  // Take first line and truncate to 200 chars
  return (stderr.split("\n")[0] || "Unknown error").slice(0, 200);
}

export async function issueViewHandler(args: z.infer<typeof IssueViewInputSchema>) {
  const params = IssueViewInputSchema.parse(args);

  const result = await runCommand("td-cli", ["gh", "issue-view", params.issueNumber.toString()]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to view issue: ${sanitizeError(result.stderr)}`);
  }

  const output = IssueViewOutputSchema.parse(JSON.parse(result.stdout));
  if (output.status === "error") {
    throw new Error(`Failed to view issue: ${output.message}`);
  }

  return { issue: output.issue };
}
