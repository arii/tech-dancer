import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const GetCommandSchemaInputSchema = z.object({
  commandPath: z.string().describe("The CLI command path to retrieve the schema for (e.g. 'gh audit-pr')"),
});

export async function getCommandSchemaHandler(args: z.infer<typeof GetCommandSchemaInputSchema>) {
  const result = await runCommand("td-cli", ["schema", args.commandPath]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to get command schema: ${result.stderr}`);
  }

  try {
    const parsed = JSON.parse(result.stdout);
    if (parsed.status === "error") {
      throw new Error(parsed.message || "Failed to get command schema");
    }
    return parsed.data;
  } catch (e) {
    throw new Error(`Failed to parse command schema output: ${e}`);
  }
}
