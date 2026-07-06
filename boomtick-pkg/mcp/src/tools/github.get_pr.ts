import { z } from "zod";
import { runTDCli } from "../lib/td-cli.js";
import { sanitizeError } from "../lib/error_utils.js";

export const GetPrInputSchema = z.object({
  pr_number: z.number().describe("The pull-request number."),
});

const GetPrOutputSchema = z.object({
  status: z.string(),
  pr: z.object({
    number: z.number(),
    title: z.string(),
    body: z.string().nullable().optional(),
    state: z.string(),
    headRefName: z.string().optional(),
    baseRefName: z.string().optional(),
    html_url: z.string().optional(),
    author: z.string().optional(),
  }).optional(),
  message: z.string().optional(),
});

export async function getPrHandler(args: z.infer<typeof GetPrInputSchema>) {
  const params = GetPrInputSchema.parse(args);

  try {
    const output = await runTDCli(["gh", "view", params.pr_number.toString()]);
    const parsedOutput = GetPrOutputSchema.parse(output);

    if (parsedOutput.status === "error") {
      throw new Error(\`Failed to view PR: \${parsedOutput.message}\`);
    }

    return { pr: parsedOutput.pr };
  } catch (error) {
    throw new Error(\`Failed to view PR: \${sanitizeError(String(error))}\`);
  }
}
