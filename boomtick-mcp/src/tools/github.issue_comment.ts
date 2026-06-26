import { z } from "zod";
import { runCommand } from "../lib/shell.js";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const IssueCommentInputSchema = z.object({
  issueNumber: z.number().describe("The number of the issue to comment on."),
  body: z.string().describe("The content of the comment."),
});

export async function issueCommentHandler(args: z.infer<typeof IssueCommentInputSchema>) {
  const params = IssueCommentInputSchema.parse(args);

  // Create a temporary file for the body as the CLI expects a file path
  const tmpFile = path.join(os.tmpdir(), `issue-comment-${params.issueNumber}-${Date.now()}.md`);
  await fs.writeFile(tmpFile, params.body);

  try {
    const result = await runCommand("td-cli", ["gh", "issue-comment", params.issueNumber.toString(), "--file", tmpFile]);

    if (result.exitCode !== 0) {
      throw new Error(`Failed to post comment: ${result.stderr}`);
    }

    const output = JSON.parse(result.stdout);
    if (output.status === "error") {
      throw new Error(`Failed to post comment: ${output.message}`);
    }

    // After review feedback, CLI now returns { "status": "success", "comment": { ... } }
    // When flattened by CLI 'out', it becomes { "status": "success", "comment": { ... } } at top level.
    return { status: "success", comment: output.comment };
  } finally {
    await fs.unlink(tmpFile).catch(() => {});
  }
}
