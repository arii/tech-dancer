import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import { ToolResult, createSuccessResult, createErrorResult } from "../lib/result.js";

const execAsync = promisify(exec);

export const RunScriptInputSchema = z.object({
  script_name: z.string().describe("The exact name of the script in package.json to run (e.g. 'test', 'lint')."),
  args: z.string().optional().describe("Optional arguments to pass to the script (e.g. '--filter=my-test'). Do not include the script name here.")
});

export async function runScriptHandler(input: any): Promise<ToolResult> {
  const parsed = RunScriptInputSchema.safeParse(input);
  if (!parsed.success) {
    return createErrorResult(`Invalid input: ${parsed.error.message}`);
  }

  const { script_name, args } = parsed.data;

  // We use npm run to support cross-package-manager execution generally, but typically it aligns with package.json
  const command = args ? `npm run ${script_name} -- ${args}` : `npm run ${script_name}`;

  const startTime = Date.now();

  try {
    const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 1024 * 10 }); // 10MB buffer just in case
    const durationMs = Date.now() - startTime;

    return createSuccessResult({
      exit_code: 0,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      duration_ms: durationMs,
      message: `Script '${script_name}' executed successfully.`
    });
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    const errObj = {
        message: `Script '${script_name}' failed to execute.`,
        exit_code: error.code || 1,
        stdout: error.stdout ? error.stdout.trim() : "",
        stderr: error.stderr ? error.stderr.trim() : error.message,
        duration_ms: durationMs
    };
    return createErrorResult(JSON.stringify(errObj, null, 2));
  }
}
