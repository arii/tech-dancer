import { z } from "zod";
import { JulesSession } from "../types.js";

export const ListJulesSessionsInputSchema = z.object({});

export async function listJulesSessionsHandler(input: z.infer<typeof ListJulesSessionsInputSchema>): Promise<JulesSession[]> {
  return [
    {
      id: "session-1",
      status: "COMPLETED",
      createdAt: new Date(),
      pullRequestUrl: "https://github.com/example/repo/pull/1",
    }
  ];
}
