import { describe, it, expect, vi } from "vitest";
import { createJulesSessionHandler } from "./create-session.js";

// Mock fetch to not hit actual REST API during tests
vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      name: "session-mocked",
      state: "PENDING",
      createTime: "2024-01-01T00:00:00Z"
    })
  })
}));

describe("createJulesSessionHandler", () => {
  it("should format correct response", async () => {
    const result = await createJulesSessionHandler({ task: "do work", apiKey: "test" });
    expect(result.id).toBe("session-mocked");
    expect(result.status).toBe("PENDING");
  });
});
