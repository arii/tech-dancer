import { z } from "zod";
import { createRepairBranchHandler } from "./repo.create_repair_branch.js";
import { checkoutBranchHandler } from "./github.checkout_branch.js";
import { getPrDiffHandler } from "./github.get_pr_diff.js";
import { readCiLogsHandler } from "./repo.read_ci_logs.js";
import { getChangedFilesHandler } from "./repo.get_changed_files.js";

export const RepairPrepareInputSchema = z.object({
  prNumber: z.number(),
  repairBranchName: z.string().optional(),
  writeMode: z.boolean().optional().default(true)
});

export async function repairPrepareHandler(args: z.input<typeof RepairPrepareInputSchema>) {
  const params = RepairPrepareInputSchema.parse(args);

  // 1. Create repair branch
  const branchInfo = await createRepairBranchHandler({
    prNumber: params.prNumber,
    repairBranchName: params.repairBranchName,
    writeMode: params.writeMode
  });

  // 2. Checkout
  await checkoutBranchHandler({ branch: branchInfo.repairBranch });

  // 3. Gather PR details
  const [diff, files, logs] = await Promise.all([
    getPrDiffHandler({ prNumber: params.prNumber }),
    getChangedFilesHandler({ head: branchInfo.repairBranch, base: "main" }),
    readCiLogsHandler({ prNumber: params.prNumber })
  ]);

  return {
    repairBranch: branchInfo.repairBranch,
    diff,
    files,
    ciLogs: logs
  };
}
