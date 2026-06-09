import { z } from "zod";
import { listPrs } from "../lib/gh.js";

export const FindSimilarPrsInputSchema = z.object({
  state: z.enum(["open", "closed", "all"]).optional().default("open"),
  maxResults: z.number().optional().default(20),
  minSharedFiles: z.number().optional().default(1),
});

export async function findSimilarPrsHandler(args: z.input<typeof FindSimilarPrsInputSchema>) {
  const params = FindSimilarPrsInputSchema.parse(args);

  const prs = await listPrs({
    state: params.state,
    maxResults: params.maxResults,
    includeFiles: true,
    includeDrafts: true
  });

  const results: any[] = [];
  for (let i = 0; i < prs.length; i++) {
    const f1 = new Set((prs[i].files || []).map((f: any) => f.path));
    for (let j = i + 1; j < prs.length; j++) {
      const shared = (prs[j].files || []).map((f: any) => f.path).filter((f: string) => f1.has(f));
      if (shared.length >= params.minSharedFiles) {
        results.push({
          pr1: { number: prs[i].number, title: prs[i].title, url: prs[i].url },
          pr2: { number: prs[j].number, title: prs[j].title, url: prs[j].url },
          sharedFiles: shared
        });
      }
    }
  }

  return {
    count: results.length,
    similarPrs: results.sort((a, b) => b.sharedFiles.length - a.sharedFiles.length)
  };
}
