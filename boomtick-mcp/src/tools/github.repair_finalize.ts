import { z } from "zod";
import { commitPatchHandler } from "./repo.commit_patch.js";
import { verifyRepairHandler } from "./repo.verify_repair.js";
import { createPr, commentPr } from "../lib/gh.js";
import { runCommand } from "../lib/shell.js";

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

  if (params.pushMode) {
    // 3. Push branch
    await runCommand("git", ["push", "origin", params.repairBranch], { cwd: params.worktreePath });

    // 4. Open replacement PR
    const url = await createPr({
      baseBranch: "main",
      repairBranch: params.repairBranch,
      title: `fix: conflict repair for #${params.prNumber}`,
      body: `Automated repair for PR #${params.prNumber}.\n\nVerification Status: ${verification.status}`,
      draft: false,
      worktreePath: params.worktreePath
    });

    // 5. Comment on original PR
    await commentPr({
      prNumber: params.prNumber,
      body: `🔧 Repair complete. Replacement PR: ${url}`
    });

    return {
      status: "SUCCESS",
      replacementPrUrl: url,
      verification
    };
  }

  return {
    status: "DRY_RUN",
    verification
  };
}
