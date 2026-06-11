import { z } from "zod";
import { JulesSession } from "../types.js";

export const CreateJulesSessionInputSchema = z.object({
  task: z.string(),
});

export async function createJulesSessionHandler(input: z.infer<typeof CreateJulesSessionInputSchema>): Promise<JulesSession> {
  return {
    id: `session-${Date.now()}`,
    status: "PENDING",
    createdAt: new Date(),
  };
}
