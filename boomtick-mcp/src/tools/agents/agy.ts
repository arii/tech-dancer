import { z } from "zod";

export const RunAgentAgyInputSchema = z.object({
  prompt: z.string(),
});

export async function runAgentAgyHandler(input: z.infer<typeof RunAgentAgyInputSchema>) {
  return {
    provider: "agy",
    status: "success",
    response: `AGY response for: ${input.prompt}`,
  };
}
