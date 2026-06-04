import { describe, expect, it } from "vitest";
import { commandKey, isAllowedCommand, redactSecrets, runShell } from "../src/lib/shell.js";

describe("safe shell wrapper", () => {
  it("normalizes allowlisted command families", () => {
    expect(commandKey(["git", "status", "--short"])).toBe("git status");
    expect(commandKey(["gh", "pr", "list", "--state", "open"])).toBe("gh pr list");
    expect(commandKey(["pnpm", "build"])).toBe("pnpm build");
  });

  it("allows approved commands and refuses arbitrary shell", () => {
    expect(isAllowedCommand(["git", "status", "--short"])).toBe(true);
    expect(isAllowedCommand(["sh", "-c", "rm -rf /tmp/example"])).toBe(false);
  });

  it("redacts common GitHub token formats", () => {
    expect(redactSecrets("token ghp_123456789012345678901234567890123456"))
      .toBe("token [REDACTED]");
    expect(redactSecrets("https://x-access-token:secret-token@github.com/arii/tech-dancer.git"))
      .toBe("https://[REDACTED]github.com/arii/tech-dancer.git");
  });

  it("returns structured failure for disallowed commands", async () => {
    const result = await runShell(["node", "-e", "console.log('not allowed')"]);

    expect(result.allowed).toBe(false);
    expect(result.exitCode).toBe(126);
    expect(result.stderr).toContain("not allowlisted");
  });
});
