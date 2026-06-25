import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const DdgsSearchInputSchema = z.object({
  query: z.string(),
  maxResults: z.number().optional().default(5),
});

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function ddgsSearchHandler(args: z.infer<typeof DdgsSearchInputSchema>) {
  const scriptPath = path.join(__dirname, "ddgs_search.py");

  const result = await runCommand("python", [scriptPath, args.query, args.maxResults.toString()]);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to search ddgs: ${result.stderr}`);
  }

  try {
    const data = JSON.parse(result.stdout);
    return { results: data };
  } catch (e) {
    throw new Error(`Failed to parse ddgs search results. Output was: ${result.stdout}`);
  }
}
