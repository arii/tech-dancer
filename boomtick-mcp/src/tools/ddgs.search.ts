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

  // Sanitize query by removing control characters, newlines, and null bytes
  const safeQuery = args.query.replace(/[\x00-\x1F\x7F-\x9F]/g, " ").trim();

  const result = await runCommand("python3", [scriptPath, safeQuery, (args.maxResults ?? 5).toString()]);

  // duckduckgo_search logs annoying deprecation warnings to stderr we want to ignore
  // if it really failed, exitCode will be non-zero and we'll have stdout/stderr
  if (result.exitCode !== 0) {
    const errorOutput = result.stderr || result.stdout;
    let parsedError = errorOutput;
    try {
      const errorJson = JSON.parse(errorOutput);
      if (errorJson.error) {
        parsedError = errorJson.error;
      }
    } catch {
      // Not JSON or missing "error" field, use raw output
    }
    throw new Error(`Failed to search ddgs: ${parsedError}`);
  }

  try {
    const data = JSON.parse(result.stdout);
    if (!Array.isArray(data)) {
      throw new Error("Expected an array of search results");
    }
    return { results: data };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to parse ddgs search results. Error: ${message}. Output was: ${result.stdout}`);
  }
}
