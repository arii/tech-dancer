import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createJulesSessionHandler } from "./create-session.js";

describe("createJulesSessionHandler", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "sessions/1234567890",
            state: "PENDING",
            createTime: new Date().toISOString(),
          }),
      })
    ) as any;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should create a session", async () => {
    const result = await createJulesSessionHandler({ task: "do work" });
    expect(result.id).toBe("1234567890");
    expect(result.status).toBe("PENDING");
    expect(result.createdAt).toBeInstanceOf(Date);
  });
});
