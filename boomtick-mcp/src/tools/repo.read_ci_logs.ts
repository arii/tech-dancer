import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const ReadCiLogsInputSchema = z.object({
  prNumber: z.number(),
});

export async function readCiLogsHandler(args: z.infer<typeof ReadCiLogsInputSchema>) {
  const result = await runCommand("td-cli", [
    "repo", "ci-logs", args.prNumber.toString()
  ]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to get CI logs: ${result.stderr}`);
  }

  const output = JSON.parse(result.stdout);
  if (output.status === "error") {
    throw new Error(`Failed to get CI logs: ${output.message}`);
  }

  return {
    checks: output.checks,
    failedChecks: output.failedChecks,
    logs: output.logs
  };
}
