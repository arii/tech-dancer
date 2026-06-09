import { z } from "zod";
import { getPrDiff, commentPr } from "../lib/gh.js";

export const TriagePrInputSchema = z.object({
  prNumber: z.number(),
  detailed: z.boolean().optional().default(false)
});

export async function triagePrHandler(args: z.input<typeof TriagePrInputSchema>) {
  const params = TriagePrInputSchema.parse(args);

  // 1. Fetch metadata and files
  const prInfo = await getPrDiff({
    prNumber: params.prNumber,
    includeDiff: params.detailed
  });

  // 2. Deterministic analysis
  const highRiskFiles = prInfo.files
    .filter((f: any) => f.path.includes("src/layouts") || f.path.includes("src/components"))
    .map((f: any) => f.path);

  const status = highRiskFiles.length > 3 ? "HIGH_RISK" : "STANDARD";

  // 3. Post summary comment
  const body = `### Boomtick Triage Analysis
- **Status**: ${status}
- **Files Touched**: ${prInfo.files.length}
- **High-Risk Paths**: ${highRiskFiles.length > 0 ? highRiskFiles.join(", ") : "None"}

Automated triage complete. Ready for ${status === "HIGH_RISK" ? "senior review" : "standard repair"}.`;

  await commentPr({
    prNumber: params.prNumber,
    body: body
  });

  return {
    status: "SUCCESS",
    analysis: {
      prNumber: params.prNumber,
      riskLevel: status,
      fileCount: prInfo.files.length,
      highRiskFiles
    }
  };
}
