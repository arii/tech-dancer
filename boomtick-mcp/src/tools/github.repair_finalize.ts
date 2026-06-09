import { z } from "zod";
import { commitPatchHandler } from "./repo.commit_patch.js";
import { verifyRepairHandler } from "./repo.verify_repair.js";
import { openReplacementPrHandler } from "./github.open_replacement_pr.js";
import { commentTriageSummaryHandler } from "./github.comment_triage_summary.js";

export const RepairFinalizeInputSchema = z.object({
  prNumber: z.number(),
  repairBranch: z.string(),
  message: z.string(),
  allowedFiles: z.array(z.string()),
  worktreePath: z.string().optional(),
  pushMode: z.boolean().optional().default(true)
});

export async function repairFinalizeHandler(args: z.input<typeof RepairFinalizeInputSchema>) {
  const params = RepairFinalizeInputSchema.parse(args);

  // 1. Commit changes
  await commitPatchHandler({
    worktreePath: params.worktreePath || "",
    message: params.message,
    allowedFiles: params.allowedFiles,
    writeMode: true
  });

  // 2. Verify
  const verification = await verifyRepairHandler({ worktreePath: params.worktreePath });

  // 3. Open replacement PR
  const pr = await openReplacementPrHandler({
    originalPrNumber: params.prNumber,
    repairBranch: params.repairBranch,
    baseBranch: "main", // Assuming main for repairs
    title: `fix: conflict repair for #${params.prNumber}`,
    body: `Automated repair for PR #${params.prNumber}.\n\nVerification Status: ${verification.status}`,
    pushMode: params.pushMode,
    draft: false
  });

  // 4. Comment on original PR
  await commentTriageSummaryHandler({
    prNumber: params.prNumber,
    body: `🔧 Repair complete. Replacement PR: ${pr.url}`
  });

  return {
    status: "SUCCESS",
    replacementPrUrl: pr.url,
    verification
  };
}
