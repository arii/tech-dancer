import { z } from "zod";
import { getMergeConflictFilesHandler } from "./github.get_merge_conflict_files.js";
import { repairPrepareHandler } from "./github.repair_prepare.js";
import { repairFinalizeHandler } from "./github.repair_finalize.js";
import fs from "fs/promises";
import path from "path";
import { config } from "../config.js";

export const AutoRepairInputSchema = z.object({
  prNumber: z.number(),
  baseBranch: z.string().optional().default("main"),
});

export async function autoRepairHandler(args: z.input<typeof AutoRepairInputSchema>) {
  const params = AutoRepairInputSchema.parse(args);

  // 1. Prepare: branch creation and metadata fetching
  const prep = await repairPrepareHandler({
    prNumber: params.prNumber,
    writeMode: true
  });

  // 2. Identify Conflict Files
  const conflictFiles = await getMergeConflictFilesHandler({
    prNumber: params.prNumber,
    baseBranch: params.baseBranch
  });

  if (conflictFiles.conflictFiles.length === 0) {
    return { status: "NO_CONFLICTS", message: "No merge conflicts detected." };
  }

  // 3. Resolve Conflicts (This is the complex logic previously in agent prompts)
  // For each conflict file, we look at the diff and the current file content.
  // Note: This is a simplified "prefer PR" strategy for the automated script.
  const resolvedFiles: string[] = [];
  for (const file of conflictFiles.conflictFiles) {
    const filePath = path.join(config.repoPath, file);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      // Basic resolution: remove markers and prefer PR side (simplified for this script)
      const lines = content.split("\n");
      const resolvedLines: string[] = [];
      let inConflict = false;
      let prSide = false;

      for (const line of lines) {
        if (line.startsWith("<<<<<<<")) {
          inConflict = true;
          prSide = false;
          continue;
        }
        if (line.startsWith("=======")) {
          prSide = true;
          continue;
        }
        if (line.startsWith(">>>>>>>")) {
          inConflict = false;
          continue;
        }

        if (!inConflict || prSide) {
          resolvedLines.push(line);
        }
      }

      await fs.writeFile(filePath, resolvedLines.join("\n"));
      resolvedFiles.push(file);
    } catch (e) {
      console.error(`Failed to resolve ${file}:`, e);
    }
  }

  // 4. Finalize: commit, verify, and open replacement PR
  const result = await repairFinalizeHandler({
    prNumber: params.prNumber,
    repairBranch: prep.repairBranch,
    message: `fix: automated conflict resolution for #${params.prNumber}`,
    allowedFiles: resolvedFiles,
    pushMode: true
  });

  return {
    status: "SUCCESS",
    resolvedFiles,
    replacementPrUrl: result.replacementPrUrl,
    verification: result.verification
  };
}
