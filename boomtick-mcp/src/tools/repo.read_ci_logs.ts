import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const ReadCiLogsInputSchema = z.object({
  prNumber: z.number(),
});

export async function readCiLogsHandler(args: z.infer<typeof ReadCiLogsInputSchema>) {
  const result = await runCommand("td-cli", [
    "gh",
    "read-ci-logs",
    args.prNumber.toString()
  ]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to read CI logs: ${result.stderr}`);
  }

  return JSON.parse(result.stdout);
}
