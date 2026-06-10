import { z } from "zod";
import { JulesSession } from "../types.js";

export const GetJulesSessionInputSchema = z.object({
  id: z.string(),
});

export async function getJulesSessionHandler(input: z.infer<typeof GetJulesSessionInputSchema>): Promise<JulesSession> {
  return {
    id: input.id,
    status: "COMPLETED",
    createdAt: new Date(),
    pullRequestUrl: "https://github.com/example/repo/pull/1",
  };
}
