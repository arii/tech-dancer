import { runCommand, ShellResult } from "../lib/shell.js";

export async function runTDCli(args: string[]): Promise<any> {
  const result = await runCommand("td-cli", args);

  let output: any;
  let parseError: any;
  try {
    output = JSON.parse(result.stdout);
  } catch (e) {
    parseError = e;
  }

  if (output && output.status === "error") {
    throw new Error(`td-cli returned error: ${output.message}`);
  }

  if (result.exitCode !== 0) {
    throw new Error(`td-cli command failed (${args.join(" ")}): ${result.stderr}`);
  }

  if (parseError) {
    throw parseError;
  }

  return output;
}
