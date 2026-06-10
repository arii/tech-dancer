import { describe, it, expect, vi } from "vitest";
import { cancelJulesSessionHandler } from "./cancel-session.js";

vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      name: "session-1",
      state: "FAILED"
    })
  })
}));

describe("cancelJulesSessionHandler", () => {
  it("should cancel session", async () => {
    const result = await cancelJulesSessionHandler({ id: "session-1", apiKey: "test" });
    expect(result.id).toBe("session-1");
    expect(result.status).toBe("FAILED");
  });
});
