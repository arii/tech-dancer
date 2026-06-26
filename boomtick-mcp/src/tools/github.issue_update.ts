import { z } from "zod";
import { runCommand } from "../lib/shell.js";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const IssueUpdateInputSchema = z.object({
  issueNumber: z.number().describe("The number of the issue to update."),
  body: z.string().describe("The new body content for the issue."),
});

export async function issueUpdateHandler(args: z.infer<typeof IssueUpdateInputSchema>) {
  const params = IssueUpdateInputSchema.parse(args);

  // Create a temporary file for the body as the CLI expects a file path
  const tmpFile = path.join(os.tmpdir(), `issue-update-${params.issueNumber}-${Date.now()}.md`);
  await fs.writeFile(tmpFile, params.body);

  try {
    const result = await runCommand("td-cli", ["gh", "issue-update", params.issueNumber.toString(), "--file", tmpFile]);

    if (result.exitCode !== 0) {
      throw new Error(`Failed to update issue: ${result.stderr}`);
    }

    const output = JSON.parse(result.stdout);
    if (output.status === "error") {
      throw new Error(`Failed to update issue: ${output.message}`);
    }

    return { status: "success", issue: output.issue };
  } finally {
    await fs.unlink(tmpFile).catch(() => {});
  }
}
