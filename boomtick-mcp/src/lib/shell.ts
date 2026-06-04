import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

export const ALLOWED_COMMANDS = [
  "git status",
  "git status --porcelain",
  "git fetch",
  "git checkout",
  "git switch",
  "git merge",
  "git rebase",
  "git diff",
  "git worktree add",
  "git worktree remove",
  "git worktree prune",
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

export type ShellResult = {
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  timedOut: boolean;
  allowed: boolean;
};

type RunShellOptions = {
  cwd?: string;
  timeoutMs?: number;
  env?: NodeJS.ProcessEnv;
};

const TOKEN_PATTERNS = [
  /gh[pousr]_[A-Za-z0-9_]{20,}/g,
  /github_pat_[A-Za-z0-9_]+/g,
  /x-access-token:[^@\s]+@/g,
];

export function redactSecrets(value: string): string {
  return TOKEN_PATTERNS.reduce((current, pattern) => current.replace(pattern, "[REDACTED]"), value);
}

export function commandKey(command: string[]): string {
  if (command.length >= 3 && command[0] === "git" && command[1] === "worktree") {
    return `git worktree ${command[2]}`;
  }
  if (command.length >= 2 && command[0] === "git") {
    return `git ${command[1]}`;
  }
  if (command.length >= 3 && command[0] === "gh" && command[1] === "pr") {
    return `gh pr ${command[2]}`;
  }
  if (command[0] === "pnpm") {
    const script = command[1] === "run" ? command[2] : command[1];
    if (script === "install") {
      return command.includes("--frozen-lockfile") ? "pnpm install --frozen-lockfile" : "pnpm install";
    }
    if (script === "playwright") {
      return "pnpm playwright test";
    }
    if (script === "lhci") {
      return "pnpm lhci autorun";
    }
    return `pnpm ${script}`;
  }
  return command.join(" ");
}

export function isAllowedCommand(command: string[]): boolean {
  return ALLOWED_COMMANDS.includes(commandKey(command) as (typeof ALLOWED_COMMANDS)[number]);
}

export async function runShell(command: string[], options: RunShellOptions = {}): Promise<ShellResult> {
  const startedAt = Date.now();
  const printableCommand = command.join(" ");

  if (!isAllowedCommand(command)) {
    return {
      command: printableCommand,
      exitCode: 126,
      stdout: "",
      stderr: `Command is not allowlisted: ${printableCommand}`,
      durationMs: Date.now() - startedAt,
      timedOut: false,
      allowed: false,
    };
  }

  const child = spawn(command[0], command.slice(1), {
    cwd: options.cwd,
    env: options.env ?? process.env,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  let timedOut = false;
  const timeoutMs = options.timeoutMs ?? 120_000;

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  const exitCode = await Promise.race([
    new Promise<number>((resolve) => {
      child.on("close", (code) => resolve(code ?? 0));
      child.on("error", () => resolve(127));
    }),
    delay(timeoutMs).then(() => {
      timedOut = true;
      child.kill("SIGTERM");
      return 124;
    }),
  ]);

  return {
    command: printableCommand,
    exitCode,
    stdout: redactSecrets(stdout),
    stderr: redactSecrets(stderr),
    durationMs: Date.now() - startedAt,
    timedOut,
    allowed: true,
  };
}
