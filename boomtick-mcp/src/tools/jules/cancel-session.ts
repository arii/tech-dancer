import { z } from "zod";
import { JulesSession } from "../types.js";

export const CancelJulesSessionInputSchema = z.object({
  id: z.string(),
});

export async function cancelJulesSessionHandler(input: z.infer<typeof CancelJulesSessionInputSchema>): Promise<JulesSession> {
  return {
    id: input.id,
    status: "FAILED",
    createdAt: new Date(),
  };
}
