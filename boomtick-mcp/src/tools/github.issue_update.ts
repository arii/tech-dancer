import { z } from "zod";
import { runCommand } from "../lib/shell.js";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

export const IssueUpdateInputSchema = z.object({
  issueNumber: z.number().describe("The number of the issue to update."),
  body: z.string().min(1, "Issue body cannot be empty").describe("The new body content for the issue."),
});

const IssueUpdateOutputSchema = z.object({
  status: z.string(),
  issue: z.any().optional(),
  message: z.string().optional(),
});

export async function issueUpdateHandler(args: z.infer<typeof IssueUpdateInputSchema>) {
  const params = IssueUpdateInputSchema.parse(args);

  // Use a secure unique filename to prevent collisions and traversal
  const tmpFile = path.join(os.tmpdir(), `issue-update-${crypto.randomUUID()}.md`);
  await fs.writeFile(tmpFile, params.body);

  try {
    const result = await runCommand("td-cli", ["gh", "issue-update", params.issueNumber.toString(), "--file", tmpFile]);

    if (result.exitCode !== 0) {
      const sanitizedStderr = result.stderr.split("\n")[0] || "Unknown error";
      throw new Error(`Failed to update issue: ${sanitizedStderr}`);
    }

    const output = IssueUpdateOutputSchema.parse(JSON.parse(result.stdout));
    if (output.status === "error") {
      throw new Error(`Failed to update issue: ${output.message}`);
    }

    return { status: "success", issue: output.issue };
  } finally {
    await fs.unlink(tmpFile).catch((err) => {
      console.error(`Warning: Failed to delete temporary file ${tmpFile}:`, err);
    });
  }
}
