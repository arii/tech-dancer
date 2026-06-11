import { z } from "zod";

export const GetJulesPullRequestInputSchema = z.object({
  id: z.string(),
});

export async function getJulesPullRequestHandler(input: z.infer<typeof GetJulesPullRequestInputSchema>) {
  return {
    id: input.id,
    pullRequestUrl: "https://github.com/example/repo/pull/1",
  };
}
