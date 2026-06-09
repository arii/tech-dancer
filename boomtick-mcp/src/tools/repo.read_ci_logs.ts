import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const ReadCiLogsInputSchema = z.object({
  prNumber: z.number(),
});

export async function readCiLogsHandler(args: z.infer<typeof ReadCiLogsInputSchema>) {
  // Use gh api to find the latest check runs for the PR's head SHA
  const prResult = await runCommand("gh", [
    "pr",
    "view",
    args.prNumber.toString(),
    "--json", "headRefOid"
  ]);

  if (prResult.exitCode !== 0) {
    throw new Error(`Failed to get PR head SHA: ${prResult.stderr}`);
  }

  const { headRefOid } = JSON.parse(prResult.stdout);

  const checksResult = await runCommand("gh", [
    "api",
    `/repos/:owner/:repo/commits/${headRefOid}/check-runs`,
    "--jq", ".check_runs[] | {id, name, status, conclusion, html_url}"
  ]);

  if (checksResult.exitCode !== 0) {
    throw new Error(`Failed to get check runs: ${checksResult.stderr}`);
  }

  const checks = checksResult.stdout.trim().split("\n").filter(l => l.length > 0).map(l => JSON.parse(l));
  const failedChecks = checks.filter((c: any) => c.conclusion === "failure");

  const logs: Record<string, string> = {};

  // First, find the run_id for this SHA
  const runsResult = await runCommand("gh", [
    "api",
    `/repos/:owner/:repo/commits/${headRefOid}/check-suites`
  ]);

  if (runsResult.exitCode === 0) {
     const checkSuites = JSON.parse(runsResult.stdout).check_suites;
     // For each suite, find the associated workflow run and its jobs
     for (const suite of checkSuites) {
        const jobsResult = await runCommand("gh", [
          "api",
          `/repos/:owner/:repo/check-suites/${suite.id}/check-runs`
        ]);

        if (jobsResult.exitCode === 0) {
           const runs = JSON.parse(jobsResult.stdout).check_runs;
           for (const run of runs) {
              if (run.conclusion === "failure") {
                 // GitHub Actions usually stores the job_id in the external_id or we can find it via actions/runs
                 // For MVP, we'll try to find the job log by its name or ID if it maps
                 const logResult = await runCommand("gh", [
                    "api",
                    `/repos/:owner/:repo/actions/jobs/${run.id}/logs`
                 ]);
                 if (logResult.exitCode === 0) {
                    logs[run.name] = logResult.stdout.substring(0, 10000);
                 }
              }
           }
        }
     }
  }

  return { checks, failedChecks, logs };
}
