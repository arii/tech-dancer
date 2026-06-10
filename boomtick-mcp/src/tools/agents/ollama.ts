import { z } from "zod";

export const RunAgentOllamaInputSchema = z.object({
  prompt: z.string(),
});

export async function runAgentOllamaHandler(input: z.infer<typeof RunAgentOllamaInputSchema>) {
  return {
    provider: "ollama",
    status: "success",
    response: `Ollama response for: ${input.prompt}`,
  };
}
