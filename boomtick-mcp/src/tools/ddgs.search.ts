import { z } from "zod";
import { runCommand } from "../lib/shell.js";

export const DdgsSearchInputSchema = z.object({
  query: z.string(),
  maxResults: z.number().optional().default(5),
});

export async function ddgsSearchHandler(args: z.infer<typeof DdgsSearchInputSchema>) {
  const pythonScript = `
import json
import sys
try:
    from ddgs import DDGS
except ImportError:
    print(json.dumps({"error": "ddgs package not found. Please run 'pip install ddgs --break-system-packages'"}), file=sys.stderr)
    sys.exit(1)

try:
    query = sys.argv[1]
    max_results = int(sys.argv[2])
    results = DDGS().text(query, max_results=max_results)
    print(json.dumps(list(results)))
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)
`;

  const result = await runCommand("python", ["-c", pythonScript, args.query, args.maxResults.toString()]);

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
