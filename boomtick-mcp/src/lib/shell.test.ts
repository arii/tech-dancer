import { describe, expect, it } from "vitest";
import { isAllowedCommand, redactSecrets, runShell } from "./shell.js";

describe("shell safety helpers", () => {
  it("allows known validation commands", () => {
    expect(isAllowedCommand("pnpm build")).toBe(true);
    expect(isAllowedCommand("gh pr list --state open")).toBe(true);
  });

  it("refuses non-allowlisted commands", async () => {
    const result = await runShell("rm -rf /tmp/example", { cwd: process.cwd() });
    expect(result.exitCode).toBe(126);
    expect(result.stderr).toContain("not allowlisted");
  });

  it("redacts token-shaped secrets", () => {
    expect(redactSecrets("token=ghp_abcdefghijklmnopqrstuvwxyz1234567890")).toContain("[REDACTED]");
  });
});
