import { z } from "zod";
import { runCommand } from "../lib/shell.js";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

export const IssueCommentInputSchema = z.object({
  issueNumber: z.number().describe("The number of the issue to comment on."),
  body: z.string().min(1, "Comment body cannot be empty").describe("The content of the comment."),
});

const IssueCommentOutputSchema = z.object({
  status: z.string(),
  comment: z.any().optional(),
  message: z.string().optional(),
});

export async function issueCommentHandler(args: z.infer<typeof IssueCommentInputSchema>) {
  const params = IssueCommentInputSchema.parse(args);

  // Use a secure unique filename to prevent collisions and traversal
  const tmpFile = path.join(os.tmpdir(), `issue-comment-${crypto.randomUUID()}.md`);
  await fs.writeFile(tmpFile, params.body);

  try {
    const result = await runCommand("td-cli", ["gh", "issue-comment", params.issueNumber.toString(), "--file", tmpFile]);

    if (result.exitCode !== 0) {
      const sanitizedStderr = result.stderr.split("\n")[0] || "Unknown error";
      throw new Error(`Failed to post comment: ${sanitizedStderr}`);
    }

    const output = IssueCommentOutputSchema.parse(JSON.parse(result.stdout));
    if (output.status === "error") {
      throw new Error(`Failed to post comment: ${output.message}`);
    }

    return { status: "success", comment: output.comment };
  } finally {
    await fs.unlink(tmpFile).catch((err) => {
      console.error(`Warning: Failed to delete temporary file ${tmpFile}:`, err);
    });
  }
}
