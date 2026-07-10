import { runCommand, ShellResult } from "../lib/shell.js";

export async function runTDCli(args: string[]): Promise<any> {
  const result = await runCommand("td-cli", args);

  let output: unknown;
  try {
    output = JSON.parse(result.stdout);
  } catch (e) {
    if (result.exitCode !== 0) {
      throw new Error(`td-cli command failed (${args.join(" ")}): ${result.stderr}`);
    }
    throw e;
  }

  if (output && typeof output === "object" && "status" in output && output.status === "error") {
    const message = (output as { message?: string }).message ?? "Unknown error";
    throw new Error(`td-cli returned error: ${message}`);
  }

  if (result.exitCode !== 0) {
    throw new Error(`td-cli command failed (${args.join(" ")}): ${result.stderr}`);
  }

  return output;
}
