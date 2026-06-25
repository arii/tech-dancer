import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const GetPrDiffInputSchema = z.object({
  prNumber: z.number(),
});

export async function getPrDiffHandler(args: z.infer<typeof GetPrDiffInputSchema>) {
  const result = await runCommand("td-cli", [
    "gh",
    "get-pr-diff",
    args.prNumber.toString()
  ]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to get PR diff: ${result.stderr}`);
  }

  return JSON.parse(result.stdout);
}
