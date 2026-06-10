import { z } from "zod";

export const RunAgentCopilotInputSchema = z.object({
  prompt: z.string(),
});

export async function runAgentCopilotHandler(input: z.infer<typeof RunAgentCopilotInputSchema>) {
  return {
    provider: "copilot",
    status: "success",
    response: `Copilot response for: ${input.prompt}`,
  };
}
