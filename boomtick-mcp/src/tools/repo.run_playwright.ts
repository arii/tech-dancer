import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const RunPlaywrightInputSchema = z.object({
  grep: z.string().optional(),
  worktreePath: z.string().optional(),
});

export async function runPlaywrightHandler(args: z.infer<typeof RunPlaywrightInputSchema>) {
  const cliArgs = ["test", "run-playwright"];

  if (args.grep) {
    cliArgs.push("--grep", args.grep);
  }

  if (args.worktreePath) {
    cliArgs.push("--worktree-path", args.worktreePath);
  }

  const results = await runCommand("td-cli", cliArgs);

  if (results.exitCode !== 0 && !results.stdout) {
    throw new Error(`Failed to run Playwright: ${results.stderr}`);
  }

  return JSON.parse(results.stdout);
}
