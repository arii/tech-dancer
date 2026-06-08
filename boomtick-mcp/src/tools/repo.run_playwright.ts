import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const RunPlaywrightInputSchema = z.object({
  grep: z.string().optional(),
  worktreePath: z.string().optional(),
});

export async function runPlaywrightHandler(args: z.infer<typeof RunPlaywrightInputSchema>) {
  const playwrightArgs = ["playwright", "test", "--reporter=json"];
  if (args.grep) {
    playwrightArgs.push("--grep", args.grep);
  }

  const results = await runCommand("pnpm", playwrightArgs, { cwd: args.worktreePath });

  let failedTests = [];
  try {
    if (results.stdout.includes("{")) {
      const report = JSON.parse(results.stdout.substring(results.stdout.indexOf("{")));
      failedTests = report.suites.flatMap((s: any) =>
        s.specs.filter((spec: any) => !spec.ok).map((spec: any) => ({
          title: spec.title,
          file: spec.file,
          error: spec.tests?.[0]?.results?.[0]?.error?.message || "Unknown error"
        }))
      );
    }
  } catch (e) {}

  return {
    success: results.exitCode === 0,
    command: results.command,
    failedTests
  };
}
