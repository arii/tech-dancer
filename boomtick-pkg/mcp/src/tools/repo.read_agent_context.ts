import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const ReadAgentContextInputSchema = z.object({});

export async function readAgentContextHandler(_args: z.infer<typeof ReadAgentContextInputSchema>) {
  const result = await runCommand("td-cli", ["repo", "read-context"]);

  if (result.exitCode !== 0) {
    console.error("td-cli repo read-context failed:", result.stderr);
    throw new Error("Failed to read agent context. Ensure '.agent-context.json' exists by running 'td-cli context-warm'.");
  }

  try {
    const parsed = JSON.parse(result.stdout);
    if (parsed.status === "error") {
      throw new Error(parsed.message || "Failed to read agent context");
    }
    return parsed;
  } catch (e) {
    throw new Error(`Failed to parse agent context output: ${e}`);
  }
}
