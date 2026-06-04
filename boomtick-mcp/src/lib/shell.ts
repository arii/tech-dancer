import { spawn } from "node:child_process";

export const ALLOWED_COMMANDS = [
  "git status",
  "git fetch",
  "git checkout",
  "git switch",
  "git merge",
  "git rebase",
  "git diff",
  "git status --porcelain",
  "git worktree add",
  "git worktree remove",
  "git merge --abort",
  "gh pr list",
  "gh pr view",
  "gh pr diff",
  "gh pr create",
  "gh pr comment",
  "pnpm install --frozen-lockfile",
  "pnpm lint",
  "pnpm test",
  "pnpm build",
  "pnpm preview",
  "pnpm playwright test",
  "pnpm lhci autorun",
] as const;

const TOKEN_PATTERNS = [
  /gh[pousr]_[A-Za-z0-9_]{20,}/g,
  /github_pat_[A-Za-z0-9_]{20,}/g,
  /x-access-token:[^@\s]+@/g,
];

export type ShellResult = {
  command: string;
  cwd: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  timedOut: boolean;
};

export type RunShellOptions = {
  cwd: string;
  timeoutMs?: number;
  env?: NodeJS.ProcessEnv;
};

export function redactSecrets(value: string): string {
  return TOKEN_PATTERNS.reduce((text, pattern) => text.replace(pattern, "[REDACTED]"), value);
}

export function isAllowedCommand(command: string): boolean {
  return ALLOWED_COMMANDS.some((allowed) => command === allowed || command.startsWith(`${allowed} `));
}

export async function runShell(command: string, options: RunShellOptions): Promise<ShellResult> {
  if (!isAllowedCommand(command)) {
    return {
      command,
      cwd: options.cwd,
      exitCode: 126,
      stdout: "",
      stderr: `Command is not allowlisted: ${command}`,
      durationMs: 0,
      timedOut: false,
    };
  }

  const started = Date.now();
  const child = spawn(command, {
    cwd: options.cwd,
    env: { ...process.env, ...options.env },
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  let timedOut = false;

  child.stdout.on("data", (chunk: Buffer) => {
    stdout += chunk.toString("utf8");
  });
  child.stderr.on("data", (chunk: Buffer) => {
    stderr += chunk.toString("utf8");
  });

  const timer = setTimeout(() => {
    timedOut = true;
    child.kill("SIGTERM");
  }, options.timeoutMs ?? 120_000);

  const exitCode = await new Promise<number>((resolve) => {
    child.on("close", (code) => resolve(code ?? (timedOut ? 124 : 1)));
    child.on("error", () => resolve(1));
  });

  clearTimeout(timer);

  return {
    command,
    cwd: options.cwd,
    exitCode: timedOut && exitCode === 0 ? 124 : exitCode,
    stdout: redactSecrets(stdout),
    stderr: redactSecrets(stderr),
    durationMs: Date.now() - started,
    timedOut,
  };
}
