import { runCommand } from "../lib/shell.js";

export interface TDCliResponse {
  status: string;
  message?: string;
  [key: string]: any;
}

export async function runTDCli(args: string[]): Promise<TDCliResponse> {
  const result = await runCommand("td-cli", args);

  const stdout = result.stdout.trim();
  const isPossiblyJson = stdout.startsWith("{");

  if (result.exitCode !== 0) {
    if (isPossiblyJson) {
      let output: TDCliResponse | null = null;
      try {
        output = JSON.parse(stdout) as TDCliResponse;
      } catch {
        // Ignore parse error and fall back to generic shell error
      }

      if (output && output.status === "error") {
        throw new Error(`td-cli returned error: ${output.message ?? "Unknown error"}`);
      }
    }
    throw new Error(`td-cli command failed (${args.join(" ")}): ${result.stderr || stdout}`);
  }

  if (!isPossiblyJson) {
    throw new Error(`td-cli returned non-JSON output with exit code 0: ${stdout}`);
  }

  const output = JSON.parse(stdout) as TDCliResponse;
  if (output.status === "error") {
    throw new Error(`td-cli returned error: ${output.message ?? "Unknown error"}`);
  }

  return output;
}
