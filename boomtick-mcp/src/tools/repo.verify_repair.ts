import { z } from "zod";
import { runTestsHandler } from "./repo.run_tests.js";
import { runLighthouseHandler } from "./repo.run_lighthouse.js";
import { runPlaywrightHandler } from "./repo.run_playwright.js";

export const VerifyRepairInputSchema = z.object({
  worktreePath: z.string().optional(),
  runE2E: z.boolean().optional().default(false),
  runLighthouse: z.boolean().optional().default(false)
});

export async function verifyRepairHandler(args: z.input<typeof VerifyRepairInputSchema>) {
  const params = VerifyRepairInputSchema.parse(args);

  // Standard verification (lint + test)
  const testResults = await runTestsHandler({
    worktreePath: params.worktreePath,
    commands: ["pnpm run lint", "pnpm run test"],
    timeoutSeconds: 300
  });

  const report: any = {
    status: testResults.success ? "PASSED" : "FAILED",
    lintAndTest: testResults
  };

  if (params.runE2E) {
    report.e2e = await runPlaywrightHandler({ worktreePath: params.worktreePath });
    if (report.e2e.exitCode !== 0) report.status = "FAILED";
  }

  if (params.runLighthouse) {
    report.lighthouse = await runLighthouseHandler({ worktreePath: params.worktreePath, route: "/" });
    // Lighthouse failures usually don't block repair but we report them
  }

  return report;
}
