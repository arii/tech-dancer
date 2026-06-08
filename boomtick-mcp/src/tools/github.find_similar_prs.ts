import { z } from "zod";
import { searchOpenPrsHandler } from "./github.search_open_prs.js";

export const FindSimilarPrsInputSchema = z.object({
  state: z.enum(["open", "closed", "all"]).optional().default("open"),
  maxResults: z.number().optional().default(20),
  minSharedFiles: z.number().optional().default(1),
});

export async function findSimilarPrsHandler(args: z.infer<typeof FindSimilarPrsInputSchema>) {
  const params = FindSimilarPrsInputSchema.parse(args);

  // Fetch PRs with their files
  const { prs } = await searchOpenPrsHandler({
    state: params.state,
    maxResults: params.maxResults,
    includeFiles: true,
    includeDrafts: true
  });

  const similarityMap: Record<string, { pr1: any, pr2: any, sharedFiles: string[] }> = {};

  for (let i = 0; i < prs.length; i++) {
    const pr1 = prs[i];
    const files1 = new Set((pr1.files || []).map((f: any) => f.path));

    for (let j = i + 1; j < prs.length; j++) {
      const pr2 = prs[j];
      const files2 = (pr2.files || []).map((f: any) => f.path);

      const sharedFiles = files2.filter(f => files1.has(f));

      if (sharedFiles.length >= params.minSharedFiles) {
        const key = [pr1.number, pr2.number].sort().join("-");
        similarityMap[key] = {
          pr1: {
            number: pr1.number,
            title: pr1.title,
            url: pr1.url,
            author: pr1.author
          },
          pr2: {
            number: pr2.number,
            title: pr2.title,
            url: pr2.url,
            author: pr2.author
          },
          sharedFiles
        };
      }
    }
  }

  const results = Object.values(similarityMap).sort((a, b) => b.sharedFiles.length - a.sharedFiles.length);

  return {
    count: results.length,
    similarPrs: results
  };
}
